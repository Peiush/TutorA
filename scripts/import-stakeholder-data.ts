import "dotenv/config";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { CATEGORY_LABEL_TO_DB, type CourseCategory } from "@/lib/mock-courses";

// Known-safe aliases: teacher's free-text subject -> canonical catalog name (Subjects sheet or Courses sheet title).
// Only pairs where the mapping is unambiguous (same subject, different spelling) live here.
// Anything not resolvable this way is listed with no fixed price ("Rate on request") rather than guessed.
const SUBJECT_ALIASES: Record<string, string> = {
  "gcse mathematics": "GCSE Maths",
  "ib mathematics": "IB Math",
  "ap bc": "AP Calculus BC",
  "physics c": "AP Physics C", // "Physics C...." in the sheet, trailing dots stripped by normalize()
  "general chemistry": "Chemistry",
};

type CatalogEntry = { name: string; hourlyRateCents: number };
type ParsedCourse = {
  title: string;
  categoryDb: string;
  priceCents: number | null;
  originalPriceCents: number | null;
  lectureCount: number | null;
  lectureCountLabel: string | null;
  rating: number | null;
  reviewCount: number | null;
  whatYoullLearn: string;
  bestseller: boolean;
  premium: boolean;
  isNew: boolean;
};

type RowError = { sheet: string; row: number; message: string };
type UnmatchedSubject = { teacher: string; token: string };

const errors: RowError[] = [];
const unmatched: UnmatchedSubject[] = [];
const summary = {
  subjectsUpserted: 0,
  teachersCreated: 0,
  tutorSubjectListingsFromSubjectsSheet: 0,
  tutorSubjectListingsFromCoursesSheet: 0,
  tutorSubjectListingsRateOnRequest: 0,
  coursesCreated: 0,
  coursesUpdated: 0,
  coursesSkipped: 0,
};

function cellText(row: ExcelJS.Row, index: number): string {
  const value = row.getCell(index).value;
  if (value === null || value === undefined) return "";
  if (typeof value === "object" && "text" in value) return String((value as { text: unknown }).text ?? "").trim();
  if (typeof value === "object" && "result" in value) return String((value as { result: unknown }).result ?? "").trim();
  return String(value).trim();
}

function parseMoney(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function parseYearsExperience(raw: string): number | null {
  const m = raw.match(/\d+/);
  return m ? Number(m[0]) : null;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/\.+$/g, "");
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

async function importSubjects(sheet: ExcelJS.Worksheet | undefined) {
  const subjectRows: { name: string; gradeLevel: string | null; curriculum: string | null; hourlyRateCents: number }[] = [];
  if (!sheet) return subjectRows;

  for (let r = 2; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r);
    const name = cellText(row, 1);
    if (!name) continue;
    const gradeLevel = cellText(row, 2) || null;
    const curriculum = cellText(row, 3) || null;
    const priceRaw = cellText(row, 4);
    const price = parseMoney(priceRaw);
    if (price === null) {
      errors.push({ sheet: "Subjects", row: r, message: `Could not parse hourly rate "${priceRaw}" for "${name}".` });
      continue;
    }
    subjectRows.push({ name, gradeLevel, curriculum, hourlyRateCents: Math.round(price * 100) });
  }

  for (const s of subjectRows) {
    await prisma.subject.upsert({
      where: { name: s.name },
      create: { name: s.name, gradeLevel: s.gradeLevel, curriculum: s.curriculum, hourlyRateCents: s.hourlyRateCents },
      update: { gradeLevel: s.gradeLevel, curriculum: s.curriculum, hourlyRateCents: s.hourlyRateCents },
    });
    summary.subjectsUpserted++;
  }

  return subjectRows;
}

function parseCoursesSheet(sheet: ExcelJS.Worksheet | undefined): ParsedCourse[] {
  const parsed: ParsedCourse[] = [];
  if (!sheet) return parsed;

  let currentCategory: string | null = null;

  for (let r = 2; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r);
    const title = cellText(row, 1);
    if (!title) continue;

    const categoryRaw = cellText(row, 2);
    if (categoryRaw) currentCategory = categoryRaw.trim();
    const category = currentCategory;

    if (!category) {
      summary.coursesSkipped++;
      errors.push({ sheet: "Courses", row: r, message: `No category found (forward-fill) for "${title}".` });
      continue;
    }

    const categoryLabel = category === "Language section" ? "Languages" : category;
    const categoryDb = CATEGORY_LABEL_TO_DB[categoryLabel as CourseCategory];
    if (!categoryDb) {
      summary.coursesSkipped++;
      errors.push({ sheet: "Courses", row: r, message: `Unknown category "${category}" for "${title}".` });
      continue;
    }

    const priceRaw = cellText(row, 4);
    const originalPriceRaw = cellText(row, 5);
    const lectureCountRaw = cellText(row, 6);
    const ratingRaw = cellText(row, 7);
    const reviewCountRaw = cellText(row, 8);
    const whatYoullLearnRaw = cellText(row, 9);
    const bestseller = /^y(es)?$/i.test(cellText(row, 10));
    const premium = /^y(es)?$/i.test(cellText(row, 11));
    const isNew = /^y(es)?$/i.test(cellText(row, 12));

    const price = parseMoney(priceRaw);
    const originalPrice = parseMoney(originalPriceRaw);
    const lectureCount = /^\d+$/.test(lectureCountRaw) ? Number(lectureCountRaw) : null;
    const lectureCountLabel = lectureCountRaw && lectureCount === null ? lectureCountRaw : null;
    const rating = parseMoney(ratingRaw);
    const reviewCount = /^\d+$/.test(reviewCountRaw) ? Number(reviewCountRaw) : null;
    const whatYoullLearn = whatYoullLearnRaw
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean)
      .join("\n");

    if (price === null && originalPrice === null) {
      summary.coursesSkipped++;
      errors.push({ sheet: "Courses", row: r, message: `No price found for "${title}".` });
      continue;
    }

    parsed.push({
      title,
      categoryDb,
      priceCents: price !== null ? Math.round(price * 100) : null,
      originalPriceCents: originalPrice !== null ? Math.round(originalPrice * 100) : null,
      lectureCount,
      lectureCountLabel,
      rating,
      reviewCount,
      whatYoullLearn,
      bestseller,
      premium,
      isNew,
    });
  }

  return parsed;
}

async function writeCourses(courses: ParsedCourse[], dryRun: boolean) {
  for (const c of courses) {
    const data = {
      title: c.title,
      category: c.categoryDb as never,
      level: "ALL_LEVELS" as never,
      priceCents: c.priceCents,
      originalPriceCents: c.originalPriceCents,
      lectureCount: c.lectureCount,
      lectureCountLabel: c.lectureCountLabel,
      rating: c.rating ?? undefined,
      reviewCount: c.reviewCount ?? undefined,
      whatYoullLearn: c.whatYoullLearn || null,
      bestseller: c.bestseller,
      premium: c.premium,
      isNew: c.isNew,
    };

    const existing = await prisma.course.findFirst({ where: { title: c.title } });

    if (dryRun) {
      if (existing) summary.coursesUpdated++;
      else summary.coursesCreated++;
      continue;
    }

    if (existing) {
      await prisma.course.update({ where: { id: existing.id }, data });
      summary.coursesUpdated++;
    } else {
      await prisma.course.create({ data });
      summary.coursesCreated++;
    }
  }
}

async function importTeachers(
  sheet: ExcelJS.Worksheet | undefined,
  subjectRows: CatalogEntry[],
  courseRows: ParsedCourse[],
  dryRun: boolean
) {
  if (!sheet) return;

  const subjectCatalog = new Map(subjectRows.map((s) => [normalize(s.name), s]));
  const courseCatalog = new Map(
    courseRows.filter((c) => c.priceCents !== null).map((c) => [normalize(c.title), { name: c.title, hourlyRateCents: c.priceCents! }])
  );
  const usedEmails = new Set<string>();
  const noPriceSubjectCache = new Map<string, string>(); // normalized token -> Subject.id

  for (let r = 2; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r);
    const name = cellText(row, 1);
    if (!name) continue;

    const country = cellText(row, 2) || "Not specified";
    const subjectsText = cellText(row, 3);
    const yearsText = cellText(row, 4);
    const rateText = cellText(row, 5);
    const bio = cellText(row, 6) || null;
    const statusText = cellText(row, 7);

    const yearsExperience = parseYearsExperience(yearsText);
    const legacyRate = parseMoney(rateText);
    const status = /^active$/i.test(statusText) ? "APPROVED" : "PENDING";

    const baseSlug = slugify(name) || `tutor-${r}`;
    let email = `${baseSlug}@tutors.tutorconnect.dev`;
    let suffix = 2;
    while (usedEmails.has(email)) {
      email = `${baseSlug}${suffix}@tutors.tutorconnect.dev`;
      suffix++;
    }
    usedEmails.add(email);

    const tokens = subjectsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    type Resolved = { kind: "subjects-sheet" | "courses-sheet" | "no-price"; name: string; hourlyRateCents: number | null };
    const resolved: Resolved[] = [];

    for (const token of tokens) {
      const key = normalize(token);
      const aliasTarget = SUBJECT_ALIASES[key];
      const aliasKey = aliasTarget ? normalize(aliasTarget) : null;

      const subjectMatch = subjectCatalog.get(key) ?? (aliasKey ? subjectCatalog.get(aliasKey) : undefined);
      if (subjectMatch) {
        resolved.push({ kind: "subjects-sheet", name: subjectMatch.name, hourlyRateCents: subjectMatch.hourlyRateCents });
        continue;
      }

      const courseMatch = courseCatalog.get(key) ?? (aliasKey ? courseCatalog.get(aliasKey) : undefined);
      if (courseMatch) {
        resolved.push({ kind: "courses-sheet", name: courseMatch.name, hourlyRateCents: courseMatch.hourlyRateCents });
        continue;
      }

      resolved.push({ kind: "no-price", name: token, hourlyRateCents: null });
      unmatched.push({ teacher: name, token });
    }

    if (dryRun) {
      summary.teachersCreated++;
      for (const item of resolved) {
        if (item.kind === "subjects-sheet") summary.tutorSubjectListingsFromSubjectsSheet++;
        else if (item.kind === "courses-sheet") summary.tutorSubjectListingsFromCoursesSheet++;
        else summary.tutorSubjectListingsRateOnRequest++;
      }
      continue;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: "TUTOR",
        tutorProfile: {
          create: {
            country,
            subjects: subjectsText,
            yearsExperience: yearsExperience ?? undefined,
            hourlyRateCents: legacyRate !== null ? Math.round(legacyRate * 100) : null,
            bio,
            status,
          },
        },
      },
      include: { tutorProfile: true },
    });

    for (const item of resolved) {
      let subjectId: string;

      if (item.kind === "subjects-sheet") {
        const subject = await prisma.subject.findUnique({ where: { name: item.name } });
        if (!subject) continue;
        subjectId = subject.id;
      } else {
        // "courses-sheet" and "no-price" matches don't have a Subject row yet — create/reuse one.
        const cacheKey = normalize(item.name);
        const cached = noPriceSubjectCache.get(cacheKey);
        if (cached) {
          subjectId = cached;
        } else {
          const subject = await prisma.subject.upsert({
            where: { name: item.name },
            create: { name: item.name, hourlyRateCents: item.hourlyRateCents },
            update: { hourlyRateCents: item.hourlyRateCents },
          });
          noPriceSubjectCache.set(cacheKey, subject.id);
          subjectId = subject.id;
        }
      }

      await prisma.tutorSubject.create({
        data: {
          tutorProfileId: user.tutorProfile!.id,
          subjectId,
          hourlyRateCents: item.hourlyRateCents,
        },
      });

      if (item.kind === "subjects-sheet") summary.tutorSubjectListingsFromSubjectsSheet++;
      else if (item.kind === "courses-sheet") summary.tutorSubjectListingsFromCoursesSheet++;
      else summary.tutorSubjectListingsRateOnRequest++;
    }

    summary.teachersCreated++;
  }
}

async function main() {
  const filePath = process.argv[2];
  const dryRun = process.argv.includes("--dry-run");

  if (!filePath) {
    console.error("Usage: npx tsx scripts/import-stakeholder-data.ts <path-to-file.xlsx> [--dry-run]");
    process.exitCode = 1;
    return;
  }

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filePath);

  const teachersSheet = wb.getWorksheet("Teachers");
  const subjectsSheet = wb.getWorksheet("Subjects");
  const coursesSheet = wb.getWorksheet("Courses");

  console.log(dryRun ? "Running in dry-run mode — no data will be written.\n" : "Importing…\n");

  const subjectRows = await importSubjects(subjectsSheet);
  const courseRows = parseCoursesSheet(coursesSheet);
  await importTeachers(teachersSheet, subjectRows, courseRows, dryRun);
  await writeCourses(courseRows, dryRun);

  console.log("Summary:");
  console.log(`  Subjects upserted: ${summary.subjectsUpserted}`);
  console.log(`  Teachers created: ${summary.teachersCreated}`);
  console.log(`  Tutor-subject listings — from Subjects sheet: ${summary.tutorSubjectListingsFromSubjectsSheet}, from Courses sheet: ${summary.tutorSubjectListingsFromCoursesSheet}, rate on request: ${summary.tutorSubjectListingsRateOnRequest}`);
  console.log(`  Courses — created: ${summary.coursesCreated}, updated: ${summary.coursesUpdated}, skipped: ${summary.coursesSkipped}`);

  if (unmatched.length) {
    console.log(`\n${unmatched.length} teacher subject(s) had no price in either sheet — listed as "Rate on request":`);
    for (const u of unmatched) {
      console.log(`  [${u.teacher}] "${u.token}"`);
    }
  }

  if (errors.length) {
    console.log(`\n${errors.length} row(s) had problems:`);
    for (const e of errors) {
      console.log(`  [${e.sheet} row ${e.row}] ${e.message}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exitCode = 1;
});

import "dotenv/config";
import ExcelJS from "exceljs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { courseCategories, courseLevels, CATEGORY_LABEL_TO_DB, LEVEL_LABEL_TO_DB } from "@/lib/mock-courses";
import { makeSlug } from "@/lib/slug";

type RowError = { sheet: string; row: number; message: string };

const errors: RowError[] = [];
const summary = {
  teachersCreated: 0,
  teachersUpdated: 0,
  teachersSkipped: 0,
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

function headerMap(sheet: ExcelJS.Worksheet): Map<string, number> {
  const map = new Map<string, number>();
  sheet.getRow(1).eachCell((cell, colNumber) => {
    const key = String(cell.value ?? "").trim().toLowerCase();
    if (key) map.set(key, colNumber);
  });
  return map;
}

function col(headers: Map<string, number>, ...names: string[]): number {
  for (const name of names) {
    const found = headers.get(name.toLowerCase());
    if (found) return found;
  }
  return -1;
}

function toYesNo(value: string): boolean {
  return /^y(es)?$/i.test(value.trim());
}

const TeacherSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().toLowerCase().email("Invalid email."),
  country: z.string().trim().min(2, "Country is required."),
  subjects: z.string().trim().min(2, "At least one subject is required."),
  yearsExperience: z.coerce.number().int().min(0).optional(),
  hourlyRate: z.coerce.number().min(0).optional(),
  bio: z.string().trim().optional(),
  status: z.enum(["Approved", "Pending", "Rejected"]).optional().default("Approved"),
});

const CourseSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  subtitle: z.string().trim().optional(),
  instructorEmail: z.string().trim().toLowerCase().email("Invalid instructor email."),
  category: z.enum(courseCategories as [string, ...string[]], { message: `Category must be one of: ${courseCategories.join(", ")}` }),
  level: z.enum(courseLevels as [string, ...string[]]).optional().default("All Levels"),
  price: z.coerce.number().positive("Price must be greater than 0."),
  originalPrice: z.coerce.number().positive("Original price must be greater than 0."),
  durationHours: z.coerce.number().positive("Duration must be greater than 0."),
  lectureCount: z.coerce.number().int().positive("Lecture count must be greater than 0."),
  rating: z.coerce.number().min(0).max(5).optional(),
  reviewCount: z.coerce.number().int().min(0).optional(),
  whatYoullLearn: z.string().trim().min(3, "At least one learning outcome is required."),
  bestseller: z.boolean().optional(),
  premium: z.boolean().optional(),
  isNew: z.boolean().optional(),
});

async function importTeachers(sheet: ExcelJS.Worksheet | undefined, dryRun: boolean): Promise<Map<string, string>> {
  const emailToTutorProfileId = new Map<string, string>();
  if (!sheet) return emailToTutorProfileId;

  const headers = headerMap(sheet);
  const c = {
    name: col(headers, "name"),
    email: col(headers, "email"),
    country: col(headers, "country"),
    subjects: col(headers, "subjects (comma-separated)", "subjects"),
    yearsExperience: col(headers, "years experience"),
    hourlyRate: col(headers, "hourly rate (usd)", "hourly rate"),
    bio: col(headers, "bio"),
    status: col(headers, "status"),
  };

  for (let r = 2; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r);
    const name = c.name > 0 ? cellText(row, c.name) : "";
    const email = c.email > 0 ? cellText(row, c.email) : "";
    if (!name && !email) continue;

    const parsed = TeacherSchema.safeParse({
      name,
      email,
      country: c.country > 0 ? cellText(row, c.country) : "",
      subjects: c.subjects > 0 ? cellText(row, c.subjects) : "",
      yearsExperience: c.yearsExperience > 0 ? cellText(row, c.yearsExperience) || undefined : undefined,
      hourlyRate: c.hourlyRate > 0 ? cellText(row, c.hourlyRate) || undefined : undefined,
      bio: c.bio > 0 ? cellText(row, c.bio) : undefined,
      status: c.status > 0 ? cellText(row, c.status) || undefined : undefined,
    });

    if (!parsed.success) {
      summary.teachersSkipped++;
      errors.push({ sheet: "Teachers", row: r, message: parsed.error.issues.map((i) => i.message).join(" ") });
      continue;
    }

    const d = parsed.data;
    const hourlyRateCents = d.hourlyRate !== undefined ? Math.round(d.hourlyRate * 100) : null;
    const statusDb = d.status.toUpperCase() as "APPROVED" | "PENDING" | "REJECTED";

    const existingUser = await prisma.user.findUnique({ where: { email: d.email }, include: { tutorProfile: true } });

    if (dryRun) {
      emailToTutorProfileId.set(d.email, `dry-run:${d.email}`);
      if (existingUser) summary.teachersUpdated++;
      else summary.teachersCreated++;
      continue;
    }

    if (existingUser) {
      const profile = existingUser.tutorProfile
        ? await prisma.tutorProfile.update({
            where: { id: existingUser.tutorProfile.id },
            data: {
              country: d.country,
              subjects: d.subjects,
              yearsExperience: d.yearsExperience ?? null,
              hourlyRateCents,
              bio: d.bio ?? null,
              status: statusDb,
            },
          })
        : await prisma.tutorProfile.create({
            data: {
              userId: existingUser.id,
              slug: makeSlug(d.name),
              country: d.country,
              subjects: d.subjects,
              yearsExperience: d.yearsExperience ?? null,
              hourlyRateCents,
              bio: d.bio ?? null,
              status: statusDb,
            },
          });
      await prisma.user.update({ where: { id: existingUser.id }, data: { name: d.name, role: "TUTOR" } });
      emailToTutorProfileId.set(d.email, profile.id);
      summary.teachersUpdated++;
    } else {
      const user = await prisma.user.create({
        data: {
          name: d.name,
          email: d.email,
          role: "TUTOR",
          tutorProfile: {
            create: {
              slug: makeSlug(d.name),
              country: d.country,
              subjects: d.subjects,
              yearsExperience: d.yearsExperience ?? null,
              hourlyRateCents,
              bio: d.bio ?? null,
              status: statusDb,
            },
          },
        },
        include: { tutorProfile: true },
      });
      emailToTutorProfileId.set(d.email, user.tutorProfile!.id);
      summary.teachersCreated++;
    }
  }

  return emailToTutorProfileId;
}

async function importCourses(sheet: ExcelJS.Worksheet | undefined, instructorMap: Map<string, string>, dryRun: boolean) {
  if (!sheet) return;

  const headers = headerMap(sheet);
  const c = {
    title: col(headers, "title"),
    subtitle: col(headers, "subtitle"),
    instructorEmail: col(headers, "instructor email"),
    category: col(headers, "category"),
    level: col(headers, "level"),
    price: col(headers, "price (usd)", "price"),
    originalPrice: col(headers, "original price (usd)", "original price"),
    durationHours: col(headers, "duration (hours)", "duration hours"),
    lectureCount: col(headers, "lecture count"),
    rating: col(headers, "rating"),
    reviewCount: col(headers, "review count"),
    whatYoullLearn: col(headers, "what you'll learn (separate with |)", "what you'll learn"),
    bestseller: col(headers, "bestseller"),
    premium: col(headers, "premium"),
    isNew: col(headers, "new"),
  };

  for (let r = 2; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r);
    const title = c.title > 0 ? cellText(row, c.title) : "";
    if (!title) continue;

    const parsed = CourseSchema.safeParse({
      title,
      subtitle: c.subtitle > 0 ? cellText(row, c.subtitle) || undefined : undefined,
      instructorEmail: c.instructorEmail > 0 ? cellText(row, c.instructorEmail) : "",
      category: c.category > 0 ? cellText(row, c.category) : "",
      level: c.level > 0 ? cellText(row, c.level) || undefined : undefined,
      price: c.price > 0 ? cellText(row, c.price) : "",
      originalPrice: c.originalPrice > 0 ? cellText(row, c.originalPrice) : "",
      durationHours: c.durationHours > 0 ? cellText(row, c.durationHours) : "",
      lectureCount: c.lectureCount > 0 ? cellText(row, c.lectureCount) : "",
      rating: c.rating > 0 ? cellText(row, c.rating) || undefined : undefined,
      reviewCount: c.reviewCount > 0 ? cellText(row, c.reviewCount) || undefined : undefined,
      whatYoullLearn: c.whatYoullLearn > 0 ? cellText(row, c.whatYoullLearn) : "",
      bestseller: c.bestseller > 0 ? toYesNo(cellText(row, c.bestseller)) : undefined,
      premium: c.premium > 0 ? toYesNo(cellText(row, c.premium)) : undefined,
      isNew: c.isNew > 0 ? toYesNo(cellText(row, c.isNew)) : undefined,
    });

    if (!parsed.success) {
      summary.coursesSkipped++;
      errors.push({ sheet: "Courses", row: r, message: parsed.error.issues.map((i) => i.message).join(" ") });
      continue;
    }

    const d = parsed.data;
    let instructorId = instructorMap.get(d.instructorEmail);
    if (!instructorId) {
      const existing = await prisma.tutorProfile.findFirst({ where: { user: { email: d.instructorEmail } } });
      if (existing) instructorId = existing.id;
    }

    if (!instructorId) {
      summary.coursesSkipped++;
      errors.push({
        sheet: "Courses",
        row: r,
        message: `Instructor email "${d.instructorEmail}" was not found in the Teachers sheet or existing database.`,
      });
      continue;
    }

    const existingCourseCheck = await prisma.course.findFirst({ where: { title: d.title } });

    if (dryRun) {
      if (existingCourseCheck) summary.coursesUpdated++;
      else summary.coursesCreated++;
      continue;
    }

    const data = {
      title: d.title,
      subtitle: d.subtitle ?? null,
      instructorId,
      category: CATEGORY_LABEL_TO_DB[d.category as keyof typeof CATEGORY_LABEL_TO_DB] as never,
      level: LEVEL_LABEL_TO_DB[d.level as keyof typeof LEVEL_LABEL_TO_DB] as never,
      priceCents: Math.round(d.price * 100),
      originalPriceCents: Math.round(d.originalPrice * 100),
      durationHours: d.durationHours,
      lectureCount: d.lectureCount,
      rating: d.rating ?? 4.8,
      reviewCount: d.reviewCount ?? 0,
      whatYoullLearn: d.whatYoullLearn
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean)
        .join("\n"),
      bestseller: d.bestseller ?? false,
      premium: d.premium ?? false,
      isNew: d.isNew ?? false,
    };

    if (existingCourseCheck) {
      await prisma.course.update({ where: { id: existingCourseCheck.id }, data });
      summary.coursesUpdated++;
    } else {
      await prisma.course.create({ data: { ...data, slug: makeSlug(d.title) } });
      summary.coursesCreated++;
    }
  }
}

async function main() {
  const filePath = process.argv[2];
  const dryRun = process.argv.includes("--dry-run");

  if (!filePath) {
    console.error("Usage: npm run import:data -- <path-to-file.xlsx> [--dry-run]");
    process.exitCode = 1;
    return;
  }

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filePath);

  const teachersSheet = wb.getWorksheet("Teachers");
  const coursesSheet = wb.getWorksheet("Courses");

  if (!teachersSheet && !coursesSheet) {
    console.error('No "Teachers" or "Courses" sheet found. Did you rename the sheet tabs?');
    process.exitCode = 1;
    return;
  }

  console.log(dryRun ? "Running in dry-run mode — no data will be written.\n" : "Importing…\n");

  const instructorMap = await importTeachers(teachersSheet, dryRun);
  await importCourses(coursesSheet, instructorMap, dryRun);

  console.log("Summary:");
  console.log(`  Teachers — created: ${summary.teachersCreated}, updated: ${summary.teachersUpdated}, skipped: ${summary.teachersSkipped}`);
  console.log(`  Courses  — created: ${summary.coursesCreated}, updated: ${summary.coursesUpdated}, skipped: ${summary.coursesSkipped}`);

  if (errors.length) {
    console.log(`\n${errors.length} row(s) had problems and were skipped:`);
    for (const e of errors) {
      console.log(`  [${e.sheet} row ${e.row}] ${e.message}`);
    }
  }

  await prisma.$disconnect();
  if (errors.length) process.exitCode = 1;
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exitCode = 1;
});

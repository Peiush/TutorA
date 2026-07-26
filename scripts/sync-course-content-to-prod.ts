import fs from "fs";
import path from "path";
import { parse as parseEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

function loadEnvFile(filename: string): Record<string, string> {
  const filePath = path.join(process.cwd(), filename);
  return parseEnv(fs.readFileSync(filePath, "utf8"));
}

// Slugs are `${slugified-title-at-creation-time}-${8 hex chars}` (see lib/slug.ts).
// Local and prod were seeded independently, so ids/slugs never match — but the
// human-readable stem does, since both started from the same original title.
function slugStem(slug: string): string {
  return slug.replace(/-[0-9a-f]{8}$/i, "");
}

async function main() {
  const apply = process.argv.includes("--apply");

  const localEnv = loadEnvFile(".env");
  const prodEnv = loadEnvFile(".env.production.local");

  const localDb = new PrismaClient({ adapter: new PrismaPg({ connectionString: localEnv.DATABASE_URL }) });
  const prodDb = new PrismaClient({ adapter: new PrismaPg({ connectionString: prodEnv.DATABASE_URL }) });

  const fields = { title: true, subtitle: true, durationHours: true, whatYoullLearn: true, slug: true, id: true } as const;
  const [localCourses, prodCourses] = await Promise.all([
    localDb.course.findMany({ where: { published: true }, select: fields }),
    prodDb.course.findMany({ where: { published: true }, select: fields }),
  ]);

  const localByStem = new Map<string, (typeof localCourses)[number]>();
  for (const c of localCourses) {
    const stem = slugStem(c.slug);
    if (localByStem.has(stem)) {
      console.log(`⚠️  Duplicate local stem "${stem}" — "${c.title}" (${c.slug}) skipped as a probable accidental duplicate.`);
      continue;
    }
    localByStem.set(stem, c);
  }

  const matched: { prod: (typeof prodCourses)[number]; local: (typeof localCourses)[number] }[] = [];
  const unmatchedProd: (typeof prodCourses)[number][] = [];

  for (const prod of prodCourses) {
    const local = localByStem.get(slugStem(prod.slug));
    if (local) matched.push({ prod, local });
    else unmatchedProd.push(prod);
  }
  const matchedStems = new Set(matched.map((m) => slugStem(m.local.slug)));
  const unmatchedLocal = localCourses.filter((c) => !matchedStems.has(slugStem(c.slug)));

  console.log(`\nMatched ${matched.length} of ${prodCourses.length} production courses to a local edited counterpart.\n`);

  let changedCount = 0;
  for (const { prod, local } of matched) {
    const changed =
      prod.title !== local.title ||
      prod.subtitle !== local.subtitle ||
      prod.durationHours !== local.durationHours ||
      prod.whatYoullLearn !== local.whatYoullLearn;
    if (!changed) continue;
    changedCount++;

    console.log(`── ${prod.title} → ${local.title}`);
    if (prod.subtitle !== local.subtitle) console.log(`   subtitle:  "${prod.subtitle ?? ""}" → "${local.subtitle ?? ""}"`);
    if (prod.durationHours !== local.durationHours) console.log(`   duration:  ${prod.durationHours ?? "null"} → ${local.durationHours ?? "null"}`);
    if (prod.whatYoullLearn !== local.whatYoullLearn) {
      console.log(`   outcomes:  ${(prod.whatYoullLearn ?? "").split("\n").filter(Boolean).length} → ${(local.whatYoullLearn ?? "").split("\n").filter(Boolean).length} lines`);
    }

    if (apply) {
      await prodDb.course.update({
        where: { id: prod.id },
        data: {
          title: local.title,
          subtitle: local.subtitle,
          durationHours: local.durationHours,
          whatYoullLearn: local.whatYoullLearn,
        },
      });
    }
  }

  console.log(`\n${changedCount} course(s) ${apply ? "updated" : "would be updated"}.`);

  if (unmatchedProd.length > 0) {
    console.log(`\nProduction courses with no local match (left untouched):`);
    unmatchedProd.forEach((c) => console.log(`  - ${c.title} (${c.slug})`));
  }
  if (unmatchedLocal.length > 0) {
    console.log(`\nLocal courses with no production match (not synced — review these, likely the duplicate):`);
    unmatchedLocal.forEach((c) => console.log(`  - ${c.title} (${c.slug})`));
  }

  if (!apply && changedCount > 0) {
    console.log(`\nThis was a DRY RUN — nothing was written. Re-run with --apply to actually update production.`);
  }

  await localDb.$disconnect();
  await prodDb.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

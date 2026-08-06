import { prisma } from "@/lib/prisma";

/**
 * The client's per-grade subject list (Math/Science/English/CS/Social Studies/
 * Languages for Grades 6-8, 9-10, 11-12) never mentions exam-board-branded
 * subjects like GCSE, IGCSE, 11+, PSLE, A-Level Chemistry/Physics, AP Biology/
 * Chemistry/Physics, IB Chemistry/Physics, or the curriculum umbrellas — those
 * belong to the separate "Test Preparation" course category (already covered by
 * dedicated Course rows). Only a few exam-branded names ARE explicitly named in
 * the client's list (AP Calculus, IB Mathematics, A-Level Mathematics, SAT
 * English Preparation) and are left untouched.
 *
 * This clears `gradeLevel` on the rest so matchesGradeBand() (lib/grade-bands.ts)
 * stops surfacing them under the Grade 6-8 / 9-10 / 11-12 tiles. Nothing is
 * deleted — title/subtitle/rate/content stay intact and the rows remain fully
 * searchable and requestable, just not tile-browsable by grade.
 */
const NAMES_TO_UNTAG = [
  "11+ English",
  "11+ Maths",
  "A-Level Chemistry",
  "A-Level Further Maths",
  "A-Level Physics",
  "ACT Math",
  "AP Biology",
  "AP Chemistry",
  "AP Physics 1",
  "AP Physics C",
  "American Curriculum",
  "British Curriculum",
  "Cambridge English",
  "GCSE Biology",
  "GCSE Chemistry",
  "GCSE English",
  "GCSE Maths",
  "GCSE Physics",
  "GCSE Science",
  "IB Chemistry",
  "IB Physics",
  "IGCSE Chemistry",
  "IGCSE Maths",
  "IGCSE Physics",
  "International Baccalaureate (IB)",
  "Middle School Math",
  "PSLE Maths",
  "PSLE Science",
  "SAT Math",
];

async function main() {
  const result = await prisma.subject.updateMany({
    where: { name: { in: NAMES_TO_UNTAG } },
    data: { gradeLevel: null },
  });
  console.log(`Untagged ${result.count} of ${NAMES_TO_UNTAG.length} subjects.`);
  if (result.count !== NAMES_TO_UNTAG.length) {
    const found = await prisma.subject.findMany({
      where: { name: { in: NAMES_TO_UNTAG } },
      select: { name: true },
    });
    const foundNames = new Set(found.map((f) => f.name));
    for (const name of NAMES_TO_UNTAG) {
      if (!foundNames.has(name)) console.warn(`No subject row found for "${name}"`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

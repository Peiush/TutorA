import { PrismaClient } from "./lib/generated/prisma/client";
const prisma = new PrismaClient();
try {
  const courses = await prisma.course.findMany({
    where: { slug: { in: ["italian-0bce3f0c", "ielts-8d4686db"] } },
    include: { instructor: true },
  });
  console.log("COURSES:", JSON.stringify(courses, null, 2));

  const subjects = await prisma.subject.findMany({
    where: { slug: { in: ["spanish", "gcse-maths", "python", "ai-basics"] } },
  });
  console.log("SUBJECTS:", JSON.stringify(subjects, null, 2));
} catch (e: any) {
  console.error("ERR", e.message);
} finally {
  await prisma.$disconnect();
}

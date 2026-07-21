import "server-only";
import { prisma } from "@/lib/prisma";
import { CATEGORY_DB_TO_LABEL, LEVEL_DB_TO_LABEL, type CourseRaw } from "@/lib/mock-courses";

export async function getPublishedCourses(): Promise<CourseRaw[]> {
  const courses = await prisma.course.findMany({
    where: { published: true },
    include: { instructor: { include: { user: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return courses.map((c): CourseRaw => ({
    id: c.id,
    title: c.title,
    instructor: c.instructor.user.name ?? "TutorA instructor",
    instructorId: c.instructorId,
    category: CATEGORY_DB_TO_LABEL[c.category] ?? "Mathematics",
    level: LEVEL_DB_TO_LABEL[c.level] ?? "All Levels",
    rating: c.rating,
    reviews: c.reviewCount,
    priceCents: c.priceCents,
    originalPriceCents: c.originalPriceCents,
    durationHours: c.durationHours,
    lectureCount: c.lectureCount,
    bestseller: c.bestseller,
    premium: c.premium,
    isNew: c.isNew,
    subtitle: c.subtitle ?? "",
    whatYoullLearn: c.whatYoullLearn.split("\n").filter(Boolean),
  }));
}

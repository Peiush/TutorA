import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
import {
  CATEGORY_DB_TO_LABEL,
  CATEGORY_LABEL_TO_DB,
  LEVEL_DB_TO_LABEL,
  type CourseRaw,
  type CourseCategory,
} from "@/lib/mock-courses";

const courseWithInstructor = {
  include: { instructor: { include: { user: { select: { name: true } } } } },
} as const;

type CourseWithInstructor = Prisma.CourseGetPayload<typeof courseWithInstructor>;

function toCourseRaw(c: CourseWithInstructor): CourseRaw {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    instructor: c.instructor?.user.name ?? null,
    instructorId: c.instructorId,
    category: CATEGORY_DB_TO_LABEL[c.category] ?? "Programming & Technology",
    level: LEVEL_DB_TO_LABEL[c.level] ?? "All Levels",
    rating: c.rating,
    reviews: c.reviewCount,
    priceCents: c.priceCents,
    originalPriceCents: c.originalPriceCents,
    durationHours: c.durationHours,
    lectureCount: c.lectureCount,
    lectureCountLabel: c.lectureCountLabel,
    bestseller: c.bestseller,
    premium: c.premium,
    isNew: c.isNew,
    subtitle: c.subtitle ?? "",
    whatYoullLearn: (c.whatYoullLearn ?? "").split("\n").filter(Boolean),
  };
}

async function fetchPublishedCourses(): Promise<CourseRaw[]> {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    ...courseWithInstructor,
  });

  return courses.map(toCourseRaw);
}

/**
 * Published courses are read on "/", "/courses", and the category showcase; cache
 * the result and invalidate via the "published-courses" tag from course admin actions.
 */
export const getPublishedCourses = unstable_cache(fetchPublishedCourses, ["published-courses"], {
  tags: ["published-courses"],
  revalidate: 60,
});

export async function getCourseBySlug(slug: string): Promise<CourseRaw | null> {
  const course = await prisma.course.findUnique({
    where: { slug, published: true },
    ...courseWithInstructor,
  });

  return course ? toCourseRaw(course) : null;
}

export async function getRelatedCourses(
  excludeId: string,
  category: CourseCategory,
  limit = 3
): Promise<CourseRaw[]> {
  const courses = await prisma.course.findMany({
    where: {
      published: true,
      id: { not: excludeId },
      category: CATEGORY_LABEL_TO_DB[category] as never,
    },
    orderBy: { rating: "desc" },
    take: limit,
    ...courseWithInstructor,
  });

  return courses.map(toCourseRaw);
}

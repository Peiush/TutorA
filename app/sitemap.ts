import type { MetadataRoute } from "next";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";

const BASE_URL = "https://www.tutora.it.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, tutors] = await Promise.all([getPublishedCourses(), getApprovedTutorListings()]);
  const tutorSlugs = new Set(tutors.map((t) => t.slug).filter((s): s is string => Boolean(s)));

  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/courses`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/find-a-tutor`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/request-a-tutor`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    ...courses.map((c) => ({
      url: `${BASE_URL}/courses/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...Array.from(tutorSlugs).map((slug) => ({
      url: `${BASE_URL}/find-a-tutor/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

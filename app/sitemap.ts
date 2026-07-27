import type { MetadataRoute } from "next";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";

const BASE_URL = "https://www.tutora.it.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, tutors] = await Promise.all([getPublishedCourses(), getApprovedTutorListings()]);

  // A tutor can appear as multiple listing cards (one per subject); keep the most recent
  // updatedAt per slug so the sitemap emits one entry per tutor profile, not per listing.
  const tutorLastModified = new Map<string, Date>();
  for (const t of tutors) {
    if (!t.slug) continue;
    const existing = tutorLastModified.get(t.slug);
    if (!existing || (t.updatedAt && t.updatedAt > existing)) {
      tutorLastModified.set(t.slug, t.updatedAt ?? existing ?? new Date(0));
    }
  }

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
      lastModified: c.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...Array.from(tutorLastModified.entries()).map(([slug, lastModified]) => ({
      url: `${BASE_URL}/find-a-tutor/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

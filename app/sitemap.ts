import type { MetadataRoute } from "next";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { HOMEPAGE_LAST_UPDATED } from "@/app/page";
import { ABOUT_LAST_UPDATED } from "@/app/about/page";
import { REQUEST_A_TUTOR_LAST_UPDATED } from "@/app/request-a-tutor/page";
import { TERMS_LAST_UPDATED } from "@/app/terms/page";
import { PRIVACY_LAST_UPDATED } from "@/app/privacy/page";
import { TEACH_LAST_UPDATED } from "@/app/teach/page";

const BASE_URL = "https://www.tutora.it.com";

// Latest of a set of dates, falling back to a static date when the collection is empty
// (e.g. no courses/tutors yet) rather than defaulting to "now", which would be a fake signal.
// Accepts strings too: getPublishedCourses/getApprovedTutorListings are wrapped in
// unstable_cache, which JSON-serializes its return value — Date fields come back as ISO
// strings at runtime on the cached path even though the type still says Date.
function latestOrFallback(dates: (Date | string | null | undefined)[], fallback: string): Date {
  const valid = dates.filter((d): d is Date | string => Boolean(d)).map((d) => new Date(d));
  if (valid.length === 0) return new Date(fallback);
  return new Date(Math.max(...valid.map((d) => d.getTime())));
}

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

  // The two hub pages' real content (which courses/tutors show up) changes whenever the
  // underlying collection does, so their genuine freshness signal is the most recent
  // update among the rows they list — not a static guess or "now".
  const coursesHubLastModified = latestOrFallback(
    courses.map((c) => c.updatedAt),
    HOMEPAGE_LAST_UPDATED
  );
  const findATutorHubLastModified = latestOrFallback(
    Array.from(tutorLastModified.values()),
    HOMEPAGE_LAST_UPDATED
  );

  return [
    { url: BASE_URL, lastModified: new Date(HOMEPAGE_LAST_UPDATED), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(ABOUT_LAST_UPDATED), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/courses`, lastModified: coursesHubLastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/find-a-tutor`, lastModified: findATutorHubLastModified, changeFrequency: "daily", priority: 0.9 },
    {
      url: `${BASE_URL}/request-a-tutor`,
      lastModified: new Date(REQUEST_A_TUTOR_LAST_UPDATED),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${BASE_URL}/teach`, lastModified: new Date(TEACH_LAST_UPDATED), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(TERMS_LAST_UPDATED), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(PRIVACY_LAST_UPDATED), changeFrequency: "yearly", priority: 0.2 },
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

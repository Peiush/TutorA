import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { TutorRaw } from "@/lib/mock-data";

async function fetchApprovedTutorListings(): Promise<TutorRaw[]> {
  const [profiles, allSubjects] = await Promise.all([
    prisma.tutorProfile.findMany({
      where: { status: "APPROVED" },
      include: { user: { select: { name: true } }, subjectListings: { include: { subject: true } } },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.subject.findMany({ orderBy: { name: "asc" } }),
  ]);

  const cards: TutorRaw[] = [];
  const coveredSubjectIds = new Set<string>();

  for (const p of profiles) {
    const name = p.user.name ?? "Verified tutor";
    const meta = `${p.country} · ${p.yearsExperience ?? 0} yrs experience`;

    if (p.subjectListings.length === 0) {
      // Self-registered tutor with no per-subject catalog listings yet — one card, legacy shape.
      const subjects = p.subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      cards.push({
        id: p.id,
        listingId: p.id,
        slug: p.slug,
        name,
        headline: p.bio ? p.bio.slice(0, 64) : subjects.join(" & "),
        subjects,
        price: p.hourlyRateCents ? `$${Math.round(p.hourlyRateCents / 100)}/hr` : "Rate on request",
        rating: 0,
        reviews: 0,
        meta,
        city: p.country,
        mode: "Both",
        region: p.country,
        isNew: true,
        bio: p.bio ?? undefined,
        updatedAt: p.updatedAt,
      });
      continue;
    }

    for (const listing of p.subjectListings) {
      coveredSubjectIds.add(listing.subjectId);
      cards.push({
        id: p.id,
        listingId: listing.id,
        slug: p.slug,
        name,
        headline: listing.subject.name,
        subjects: [listing.subject.name],
        curriculum: listing.subject.curriculum ?? undefined,
        price: listing.hourlyRateCents != null ? `$${Math.round(listing.hourlyRateCents / 100)}/hr` : "Rate on request",
        rating: 0,
        reviews: 0,
        meta,
        city: p.country,
        mode: "Both",
        region: p.country,
        isNew: true,
        bio: p.bio ?? undefined,
        updatedAt: p.updatedAt,
      });
    }
  }

  // Subjects we offer but have no approved tutor teaching yet — still list them so students
  // can see what's available and request a match; we appoint a tutor once demand comes in.
  for (const subject of allSubjects) {
    if (coveredSubjectIds.has(subject.id)) continue;

    cards.push({
      listingId: `demand-${subject.id}`,
      name: "Teacher comes on demand",
      headline: subject.name,
      subjects: [subject.name],
      curriculum: subject.curriculum ?? undefined,
      price: subject.hourlyRateCents != null ? `$${Math.round(subject.hourlyRateCents / 100)}/hr` : "Rate on request",
      rating: 0,
      reviews: 0,
      meta: [subject.curriculum, subject.gradeLevel].filter(Boolean).join(" · "),
      city: "Worldwide",
      mode: "Both",
      region: "Worldwide",
      isNew: false,
      onDemand: true,
      bio: "We don't have a tutor actively teaching this yet — send a request and we'll match one for you within 24–48 hours.",
    });
  }

  return cards;
}

/**
 * Approved listings are shown on both "/" and "/find-a-tutor" and rebuilt from a
 * full-table scan + joins each time; cache the result and invalidate via the
 * "tutor-listings" tag whenever an admin action changes tutor profile status/data.
 */
export const getApprovedTutorListings = unstable_cache(fetchApprovedTutorListings, ["approved-tutor-listings"], {
  tags: ["tutor-listings"],
  revalidate: 60,
});

export interface TutorSubjectOffering {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectSlug: string | null;
  curriculum: string | null;
  gradeLevel: string | null;
  priceLabel: string;
}

export interface TutorProfileDetail {
  id: string;
  slug: string;
  name: string;
  country: string;
  yearsExperience: number | null;
  bio: string | null;
  subjects: TutorSubjectOffering[];
}

export async function getTutorProfileBySlug(slug: string): Promise<TutorProfileDetail | null> {
  const p = await prisma.tutorProfile.findUnique({
    where: { slug, status: "APPROVED" },
    include: { user: { select: { name: true } }, subjectListings: { include: { subject: true } } },
  });

  if (!p) return null;

  const subjects: TutorSubjectOffering[] =
    p.subjectListings.length > 0
      ? p.subjectListings.map((listing) => ({
          id: listing.id,
          subjectId: listing.subjectId,
          subjectName: listing.subject.name,
          subjectSlug: listing.subject.slug,
          curriculum: listing.subject.curriculum,
          gradeLevel: listing.subject.gradeLevel,
          priceLabel:
            listing.hourlyRateCents != null ? `$${Math.round(listing.hourlyRateCents / 100)}/hr` : "Rate on request",
        }))
      : p.subjects
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((subjectName) => ({
            id: subjectName,
            subjectId: subjectName,
            subjectName,
            subjectSlug: null,
            curriculum: null,
            gradeLevel: null,
            priceLabel: p.hourlyRateCents != null ? `$${Math.round(p.hourlyRateCents / 100)}/hr` : "Rate on request",
          }));

  return {
    id: p.id,
    slug: p.slug,
    name: p.user.name ?? "Verified tutor",
    country: p.country,
    yearsExperience: p.yearsExperience,
    bio: p.bio,
    subjects,
  };
}

export interface TestPrepTutor {
  name: string;
  slug: string;
  country: string;
  yearsExperience: number | null;
  bio: string | null;
  matchedSubjects: string[];
}

async function fetchTutorsMatchingPrefixes(
  includePrefixes: string[],
  excludePrefixes: string[] = []
): Promise<TestPrepTutor[]> {
  const profiles = await prisma.tutorProfile.findMany({
    where: { status: "APPROVED" },
    include: { user: { select: { name: true } }, subjectListings: { include: { subject: true } } },
  });

  const includeUpper = includePrefixes.map((p) => p.toUpperCase());
  const excludeUpper = excludePrefixes.map((p) => p.toUpperCase());

  const matchesPrefix = (subjectName: string) => {
    const upper = subjectName.toUpperCase();
    if (excludeUpper.some((p) => upper.startsWith(p))) return false;
    return includeUpper.some((p) => upper.startsWith(p));
  };

  const results: TestPrepTutor[] = [];

  for (const p of profiles) {
    const listingSubjects = p.subjectListings.map((l) => l.subject.name);
    const legacySubjects = p.subjects.split(",").map((s) => s.trim()).filter(Boolean);
    const allSubjects = listingSubjects.length > 0 ? listingSubjects : legacySubjects;

    const matchedSubjects = allSubjects.filter(matchesPrefix);
    if (matchedSubjects.length === 0) continue;

    results.push({
      name: p.user.name ?? "Verified tutor",
      slug: p.slug,
      country: p.country,
      yearsExperience: p.yearsExperience,
      bio: p.bio,
      matchedSubjects,
    });
  }

  return results;
}

/**
 * Real, live-queried tutors for a test-prep subject's course page — deliberately not a
 * static/hardcoded list, so a page never shows a tutor who's since been unapproved, and
 * automatically picks up newly approved tutors without a code change. Cached like the
 * other tutor-listing queries and invalidated by the same "tutor-listings" tag.
 */
export const getTutorsMatchingPrefixes = unstable_cache(
  fetchTutorsMatchingPrefixes,
  ["test-prep-tutors-by-prefix"],
  { tags: ["tutor-listings"], revalidate: 60 }
);

async function fetchTutorsForLinkedSubjects(
  subjects: { id: string; name: string }[]
): Promise<TestPrepTutor[]> {
  if (subjects.length === 0) return [];

  const listings = await prisma.tutorSubject.findMany({
    where: { subjectId: { in: subjects.map((s) => s.id) }, tutorProfile: { status: "APPROVED" } },
    include: { tutorProfile: { include: { user: { select: { name: true } } } }, subject: { select: { id: true } } },
  });

  const nameById = new Map(subjects.map((s) => [s.id, s.name]));
  const bySlug = new Map<string, TestPrepTutor>();
  for (const l of listings) {
    const subjectName = nameById.get(l.subject.id);
    if (!subjectName) continue;
    const slug = l.tutorProfile.slug;
    const existing = bySlug.get(slug);
    if (existing) {
      if (!existing.matchedSubjects.includes(subjectName)) existing.matchedSubjects.push(subjectName);
      continue;
    }
    bySlug.set(slug, {
      name: l.tutorProfile.user.name ?? "Verified tutor",
      slug,
      country: l.tutorProfile.country,
      yearsExperience: l.tutorProfile.yearsExperience,
      bio: l.tutorProfile.bio,
      matchedSubjects: [subjectName],
    });
  }
  return Array.from(bySlug.values());
}

/**
 * Real, live-queried tutors for a course page whose slug has one or more linked
 * `/subjects/[slug]` pages (see `COURSE_TO_SUBJECT_SLUGS`), for courses outside the
 * hand-curated test-prep prefix table above — e.g. Python, where the subject page already
 * shows live tutor cards via a direct Subject<->TutorSubject relation but the course page
 * previously showed none, a real page-type-mismatch gap (RE-AUDIT-REPORT.md, 2026-08-10).
 * Uses the exact relation, not prefix matching, since we already have real subject IDs.
 */
export const getTutorsForLinkedSubjects = unstable_cache(
  fetchTutorsForLinkedSubjects,
  ["tutors-for-linked-subjects"],
  { tags: ["tutor-listings", "subject-listings"], revalidate: 60 }
);

export interface RelatedTutor {
  slug: string;
  name: string;
  country: string;
  subjectNames: string[];
}

export async function getRelatedTutors(
  excludeId: string,
  subjectNames: string[],
  limit = 3
): Promise<RelatedTutor[]> {
  if (subjectNames.length === 0) return [];

  const profiles = await prisma.tutorProfile.findMany({
    where: {
      status: "APPROVED",
      id: { not: excludeId },
      subjectListings: { some: { subject: { name: { in: subjectNames } } } },
    },
    include: { user: { select: { name: true } }, subjectListings: { include: { subject: true } } },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });

  return profiles.map((p) => ({
    slug: p.slug,
    name: p.user.name ?? "Verified tutor",
    country: p.country,
    subjectNames: p.subjectListings.map((l) => l.subject.name),
  }));
}

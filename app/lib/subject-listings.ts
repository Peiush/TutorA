import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface SubjectListing {
  id: string;
  slug: string;
  name: string;
  gradeLevel: string | null;
  curriculum: string | null;
  hourlyRateCents: number | null;
  title: string | null;
  subtitle: string | null;
  durationLabel: string | null;
  whatYoullLearn: string[];
  updatedAt: Date;
}

const subjectSelect = {
  id: true,
  slug: true,
  name: true,
  gradeLevel: true,
  curriculum: true,
  hourlyRateCents: true,
  title: true,
  subtitle: true,
  durationLabel: true,
  whatYoullLearn: true,
  updatedAt: true,
} as const;

async function fetchSubjects(): Promise<SubjectListing[]> {
  const subjects = await prisma.subject.findMany({
    orderBy: { name: "asc" },
    select: subjectSelect,
  });

  return subjects.map((s) => ({
    ...s,
    whatYoullLearn: (s.whatYoullLearn ?? "").split("\n").filter(Boolean),
  }));
}

/**
 * Backs the grade-band filter on "/courses"; cache and revalidate on the same
 * cadence as the published-courses listing since both drive that one page.
 */
export const getSubjects = unstable_cache(fetchSubjects, ["subject-listings"], {
  tags: ["subject-listings"],
  revalidate: 60,
});

async function fetchSubjectBySlug(slug: string): Promise<SubjectListing | null> {
  const subject = await prisma.subject.findUnique({ where: { slug }, select: subjectSelect });
  if (!subject) return null;
  return { ...subject, whatYoullLearn: (subject.whatYoullLearn ?? "").split("\n").filter(Boolean) };
}

/** Backs "/subjects/[slug]"; same cache cadence as the rest of the subject data. */
export const getSubjectBySlug = unstable_cache(fetchSubjectBySlug, ["subject-by-slug"], {
  tags: ["subject-listings"],
  revalidate: 60,
});

async function fetchRelatedSubjects(excludeId: string, curriculum: string | null): Promise<SubjectListing[]> {
  if (!curriculum) return [];
  const subjects = await prisma.subject.findMany({
    where: { curriculum, id: { not: excludeId } },
    select: subjectSelect,
    orderBy: { name: "asc" },
    take: 4,
  });
  return subjects.map((s) => ({ ...s, whatYoullLearn: (s.whatYoullLearn ?? "").split("\n").filter(Boolean) }));
}

/** Related subjects sharing the same curriculum (e.g. other "AP" or "GCSE" subjects). */
export const getRelatedSubjects = unstable_cache(fetchRelatedSubjects, ["related-subjects"], {
  tags: ["subject-listings"],
  revalidate: 60,
});

export interface SubjectTutor {
  name: string;
  slug: string;
  country: string;
  yearsExperience: number | null;
  bio: string | null;
}

async function fetchTutorsForSubject(subjectId: string): Promise<SubjectTutor[]> {
  const listings = await prisma.tutorSubject.findMany({
    where: { subjectId, tutorProfile: { status: "APPROVED" } },
    include: { tutorProfile: { include: { user: { select: { name: true } } } } },
  });

  return listings.map((l) => ({
    name: l.tutorProfile.user.name ?? "Verified tutor",
    slug: l.tutorProfile.slug,
    country: l.tutorProfile.country,
    yearsExperience: l.tutorProfile.yearsExperience,
    bio: l.tutorProfile.bio,
  }));
}

/**
 * Real, live-queried tutors for a subject page — a direct Subject<->TutorSubject relation,
 * so (unlike the Course pages' prefix-matching heuristic) this never shows a tutor who
 * isn't actually linked to this exact subject. Cached like the other tutor-listing queries.
 */
export const getTutorsForSubject = unstable_cache(fetchTutorsForSubject, ["tutors-for-subject"], {
  tags: ["tutor-listings", "subject-listings"],
  revalidate: 60,
});

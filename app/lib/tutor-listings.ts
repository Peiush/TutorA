import "server-only";
import { prisma } from "@/lib/prisma";
import type { TutorRaw } from "@/lib/mock-data";

export async function getApprovedTutorListings(): Promise<TutorRaw[]> {
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

export interface TutorSubjectOffering {
  id: string;
  subjectId: string;
  subjectName: string;
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

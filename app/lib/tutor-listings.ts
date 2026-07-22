import "server-only";
import { prisma } from "@/lib/prisma";
import type { TutorRaw } from "@/lib/mock-data";

export async function getApprovedTutorListings(): Promise<TutorRaw[]> {
  const profiles = await prisma.tutorProfile.findMany({
    where: { status: "APPROVED" },
    include: { user: { select: { name: true } }, subjectListings: { include: { subject: true } } },
    orderBy: { updatedAt: "desc" },
  });

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
  const allSubjects = await prisma.subject.findMany({ orderBy: { name: "asc" } });
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

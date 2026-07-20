import "server-only";
import { prisma } from "@/lib/prisma";
import type { TutorRaw } from "@/lib/mock-data";

export async function getApprovedTutorListings(): Promise<TutorRaw[]> {
  const profiles = await prisma.tutorProfile.findMany({
    where: { status: "APPROVED" },
    include: { user: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return profiles.map((p): TutorRaw => {
    const subjects = p.subjects
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return {
      id: p.id,
      name: p.user.name ?? "Verified tutor",
      headline: p.bio ? p.bio.slice(0, 64) : subjects.join(" & "),
      subjects,
      price: p.hourlyRateCents ? `$${Math.round(p.hourlyRateCents / 100)}/hr` : "Rate on request",
      rating: 0,
      reviews: 0,
      meta: `${p.country} · ${p.yearsExperience ?? 0} yrs experience`,
      city: p.country,
      mode: "Both",
      region: p.country,
      isNew: true,
      bio: p.bio ?? undefined,
    };
  });
}

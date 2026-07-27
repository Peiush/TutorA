import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface SubjectListing {
  id: string;
  name: string;
  gradeLevel: string | null;
  curriculum: string | null;
  hourlyRateCents: number | null;
  title: string | null;
  subtitle: string | null;
  durationLabel: string | null;
  whatYoullLearn: string[];
}

async function fetchSubjects(): Promise<SubjectListing[]> {
  const subjects = await prisma.subject.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      gradeLevel: true,
      curriculum: true,
      hourlyRateCents: true,
      title: true,
      subtitle: true,
      durationLabel: true,
      whatYoullLearn: true,
    },
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

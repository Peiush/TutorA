import { FindHero } from "@/components/find/find-hero";
import { TutorBrowser } from "@/components/find/tutor-browser";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Find a Tutor",
  description:
    "Browse personally verified tutors across subjects and languages. Every listing is reviewed by our team before it's matched with a student.",
  alternates: { canonical: "/find-a-tutor" },
};

export default async function FindATutorPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const [{ subject }, tutors, session] = await Promise.all([
    searchParams,
    getApprovedTutorListings(),
    auth(),
  ]);
  const isAdmin = session?.user?.role === "ADMIN";

  const [savedTutors, requestedTutors] = session?.user?.id
    ? await Promise.all([
        prisma.savedTutor.findMany({
          where: { userId: session.user.id },
          select: { tutorProfileId: true },
        }),
        prisma.tutorRequest.findMany({
          where: {
            userId: session.user.id,
            status: { in: ["OPEN", "MATCHED"] },
            requestedTutorProfileId: { not: null },
          },
          select: { requestedTutorProfileId: true },
        }),
      ])
    : [[], []];
  const savedTutorIds = savedTutors.map((s) => s.tutorProfileId);

  const requestedTutorProfileIds = requestedTutors
    .map((r) => r.requestedTutorProfileId)
    .filter((id): id is string => Boolean(id));

  const subjectCount = new Set(tutors.flatMap((t) => t.subjects)).size;
  const tutorCount = new Set(tutors.filter((t) => !t.onDemand).map((t) => t.id)).size;

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <FindHero tutorCount={tutorCount} subjectCount={subjectCount} />
      <TutorBrowser
        tutors={tutors}
        isAdmin={isAdmin}
        savedTutorIds={savedTutorIds}
        requestedTutorProfileIds={requestedTutorProfileIds}
        initialSubject={subject}
      />
    </div>
  );
}

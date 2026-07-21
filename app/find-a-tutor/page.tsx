import { FindHero } from "@/components/find/find-hero";
import { TutorBrowser } from "@/components/find/tutor-browser";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Find a Tutor — TutorA",
};

export default async function FindATutorPage() {
  const [tutors, session] = await Promise.all([getApprovedTutorListings(), auth()]);
  const isAdmin = session?.user?.role === "ADMIN";

  const savedTutors = session?.user?.id
    ? await prisma.savedTutor.findMany({
        where: { userId: session.user.id },
        select: { tutorProfileId: true },
      })
    : [];
  const savedTutorIds = savedTutors.map((s) => s.tutorProfileId);

  const requestedTutors = session?.user?.id
    ? await prisma.tutorRequest.findMany({
        where: {
          userId: session.user.id,
          status: { in: ["OPEN", "MATCHED"] },
          requestedTutorProfileId: { not: null },
        },
        select: { requestedTutorProfileId: true },
      })
    : [];
  const requestedTutorProfileIds = requestedTutors
    .map((r) => r.requestedTutorProfileId)
    .filter((id): id is string => Boolean(id));

  const subjectCount = new Set(tutors.flatMap((t) => t.subjects)).size;

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <FindHero tutorCount={tutors.length} subjectCount={subjectCount} />
      <TutorBrowser
        tutors={tutors}
        isAdmin={isAdmin}
        savedTutorIds={savedTutorIds}
        requestedTutorProfileIds={requestedTutorProfileIds}
      />
    </div>
  );
}

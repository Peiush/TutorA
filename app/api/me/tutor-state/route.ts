import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Backs the client-side fetch in FeaturedTutors (homepage) and TutorBrowser
// (/find-a-tutor): neither page calls auth() itself anymore, so both can be
// served as a static/cached shell instead of re-rendering on every request.
// This route is the only place left that runs per-request, for the one
// signed-in user making the request.
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json({
      isAdmin: false,
      savedTutorIds: [],
      requestedTutorProfileIds: [],
      requestedTutorSubjectKeys: [],
    });
  }

  const [savedTutors, requestedTutors] = await Promise.all([
    prisma.savedTutor.findMany({ where: { userId }, select: { tutorProfileId: true } }),
    prisma.tutorRequest.findMany({
      where: {
        userId,
        status: { in: ["OPEN", "MATCHED"] },
        requestedTutorProfileId: { not: null },
      },
      select: { requestedTutorProfileId: true, subject: true },
    }),
  ]);

  return Response.json({
    isAdmin: session.user.role === "ADMIN",
    savedTutorIds: savedTutors.map((s) => s.tutorProfileId),
    requestedTutorProfileIds: requestedTutors
      .map((r) => r.requestedTutorProfileId)
      .filter((id): id is string => Boolean(id)),
    // "<tutorProfileId>::<subject>" keys — lets the homepage's per-subject request
    // modal (which merges a tutor's several subject listings into one card) know
    // exactly which subjects were already requested for that tutor, not just whether
    // any request exists at all.
    requestedTutorSubjectKeys: requestedTutors
      .filter((r) => r.requestedTutorProfileId)
      .map((r) => `${r.requestedTutorProfileId}::${r.subject}`),
  });
}

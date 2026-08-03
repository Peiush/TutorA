import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Backs the client-side fetch in CourseBrowser: /courses itself no longer calls
// auth(), so it can be served as a static/cached shell instead of re-rendering
// (and re-querying these four tables) on every single request. This route is the
// only remaining place that needs to run per-request, for the one signed-in user
// making the request.
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json({
      savedCourseIds: [],
      requestedCourseIds: [],
      savedSubjectIds: [],
      requestedSubjectIds: [],
    });
  }

  const [savedCourses, openRequests, savedSubjects, openSubjectRequests] = await Promise.all([
    prisma.savedCourse.findMany({ where: { userId }, select: { courseId: true } }),
    prisma.courseRequest.findMany({ where: { userId, status: "OPEN" }, select: { courseId: true } }),
    prisma.savedSubject.findMany({ where: { userId }, select: { subjectId: true } }),
    prisma.subjectRequest.findMany({ where: { userId, status: "OPEN" }, select: { subjectId: true } }),
  ]);

  return Response.json({
    savedCourseIds: savedCourses.map((s) => s.courseId),
    requestedCourseIds: openRequests.map((r) => r.courseId),
    savedSubjectIds: savedSubjects.map((s) => s.subjectId),
    requestedSubjectIds: openSubjectRequests.map((r) => r.subjectId),
  });
}

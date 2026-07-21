import { CoursesHero } from "@/components/courses/courses-hero";
import { CourseBrowser } from "@/components/courses/course-browser";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Courses — TutorA",
};

export default async function CoursesPage() {
  const [courses, session] = await Promise.all([getPublishedCourses(), auth()]);

  const userId = session?.user?.id;
  const [savedCourses, openRequests] = userId
    ? await Promise.all([
        prisma.savedCourse.findMany({ where: { userId }, select: { courseId: true } }),
        prisma.courseRequest.findMany({ where: { userId, status: "OPEN" }, select: { courseId: true } }),
      ])
    : [[], []];

  const savedCourseIds = savedCourses.map((s) => s.courseId);
  const requestedCourseIds = openRequests.map((r) => r.courseId);

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <CoursesHero />
      <CourseBrowser courses={courses} savedCourseIds={savedCourseIds} requestedCourseIds={requestedCourseIds} />
    </div>
  );
}

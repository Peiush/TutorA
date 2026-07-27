import { CoursesHero } from "@/components/courses/courses-hero";
import { CourseBrowser } from "@/components/courses/course-browser";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { getSubjects } from "@/app/lib/subject-listings";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Courses",
  description:
    "Browse verified courses in programming, test prep, languages, music, and creative skills — every course is reviewed by our team before it goes live.",
  alternates: { canonical: "/courses" },
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, courses, subjects, session] = await Promise.all([
    searchParams,
    getPublishedCourses(),
    getSubjects(),
    auth(),
  ]);

  const userId = session?.user?.id;
  const [savedCourses, openRequests, savedSubjects, openSubjectRequests] = userId
    ? await Promise.all([
        prisma.savedCourse.findMany({ where: { userId }, select: { courseId: true } }),
        prisma.courseRequest.findMany({ where: { userId, status: "OPEN" }, select: { courseId: true } }),
        prisma.savedSubject.findMany({ where: { userId }, select: { subjectId: true } }),
        prisma.subjectRequest.findMany({ where: { userId, status: "OPEN" }, select: { subjectId: true } }),
      ])
    : [[], [], [], []];

  const savedCourseIds = savedCourses.map((s) => s.courseId);
  const requestedCourseIds = openRequests.map((r) => r.courseId);
  const savedSubjectIds = savedSubjects.map((s) => s.subjectId);
  const requestedSubjectIds = openSubjectRequests.map((r) => r.subjectId);

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <CoursesHero />
      <CourseBrowser
        courses={courses}
        subjects={subjects}
        savedCourseIds={savedCourseIds}
        requestedCourseIds={requestedCourseIds}
        savedSubjectIds={savedSubjectIds}
        requestedSubjectIds={requestedSubjectIds}
        initialCategory={category}
      />
    </div>
  );
}

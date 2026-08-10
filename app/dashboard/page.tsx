import { getUser, requireFreshRole } from "@/app/lib/dal";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PendingEmailChangeBanner } from "@/components/profile/pending-email-change-banner";
import { StatsStrip } from "@/components/dashboard/stats-strip";
import { ActivityTabs } from "@/components/dashboard/activity-tabs";
import { RequestsPanel } from "@/components/dashboard/requests-panel";
import { SavedTutorsPanel } from "@/components/dashboard/saved-tutors-panel";
import { CourseRequestsPanel } from "@/components/dashboard/course-requests-panel";
import { SavedCoursesPanel } from "@/components/dashboard/saved-courses-panel";
import { SavedSubjectsPanel } from "@/components/dashboard/saved-subjects-panel";
import { SubjectRequestsPanel } from "@/components/dashboard/subject-requests-panel";
import { SidePanel } from "@/components/dashboard/side-panel";
import { Reveal } from "@/components/ui/reveal";
import { TargetIcon, BookOpenIcon, SparkleIcon, BookmarkIcon } from "@/components/dashboard/dashboard-icons";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  await requireFreshRole(["STUDENT"]);
  const user = await getUser();

  const requests = await prisma.tutorRequest.findMany({
    where: { userId: user?.id },
    include: {
      matchedTutor: {
        select: { name: true, email: true, tutorProfile: { select: { hourlyRateCents: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const openCount = requests.filter((r) => r.status === "OPEN").length;
  const matchedCount = requests.filter((r) => r.status === "MATCHED").length;
  const requestedTutorProfileIds = new Set(
    requests
      .filter((r) => r.status === "OPEN" || r.status === "MATCHED")
      .map((r) => r.requestedTutorProfileId)
      .filter((id): id is string => Boolean(id))
  );

  const savedTutors = user?.id
    ? await prisma.savedTutor.findMany({
        where: { userId: user.id },
        include: { tutorProfile: { include: { user: { select: { name: true } } } } },
        orderBy: { createdAt: "desc" },
      })
    : [];
  const savedTutorRows = savedTutors.map((s) => ({
    tutorProfileId: s.tutorProfileId,
    name: s.tutorProfile.user.name ?? "Verified tutor",
    subjects: s.tutorProfile.subjects.split(",").map((sub) => sub.trim()).filter(Boolean),
    price: s.tutorProfile.hourlyRateCents ? `$${Math.round(s.tutorProfile.hourlyRateCents / 100)}/hr` : "Rate on request",
    country: s.tutorProfile.country,
    alreadyRequested: requestedTutorProfileIds.has(s.tutorProfileId),
  }));

  const courseRequests = user?.id
    ? await prisma.courseRequest.findMany({
        where: { userId: user.id },
        include: { course: { include: { instructor: { include: { user: { select: { name: true } } } } } } },
        orderBy: { createdAt: "desc" },
      })
    : [];
  const courseRequestRows = courseRequests.map((r) => ({
    id: r.id,
    courseId: r.courseId,
    courseTitle: r.course.title,
    instructor: r.course.instructor?.user.name ?? "TutorA instructor",
    priceCents: r.course.priceCents,
    status: r.status,
    createdAt: r.createdAt,
  }));
  const openCourseRequestIds = new Set(
    courseRequests.filter((r) => r.status === "OPEN").map((r) => r.courseId)
  );
  const openCourseRequestCount = courseRequests.filter((r) => r.status === "OPEN").length;

  const subjectRequests = user?.id
    ? await prisma.subjectRequest.findMany({
        where: { userId: user.id },
        include: { subject: true },
        orderBy: { createdAt: "desc" },
      })
    : [];
  const subjectRequestRows = subjectRequests.map((r) => ({
    id: r.id,
    subjectId: r.subjectId,
    title: r.subject.title ?? r.subject.name,
    gradeLevel: r.subject.gradeLevel,
    hourlyRateCents: r.subject.hourlyRateCents,
    status: r.status,
    createdAt: r.createdAt,
  }));
  const openSubjectRequestCount = subjectRequests.filter((r) => r.status === "OPEN").length;

  const totalRequestCount = requests.length + courseRequests.length + subjectRequests.length;

  const savedCourses = user?.id
    ? await prisma.savedCourse.findMany({
        where: { userId: user.id },
        include: { course: { include: { instructor: { include: { user: { select: { name: true } } } } } } },
        orderBy: { createdAt: "desc" },
      })
    : [];
  const savedCourseRows = savedCourses.map((s) => ({
    courseId: s.courseId,
    title: s.course.title,
    instructor: s.course.instructor?.user.name ?? "TutorA instructor",
    priceCents: s.course.priceCents,
    alreadyRequested: openCourseRequestIds.has(s.courseId),
  }));

  const savedSubjects = user?.id
    ? await prisma.savedSubject.findMany({
        where: { userId: user.id },
        include: { subject: true },
        orderBy: { createdAt: "desc" },
      })
    : [];
  const savedSubjectRows = savedSubjects.map((s) => ({
    subjectId: s.subjectId,
    title: s.subject.title ?? s.subject.name,
    gradeLevel: s.subject.gradeLevel,
    hourlyRateCents: s.subject.hourlyRateCents,
  }));

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  const totalOpenCount = openCount + openCourseRequestCount + openSubjectRequestCount;
  const totalSavedCount = savedTutorRows.length + savedCourseRows.length + savedSubjectRows.length;

  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,64px)] flex flex-col gap-7">
      <DashboardHeader name={user?.name ?? "Student"} email={user?.email ?? ""} memberSince={memberSince} />
      <PendingEmailChangeBanner />

      <Reveal delay={80}>
        <StatsStrip
          stats={[
            { icon: <TargetIcon width={18} height={18} />, label: "Open requests", value: totalOpenCount },
            { icon: <SparkleIcon width={18} height={18} />, label: "Matched tutors", value: matchedCount },
            { icon: <BookmarkIcon width={18} height={18} />, label: "Saved items", value: totalSavedCount },
            { icon: <BookOpenIcon width={18} height={18} />, label: "Total requests", value: totalRequestCount },
          ]}
        />
      </Reveal>

      <div className="grid gap-6 items-start [grid-template-columns:1.7fr_1fr] max-[880px]:[grid-template-columns:1fr]">
        <Reveal delay={140}>
          <ActivityTabs
            requests={{
              tutors: <RequestsPanel requests={requests} />,
              tutorsCount: requests.length,
              courses: <CourseRequestsPanel requests={courseRequestRows} />,
              coursesCount: courseRequestRows.length,
              subjects: <SubjectRequestsPanel requests={subjectRequestRows} />,
              subjectsCount: subjectRequestRows.length,
            }}
            saved={{
              tutors: <SavedTutorsPanel tutors={savedTutorRows} />,
              tutorsCount: savedTutorRows.length,
              courses: <SavedCoursesPanel courses={savedCourseRows} />,
              coursesCount: savedCourseRows.length,
              subjects: <SavedSubjectsPanel subjects={savedSubjectRows} />,
              subjectsCount: savedSubjectRows.length,
            }}
          />
        </Reveal>
        <Reveal delay={200}>
          <SidePanel />
        </Reveal>
      </div>
    </div>
  );
}

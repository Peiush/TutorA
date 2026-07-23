import { getUser, requireFreshRole } from "@/app/lib/dal";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { RequestsPanel } from "@/components/dashboard/requests-panel";
import { SavedTutorsPanel } from "@/components/dashboard/saved-tutors-panel";
import { CourseRequestsPanel } from "@/components/dashboard/course-requests-panel";
import { SavedCoursesPanel } from "@/components/dashboard/saved-courses-panel";
import { SidePanel } from "@/components/dashboard/side-panel";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TargetIcon, BookOpenIcon, SparkleIcon } from "@/components/dashboard/dashboard-icons";

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
  console.log("DEBUG user?.id =", user?.id, "courseRequests.length =", courseRequests.length);
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
  const totalRequestCount = requests.length + courseRequests.length;

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

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,64px)] flex flex-col gap-7">
      <DashboardHeader name={user?.name ?? "Student"} email={user?.email ?? ""} memberSince={memberSince} />

      <StaggerReveal
        className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
        stagger={0.08}
        y={18}
      >
        <StatCard icon={<TargetIcon width={16} height={16} />} label="Active tutor requests" value={openCount} />
        <StatCard icon={<BookOpenIcon width={16} height={16} />} label="Active course requests" value={openCourseRequestCount} />
        <StatCard icon={<SparkleIcon width={16} height={16} />} label="Matched tutors" value={matchedCount} />
        <StatCard icon={<BookOpenIcon width={16} height={16} />} label="Total requests" value={totalRequestCount} />
      </StaggerReveal>

      <div className="grid gap-6 items-start [grid-template-columns:1.7fr_1fr] max-[880px]:[grid-template-columns:1fr]">
        <div className="flex flex-col gap-6">
          <RequestsPanel requests={requests} />
          <CourseRequestsPanel requests={courseRequestRows} />
          <SavedTutorsPanel tutors={savedTutorRows} />
          <SavedCoursesPanel courses={savedCourseRows} />
        </div>
        <SidePanel />
      </div>
    </div>
  );
}

import { getUser } from "@/app/lib/dal";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { TutorReviewPanel } from "@/components/admin/tutor-review-panel";
import { TutorRequestsAdminPanel } from "@/components/admin/tutor-requests-admin-panel";
import { CoursesAdminPanel } from "@/components/admin/courses-admin-panel";
import { CourseRequestsAdminPanel } from "@/components/admin/course-requests-admin-panel";
import { StatCard } from "@/components/dashboard/stat-card";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { UsersIcon, GraduationCapIcon, ClipboardCheckIcon } from "@/components/tutor/tutor-icons";
import { TargetIcon } from "@/components/dashboard/dashboard-icons";
import { getPublishedCourses } from "@/app/lib/course-listings";

export const metadata = {
  title: "Admin — TutorConnect",
};

export default async function AdminPage() {
  const user = await getUser();

  const [totalStudents, totalTutors, profiles, requests, courses, courseRequests] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "TUTOR" } }),
    prisma.tutorProfile.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.tutorRequest.findMany({
      include: {
        matchedTutor: {
          select: { name: true, email: true, tutorProfile: { select: { hourlyRateCents: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    getPublishedCourses(),
    prisma.courseRequest.findMany({
      include: {
        user: { select: { name: true, email: true } },
        course: { include: { instructor: { include: { user: { select: { name: true } } } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const pendingApprovals = profiles.filter((p) => p.status === "PENDING").length;
  const openRequests = requests.filter((r) => r.status === "OPEN").length;

  const approvedTutors = profiles
    .filter((p) => p.status === "APPROVED")
    .map((p) => ({ userId: p.userId, name: p.user.name ?? p.user.email, subjects: p.subjects }));

  const instructorOptions = profiles
    .filter((p) => p.status === "APPROVED")
    .map((p) => ({ id: p.id, name: p.user.name ?? p.user.email }));

  const courseRequestRows = courseRequests.map((r) => ({
    id: r.id,
    studentName: r.user.name ?? "Student",
    studentEmail: r.user.email,
    courseTitle: r.course.title,
    instructor: r.course.instructor.user.name ?? "TutorConnect instructor",
    priceCents: r.course.priceCents,
    status: r.status,
    createdAt: r.createdAt,
  }));

  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,64px)] flex flex-col gap-7">
      <AdminHeader name={user?.name ?? "Admin"} email={user?.email ?? ""} />

      <StaggerReveal
        className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
        stagger={0.08}
        y={18}
      >
        <StatCard icon={<UsersIcon width={16} height={16} />} label="Total students" value={totalStudents} />
        <StatCard icon={<GraduationCapIcon width={16} height={16} />} label="Total tutors" value={totalTutors} />
        <StatCard icon={<ClipboardCheckIcon width={16} height={16} />} label="Pending approvals" value={pendingApprovals} />
        <StatCard icon={<TargetIcon width={16} height={16} />} label="Open requests" value={openRequests} />
      </StaggerReveal>

      <TutorReviewPanel profiles={profiles} />
      <TutorRequestsAdminPanel requests={requests} approvedTutors={approvedTutors} />
      <CoursesAdminPanel courses={courses} instructorOptions={instructorOptions} />
      <CourseRequestsAdminPanel requests={courseRequestRows} />
    </div>
  );
}

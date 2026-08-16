import { getUser, requireFreshRole } from "@/app/lib/dal";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { TutorReviewPanel } from "@/components/admin/tutor-review-panel";
import { UsersAdminPanel } from "@/components/admin/users-admin-panel";
import { TutorRequestsAdminPanel } from "@/components/admin/tutor-requests-admin-panel";
import { CoursesAdminPanel } from "@/components/admin/courses-admin-panel";
import { CourseRequestsAdminPanel } from "@/components/admin/course-requests-admin-panel";
import { SubjectRequestsAdminPanel } from "@/components/admin/subject-requests-admin-panel";
import { AdminShell, type AdminSection, type AdminDigestItem } from "@/components/admin/admin-shell";
import { SubsectionTabs } from "@/components/admin/subsection-tabs";
import { UsersIcon, GraduationCapIcon, ClipboardCheckIcon } from "@/components/tutor/tutor-icons";
import { TargetIcon, BookOpenIcon, ChatDotsIcon, GearIcon } from "@/components/dashboard/dashboard-icons";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { getMfaStatus } from "@/app/lib/actions/mfa";
import { TwoFactorPanel } from "@/components/admin/two-factor-panel";
import { WhatsAppInboxPanel } from "@/components/admin/whatsapp-inbox-panel";
import { listConversations } from "@/app/lib/actions/whatsapp";
import { TestimonialsAdminPanel } from "@/components/admin/testimonials-admin-panel";
import { SparkleIcon } from "@/components/dashboard/dashboard-icons";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  await requireFreshRole(["ADMIN"]);
  const user = await getUser();

  const [totalStudents, totalTutors, allUsers, profiles, requests, courses, courseRequests, subjectRequests, mfaStatus, conversations, testimonials] =
    await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({ where: { role: "TUTOR" } }),
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          emailChangeRequest: { select: { newEmail: true, expiresAt: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
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
      prisma.subjectRequest.findMany({
        include: {
          user: { select: { name: true, email: true, phone: true } },
          subject: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      getMfaStatus(),
      listConversations(),
      prisma.testimonial.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const pendingApprovals = profiles.filter((p) => p.status === "PENDING").length;
  const openRequests = requests.filter((r) => r.status === "OPEN").length;
  const openCourseRequests = courseRequests.filter((r) => r.status === "OPEN").length;
  const openSubjectRequests = subjectRequests.filter((r) => r.status === "OPEN").length;
  const pendingEmailChanges = allUsers.filter((u) => u.emailChangeRequest).length;
  const pendingTestimonials = testimonials.filter((t) => !t.approved).length;

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
    instructor: r.course.instructor?.user.name ?? "TutorA instructor",
    priceCents: r.course.priceCents,
    status: r.status,
    createdAt: r.createdAt,
  }));

  const userRows = allUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    pendingEmailChange: u.emailChangeRequest
      ? { newEmail: u.emailChangeRequest.newEmail, expiresAt: u.emailChangeRequest.expiresAt }
      : null,
  }));

  const subjectRequestRows = subjectRequests.map((r) => ({
    id: r.id,
    studentName: r.user.name ?? "Student",
    studentEmail: r.user.email,
    studentPhone: r.user.phone,
    subjectTitle: r.subject.title ?? r.subject.name,
    gradeLevel: r.subject.gradeLevel,
    hourlyRateCents: r.subject.hourlyRateCents,
    status: r.status,
    createdAt: r.createdAt,
  }));

  const stats = [
    { icon: <UsersIcon width={16} height={16} />, label: "Total students", value: totalStudents },
    { icon: <GraduationCapIcon width={16} height={16} />, label: "Total tutors", value: totalTutors },
    { icon: <ClipboardCheckIcon width={16} height={16} />, label: "Pending approvals", value: pendingApprovals },
    { icon: <TargetIcon width={16} height={16} />, label: "Open requests", value: openRequests },
  ];

  const digest: AdminDigestItem[] = [
    { id: "listings", label: `${pendingApprovals} tutor listing${pendingApprovals === 1 ? "" : "s"} awaiting review`, count: pendingApprovals, targetTab: "tutors" },
    { id: "tutor-requests", label: `${openRequests} open tutor request${openRequests === 1 ? "" : "s"} to match`, count: openRequests, targetTab: "tutors" },
    { id: "course-requests", label: `${openCourseRequests} open course enrollment request${openCourseRequests === 1 ? "" : "s"}`, count: openCourseRequests, targetTab: "courses" },
    { id: "subject-requests", label: `${openSubjectRequests} open custom subject request${openSubjectRequests === 1 ? "" : "s"}`, count: openSubjectRequests, targetTab: "subject-requests" },
    { id: "email-changes", label: `${pendingEmailChanges} pending email change${pendingEmailChanges === 1 ? "" : "s"} to confirm`, count: pendingEmailChanges, targetTab: "people" },
    { id: "testimonials", label: `${pendingTestimonials} testimonial${pendingTestimonials === 1 ? "" : "s"} awaiting review`, count: pendingTestimonials, targetTab: "testimonials" },
  ];

  const sections: AdminSection[] = [
    {
      id: "people",
      label: "People",
      icon: <UsersIcon width={15} height={15} />,
      content: <UsersAdminPanel users={userRows} />,
    },
    {
      id: "tutors",
      label: "Tutors",
      icon: <GraduationCapIcon width={15} height={15} />,
      badge: pendingApprovals + openRequests,
      content: (
        <SubsectionTabs
          name="tutors-subsection"
          tabs={[
            {
              value: "requests",
              label: `Requests${openRequests ? ` (${openRequests})` : ""}`,
              content: <TutorRequestsAdminPanel requests={requests} approvedTutors={approvedTutors} />,
            },
            { value: "listings", label: `Listings${pendingApprovals ? ` (${pendingApprovals})` : ""}`, content: <TutorReviewPanel profiles={profiles} /> },
          ]}
        />
      ),
    },
    {
      id: "courses",
      label: "Courses",
      icon: <BookOpenIcon width={15} height={15} />,
      badge: openCourseRequests,
      content: (
        <SubsectionTabs
          name="courses-subsection"
          tabs={[
            {
              value: "requests",
              label: `Requests${openCourseRequests ? ` (${openCourseRequests})` : ""}`,
              content: <CourseRequestsAdminPanel requests={courseRequestRows} />,
            },
            { value: "catalog", label: `Catalog (${courses.length})`, content: <CoursesAdminPanel courses={courses} instructorOptions={instructorOptions} /> },
          ]}
        />
      ),
    },
    {
      id: "subject-requests",
      label: "Subject requests",
      icon: <TargetIcon width={15} height={15} />,
      badge: openSubjectRequests,
      content: <SubjectRequestsAdminPanel requests={subjectRequestRows} />,
    },
    {
      id: "messages",
      label: "Messages",
      icon: <ChatDotsIcon width={15} height={15} />,
      content: <WhatsAppInboxPanel conversations={conversations} />,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <SparkleIcon width={15} height={15} />,
      badge: pendingTestimonials,
      content: <TestimonialsAdminPanel testimonials={testimonials} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <GearIcon width={15} height={15} />,
      content: <TwoFactorPanel initialEnabled={mfaStatus.enabled} />,
    },
  ];

  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,64px)] flex flex-col gap-6">
      <AdminHeader name={user?.name ?? "Admin"} email={user?.email ?? ""} />
      <AdminShell stats={stats} digest={digest} sections={sections} />
    </div>
  );
}

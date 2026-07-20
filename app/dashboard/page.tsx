import { getUser } from "@/app/lib/dal";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { RequestsPanel } from "@/components/dashboard/requests-panel";
import { SidePanel } from "@/components/dashboard/side-panel";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TargetIcon, BookOpenIcon, CalendarIcon, SparkleIcon } from "@/components/dashboard/dashboard-icons";

export const metadata = {
  title: "Dashboard — TutorConnect",
};

export default async function DashboardPage() {
  const user = await getUser();

  const requests = await prisma.tutorRequest.findMany({
    where: { userId: user?.id },
    include: { matchedTutor: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const openCount = requests.filter((r) => r.status === "OPEN").length;
  const matchedCount = requests.filter((r) => r.status === "MATCHED").length;

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
        <StatCard icon={<TargetIcon width={16} height={16} />} label="Active requests" value={openCount} />
        <StatCard icon={<SparkleIcon width={16} height={16} />} label="Matched tutors" value={matchedCount} />
        <StatCard icon={<BookOpenIcon width={16} height={16} />} label="Total requests" value={requests.length} />
        <StatCard
          icon={<CalendarIcon width={16} height={16} />}
          label="Upcoming sessions"
          hint="Session scheduling is on its way."
          comingSoon
        />
      </StaggerReveal>

      <div className="grid gap-6 items-start [grid-template-columns:1.7fr_1fr] max-[880px]:[grid-template-columns:1fr]">
        <RequestsPanel requests={requests} />
        <SidePanel />
      </div>
    </div>
  );
}

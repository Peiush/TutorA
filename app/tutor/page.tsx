import { getUser } from "@/app/lib/dal";
import { prisma } from "@/lib/prisma";
import { TutorHeader } from "@/components/tutor/tutor-header";
import { ProfilePanel } from "@/components/tutor/profile-panel";
import { MatchedStudentsPanel } from "@/components/tutor/matched-students-panel";
import { TutorSidePanel } from "@/components/tutor/tutor-side-panel";
import { StatCard } from "@/components/dashboard/stat-card";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { GraduationCapIcon, CoinsIcon, UsersIcon } from "@/components/tutor/tutor-icons";
import { BookOpenIcon } from "@/components/dashboard/dashboard-icons";

export const metadata = {
  title: "Tutor dashboard — TutorConnect",
};

export default async function TutorDashboardPage() {
  const user = await getUser();

  const profile = await prisma.tutorProfile.findUnique({
    where: { userId: user?.id },
  });

  const matchedRequests = await prisma.tutorRequest.findMany({
    where: { matchedTutorId: user?.id },
    orderBy: { updatedAt: "desc" },
  });

  const subjectCount = profile ? profile.subjects.split(",").map((s) => s.trim()).filter(Boolean).length : 0;
  const hourlyRate = profile?.hourlyRateCents ? Math.round(profile.hourlyRateCents / 100) : 0;
  const activeMatchedCount = matchedRequests.filter((r) => r.status === "MATCHED").length;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,64px)] flex flex-col gap-7">
      <TutorHeader
        name={user?.name ?? "Tutor"}
        email={user?.email ?? ""}
        memberSince={memberSince}
        status={profile?.status ?? null}
        profile={
          profile
            ? {
                country: profile.country,
                subjects: profile.subjects,
                yearsExperience: profile.yearsExperience,
                hourlyRateCents: profile.hourlyRateCents,
                bio: profile.bio,
                certificateUrl: profile.certificateUrl,
              }
            : null
        }
      />

      <StaggerReveal
        className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
        stagger={0.08}
        y={18}
      >
        <StatCard icon={<BookOpenIcon width={16} height={16} />} label="Subjects listed" value={subjectCount} />
        <StatCard icon={<GraduationCapIcon width={16} height={16} />} label="Years experience" value={profile?.yearsExperience ?? 0} />
        <StatCard icon={<CoinsIcon width={16} height={16} />} label="Hourly rate" value={hourlyRate} prefix="$" suffix="/hr" />
        <StatCard icon={<UsersIcon width={16} height={16} />} label="Matched students" value={activeMatchedCount} />
      </StaggerReveal>

      <div className="grid gap-6 items-start [grid-template-columns:1.7fr_1fr] max-[880px]:[grid-template-columns:1fr]">
        <div className="flex flex-col gap-6">
          <ProfilePanel profile={profile ? { ...profile } : null} />
          <MatchedStudentsPanel requests={matchedRequests} />
        </div>
        <TutorSidePanel />
      </div>
    </div>
  );
}

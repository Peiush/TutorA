"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { SearchIcon, PlusIcon } from "@/components/dashboard/dashboard-icons";

function GraduationCapWatermark() {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{
        position: "absolute",
        right: -24,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--color-accent-2)",
        opacity: 0.06,
        pointerEvents: "none",
      }}
    >
      <path d="M2.5 9.5 12 5l9.5 4.5-9.5 4.5-9.5-4.5Z" />
      <path d="M6.5 11.6v4.1c0 1.5 2.46 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-4.1" />
      <path d="M21.5 9.5v6" />
    </svg>
  );
}

export function DashboardHeader({
  name,
  email,
  memberSince,
}: {
  name: string;
  email: string;
  memberSince: string;
}) {
  return (
    <Reveal>
      <div
        className="relative overflow-hidden flex flex-wrap items-center gap-6 p-[clamp(20px,4vw,32px)]"
        style={{
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(135deg, var(--color-accent-2-100), var(--color-surface))",
        }}
      >
        <GraduationCapWatermark />
        <TutorAvatar name={name || "Student"} size={64} />
        <div className="min-w-0 flex-1 relative">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-[clamp(22px,2.6vw,30px)]">Welcome back, {name?.split(" ")[0] || "there"}</h1>
            <Tag variant="accent-2">Student</Tag>
          </div>
          <p className="text-[14px] mt-1" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            {email} · Member since {memberSince}
          </p>
        </div>
        <div className="flex gap-2.5 flex-wrap relative">
          <Link href="/find-a-tutor" className="btn btn-secondary">
            <SearchIcon width={15} height={15} />
            Find a Tutor
          </Link>
          <Link href="/request-a-tutor" className="btn btn-primary">
            <PlusIcon width={15} height={15} />
            Request a Tutor
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

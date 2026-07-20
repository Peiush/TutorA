"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { Toast, ToastTone } from "@/components/ui/toast";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { ProfileFormModal } from "@/components/tutor/profile-form-modal";
import { PencilIcon, PlusIcon } from "@/components/dashboard/dashboard-icons";

type ProfileStatus = "PENDING" | "APPROVED" | "REJECTED";

type ProfileData = {
  country: string;
  subjects: string;
  yearsExperience: number | null;
  hourlyRateCents: number | null;
  bio: string | null;
  certificateUrl: string | null;
} | null;

const STATUS_META: Record<ProfileStatus, { label: string; variant: "accent" | "success" | "danger" }> = {
  PENDING: { label: "Pending review", variant: "accent" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Not approved", variant: "danger" },
};

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

export function TutorHeader({
  name,
  email,
  memberSince,
  status,
  profile,
}: {
  name: string;
  email: string;
  memberSince: string;
  status: ProfileStatus | null;
  profile: ProfileData;
}) {
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const meta = status ? STATUS_META[status] : null;

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
        <TutorAvatar name={name || "Tutor"} size={64} />
        <div className="min-w-0 flex-1 relative">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-[clamp(22px,2.6vw,30px)]">Welcome back, {name?.split(" ")[0] || "there"}</h1>
            <Tag variant="accent-2">Tutor</Tag>
            {meta && <Tag variant={meta.variant}>{meta.label}</Tag>}
            {!status && (
              <Tag variant="outline">Not listed yet</Tag>
            )}
          </div>
          <p className="text-[14px] mt-1" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            {email} · Member since {memberSince}
          </p>
        </div>
        <div className="flex gap-2.5 flex-wrap relative">
          <button type="button" className="btn btn-primary" onClick={() => setEditing(true)}>
            {profile ? <PencilIcon width={15} height={15} /> : <PlusIcon width={15} height={15} />}
            {profile ? "Edit listing" : "Create listing"}
          </button>
        </div>
      </div>

      {editing && (
        <ProfileFormModal
          profile={profile}
          onClose={() => setEditing(false)}
          onSaved={(message) => setToast({ tone: "success", message })}
        />
      )}
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </Reveal>
  );
}

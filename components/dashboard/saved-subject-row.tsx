"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Toast, ToastTone } from "@/components/ui/toast";
import { toggleSavedSubject } from "@/app/lib/actions/saved-subject";
import { priceLabel } from "@/lib/mock-courses";
import { XIcon } from "@/components/dashboard/dashboard-icons";
import { SendIcon } from "@/components/courses/course-icons";

export interface SavedSubjectRowData {
  subjectId: string;
  title: string;
  gradeLevel: string | null;
  hourlyRateCents: number | null;
}

export function SavedSubjectRow({ subject }: { subject: SavedSubjectRowData }) {
  const [removed, setRemoved] = useState(false);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [removePending, startRemoveTransition] = useTransition();

  function handleRemove() {
    startRemoveTransition(async () => {
      const result = await toggleSavedSubject(subject.subjectId);
      if (result.ok) {
        setRemoved(true);
      } else {
        setToast({ tone: "error", message: result.message ?? "Couldn't remove this subject." });
      }
    });
  }

  if (removed) return null;

  return (
    <div
      className="flex items-center gap-3 p-3 flex-wrap transition-colors duration-150"
      style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
          {subject.title}
        </div>
        {subject.gradeLevel && (
          <div className="text-[12.5px] mt-0.5 truncate" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
            {subject.gradeLevel}
          </div>
        )}
      </div>
      <div className="text-[13px] flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
        {subject.hourlyRateCents != null ? `${priceLabel(subject.hourlyRateCents)}/hr` : "Price on request"}
      </div>
      <Link href="/request-a-tutor" className="btn btn-primary text-[13px] flex-none" style={{ padding: "8px 14px" }}>
        <SendIcon width={13} height={13} />
        Request a Tutor
      </Link>
      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Remove ${subject.title} from saved subjects`}
        disabled={removePending}
        className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(217,45,32,0.1)] hover:text-[#d92d20] flex-none"
      >
        <XIcon width={15} height={15} />
      </button>
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

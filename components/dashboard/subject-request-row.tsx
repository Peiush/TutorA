"use client";

import { useState, useTransition } from "react";
import { Tag } from "@/components/ui/tag";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cancelSubjectRequest } from "@/app/lib/actions/subject-request";
import { SUBJECT_STATUS_META, type SubjectRequestRowData } from "@/components/dashboard/subject-request-status";
import { relativeDate } from "@/components/dashboard/request-status";
import { TrashIcon } from "@/components/dashboard/dashboard-icons";
import { priceLabel } from "@/lib/mock-courses";

export function SubjectRequestRow({ request }: { request: SubjectRequestRowData }) {
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const meta = SUBJECT_STATUS_META[request.status];

  function handleConfirmCancel() {
    startTransition(async () => {
      const result = await cancelSubjectRequest(request.id);
      setConfirmingCancel(false);
      if (result.ok) {
        setToast({ tone: "success", message: "Your subject request has been cancelled." });
      } else {
        setToast({ tone: "error", message: result.message ?? "Couldn't cancel this request." });
      }
    });
  }

  return (
    <div
      className="flex flex-wrap items-center gap-3 p-3.5 transition-colors duration-150"
      style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px]" style={{ fontFamily: "var(--font-heading)" }}>
            {request.title}
          </span>
          <Tag variant={meta.variant} className="text-[10.5px]">
            {meta.label}
          </Tag>
        </div>
        {request.gradeLevel && (
          <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
            {request.gradeLevel}
          </div>
        )}
      </div>

      <div className="text-[13px] text-right" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
        {request.hourlyRateCents != null ? `${priceLabel(request.hourlyRateCents)}/hr` : "Price on request"}
        <div>{relativeDate(request.createdAt)}</div>
      </div>

      {request.status === "OPEN" && (
        <button
          type="button"
          onClick={() => setConfirmingCancel(true)}
          aria-label={`Cancel request for ${request.title}`}
          disabled={pending}
          className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(217,45,32,0.1)] hover:text-[#d92d20] flex-none"
        >
          <TrashIcon width={15} height={15} />
        </button>
      )}

      {confirmingCancel && (
        <ConfirmDialog
          title="Cancel this request?"
          description={`Cancel your request for "${request.title}"? This can't be undone.`}
          confirmLabel="Cancel request"
          pending={pending}
          onConfirm={handleConfirmCancel}
          onCancel={() => setConfirmingCancel(false)}
        />
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

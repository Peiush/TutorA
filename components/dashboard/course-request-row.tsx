"use client";

import { useState, useTransition } from "react";
import { Tag } from "@/components/ui/tag";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cancelCourseRequest } from "@/app/lib/actions/course-request";
import { COURSE_STATUS_META, type CourseRequestRowData } from "@/components/dashboard/course-request-status";
import { relativeDate } from "@/components/dashboard/request-status";
import { TrashIcon } from "@/components/dashboard/dashboard-icons";
import { priceLabel } from "@/lib/mock-courses";

export function CourseRequestRow({ request }: { request: CourseRequestRowData }) {
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const meta = COURSE_STATUS_META[request.status];

  function handleConfirmCancel() {
    startTransition(async () => {
      const result = await cancelCourseRequest(request.id);
      setConfirmingCancel(false);
      if (result.ok) {
        setToast({ tone: "success", message: "Your course request has been cancelled." });
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
            {request.courseTitle}
          </span>
          <Tag variant={meta.variant} className="text-[10.5px]">
            {meta.label}
          </Tag>
        </div>
        <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
          {request.instructor}
        </div>
      </div>

      <div className="text-[13px] text-right" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
        {priceLabel(request.priceCents)}
        <div>{relativeDate(request.createdAt)}</div>
      </div>

      {request.status === "OPEN" && (
        <button
          type="button"
          onClick={() => setConfirmingCancel(true)}
          aria-label={`Cancel request for ${request.courseTitle}`}
          disabled={pending}
          className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(217,45,32,0.1)] hover:text-[#d92d20] flex-none"
        >
          <TrashIcon width={15} height={15} />
        </button>
      )}

      {confirmingCancel && (
        <ConfirmDialog
          title="Cancel this request?"
          description={`Cancel your request for "${request.courseTitle}"? This can't be undone.`}
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

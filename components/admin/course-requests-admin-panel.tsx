"use client";

import { useMemo, useState, useTransition } from "react";
import { Tag } from "@/components/ui/tag";
import { SegmentedControl } from "@/components/ui/segmented";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { setCourseRequestStatus } from "@/app/lib/actions/admin";
import { InboxEmptyIcon } from "@/components/dashboard/dashboard-icons";
import { priceLabel } from "@/lib/mock-courses";

type CourseRequestStatus = "OPEN" | "CLOSED";

export type CourseRequestAdminRow = {
  id: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  instructor: string;
  priceCents: number | null;
  status: CourseRequestStatus;
  createdAt: Date;
};

const STATUS_META: Record<CourseRequestStatus, { label: string; variant: "accent" | "neutral" }> = {
  OPEN: { label: "Open", variant: "accent" },
  CLOSED: { label: "Closed", variant: "neutral" },
};

const TABS = [
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "All", value: "ALL" },
];

function relativeDate(date: Date) {
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function CourseRequestsAdminPanel({ requests }: { requests: CourseRequestAdminRow[] }) {
  const [tab, setTab] = useState<string>("OPEN");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [closeTarget, setCloseTarget] = useState<CourseRequestAdminRow | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () => (tab === "ALL" ? requests : requests.filter((r) => r.status === tab)),
    [requests, tab]
  );

  const openCount = requests.filter((r) => r.status === "OPEN").length;

  function changeStatus(id: string, status: CourseRequestStatus, successMessage: string) {
    setPendingId(id);
    startTransition(async () => {
      const result = await setCourseRequestStatus(id, status);
      setPendingId(null);
      setCloseTarget(null);
      setToast(
        result.ok
          ? { tone: "success", message: successMessage }
          : { tone: "error", message: result.message ?? "Something went wrong." }
      );
    });
  }

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">Course requests</h2>
        {openCount > 0 && (
          <Tag variant="accent" className="text-[11px]">
            {openCount} open
          </Tag>
        )}
      </div>

      <SegmentedControl name="course-request-tab" value={tab} onChange={setTab} options={TABS} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-9 px-4">
          <div
            className="w-12 h-12 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <InboxEmptyIcon width={20} height={20} />
          </div>
          <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            No course requests in this view.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((r) => {
            const meta = STATUS_META[r.status];
            const rowPending = pending && pendingId === r.id;
            return (
              <div
                key={r.id}
                className="flex flex-wrap items-center gap-3 p-3.5"
                style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
                      {r.courseTitle}
                    </span>
                    <Tag variant={meta.variant} className="text-[10.5px]">
                      {meta.label}
                    </Tag>
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                    {r.studentName} · {r.studentEmail}
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                    Instructor: {r.instructor}
                  </div>
                </div>

                <div className="text-[13px] text-right flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                  {r.priceCents != null ? priceLabel(r.priceCents) : "Price on request"}
                  <div>{relativeDate(r.createdAt)}</div>
                </div>

                <div className="flex gap-2 flex-none">
                  {r.status === "OPEN" ? (
                    <button
                      type="button"
                      className="btn btn-secondary text-[12.5px]"
                      style={{ padding: "7px 14px" }}
                      disabled={rowPending}
                      onClick={() => setCloseTarget(r)}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary text-[12.5px]"
                      style={{ padding: "7px 14px" }}
                      disabled={rowPending}
                      onClick={() => changeStatus(r.id, "OPEN", "Request reopened.")}
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {closeTarget && (
        <ConfirmDialog
          title="Close this request?"
          description={`Close the "${closeTarget.courseTitle}" request from ${closeTarget.studentName}? You can reopen it later if needed.`}
          confirmLabel="Close request"
          pending={pending}
          onConfirm={() => changeStatus(closeTarget.id, "CLOSED", "Request closed.")}
          onCancel={() => setCloseTarget(null)}
        />
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

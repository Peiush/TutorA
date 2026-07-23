"use client";

import { useMemo, useState, useTransition } from "react";
import { Tag } from "@/components/ui/tag";
import { SegmentedControl } from "@/components/ui/segmented";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { setTutorProfileStatus } from "@/app/lib/actions/admin";
import { ClipboardCheckIcon } from "@/components/tutor/tutor-icons";

type ProfileStatus = "PENDING" | "APPROVED" | "REJECTED";

export type TutorProfileRow = {
  id: string;
  country: string;
  subjects: string;
  yearsExperience: number | null;
  hourlyRateCents: number | null;
  status: ProfileStatus;
  createdAt: Date;
  user: { name: string | null; email: string };
};

const STATUS_META: Record<ProfileStatus, { label: string; variant: "accent" | "success" | "danger" }> = {
  PENDING: { label: "Pending", variant: "accent" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
};

const TABS = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "All", value: "ALL" },
];

export function TutorReviewPanel({ profiles }: { profiles: TutorProfileRow[] }) {
  const [tab, setTab] = useState<string>("PENDING");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<TutorProfileRow | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () => (tab === "ALL" ? profiles : profiles.filter((p) => p.status === tab)),
    [profiles, tab]
  );

  const pendingCount = profiles.filter((p) => p.status === "PENDING").length;

  function handleApprove(id: string) {
    setPendingId(id);
    startTransition(async () => {
      const result = await setTutorProfileStatus(id, "APPROVED");
      setPendingId(null);
      setToast(
        result.ok
          ? { tone: "success", message: "Listing approved and now visible to students." }
          : { tone: "error", message: result.message ?? "Something went wrong." }
      );
    });
  }

  function handleConfirmReject() {
    if (!rejectTarget) return;
    const id = rejectTarget.id;
    setPendingId(id);
    startTransition(async () => {
      const result = await setTutorProfileStatus(id, "REJECTED");
      setPendingId(null);
      setRejectTarget(null);
      setToast(
        result.ok
          ? { tone: "success", message: "Listing rejected." }
          : { tone: "error", message: result.message ?? "Something went wrong." }
      );
    });
  }

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">Tutor listings</h2>
        {pendingCount > 0 && (
          <Tag variant="accent" className="text-[11px]">
            {pendingCount} awaiting review
          </Tag>
        )}
      </div>

      <SegmentedControl name="tutor-tab" value={tab} onChange={setTab} options={TABS} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-9 px-4">
          <div
            className="w-12 h-12 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <ClipboardCheckIcon width={20} height={20} />
          </div>
          <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            No listings in this view.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((p, i) => {
            const meta = STATUS_META[p.status];
            const rowPending = pending && pendingId === p.id;
            return (
              <div
                key={p.id}
                className="flex flex-wrap items-center gap-3 p-3.5"
                style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
              >
                <TutorAvatar name={p.user.name ?? p.user.email} index={i} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
                      {p.user.name ?? "Unnamed tutor"}
                    </span>
                    <Tag variant={meta.variant} className="text-[10.5px]">
                      {meta.label}
                    </Tag>
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
                    {p.user.email} · {p.subjects} · {p.country}
                  </div>
                </div>
                <div className="text-[13px] text-right flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                  {p.hourlyRateCents ? `$${(p.hourlyRateCents / 100).toFixed(0)}/hr` : "No rate"}
                  <div>{p.yearsExperience ?? 0} yrs</div>
                </div>

                <div className="flex gap-2 flex-none">
                  {p.status !== "APPROVED" && (
                    <button
                      type="button"
                      className="btn btn-primary text-[12.5px]"
                      style={{ padding: "7px 14px" }}
                      disabled={rowPending}
                      onClick={() => handleApprove(p.id)}
                    >
                      Approve
                    </button>
                  )}
                  {p.status !== "REJECTED" && (
                    <button
                      type="button"
                      className="btn btn-secondary text-[12.5px]"
                      style={{ padding: "7px 14px" }}
                      disabled={rowPending}
                      onClick={() => setRejectTarget(p)}
                    >
                      {p.status === "APPROVED" ? "Revoke" : "Reject"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {rejectTarget && (
        <ConfirmDialog
          title={rejectTarget.status === "APPROVED" ? "Revoke this listing?" : "Reject this listing?"}
          description={`${rejectTarget.user.name ?? rejectTarget.user.email} will ${
            rejectTarget.status === "APPROVED" ? "no longer be visible to students" : "not be approved to teach"
          } until reconsidered.`}
          confirmLabel={rejectTarget.status === "APPROVED" ? "Revoke" : "Reject"}
          pending={pending}
          onConfirm={handleConfirmReject}
          onCancel={() => setRejectTarget(null)}
        />
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

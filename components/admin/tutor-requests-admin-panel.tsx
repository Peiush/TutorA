"use client";

import { useMemo, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { Tag } from "@/components/ui/tag";
import { SegmentedControl } from "@/components/ui/segmented";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { setTutorRequestStatus, matchTutorRequest } from "@/app/lib/actions/admin";
import { InboxEmptyIcon, XIcon } from "@/components/dashboard/dashboard-icons";
import { currencySymbol, modeLabel } from "@/components/dashboard/request-status";

type RequestStatus = "OPEN" | "MATCHED" | "CLOSED";

export type ApprovedTutorOption = {
  userId: string;
  name: string;
  subjects: string;
};

export type TutorRequestRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  level: string | null;
  mode: string | null;
  sessionsPerWeek: string | null;
  status: RequestStatus;
  budgetPerHour: number | null;
  currency: string | null;
  notes: string | null;
  createdAt: Date;
  requestedTutorName: string | null;
  requestedTutorRate: string | null;
  matchedTutor: {
    name: string | null;
    email: string;
    tutorProfile: { hourlyRateCents: number | null } | null;
  } | null;
};

function tutorRateLabel(r: TutorRequestRow) {
  const cents = r.matchedTutor?.tutorProfile?.hourlyRateCents;
  if (cents) return `$${Math.round(cents / 100)}/hr`;
  if (r.requestedTutorRate) return r.requestedTutorRate;
  if (r.budgetPerHour) return `${currencySymbol(r.currency)}${r.budgetPerHour}/hr (student's budget)`;
  return "Rate not available";
}

function MatchTutorModal({
  request,
  tutors,
  pending,
  onConfirm,
  onCancel,
}: {
  request: TutorRequestRow;
  tutors: ApprovedTutorOption[];
  pending: boolean;
  onConfirm: (tutorUserId: string) => void;
  onCancel: () => void;
}) {
  const bestMatchId = useMemo(() => {
    const subjectLower = request.subject.toLowerCase();
    return tutors.find((t) => t.subjects.toLowerCase().includes(subjectLower))?.userId ?? tutors[0]?.userId ?? "";
  }, [tutors, request.subject]);
  const [tutorId, setTutorId] = useState(bestMatchId);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="card elev-lg gap-4 w-full max-w-[420px]" style={{ background: "var(--color-bg)" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-[18px]">Match a tutor</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(21,33,58,0.08)]"
          >
            <XIcon width={16} height={16} />
          </button>
        </div>
        <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
          Choose an approved tutor for the <strong>{request.subject}</strong> request from {request.name}. Both
          sides will see each other&rsquo;s contact details once matched.
        </p>

        {tutors.length === 0 ? (
          <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
            No approved tutors available yet. Approve a listing first.
          </p>
        ) : (
          <div className="field">
            <label>Tutor</label>
            <select className="input" value={tutorId} onChange={(e) => setTutorId(e.target.value)}>
              {tutors.map((t) => (
                <option key={t.userId} value={t.userId}>
                  {t.name} — {t.subjects}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-end gap-2.5 mt-1">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={pending}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={pending || !tutorId}
            onClick={() => onConfirm(tutorId)}
          >
            {pending ? "Matching…" : "Confirm match"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

const STATUS_META: Record<RequestStatus, { label: string; variant: "accent" | "success" | "neutral" }> = {
  OPEN: { label: "Open", variant: "accent" },
  MATCHED: { label: "Matched", variant: "success" },
  CLOSED: { label: "Closed", variant: "neutral" },
};

const TABS = [
  { label: "Open", value: "OPEN" },
  { label: "Matched", value: "MATCHED" },
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

export function TutorRequestsAdminPanel({
  requests,
  approvedTutors,
}: {
  requests: TutorRequestRow[];
  approvedTutors: ApprovedTutorOption[];
}) {
  const [tab, setTab] = useState<string>("OPEN");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [closeTarget, setCloseTarget] = useState<TutorRequestRow | null>(null);
  const [matchTarget, setMatchTarget] = useState<TutorRequestRow | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () => (tab === "ALL" ? requests : requests.filter((r) => r.status === tab)),
    [requests, tab]
  );

  const openCount = requests.filter((r) => r.status === "OPEN").length;

  function changeStatus(id: string, status: RequestStatus, successMessage: string) {
    setPendingId(id);
    startTransition(async () => {
      const result = await setTutorRequestStatus(id, status);
      setPendingId(null);
      setCloseTarget(null);
      setToast(
        result.ok
          ? { tone: "success", message: successMessage }
          : { tone: "error", message: result.message ?? "Something went wrong." }
      );
    });
  }

  function handleConfirmMatch(tutorUserId: string) {
    if (!matchTarget) return;
    const id = matchTarget.id;
    setPendingId(id);
    startTransition(async () => {
      const result = await matchTutorRequest(id, tutorUserId);
      setPendingId(null);
      setMatchTarget(null);
      setToast(
        result.ok
          ? { tone: "success", message: "Request matched. Both sides can now see each other's contact details." }
          : { tone: "error", message: result.message ?? "Something went wrong." }
      );
    });
  }

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">Tutor requests</h2>
        {openCount > 0 && (
          <Tag variant="accent" className="text-[11px]">
            {openCount} open
          </Tag>
        )}
      </div>

      <SegmentedControl name="request-tab" value={tab} onChange={setTab} options={TABS} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-9 px-4">
          <div
            className="w-12 h-12 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <InboxEmptyIcon width={20} height={20} />
          </div>
          <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            No requests in this view.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((r) => {
            const meta = STATUS_META[r.status];
            const rowPending = pending && pendingId === r.id;
            const isSpecific = Boolean(r.requestedTutorName);
            const tutorName = r.matchedTutor?.name ?? r.requestedTutorName ?? null;
            const mode = modeLabel(r.mode);
            return (
              <div
                key={r.id}
                className="flex flex-wrap items-center gap-3 p-3.5"
                style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
                      {isSpecific ? tutorName ?? "Tutor not yet assigned" : r.subject}
                    </span>
                    <Tag variant={meta.variant} className="text-[10.5px]">
                      {meta.label}
                    </Tag>
                    <Tag variant="neutral" className="text-[10.5px]">
                      {isSpecific ? "Requested tutor" : "Custom request"}
                    </Tag>
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
                    Student: {r.name} · {r.email}
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
                    {isSpecific
                      ? [r.subject, mode].filter(Boolean).join(" · ")
                      : [mode, r.level, r.sessionsPerWeek ? `${r.sessionsPerWeek}x/week` : null]
                          .filter(Boolean)
                          .join(" · ") || "No preferences"}
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
                    {isSpecific
                      ? tutorRateLabel(r)
                      : `Budget: ${r.budgetPerHour ? `${currencySymbol(r.currency)}${r.budgetPerHour}/hr` : "Not set"}`}
                  </div>
                  {r.status === "MATCHED" && r.matchedTutor && (
                    <div className="text-[12.5px] mt-1" style={{ color: "var(--color-verified)" }}>
                      Matched with {r.matchedTutor.name ?? r.matchedTutor.email} ({r.matchedTutor.email})
                    </div>
                  )}
                </div>

                <div className="text-[13px] text-right flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                  {relativeDate(r.createdAt)}
                </div>

                <div className="flex gap-2 flex-none">
                  {r.status === "OPEN" && (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary text-[12.5px]"
                        style={{ padding: "7px 14px" }}
                        disabled={rowPending}
                        onClick={() => setMatchTarget(r)}
                      >
                        Mark matched
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary text-[12.5px]"
                        style={{ padding: "7px 14px" }}
                        disabled={rowPending}
                        onClick={() => setCloseTarget(r)}
                      >
                        Close
                      </button>
                    </>
                  )}
                  {r.status === "MATCHED" && (
                    <>
                      <button
                        type="button"
                        className="btn btn-secondary text-[12.5px]"
                        style={{ padding: "7px 14px" }}
                        disabled={rowPending}
                        onClick={() => changeStatus(r.id, "OPEN", "Request reopened.")}
                      >
                        Reopen
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary text-[12.5px]"
                        style={{ padding: "7px 14px" }}
                        disabled={rowPending}
                        onClick={() => setCloseTarget(r)}
                      >
                        Close
                      </button>
                    </>
                  )}
                  {r.status === "CLOSED" && (
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
          description={`Close the ${closeTarget.subject} request from ${closeTarget.name}? You can reopen it later if needed.`}
          confirmLabel="Close request"
          pending={pending}
          onConfirm={() => changeStatus(closeTarget.id, "CLOSED", "Request closed.")}
          onCancel={() => setCloseTarget(null)}
        />
      )}

      {matchTarget && (
        <MatchTutorModal
          request={matchTarget}
          tutors={approvedTutors}
          pending={pending}
          onConfirm={handleConfirmMatch}
          onCancel={() => setMatchTarget(null)}
        />
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

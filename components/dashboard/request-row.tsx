"use client";

import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { Tag } from "@/components/ui/tag";
import { SegmentedControl } from "@/components/ui/segmented";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { updateTutorRequest, deleteTutorRequest } from "@/app/lib/actions/tutor-request";
import { STATUS_META, relativeDate, currencySymbol, modeLabel, RequestRowData } from "@/components/dashboard/request-status";

function tutorRateLabel(request: RequestRowData) {
  const cents = request.matchedTutor?.tutorProfile?.hourlyRateCents;
  if (cents) return `$${Math.round(cents / 100)}/hr`;
  if (request.requestedTutorRate) return request.requestedTutorRate;
  if (request.budgetPerHour) return `${currencySymbol(request.currency)}${request.budgetPerHour}/hr (your budget)`;
  return "Rate not available";
}
import { PencilIcon, TrashIcon, XIcon } from "@/components/dashboard/dashboard-icons";

function EditModal({
  request,
  onClose,
  onSaved,
}: {
  request: RequestRowData;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [subject, setSubject] = useState(request.subject);
  const [level, setLevel] = useState(request.level ?? "");
  const [mode, setMode] = useState(request.mode ?? "Online");
  const [sessionsPerWeek, setSessionsPerWeek] = useState(request.sessionsPerWeek ?? "1");
  const [currency, setCurrency] = useState(request.currency ?? "USD");
  const [budgetPerHour, setBudgetPerHour] = useState(request.budgetPerHour ?? 30);
  const [notes, setNotes] = useState(request.notes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await updateTutorRequest(request.id, {
        subject,
        level,
        mode,
        sessionsPerWeek,
        currency,
        budgetPerHour,
        notes,
      });
      if (result.ok) {
        onClose();
        onSaved("Your request has been updated.");
      } else {
        setError(result.message ?? "Something went wrong. Please try again.");
      }
    });
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="card elev-lg gap-4 w-full max-w-[440px] max-h-[86vh] overflow-y-auto"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[19px]">Edit request</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(21,33,58,0.08)]"
          >
            <XIcon width={16} height={16} />
          </button>
        </div>

        <div className="field">
          <label>Subject</label>
          <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>

        <div className="field">
          <label>Level</label>
          <input className="input" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="e.g. Secondary / GCSE" />
        </div>

        <div className="field">
          <label>Mode</label>
          <SegmentedControl
            name="edit-mode"
            value={mode}
            onChange={setMode}
            options={[
              { label: "Online", value: "Online" },
              { label: "In person", value: "In person" },
              { label: "Either", value: "Either" },
            ]}
          />
        </div>

        <div className="field">
          <label>Sessions per week</label>
          <select className="input" value={sessionsPerWeek} onChange={(e) => setSessionsPerWeek(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </div>

        <div className="grid grid-cols-[100px_1fr] gap-3">
          <div className="field">
            <label>Currency</label>
            <select className="input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option>USD</option>
              <option>GBP</option>
              <option>EUR</option>
            </select>
          </div>
          <div className="field">
            <label>Budget per hour</label>
            <input
              className="input"
              type="number"
              min={1}
              value={budgetPerHour}
              onChange={(e) => setBudgetPerHour(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="field">
          <label>Notes</label>
          <textarea className="input" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        {error && (
          <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2.5 mt-1">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={pending}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}

export function RequestRow({ request }: { request: RequestRowData }) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const meta = STATUS_META[request.status];
  const canManage = request.status === "OPEN";
  const isSpecific = Boolean(request.requestedTutorName);
  const tutorName = request.matchedTutor?.name ?? request.requestedTutorName ?? null;
  const mode = modeLabel(request.mode);
  const rate = tutorRateLabel(request);

  function handleConfirmDelete() {
    startTransition(async () => {
      const result = await deleteTutorRequest(request.id);
      setConfirmingDelete(false);
      if (result.ok) {
        setToast({ tone: "success", message: "Your request has been deleted." });
      } else {
        setToast({ tone: "error", message: result.message ?? "Couldn't delete this request." });
      }
    });
  }

  return (
    <div
      className="flex flex-wrap items-center gap-3 p-3.5 transition-colors duration-150"
      style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
    >
      <div className="min-w-0 flex-1 flex items-center gap-3">
        <span
          className="w-9 h-9 rounded-full grid place-content-center text-[13px] flex-none"
          style={
            isSpecific
              ? { background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }
              : { background: "color-mix(in srgb, var(--color-text) 10%, transparent)", color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }
          }
        >
          {(isSpecific ? tutorName : request.subject)?.charAt(0).toUpperCase() ?? "?"}
        </span>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[15px]" style={{ fontFamily: "var(--font-heading)" }}>
              {isSpecific ? tutorName ?? "Tutor not yet assigned" : request.subject}
            </span>
            <Tag variant={meta.variant} className="text-[10.5px]">
              {meta.label}
            </Tag>
            <Tag variant="neutral" className="text-[10.5px]">
              {isSpecific ? "Requested tutor" : "Custom request"}
            </Tag>
          </div>
          <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
            {isSpecific
              ? [request.subject, mode].filter(Boolean).join(" · ")
              : [mode, request.level, request.sessionsPerWeek ? `${request.sessionsPerWeek}x/week` : null]
                  .filter(Boolean)
                  .join(" · ") || "No preferences added"}
          </div>
          <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
            {isSpecific ? rate : `Budget: ${request.budgetPerHour ? `${currencySymbol(request.currency)}${request.budgetPerHour}/hr` : "Not set"}`}
          </div>
          {request.matchedTutor?.email && (
            <div className="text-[11.5px] mt-0.5" style={{ color: "var(--color-verified)" }}>
              {isSpecific
                ? request.matchedTutor.email
                : `Matched with ${request.matchedTutor.name ?? "your tutor"} · ${request.matchedTutor.email}`}
            </div>
          )}
        </div>
      </div>

      <div className="text-[13px] text-right" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
        {relativeDate(request.createdAt)}
      </div>

      {canManage && (
        <div className="flex gap-1.5 flex-none">
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label={`Edit ${request.subject} request`}
            disabled={pending}
            className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(21,33,58,0.08)]"
          >
            <PencilIcon width={15} height={15} />
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            aria-label={`Delete ${request.subject} request`}
            disabled={pending}
            className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(217,45,32,0.1)] hover:text-[#d92d20]"
          >
            <TrashIcon width={15} height={15} />
          </button>
        </div>
      )}

      {editing && (
        <EditModal
          request={request}
          onClose={() => setEditing(false)}
          onSaved={(message) => setToast({ tone: "success", message })}
        />
      )}

      {confirmingDelete && (
        <ConfirmDialog
          title="Delete this request?"
          description={`Delete your ${request.subject} request? This can't be undone.`}
          confirmLabel="Delete"
          pending={pending}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

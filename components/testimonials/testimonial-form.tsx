"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SegmentedControl } from "@/components/ui/segmented";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { RequestLoginModal } from "@/components/auth/request-login-modal";
import { submitTestimonial, deleteTestimonial } from "@/app/lib/actions/testimonial";
import type { MyTestimonial, TestimonialRole } from "@/app/lib/testimonials";

const ROLE_OPTIONS: { label: string; value: TestimonialRole }[] = [
  { label: "Parent", value: "PARENT" },
  { label: "Student", value: "STUDENT" },
  { label: "Tutor", value: "TUTOR" },
];

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="inline-flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(value === n ? 0 : n)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, lineHeight: 0 }}
          >
            <svg
              width={26}
              height={26}
              viewBox="0 0 24 24"
              fill={filled ? "var(--color-accent)" : "none"}
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <path d="m12 2.5 2.9 6.35 6.85.72-5.1 4.83 1.4 6.85L12 17.9l-6.05 3.35 1.4-6.85-5.1-4.83 6.85-.72Z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export function TestimonialForm({
  isAuthenticated,
  existing,
}: {
  isAuthenticated: boolean;
  existing: MyTestimonial | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(!existing);
  const [role, setRole] = useState<TestimonialRole>(existing?.role ?? "STUDENT");
  const [rating, setRating] = useState(existing?.rating ?? 0);
  const [quote, setQuote] = useState(existing?.quote ?? "");
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);

  const onSubmit = () => {
    if (quote.trim().length < 20) {
      setFieldError("Please write at least 20 characters.");
      return;
    }
    setFieldError(null);

    startTransition(async () => {
      const result = await submitTestimonial({ role, quote, rating: rating || undefined });
      if (result.requiresAuth) {
        setLoginPrompt(true);
        return;
      }
      setToast({ tone: result.ok ? "success" : "error", message: result.message ?? "Something went wrong." });
      if (result.ok) {
        setEditing(false);
        router.refresh();
      }
    });
  };

  const onDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteTestimonial();
      setConfirmDelete(false);
      setToast({ tone: result.ok ? "success" : "error", message: result.message ?? "Something went wrong." });
      if (result.ok) {
        setQuote("");
        setRating(0);
        setEditing(true);
        router.refresh();
      }
    });
  };

  if (existing && !editing) {
    return (
      <div className="card elev-sm p-[clamp(20px,4vw,32px)] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="text-[15px] font-semibold">Your testimonial</span>
          <span
            className="tag"
            style={
              existing.approved
                ? { background: "color-mix(in srgb, var(--color-verified) 16%, transparent)", color: "var(--color-verified)" }
                : { background: "var(--color-accent-100)", color: "var(--color-accent-800)" }
            }
          >
            {existing.approved ? "Live on the site" : "Pending review"}
          </span>
        </div>
        <p className="text-[14.5px] leading-[1.5] m-0">{existing.quote}</p>
        <div className="flex gap-2 mt-1">
          <button type="button" className="btn btn-secondary" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ color: "var(--color-danger, #c0392b)" }}
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </button>
        </div>
        {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
        {confirmDelete && (
          <ConfirmDialog
            title="Delete your testimonial?"
            description="This can't be undone."
            confirmLabel="Delete"
            pending={deletePending}
            onConfirm={onDelete}
            onCancel={() => setConfirmDelete(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="card elev-sm p-[clamp(20px,4vw,32px)] flex flex-col gap-4">
      <div>
        <span className="text-[15px] font-semibold block mb-1">Share your story</span>
        <span className="text-[13.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
          Submitted testimonials are reviewed by our team before they go live.
        </span>
      </div>
      <div>
        <span className="text-[12.5px] font-medium block mb-1.5">I am a…</span>
        <SegmentedControl name="testimonial-role" options={ROLE_OPTIONS} value={role} onChange={(v) => setRole(v as TestimonialRole)} />
      </div>
      <div>
        <span className="text-[12.5px] font-medium block mb-1.5">Rating (optional)</span>
        <StarPicker value={rating} onChange={setRating} />
      </div>
      <textarea
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Tell us about your experience with TutorA…"
        rows={4}
        maxLength={500}
        className="input"
        style={{ resize: "vertical" }}
      />
      {fieldError && (
        <span className="text-[12.5px]" style={{ color: "var(--color-danger, #c0392b)" }}>
          {fieldError}
        </span>
      )}
      <div className="flex gap-2">
        <button type="button" className="btn btn-primary" disabled={pending} onClick={onSubmit}>
          {pending ? "Submitting…" : existing ? "Save changes" : "Submit testimonial"}
        </button>
        {existing && (
          <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>
            Cancel
          </button>
        )}
      </div>
      {!isAuthenticated && (
        <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
          You&apos;ll need to sign in to submit.
        </span>
      )}
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
      {loginPrompt && (
        <RequestLoginModal
          originRect={null}
          onClose={() => setLoginPrompt(false)}
          onAuthenticated={() => {
            setLoginPrompt(false);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

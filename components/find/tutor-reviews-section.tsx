"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { StarRating } from "@/components/ui/tutor-avatar";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { RequestLoginModal } from "@/components/auth/request-login-modal";
import { submitTutorReview, deleteTutorReview } from "@/app/lib/actions/tutor-review";

export interface ReviewForDisplay {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
  isOwn: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

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
            onClick={() => onChange(n)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, lineHeight: 0 }}
          >
            <svg
              width={24}
              height={24}
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

function ReviewForm({
  tutorProfileId,
  tutorName,
  editingReview,
  isAuthenticated,
  onDone,
  onCancel,
}: {
  tutorProfileId: string;
  tutorName: string;
  editingReview: ReviewForDisplay | null;
  isAuthenticated: boolean;
  onDone: (message: string) => void;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(editingReview?.rating ?? 0);
  const [comment, setComment] = useState(editingReview?.comment ?? "");
  const [pending, startTransition] = useTransition();
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [loginPrompt, setLoginPrompt] = useState(false);

  const onSubmit = () => {
    if (rating < 1) {
      setFieldError("Pick a star rating.");
      return;
    }
    if (comment.trim().length < 10) {
      setFieldError("Please write at least 10 characters.");
      return;
    }
    setFieldError(null);

    startTransition(async () => {
      const result = await submitTutorReview({
        tutorProfileId,
        reviewId: editingReview?.id,
        rating,
        comment,
      });
      if (result.requiresAuth) {
        setLoginPrompt(true);
        return;
      }
      if (!result.ok) {
        onDone(result.message ?? "Something went wrong.");
        return;
      }
      if (!editingReview) {
        setRating(0);
        setComment("");
      }
      onDone(result.message ?? "Review posted.");
      router.refresh();
    });
  };

  return (
    <div className="card elev-sm p-4 mb-4 flex flex-col gap-3">
      <span className="text-[13.5px] font-medium">{editingReview ? "Edit your review" : "Write a review"}</span>
      <StarPicker value={rating} onChange={setRating} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={`Share how your sessions with ${tutorName} went…`}
        rows={3}
        maxLength={1000}
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
          {pending ? "Posting…" : editingReview ? "Save changes" : "Post review"}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
      {!isAuthenticated && (
        <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
          You&apos;ll need to sign in to post.
        </span>
      )}
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

export function TutorReviewsSection({
  tutorProfileId,
  tutorName,
  averageRating,
  reviewCount,
  reviews,
  isAuthenticated,
}: {
  tutorProfileId: string;
  tutorName: string;
  averageRating: number;
  reviewCount: number;
  reviews: ReviewForDisplay[];
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [deletePending, startDeleteTransition] = useTransition();
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);

  const onDelete = () => {
    if (!deletingReviewId) return;
    startDeleteTransition(async () => {
      const result = await deleteTutorReview(deletingReviewId);
      setDeletingReviewId(null);
      if (!result.ok) {
        setToast({ tone: "error", message: result.message ?? "Something went wrong." });
        return;
      }
      setToast({ tone: "success", message: result.message ?? "Review removed." });
      router.refresh();
    });
  };

  const editingReview = editingReviewId ? reviews.find((r) => r.id === editingReviewId) ?? null : null;

  return (
    <div id="tutor-reviews" className="tutor-reviews-section" data-related-section>
      <div className="tutor-related-heading">
        <span className="tutor-related-heading-mark" aria-hidden="true">★</span>
        <div>
          <span className="tutor-kicker">Student feedback</span>
          <span className="tutor-related-label">Reviews for {tutorName}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2 mb-4 flex-wrap">
        {reviewCount > 0 ? (
          <>
            <StarRating rating={averageRating} size={18} />
            <span className="text-[15px] font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-[13.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </>
        ) : (
          <span className="text-[13.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
            No reviews yet — be the first to share your experience.
          </span>
        )}
      </div>

      {editingReview ? (
        <ReviewForm
          tutorProfileId={tutorProfileId}
          tutorName={tutorName}
          editingReview={editingReview}
          isAuthenticated={isAuthenticated}
          onCancel={() => setEditingReviewId(null)}
          onDone={(message) => {
            setToast({ tone: message.toLowerCase().includes("wrong") ? "error" : "success", message });
            setEditingReviewId(null);
          }}
        />
      ) : (
        <ReviewForm
          tutorProfileId={tutorProfileId}
          tutorName={tutorName}
          editingReview={null}
          isAuthenticated={isAuthenticated}
          onDone={(message) => setToast({ tone: message.toLowerCase().includes("wrong") ? "error" : "success", message })}
        />
      )}

      {reviews.length > 0 && (
        <ul className="flex flex-col gap-3 list-none m-0 p-0">
          {reviews.map((r) => (
            <li key={r.id} className="card elev-sm p-4">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <div className="flex items-center gap-2.5">
                  <TutorAvatar name={r.authorName} size={32} />
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-medium">
                      {r.isOwn ? "You" : r.authorName}
                    </div>
                    <div className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                      {formatDate(r.createdAt)}
                    </div>
                  </div>
                </div>
                {r.isOwn && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn btn-ghost tutor-review-btn-sm"
                      onClick={() => setEditingReviewId(r.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost tutor-review-btn-sm"
                      style={{ color: "var(--color-danger, #c0392b)" }}
                      onClick={() => setDeletingReviewId(r.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <StarRating rating={r.rating} />
              <p className="text-[13.5px] mt-2">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
      {deletingReviewId && (
        <ConfirmDialog
          title="Delete this review?"
          description="This can't be undone."
          confirmLabel="Delete"
          pending={deletePending}
          onConfirm={onDelete}
          onCancel={() => setDeletingReviewId(null)}
        />
      )}
    </div>
  );
}

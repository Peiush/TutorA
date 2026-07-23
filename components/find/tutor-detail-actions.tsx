"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Toast, ToastTone } from "@/components/ui/toast";
import { requestSpecificTutor } from "@/app/lib/actions/tutor-request";
import { toggleSavedTutor } from "@/app/lib/actions/saved-tutor";
import { usePlaneLaunch } from "@/components/ui/plane-launch";
import type { TutorSubjectOffering } from "@/app/lib/tutor-listings";

export function TutorDetailActions({
  tutorProfileId,
  tutorName,
  subjects,
  initialSaved,
  initialRequested,
}: {
  tutorProfileId: string;
  tutorName: string;
  subjects: TutorSubjectOffering[];
  initialSaved: boolean;
  initialRequested: boolean;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [requested, setRequested] = useState(initialRequested);
  const [savePending, startSaveTransition] = useTransition();
  const [requestingSubjectId, setRequestingSubjectId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const launchPlane = usePlaneLaunch();

  const onToggleSaved = () => {
    startSaveTransition(async () => {
      const result = await toggleSavedTutor(tutorProfileId);
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent(`/find-a-tutor`)}`);
        return;
      }
      if (!result.ok) {
        setToast({ tone: "error", message: result.message ?? "Something went wrong." });
        return;
      }
      setSaved(result.saved ?? false);
    });
  };

  const onRequest = (offering: TutorSubjectOffering, e: React.MouseEvent<HTMLButtonElement>) => {
    launchPlane(e.currentTarget);
    setRequestingSubjectId(offering.id);
    requestSpecificTutor({
      tutorName,
      subject: offering.subjectName,
      mode: "Both",
      tutorRate: offering.priceLabel,
      tutorProfileId,
    }).then((result) => {
      setRequestingSubjectId(null);
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent(`/find-a-tutor`)}`);
        return;
      }
      if (!result.ok) {
        setToast({ tone: "error", message: result.message ?? "Something went wrong." });
        return;
      }
      setRequested(true);
      setToast({ tone: "success", message: result.message ?? `Your request for ${tutorName} has been sent.` });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {subjects.map((offering) => (
        <div
          key={offering.id}
          className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] px-4 py-3"
          style={{ background: "var(--color-surface)" }}
        >
          <div className="min-w-0">
            <div className="text-[14px] font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              {offering.subjectName}
            </div>
            {(offering.curriculum || offering.gradeLevel) && (
              <div className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                {[offering.curriculum, offering.gradeLevel].filter(Boolean).join(" · ")}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 flex-none">
            <span className="text-[14px] font-semibold whitespace-nowrap">{offering.priceLabel}</span>
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: "7px 16px", fontSize: 13 }}
              disabled={requested || requestingSubjectId === offering.id}
              onClick={(e) => onRequest(offering, e)}
            >
              {requested ? "Requested" : requestingSubjectId === offering.id ? "Sending…" : "Request"}
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        aria-pressed={saved}
        disabled={savePending}
        onClick={onToggleSaved}
        className="btn btn-ghost self-start mt-1"
        style={{ opacity: savePending ? 0.6 : 1 }}
      >
        {saved ? "Saved to wishlist" : "Save to wishlist"}
      </button>

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

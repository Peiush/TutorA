"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Toast, ToastTone } from "@/components/ui/toast";
import { RequestLoginModal } from "@/components/auth/request-login-modal";
import { requestSpecificTutor } from "@/app/lib/actions/tutor-request";
import { toggleSavedTutor } from "@/app/lib/actions/saved-tutor";
import { usePlaneLaunch } from "@/components/ui/plane-launch";
import type { TutorSubjectOffering } from "@/app/lib/tutor-listings";
import { SubjectIcon } from "@/components/ui/subject-icons";

export function TutorDetailActions({
  tutorProfileId,
  tutorName,
  subjects,
  initialSaved,
  initialRequestedSubjects,
}: {
  tutorProfileId: string;
  tutorName: string;
  subjects: TutorSubjectOffering[];
  initialSaved: boolean;
  initialRequestedSubjects: string[];
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [requestedSubjects, setRequestedSubjects] = useState<Set<string>>(new Set(initialRequestedSubjects));
  const [savePending, startSaveTransition] = useTransition();
  const [requestingSubjectId, setRequestingSubjectId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [loginPrompt, setLoginPrompt] = useState<{ rect: DOMRect | null; retry: () => void } | null>(null);
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

  const onRequest = (offering: TutorSubjectOffering, origin: HTMLElement) => {
    const rect = origin.getBoundingClientRect();
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
        setLoginPrompt({ rect, retry: () => onRequest(offering, origin) });
        return;
      }
      launchPlane(origin);
      if (!result.ok) {
        setToast({ tone: "error", message: result.message ?? "Something went wrong." });
        return;
      }
      setRequestedSubjects((prev) => new Set(prev).add(offering.subjectName));
      setToast({ tone: "success", message: result.message ?? `Your request for ${tutorName} has been sent.` });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {subjects.map((offering) => (
        <div
          key={offering.id}
          className="subject-offering-card"
          data-subject-card
        >
          <div className="subject-offering-topline">
            <div className="subject-offering-title-wrap">
              <span className="subject-offering-icon"><SubjectIcon subject={offering.subjectName} /></span>
              <div className="min-w-0">
              <div className="subject-offering-title">
                {offering.subjectName}
              </div>
              {(offering.curriculum || offering.gradeLevel || offering.durationLabel) && (
                <div className="subject-offering-meta">
                  {[offering.curriculum, offering.gradeLevel, offering.durationLabel].filter(Boolean).join(" · ")}
                </div>
              )}
              </div>
            </div>
            <div className="subject-offering-action">
              <span className="subject-offering-price">{offering.priceLabel}</span>
              <button
                type="button"
                className="btn btn-primary subject-request-button"
                disabled={requestedSubjects.has(offering.subjectName) || requestingSubjectId === offering.id}
                onClick={(e) => onRequest(offering, e.currentTarget)}
              >
                {requestedSubjects.has(offering.subjectName)
                  ? "Requested"
                  : requestingSubjectId === offering.id
                    ? "Sending…"
                    : "Request"}
              </button>
            </div>
          </div>

          {offering.whatYoullLearn.length > 0 && (
            <ul className="subject-learn-list">
              {offering.whatYoullLearn.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="subject-learn-item"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <button
        type="button"
        aria-pressed={saved}
        disabled={savePending}
        onClick={onToggleSaved}
        className="btn btn-ghost tutor-save-button"
        style={{ opacity: savePending ? 0.6 : 1 }}
      >
        {saved ? "Saved to wishlist" : "Save to wishlist"}
      </button>

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
      {loginPrompt && (
        <RequestLoginModal
          originRect={loginPrompt.rect}
          onClose={() => setLoginPrompt(null)}
          onAuthenticated={() => {
            const retry = loginPrompt.retry;
            setLoginPrompt(null);
            router.refresh();
            retry();
          }}
        />
      )}
    </div>
  );
}

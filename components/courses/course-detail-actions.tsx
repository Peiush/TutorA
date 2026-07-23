"use client";

import { useState, useTransition } from "react";
import { Toast, ToastTone } from "@/components/ui/toast";
import { HeartIcon, SendIcon, CheckIcon } from "@/components/courses/course-icons";
import { requestCourse } from "@/app/lib/actions/course-request";
import { toggleSavedCourse } from "@/app/lib/actions/saved-course";
import { usePlaneLaunch } from "@/components/ui/plane-launch";

export function CourseDetailActions({
  courseId,
  initialSaved,
  initialRequested,
}: {
  courseId: string;
  initialSaved: boolean;
  initialRequested: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [requested, setRequested] = useState(initialRequested);
  const [savePending, startSaveTransition] = useTransition();
  const [requestPending, startRequestTransition] = useTransition();
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const launchPlane = usePlaneLaunch();

  const onToggleSaved = () => {
    startSaveTransition(async () => {
      const result = await toggleSavedCourse(courseId);
      if (!result.ok) {
        setToast({ tone: "error", message: result.message ?? "Something went wrong." });
        return;
      }
      setSaved(result.saved ?? false);
    });
  };

  const onRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    launchPlane(e.currentTarget);
    startRequestTransition(async () => {
      const result = await requestCourse(courseId);
      if (!result.ok) {
        setToast({ tone: "error", message: result.message ?? "Something went wrong." });
        return;
      }
      setRequested(true);
      setToast({ tone: "success", message: result.message ?? "Request sent." });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="btn btn-primary flex-1"
        disabled={requestPending || requested}
        onClick={onRequest}
      >
        {requested ? (
          <>
            <CheckIcon width={16} height={16} />
            Request sent
          </>
        ) : requestPending ? (
          "Sending…"
        ) : (
          <>
            <SendIcon width={16} height={16} />
            Send Request
          </>
        )}
      </button>
      <button
        type="button"
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        aria-pressed={saved}
        disabled={savePending}
        onClick={onToggleSaved}
        className="grid place-content-center rounded-full cursor-pointer transition-colors duration-150"
        style={{
          width: 44,
          height: 44,
          opacity: savePending ? 0.6 : 1,
          color: saved ? "#d92d20" : "var(--color-text)",
          border: "1px solid color-mix(in srgb, var(--color-text) 18%, transparent)",
        }}
      >
        <HeartIcon width={18} height={18} fill={saved ? "currentColor" : "none"} />
      </button>
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

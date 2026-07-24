"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Toast, ToastTone } from "@/components/ui/toast";
import { toggleSavedCourse } from "@/app/lib/actions/saved-course";
import { requestCourse } from "@/app/lib/actions/course-request";
import { priceLabel } from "@/lib/mock-courses";
import { XIcon } from "@/components/dashboard/dashboard-icons";
import { SendIcon, CheckIcon } from "@/components/courses/course-icons";

export interface SavedCourseRowData {
  courseId: string;
  title: string;
  instructor: string;
  priceCents: number | null;
  alreadyRequested: boolean;
}

export function SavedCourseRow({ course }: { course: SavedCourseRowData }) {
  const router = useRouter();
  const [removed, setRemoved] = useState(false);
  const [requested, setRequested] = useState(course.alreadyRequested);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [removePending, startRemoveTransition] = useTransition();
  const [requestPending, startRequestTransition] = useTransition();

  function handleRemove() {
    startRemoveTransition(async () => {
      const result = await toggleSavedCourse(course.courseId);
      if (result.ok) {
        setRemoved(true);
      } else {
        setToast({ tone: "error", message: result.message ?? "Couldn't remove this course." });
      }
    });
  }

  function handleRequest() {
    startRequestTransition(async () => {
      const result = await requestCourse(course.courseId);
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/dashboard")}`);
        return;
      }
      if (result.ok) {
        setRequested(true);
        setToast({ tone: "success", message: result.message ?? `Your request for "${course.title}" has been sent.` });
      } else {
        setToast({ tone: "error", message: result.message ?? "Something went wrong. Please try again." });
      }
    });
  }

  if (removed) return null;

  return (
    <div
      className="flex items-center gap-3 p-3 flex-wrap transition-colors duration-150"
      style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
          {course.title}
        </div>
        <div className="text-[12.5px] mt-0.5 truncate" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
          {course.instructor}
        </div>
      </div>
      <div className="text-[13px] flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
        {course.priceCents != null ? priceLabel(course.priceCents) : "Price on request"}
      </div>
      <button
        type="button"
        className="btn btn-primary text-[13px] flex-none"
        style={{ padding: "8px 14px" }}
        disabled={requestPending || requested}
        onClick={handleRequest}
      >
        {requested ? (
          <>
            <CheckIcon width={13} height={13} />
            Requested
          </>
        ) : requestPending ? (
          "Sending…"
        ) : (
          <>
            <SendIcon width={13} height={13} />
            Send Request
          </>
        )}
      </button>
      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Remove ${course.title} from saved courses`}
        disabled={removePending}
        className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(217,45,32,0.1)] hover:text-[#d92d20] flex-none"
      >
        <XIcon width={15} height={15} />
      </button>
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Toast, ToastTone } from "@/components/ui/toast";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { toggleSavedTutor } from "@/app/lib/actions/saved-tutor";
import { requestSpecificTutor } from "@/app/lib/actions/tutor-request";
import { XIcon } from "@/components/dashboard/dashboard-icons";

export interface SavedTutorRowData {
  tutorProfileId: string;
  name: string;
  subjects: string[];
  price: string;
  country: string;
  alreadyRequested?: boolean;
}

export function SavedTutorRow({ tutor, index }: { tutor: SavedTutorRowData; index: number }) {
  const router = useRouter();
  const [removed, setRemoved] = useState(false);
  const [requested, setRequested] = useState(false);
  const isRequested = requested || Boolean(tutor.alreadyRequested);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [removePending, startRemoveTransition] = useTransition();
  const [requestPending, startRequestTransition] = useTransition();

  function handleRemove() {
    startRemoveTransition(async () => {
      const result = await toggleSavedTutor(tutor.tutorProfileId);
      if (result.ok) {
        setRemoved(true);
      } else {
        setToast({ tone: "error", message: result.message ?? "Couldn't remove this tutor." });
      }
    });
  }

  function handleRequest() {
    if (isRequested) return;
    startRequestTransition(async () => {
      const result = await requestSpecificTutor({
        tutorName: tutor.name,
        subject: tutor.subjects[0] ?? "General tutoring",
        tutorRate: tutor.price,
        tutorProfileId: tutor.tutorProfileId,
      });
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/dashboard")}`);
        return;
      }
      if (result.ok) {
        setRequested(true);
        setToast({ tone: "success", message: result.message ?? `Your request for ${tutor.name} has been sent.` });
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
      <TutorAvatar name={tutor.name} index={index} size={40} />
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
          {tutor.name}
        </div>
        <div className="text-[12.5px] mt-0.5 truncate" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
          {tutor.subjects.join(", ")} · {tutor.country}
        </div>
      </div>
      <div className="text-[13px] flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
        {tutor.price}
      </div>
      <button
        type="button"
        className="btn btn-primary text-[13px] flex-none"
        style={{ padding: "8px 14px" }}
        disabled={requestPending || isRequested}
        onClick={handleRequest}
      >
        {isRequested ? "Requested" : requestPending ? "Sending…" : "Request This Tutor"}
      </button>
      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Remove ${tutor.name} from saved tutors`}
        disabled={removePending}
        className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(217,45,32,0.1)] hover:text-[#d92d20] flex-none"
      >
        <XIcon width={15} height={15} />
      </button>
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

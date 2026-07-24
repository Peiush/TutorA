"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { submitTutorProfile } from "@/app/lib/actions/tutor-profile";
import { XIcon } from "@/components/dashboard/dashboard-icons";

type ProfileData = {
  country: string;
  subjects: string;
  yearsExperience: number | null;
  hourlyRateCents: number | null;
  bio: string | null;
  certificateUrl: string | null;
} | null;

function FieldGroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] uppercase font-semibold mt-1"
      style={{ letterSpacing: "0.05em", color: "color-mix(in srgb, var(--color-text) 67%, transparent)" }}
    >
      {children}
    </div>
  );
}

export function ProfileFormModal({
  profile,
  onClose,
  onSaved,
}: {
  profile: ProfileData;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [state, action, pending] = useActionState(submitTutorProfile, undefined);
  const [fileName, setFileName] = useState<string | null>(profile?.certificateUrl ?? null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (state?.message === "success" && !savedRef.current) {
      savedRef.current = true;
      onSaved(profile ? "Your listing has been updated and resubmitted for review." : "Your listing has been submitted for review.");
      onClose();
    }
  }, [state, onSaved, onClose, profile]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        action={action}
        className="card elev-lg gap-4 w-full max-w-[460px] max-h-[86vh] overflow-y-auto"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[19px]">{profile ? "Edit your listing" : "Create your listing"}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full grid place-content-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(21,33,58,0.08)]"
          >
            <XIcon width={16} height={16} />
          </button>
        </div>

        <FieldGroupHeading>About you</FieldGroupHeading>
        <div className="field">
          <label>Country</label>
          <input className="input" name="country" placeholder="United Kingdom" defaultValue={profile?.country} required />
        </div>

        <FieldGroupHeading>Your teaching profile</FieldGroupHeading>
        <div className="field">
          <label>Subjects you teach</label>
          <input
            className="input"
            name="subjects"
            placeholder="e.g. Physics, Mathematics"
            defaultValue={profile?.subjects}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label>Years of experience</label>
            <input
              className="input"
              name="yearsExperience"
              type="number"
              placeholder="8"
              defaultValue={profile?.yearsExperience ?? undefined}
            />
          </div>
          <div className="field">
            <label>Fee (per hour)</label>
            <input
              className="input"
              name="hourlyRate"
              placeholder="$40"
              defaultValue={profile?.hourlyRateCents ? `$${(profile.hourlyRateCents / 100).toFixed(0)}` : undefined}
            />
          </div>
        </div>
        <div className="field">
          <label>Short bio</label>
          <textarea
            className="input"
            name="bio"
            rows={3}
            placeholder="Tell students how you teach and who you help best"
            defaultValue={profile?.bio ?? undefined}
          />
        </div>

        <FieldGroupHeading>Verification</FieldGroupHeading>
        <div className="field">
          <label>Qualifications</label>
          <label className="btn btn-secondary btn-block justify-start cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <path d="m17 8-5-5-5 5" />
              <path d="M5 21h14" />
            </svg>
            {fileName ?? "Upload certificates"}
            <input
              type="file"
              name="certificate"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? fileName)}
            />
          </label>
        </div>

        {state?.message && state.message !== "success" && (
          <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
            {state.message}
          </p>
        )}

        <div className="flex justify-end gap-2.5 mt-1">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={pending}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Submitting…" : profile ? "Save changes" : "Submit for review"}
          </button>
        </div>
        <p
          className="text-[12.5px] m-0 text-center"
          style={{ color: "color-mix(in srgb, var(--color-text) 64%, transparent)" }}
        >
          Listings are reviewed within 24–48 hours before going live.
        </p>
      </form>
    </div>,
    document.body
  );
}

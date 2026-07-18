"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { submitTutorProfile } from "@/app/lib/actions/tutor-profile";

gsap.registerPlugin(useGSAP);

function FieldGroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] uppercase font-semibold mt-1"
      style={{ letterSpacing: "0.05em", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
    >
      {children}
    </div>
  );
}

export function BecomeForm() {
  const [state, action, pending] = useActionState(submitTutorProfile, undefined);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message === "success") setSubmitted(true);
  }, [state]);

  useGSAP(
    () => {
      const el = formRef.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    },
    { scope: formRef }
  );

  if (submitted) {
    return (
      <div
        className="card elev-md gap-4 p-[var(--space-6)] text-center"
        style={{ background: "var(--color-bg)" }}
      >
        <div
          className="w-14 h-14 rounded-full grid place-content-center mx-auto"
          style={{ background: "color-mix(in srgb, var(--color-verified) 18%, transparent)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-verified)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-[var(--font-heading)] text-[22px]">Listing submitted</h2>
        <p
          className="text-[14px] leading-[1.6] m-0"
          style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
        >
          We&rsquo;ll review your profile and get back to you within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={action}
      className="card elev-md gap-4 p-[var(--space-6)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="font-[var(--font-heading)] text-[22px]">Create your listing</div>

      <FieldGroupHeading>About you</FieldGroupHeading>
      <div className="field">
        <label>Country</label>
        <input className="input" name="country" placeholder="United Kingdom" required />
      </div>

      <FieldGroupHeading>Your teaching profile</FieldGroupHeading>
      <div className="field">
        <label>Subjects you teach</label>
        <input className="input" name="subjects" placeholder="e.g. Physics, Mathematics" required />
      </div>
      <div className="grid grid-cols-2 gap-[var(--space-3)]">
        <div className="field">
          <label>Years of experience</label>
          <input className="input" name="yearsExperience" type="number" placeholder="8" />
        </div>
        <div className="field">
          <label>Fee (per hour)</label>
          <input className="input" name="hourlyRate" placeholder="$40" />
        </div>
      </div>
      <div className="field">
        <label>Short bio</label>
        <textarea
          className="input"
          name="bio"
          placeholder="Tell students how you teach and who you help best"
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
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
      </div>

      {state?.message && state.message !== "success" && (
        <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
          {state.message}{" "}
          {state.message.includes("Create a tutor account") && (
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          )}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? "Submitting…" : "Submit for review"}
      </button>
      <p
        className="text-[12.5px] m-0 text-center"
        style={{ color: "color-mix(in srgb, var(--color-text) 64%, transparent)" }}
      >
        Profiles are reviewed within 24–48 hours before going live.
      </p>
    </form>
  );
}

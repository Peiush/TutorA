"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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

function SubmittedScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = checkRef.current;
        const length = path?.getTotalLength() ?? 0;
        if (path) {
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".bf-badge", { scale: 0, rotation: -20, duration: 0.5, ease: "back.out(2)" });
        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "-=0.15");
        }
        tl.from(".bf-heading", { autoAlpha: 0, y: 10, duration: 0.35 }, "-=0.1").from(
          ".bf-copy",
          { autoAlpha: 0, y: 10, duration: 0.35 },
          "-=0.2"
        );
        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="card elev-md gap-4 p-[var(--space-6)] text-center"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="bf-badge w-14 h-14 rounded-full grid place-content-center mx-auto"
        style={{ background: "color-mix(in srgb, var(--color-verified) 18%, transparent)" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-verified)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path ref={checkRef} d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 className="bf-heading font-[var(--font-heading)] text-[22px]">Teacher added</h2>
      <p
        className="bf-copy text-[14px] leading-[1.6] m-0"
        style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
      >
        This teacher is now live in the listings and ready to be matched with students.
      </p>
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
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(el.querySelectorAll(".field, button[type='submit']"), {
          autoAlpha: 0,
          y: 12,
          stagger: 0.06,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.15,
        });
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: formRef }
  );

  if (submitted) {
    return <SubmittedScreen />;
  }

  return (
    <form
      ref={formRef}
      action={action}
      className="card elev-md gap-4 p-[var(--space-6)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="font-[var(--font-heading)] text-[22px]">Add a teacher</div>

      <FieldGroupHeading>Teacher details</FieldGroupHeading>
      <div className="field">
        <label>Full name</label>
        <input className="input" name="name" placeholder="Jane Doe" required />
      </div>
      <div className="field">
        <label>Email</label>
        <input className="input" name="email" type="email" placeholder="jane@example.com" required />
      </div>
      <div className="field">
        <label>Country</label>
        <input className="input" name="country" placeholder="United Kingdom" required />
      </div>

      <FieldGroupHeading>Teaching profile</FieldGroupHeading>
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
          {state.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? "Adding…" : "Add teacher"}
      </button>
      <p
        className="text-[12.5px] m-0 text-center"
        style={{ color: "color-mix(in srgb, var(--color-text) 64%, transparent)" }}
      >
        The listing goes live immediately for students to find and request.
      </p>
    </form>
  );
}

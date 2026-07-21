"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { HeroMatchIllustration } from "@/components/find/illustrations";

gsap.registerPlugin(useGSAP);

const STATS = [
  { value: "verified", label: "Every tutor background-checked" },
  { value: "private", label: "Contact details never shared" },
  { value: "personal", label: "A real person makes the intro" },
];

export function FindHero({
  tutorCount,
  subjectCount,
}: {
  tutorCount?: number;
  subjectCount?: number;
} = {}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".fh-blob", { autoAlpha: 0, scale: 0.7, duration: 0.9, ease: "power2.out", stagger: 0.08 })
          .from(".fh-tag", { autoAlpha: 0, y: -8, duration: 0.4 }, "-=0.55")
          .from(".fh-heading", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.2")
          .from(".fh-copy", { autoAlpha: 0, y: 12, duration: 0.45 }, "-=0.3")
          .from(".fh-stat", { autoAlpha: 0, y: 14, duration: 0.4, stagger: 0.08 }, "-=0.25")
          .from(".fh-illustration", { autoAlpha: 0, y: 24, scale: 0.9, duration: 0.6, ease: "back.out(1.6)" }, "-=0.6");

        gsap.to(".fh-illustration", {
          y: -8,
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(".fh-blob-1", {
          y: 18,
          x: 10,
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(".fh-blob-2", {
          y: -14,
          x: -12,
          duration: 8.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative overflow-hidden mb-2">
      <div
        className="fh-blob fh-blob-1 pointer-events-none absolute -z-10 rounded-full blur-3xl"
        style={{
          width: 340,
          height: 340,
          top: -180,
          left: -100,
          background: "radial-gradient(circle, var(--color-accent-300) 0%, transparent 70%)",
          opacity: 0.55,
        }}
        aria-hidden
      />
      <div
        className="fh-blob fh-blob-2 pointer-events-none absolute -z-10 rounded-full blur-3xl"
        style={{
          width: 300,
          height: 300,
          top: -140,
          right: -80,
          background: "radial-gradient(circle, var(--color-accent-2-300) 0%, transparent 70%)",
          opacity: 0.45,
        }}
        aria-hidden
      />

      <div className="grid gap-8 items-center [grid-template-columns:1fr_260px] max-[900px]:[grid-template-columns:1fr]">
        <div>
          <Tag variant="accent-2" className="fh-tag text-[12px] px-3.5 py-1.5">
            Find a Tutor
          </Tag>
          <h1 className="fh-heading font-bold text-[clamp(30px,4vw,48px)] mt-4 mb-1">
            Browse verified tutors
          </h1>
          <p
            className="fh-copy text-[16px] mb-3 max-w-[56ch]"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            {typeof tutorCount === "number" && tutorCount > 0
              ? `${tutorCount} verified tutor${tutorCount === 1 ? "" : "s"}${
                  typeof subjectCount === "number" && subjectCount > 0 ? ` across ${subjectCount} subjects` : ""
                }. `
              : ""}
            Contact details stay private. Request a tutor and our team makes the introduction.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-8">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="fh-stat inline-flex items-center gap-2 rounded-full pl-2.5 pr-4 py-1.5 border"
                style={{
                  background: "color-mix(in srgb, var(--color-surface) 70%, transparent)",
                  borderColor: "var(--color-divider)",
                }}
              >
                <span
                  className="grid place-content-center rounded-full flex-none"
                  style={{ width: 22, height: 22, background: "var(--color-verified)" }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-[12.5px] font-medium" style={{ color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <HeroMatchIllustration className="fh-illustration hidden min-[901px]:block w-full h-auto max-w-[260px] justify-self-center" />
      </div>
    </div>
  );
}

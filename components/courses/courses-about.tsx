"use client";

import { useRef, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayersIcon, UserCheckIcon, VideoIcon } from "@/components/courses/course-icons";
import { scrollRevealSafetyNet } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    n: "01",
    icon: LayersIcon,
    title: "Grouped by grade & subject",
    body: "A Grade 6–8 bundle, for example, can span 7 subjects at once — pick a band and see everything inside it.",
    color: "accent",
  },
  {
    n: "02",
    icon: UserCheckIcon,
    title: "Matched with a verified tutor",
    body: "Tell us what you need and our team personally vets and matches you with the right tutor — no algorithm guesswork.",
    color: "accent-2",
  },
  {
    n: "03",
    icon: VideoIcon,
    title: "Live, 1:1 sessions",
    body: "Meet face-to-face on video for real, personalized teaching in every subject — never a pre-recorded course.",
    color: "verified",
  },
] as const;

const STEP_STYLES = {
  accent: {
    badgeBg: "var(--color-accent-100)",
    icon: "var(--color-accent-700)",
    ring: "color-mix(in srgb, var(--color-accent-600) 30%, transparent)",
    numeral: "var(--color-accent-600)",
  },
  "accent-2": {
    badgeBg: "var(--color-accent-2-100)",
    icon: "var(--color-accent-2-700)",
    ring: "color-mix(in srgb, var(--color-accent-2-600) 30%, transparent)",
    numeral: "var(--color-accent-2-600)",
  },
  verified: {
    badgeBg: "color-mix(in srgb, var(--color-verified) 14%, var(--color-bg))",
    icon: "var(--color-verified)",
    ring: "color-mix(in srgb, var(--color-verified) 32%, transparent)",
    numeral: "var(--color-verified)",
  },
} as const;

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const style = STEP_STYLES[step.color];
  const Icon = step.icon;

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleEnter = contextSafe(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(cardRef.current?.querySelector(".ca-badge") ?? [], {
      scale: 1.12,
      rotate: -6,
      duration: 0.35,
      ease: "back.out(2.2)",
    });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(cardRef.current?.querySelector(".ca-badge") ?? [], {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="ca-fact group relative flex-1 min-w-[220px] rounded-2xl border p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
      style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
    >
      <span
        className="pointer-events-none absolute -top-1 right-3 text-[56px] font-bold leading-none select-none opacity-[0.07]"
        style={{ color: style.numeral, fontFamily: "var(--font-heading)" }}
        aria-hidden
      >
        {step.n}
      </span>

      <span
        className="ca-badge relative z-10 inline-grid w-11 h-11 rounded-full place-content-center"
        style={{ background: style.badgeBg, color: style.icon, boxShadow: `0 0 0 4px ${style.ring}` }}
      >
        <Icon width={18} height={18} />
      </span>

      <h3 className="relative z-10 text-[15.5px] font-bold mt-4 mb-1.5">{step.title}</h3>
      <p
        className="relative z-10 text-[13px] leading-relaxed"
        style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
      >
        {step.body}
      </p>

      {/* Connector to the next step — desktop only, sits between cards via the flex gap */}
      {index < STEPS.length - 1 && (
        <span
          className="ca-connector hidden lg:grid absolute top-1/2 -right-[27px] -translate-y-1/2 z-20 w-6 h-6 rounded-full place-content-center"
          style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", color: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}
          aria-hidden
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </div>
  );
}

export function CoursesAbout() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        if (!root) return;

        // Paused, NOT bound via a `scrollTrigger:` config on the timeline itself. This
        // section sits below the whole course browser grid, which keeps changing height
        // for several seconds after load (async tutor/subject data, lazy-loaded hero
        // illustration, web fonts swapping). ScrollTriggerGuard (see that file) reruns
        // ScrollTrigger.refresh() once things settle, which recalculates this trigger's
        // start/end pixel position. When a timeline is directly linked via `scrollTrigger:`,
        // GSAP resyncs the timeline's progress to match the *recalculated* position on
        // refresh — if the layout shift makes it look like the trigger point hasn't been
        // reached yet, that resync snaps progress back to 0, hiding everything that had
        // already played. A standalone ScrollTrigger.create() with once:true has no
        // animation to resync, so a refresh can only re-check the crossing and call
        // onEnter — never un-plays a timeline that already finished.
        const tl = gsap
          .timeline({ paused: true })
          .from(".ca-blob", { autoAlpha: 0, scale: 0.85, duration: 0.8, ease: "power2.out" })
          .from(".ca-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" }, "-=0.5")
          .from(".ca-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".ca-copy", { autoAlpha: 0, y: 12, duration: 0.45, ease: "power3.out" }, "-=0.25")
          .from(".ca-fact", { autoAlpha: 0, y: 26, scale: 0.94, duration: 0.5, stagger: 0.12, ease: "back.out(1.7)" }, "-=0.15")
          .from(".ca-connector", { autoAlpha: 0, scale: 0.4, duration: 0.3, stagger: 0.12, ease: "back.out(2.4)" }, "-=0.35");

        ScrollTrigger.create({ trigger: root, start: "top 82%", once: true, onEnter: () => tl.play() });

        // Checking only ".ca-tag" here would false-negative: it's early in the timeline
        // and reaches autoAlpha:1 well before ".ca-fact"/".ca-connector" do, so if the
        // timeline gets interrupted mid-flight the tag can already read "visible" while
        // later elements are stuck at 0 — and the safety net would skip them entirely.
        // Checking the timeline's own progress catches that for every element, and
        // forcing progress to 1 completes the tween in place instead of snapping via a
        // separate gsap.set (see components/home/popular-subjects.tsx for the same fix).
        return scrollRevealSafetyNet(root, () => tl.progress() < 1, () => tl.progress(1));
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".ca-blob, .ca-tag, .ca-heading, .ca-copy, .ca-fact, .ca-connector", { autoAlpha: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      id="about-courses"
      className="relative overflow-hidden scroll-mt-24 mb-14 md:mb-16 rounded-[32px] px-5 sm:px-10 py-12 sm:py-14"
      style={{ background: "var(--color-surface)" }}
    >
      <div
        className="ca-blob pointer-events-none absolute -top-20 -left-16 w-[280px] h-[280px] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--color-accent-200)" }}
        aria-hidden
      />
      <div
        className="ca-blob pointer-events-none absolute -bottom-24 -right-16 w-[280px] h-[280px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--color-accent-2-200)" }}
        aria-hidden
      />

      <div className="relative max-w-[640px] mx-auto text-center mb-10">
        <p className="ca-tag text-[11px] font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--color-accent-700)" }}>
          About courses
        </p>
        <h2 className="ca-heading text-[clamp(24px,2.8vw,32px)] mb-4">How TutorA courses work</h2>
        <p
          className="ca-copy text-[15.5px] leading-relaxed max-w-[52ch] mx-auto"
          style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}
        >
          From browsing to your first live class — three steps, personally overseen by our team.
        </p>
      </div>

      <div className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 max-w-[1000px] mx-auto">
        {STEPS.map((step, i) => (
          <StepCard key={step.n} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Tag } from "@/components/ui/tag";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CourseIllustration } from "@/components/courses/course-illustrations";
import {
  CheckIcon,
  LayersIcon,
  UserCheckIcon,
  VideoIcon,
  MicIcon,
  CameraIcon,
  PhoneOffIcon,
} from "@/components/courses/course-icons";
import { courseCategories } from "@/lib/mock-courses";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

const FACTS = [
  { icon: LayersIcon, label: "Grouped by grade & subject" },
  { icon: UserCheckIcon, label: "Matched with a verified tutor" },
  { icon: VideoIcon, label: "Live, 1:1 sessions" },
];

const REQUEST_SUBJECTS = ["Math", "Science", "English", "+4 more"];
const TUTOR_SUBJECTS = ["Math", "Science"];

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// A curved connector that swings from one side of the column to the other — the
// zigzag between stops is what makes the journey read as one flowing path instead
// of a straight line down the middle.
function ZigConnector({ index, from }: { index: 1 | 2; from: "right" | "left" }) {
  const x1 = from === "right" ? 84 : 16;
  const x2 = from === "right" ? 16 : 84;
  const d = `M ${x1} 2 C ${x1} 36, ${x2} 30, ${x2} 60 S ${x2} 92, ${x2} 98`;
  return (
    <div className="relative w-full flex-1 min-h-[70px]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden>
        <path d={d} fill="none" stroke="var(--color-accent-400)" strokeWidth="1" strokeDasharray="0.5 3.4" opacity="0.5" vectorEffect="non-scaling-stroke" />
        <path
          id={`ci-path-${index}`}
          className={`ci-connector-path-${index}`}
          d={d}
          fill="none"
          stroke="var(--color-accent-600)"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className={`ci-connector-dot-${index} absolute w-2.5 h-2.5 rounded-full`}
        style={{
          left: 0,
          top: 0,
          marginLeft: -5,
          marginTop: -5,
          background: "var(--color-accent-600)",
          boxShadow: "0 0 0 4px color-mix(in srgb, var(--color-accent-600) 20%, transparent)",
        }}
      />
    </div>
  );
}

export function CoursesIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const stop1Ref = useRef<HTMLDivElement>(null);
  const stop2Ref = useRef<HTMLDivElement>(null);
  const stop3Ref = useRef<HTMLDivElement>(null);
  const tiltX = useRef<((v: number) => void) | null>(null);
  const tiltY = useRef<((v: number) => void) | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ delay: 0.05 })
          // Hero
          .from(".ci-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" })
          .from(".ci-heading", { autoAlpha: 0, y: 18, duration: 0.55, ease: "power3.out" }, "-=0.2")
          .from(".ci-copy", { autoAlpha: 0, y: 12, duration: 0.45, ease: "power3.out" }, "-=0.3")
          .from(".ci-cta", { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.3")
          // Journey stop 1 — explore (right side, drops in from upper-right)
          .from(".ci-stop-1", { autoAlpha: 0, x: 30, y: -16, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".ci-explore-tile", { autoAlpha: 0, scale: 0.5, duration: 0.45, stagger: 0.07, ease: "back.out(1.8)" }, "-=0.35")
          .from(".ci-explore-chip", { autoAlpha: 0, y: 8, duration: 0.35, ease: "power3.out" }, "-=0.15")
          // About text
          .from(".ci-about-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" }, "-=0.1")
          .from(".ci-about-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".ci-about-copy", { autoAlpha: 0, y: 12, duration: 0.45, ease: "power3.out" }, "-=0.3")
          .from(".ci-fact", { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.2")
          // Connector 1 — draws + a dot travels the curve from stop 1 to stop 2
          .fromTo(".ci-connector-path-1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.6, ease: "power2.inOut" }, "-=0.3")
          .to(
            ".ci-connector-dot-1",
            { motionPath: { path: "#ci-path-1", align: "#ci-path-1", alignOrigin: [0.5, 0.5], start: 0, end: 1 }, duration: 0.6, ease: "power2.inOut" },
            "<"
          )
          // Journey stop 2 — match (left side, slides in from the left, settles with a slight tilt)
          .from(".ci-stop-2", { autoAlpha: 0, x: -40, rotate: -6, duration: 0.55, ease: "power3.out" }, "-=0.2")
          .from(".ci-request-card", { autoAlpha: 0, y: -12, duration: 0.4, ease: "power3.out" }, "-=0.3")
          .from(".ci-request-chip", { autoAlpha: 0, y: 6, scale: 0.85, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, "-=0.2")
          .from(".ci-mockup", { autoAlpha: 0, y: 16, scale: 0.94, duration: 0.5, ease: "back.out(1.5)" }, "-=0.1")
          .fromTo(".ci-avatar", { scale: 0.7 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" }, "-=0.3")
          .from(".ci-matched-badge", { autoAlpha: 0, scale: 0.4, y: -6, duration: 0.45, ease: "back.out(2.2)" }, "-=0.35")
          // Connector 2 — draws + dot travels back from stop 2 to stop 3
          .fromTo(".ci-connector-path-2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.6, ease: "power2.inOut" }, "-=0.1")
          .to(
            ".ci-connector-dot-2",
            { motionPath: { path: "#ci-path-2", align: "#ci-path-2", alignOrigin: [0.5, 0.5], start: 0, end: 1 }, duration: 0.6, ease: "power2.inOut" },
            "<"
          )
          // Journey stop 3 — live class (right side, slides in from the right, opposite tilt)
          .from(".ci-stop-3", { autoAlpha: 0, x: 40, rotate: 6, duration: 0.55, ease: "power3.out" }, "-=0.2")
          .from(".ci-call-card", { autoAlpha: 0, y: 16, scale: 0.94, duration: 0.4, ease: "back.out(1.5)" }, "-=0.3")
          .from(".ci-call-tile", { autoAlpha: 0, scale: 0.85, duration: 0.4, stagger: 0.1, ease: "back.out(1.9)" }, "-=0.2")
          .from(".ci-call-control", { autoAlpha: 0, y: 8, duration: 0.35, stagger: 0.05, ease: "power2.out" }, "-=0.15")
          .from(".ci-live-badge", { autoAlpha: 0, scale: 0.4, duration: 0.4, ease: "back.out(2.2)" }, "-=0.3")
          .from(".ci-call-caption", { autoAlpha: 0, y: 6, duration: 0.35, ease: "power2.out" }, "-=0.15");

        // Gentle scroll-linked parallax: each stop drifts at its own rate as the tall
        // section scrolls by, so the three stops separate in depth instead of moving
        // as one flat block.
        const parallax: [HTMLDivElement | null, number][] = [
          [stop1Ref.current, 28],
          [stop2Ref.current, -22],
          [stop3Ref.current, 34],
        ];
        parallax.forEach(([el, depth]) => {
          if (!el) return;
          gsap.to(el, {
            y: `+=${depth}`,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        if (canHover() && mockupRef.current) {
          gsap.set(mockupRef.current, { transformPerspective: 900, transformStyle: "preserve-3d" });
          tiltX.current = gsap.quickTo(mockupRef.current, "rotationX", { duration: 0.6, ease: "power3.out" });
          tiltY.current = gsap.quickTo(mockupRef.current, "rotationY", { duration: 0.6, ease: "power3.out" });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".ci-tag",
            ".ci-heading",
            ".ci-copy",
            ".ci-cta",
            ".ci-stop-1",
            ".ci-explore-tile",
            ".ci-explore-chip",
            ".ci-about-tag",
            ".ci-about-heading",
            ".ci-about-copy",
            ".ci-fact",
            ".ci-stop-2",
            ".ci-request-card",
            ".ci-request-chip",
            ".ci-mockup",
            ".ci-avatar",
            ".ci-matched-badge",
            ".ci-stop-3",
            ".ci-call-card",
            ".ci-call-tile",
            ".ci-call-control",
            ".ci-live-badge",
            ".ci-call-caption",
          ].join(", "),
          { autoAlpha: 1, x: 0, y: 0, scale: 1, rotate: 0, clearProps: "transform" }
        );
        gsap.set(".ci-connector-path-1, .ci-connector-path-2", { drawSVG: "100%" });
        gsap.set(".ci-connector-dot-1", { motionPath: { path: "#ci-path-1", align: "#ci-path-1", alignOrigin: [0.5, 0.5], start: 0, end: 1 } });
        gsap.set(".ci-connector-dot-2", { motionPath: { path: "#ci-path-2", align: "#ci-path-2", alignOrigin: [0.5, 0.5], start: 0, end: 1 } });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const handleTiltMove = contextSafe((e: MouseEvent<HTMLDivElement>) => {
    if (!tiltX.current || !tiltY.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.current(px * 10);
    tiltX.current(-py * 10);
  });

  const resetTilt = contextSafe(() => {
    tiltX.current?.(0);
    tiltY.current?.(0);
  });

  return (
    <div ref={rootRef} className="mb-7 md:mb-12">
      <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT COLUMN — hero intro + about courses, stacked */}
        <div className="flex flex-col justify-between gap-10 lg:gap-14">
          <div className="max-w-[560px]">
            <Tag variant="accent-2" className="ci-tag text-[12px] px-3.5 py-1.5">
              Courses
            </Tag>
            <h1 className="ci-heading font-bold text-[clamp(30px,4vw,48px)] mt-4 mb-1">
              Personalized Online Learning with Expert Indian Teachers
            </h1>
            <p
              className="ci-copy text-[16px] mt-4 mb-6"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              Live 1-on-1 and small-group classes for Grades 6-12, SAT prep, coding, and more — taught
              by experienced, verified Indian tutors matched to your goals, wherever you are in the
              world.
            </p>
            <div className="ci-cta flex flex-wrap gap-3">
              <Link href="#browse" className="btn btn-primary inline-block">
                Browse courses
              </Link>
              <Link href="#about-courses" className="btn btn-secondary inline-block">
                How it works
              </Link>
            </div>
          </div>

          <div id="about-courses" className="max-w-[560px] scroll-mt-24">
            <p
              className="ci-about-tag text-[11px] font-semibold uppercase tracking-wide mb-3"
              style={{ color: "var(--color-accent-700)" }}
            >
              About courses
            </p>
            <h2 className="ci-about-heading text-[clamp(24px,2.8vw,32px)] mb-4 max-w-[20ch]">
              How TutorA courses work
            </h2>
            <p
              className="ci-about-copy text-[15.5px] leading-relaxed mb-4 max-w-[52ch]"
              style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}
            >
              Courses are organized by grade and subject — a Grade 6–8 bundle, for example, can span 7
              subjects at once. Tell us what you need, and we match you with a verified tutor for live,
              personalized sessions in every subject.
            </p>

            <div className="pt-5 mt-2" style={{ borderTop: "1px solid var(--color-divider)" }}>
              <p
                className="text-[11px] font-semibold uppercase tracking-wide mb-3"
                style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
              >
                Quick facts
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
                {FACTS.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="ci-fact inline-flex items-center gap-1.5 sm:gap-2 rounded-full pl-1.5 sm:pl-2 pr-2.5 sm:pr-3.5 py-1 sm:py-1.5 text-[11.5px] sm:text-[13px] font-medium"
                    style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
                  >
                    <span
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full grid place-content-center flex-none"
                      style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                    >
                      <Icon width={11} height={11} />
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — the animated "journey" illustration: explore → match → live class,
            zigzagging left/right down the column to use the full width instead of one straight line */}
        <div className="hidden lg:flex flex-col" aria-hidden>
          {/* Stop 1 — explore categories (right-aligned) */}
          <div ref={stop1Ref} className="ci-stop-1 relative z-10 ml-auto flex flex-col items-end gap-3">
            <div className="flex items-center gap-2.5">
              {courseCategories.map((cat) => (
                <div
                  key={cat}
                  className="ci-explore-tile w-14 h-14 rounded-full overflow-hidden"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <CourseIllustration category={cat} className="w-full h-full" />
                </div>
              ))}
            </div>
            <span
              className="ci-explore-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
            >
              <LayersIcon width={12} height={12} style={{ color: "var(--color-accent-700)" }} />
              Explore by category
            </span>
          </div>

          <ZigConnector index={1} from="right" />

          {/* Stop 2 — request & match (left-aligned, slight tilt) */}
          <div ref={stop2Ref} className="ci-stop-2 relative z-10 mr-auto w-full max-w-[270px] rotate-[-1.5deg] flex flex-col items-center">
            <div
              className="ci-request-card relative z-10 w-full rounded-2xl border p-3.5"
              style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <span
                  className="w-6 h-6 rounded-full grid place-content-center flex-none"
                  style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                >
                  <LayersIcon width={12} height={12} />
                </span>
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-wide"
                  style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
                >
                  Your request
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold">Grade 6-8 bundle</span>
                <span className="text-[10px] font-semibold" style={{ color: "var(--color-accent-800)" }}>
                  7 subjects
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {REQUEST_SUBJECTS.map((s) => (
                  <span
                    key={s}
                    className="ci-request-chip inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium"
                    style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
                  >
                    {s !== "+4 more" && <CheckIcon width={8} height={8} style={{ color: "var(--color-verified)" }} />}
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative w-full flex justify-center" style={{ height: 56 }}>
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full rounded-full"
                style={{
                  backgroundImage: "repeating-linear-gradient(to bottom, var(--color-accent-400) 0 4px, transparent 4px 9px)",
                  opacity: 0.55,
                }}
                aria-hidden
              />
              <span
                className="ci-matched-badge absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 inline-flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5 whitespace-nowrap"
                style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", boxShadow: "var(--shadow-md)" }}
              >
                <span
                  className="w-5 h-5 rounded-full grid place-content-center flex-none"
                  style={{ background: "color-mix(in srgb, var(--color-verified) 18%, var(--color-bg))", color: "var(--color-verified)" }}
                >
                  <CheckIcon width={11} height={11} />
                </span>
                <span className="text-[10.5px] font-semibold">Matched!</span>
              </span>
            </div>

            <div
              ref={mockupRef}
              className="ci-mockup relative z-10 w-full rounded-2xl border p-4 will-change-transform"
              style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)", boxShadow: "0 28px 50px -20px rgba(20,16,8,0.28)" }}
              onMouseMove={handleTiltMove}
              onMouseLeave={resetTilt}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span
                  className="ci-avatar w-9 h-9 rounded-full grid place-content-center flex-none text-[12px] font-bold"
                  style={{ background: "var(--color-accent-600)", color: "#fff" }}
                >
                  RS
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] font-semibold truncate">Riya S.</span>
                    <UserCheckIcon width={12} height={12} style={{ color: "var(--color-verified)", flexShrink: 0 }} />
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <StarRating rating={4.9} size={11} />
                    <span className="text-[11px] font-semibold" style={{ color: "var(--color-accent-800)" }}>
                      4.9
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TUTOR_SUBJECTS.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ZigConnector index={2} from="left" />

          {/* Stop 3 — live 1:1 class (right-aligned, opposite tilt) */}
          <div ref={stop3Ref} className="ci-stop-3 relative z-10 ml-auto w-full max-w-[270px] rotate-[1.5deg] flex flex-col items-center">
            <div
              className="ci-call-card relative w-full rounded-2xl border p-3.5 overflow-hidden"
              style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)", boxShadow: "0 28px 50px -20px rgba(20,16,8,0.28)" }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className="ci-live-badge inline-flex items-center gap-1.5 rounded-full pl-1.5 pr-2.5 py-1 text-[10px] font-semibold"
                  style={{ background: "color-mix(in srgb, var(--color-verified) 14%, var(--color-bg))", color: "var(--color-verified)" }}
                >
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: "var(--color-verified)" }} />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5" style={{ background: "var(--color-verified)" }} />
                  </span>
                  LIVE
                </span>
                <span className="text-[10px] font-medium" style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                  32:14
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-3">
                <div
                  className="ci-call-tile aspect-square rounded-xl grid place-content-center text-[11px] font-bold"
                  style={{ background: "var(--color-accent-600)", color: "#fff" }}
                >
                  RS
                </div>
                <div
                  className="ci-call-tile aspect-square rounded-xl grid place-content-center text-[11px] font-bold"
                  style={{ background: "var(--color-accent-2-200)", color: "var(--color-accent-2-900)" }}
                >
                  You
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span
                  className="ci-call-control w-8 h-8 rounded-full grid place-content-center"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
                >
                  <MicIcon width={14} height={14} />
                </span>
                <span
                  className="ci-call-control w-8 h-8 rounded-full grid place-content-center"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
                >
                  <CameraIcon width={14} height={14} />
                </span>
                <span
                  className="ci-call-control w-8 h-8 rounded-full grid place-content-center"
                  style={{ background: "color-mix(in srgb, #d92d20 12%, var(--color-bg))", color: "#d92d20" }}
                >
                  <PhoneOffIcon width={14} height={14} />
                </span>
              </div>
            </div>
            <span
              className="ci-call-caption mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
            >
              <VideoIcon width={12} height={12} style={{ color: "var(--color-accent-700)" }} />
              Live 1:1 · Math, Grade 7
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

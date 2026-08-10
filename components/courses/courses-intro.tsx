"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { LayersIcon, UserCheckIcon, VideoIcon } from "@/components/courses/course-icons";

gsap.registerPlugin(useGSAP);

// The animated "journey" illustration (explore → match → live class) is purely
// decorative (aria-hidden, hidden below the lg breakpoint) but pulls in
// ScrollTrigger plus the DrawSVG/MotionPath plugins. Loading it eagerly here
// meant every device — phones included, where it never even renders — paid for
// that JS before the hero text could paint. Lazy-loading it keeps that weight
// out of the initial chunk and off the critical path entirely.
const CoursesIntroIllustration = dynamic(
  () => import("@/components/courses/courses-intro-illustration").then((m) => m.CoursesIntroIllustration),
  {
    ssr: false,
    loading: () => <div className="hidden lg:block min-h-[720px]" aria-hidden />,
  }
);

const FACTS = [
  { icon: LayersIcon, label: "Grouped by grade & subject" },
  { icon: UserCheckIcon, label: "Matched with a verified tutor" },
  { icon: VideoIcon, label: "Live, 1:1 sessions" },
];

export function CoursesIntro() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // .ci-copy and .ci-about-copy are this page's LCP candidates (the latter measured
        // as the actual LCP element on mobile — RE-AUDIT-REPORT-2026-08-10-POSTFIX.md) and
        // are intentionally left out of this timeline entirely. Chrome defers an element's
        // LCP timestamp until any transform/opacity/filter transition targeting it settles,
        // so animating either paragraph — even without autoAlpha — reintroduces multi-second
        // render-delay. Both must render fully static from first paint.
        gsap
          .timeline({ delay: 0.05 })
          // Hero
          .from(".ci-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" })
          .from(".ci-heading", { autoAlpha: 0, y: 18, duration: 0.55, ease: "power3.out" }, "-=0.2")
          .from(".ci-cta", { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.35")
          // About text
          .from(".ci-about-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" }, "-=0.15")
          .from(".ci-about-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".ci-fact", { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.3");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".ci-tag", ".ci-heading", ".ci-cta", ".ci-about-tag", ".ci-about-heading", ".ci-fact"].join(", "),
          { autoAlpha: 1, y: 0, clearProps: "transform" }
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

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

        {/* RIGHT COLUMN — the animated "journey" illustration, lazy-loaded */}
        <CoursesIntroIllustration />
      </div>
    </div>
  );
}

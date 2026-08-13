"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";

gsap.registerPlugin(useGSAP);

const SHOW_ILLUSTRATION = true;

// The stat-hub illustration (category orbit + rating/learner proof chips) is purely
// decorative (aria-hidden, hidden below the lg breakpoint) but pulls in GSAP. Loading
// it eagerly here meant every device — phones included, where it never even renders —
// paid for that JS before the hero text could paint. Lazy-loading it keeps that weight
// out of the initial chunk and off the critical path entirely.
const CoursesHeroShowcase = dynamic(
  () => import("@/components/courses/courses-hero-showcase").then((m) => m.CoursesHeroShowcase),
  {
    ssr: false,
    loading: () => <div className="hidden lg:block min-h-[480px]" aria-hidden />,
  }
);

export function CoursesIntro() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // .ci-copy is this page's LCP candidate and is intentionally left out of this
        // timeline entirely. Chrome defers an element's LCP timestamp until any
        // transform/opacity/filter transition targeting it settles, so animating it —
        // even without autoAlpha — reintroduces multi-second render-delay. It must
        // render fully static from first paint.
        gsap
          .timeline({ delay: 0.05 })
          .from(".ci-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" })
          .from(".ci-heading", { autoAlpha: 0, y: 18, duration: 0.55, ease: "power3.out" }, "-=0.2")
          .from(".ci-cta", { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.35");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".ci-tag", ".ci-heading", ".ci-cta"].join(", "), { autoAlpha: 1, y: 0, clearProps: "transform" });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="mb-6 md:mb-8">
      <div
        className={
          SHOW_ILLUSTRATION
            ? "grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1fr] lg:items-center"
            : "grid gap-8"
        }
      >
        <div className="max-w-[560px]">
          <Tag variant="accent-2" className="ci-tag text-[12px] px-3.5 py-1.5">
            Courses
          </Tag>
          <h1 className="ci-heading font-bold text-[clamp(28px,3.6vw,44px)] mt-4 mb-1 leading-[1.1]">
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
          {/* Server-rendered, always-crawlable entry points into the site's core audience —
              Grade 6-12 subjects and the full subject catalog — matching the /courses?category=...
              state the category selector below sets client-side (no href of its own). See the
              internal-linking audit (2026-08-09): ~91 of ~103 /subjects pages had zero inbound
              on-page link. */}
          <div className="ci-cta flex flex-col items-start gap-4">
            <Link
              href="#browse"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-bold transition-transform hover:-translate-y-0.5"
              style={{
                color: "var(--color-accent-800)",
                background: "var(--color-accent-100)",
                boxShadow: "0 1px 2px color-mix(in srgb, var(--color-accent-600) 25%, transparent)",
              }}
            >
              Looking for Grade 6-8, 9-10, or 11-12 subjects? Browse by grade
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/subjects"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-bold transition-transform hover:-translate-y-0.5"
              style={{
                color: "var(--color-verified)",
                background: "color-mix(in srgb, var(--color-verified) 12%, var(--color-bg))",
                boxShadow: "0 1px 2px color-mix(in srgb, var(--color-verified) 25%, transparent)",
              }}
            >
              Not sure yet? See all 100+ subjects across every exam board
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN — the animated stat-hub illustration, lazy-loaded */}
        {SHOW_ILLUSTRATION && <CoursesHeroShowcase />}
      </div>
    </div>
  );
}

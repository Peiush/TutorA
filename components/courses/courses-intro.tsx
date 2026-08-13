"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { StarRating } from "@/components/ui/tutor-avatar";
import { GraduationCapIcon } from "@/components/courses/course-icons";

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
          .from(".ci-blob", { autoAlpha: 0, scale: 0.7, duration: 0.9, ease: "power2.out" }, 0)
          .from(".ci-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" }, "-=0.6")
          .from(".ci-badge", { autoAlpha: 0, scale: 0.7, duration: 0.45, ease: "back.out(2)" }, "-=0.3")
          .from(".ci-heading", { autoAlpha: 0, y: 18, duration: 0.55, ease: "power3.out" }, "-=0.2")
          .from(".ci-cta", { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.35");

        // Gentle ambient life so the hero doesn't sit dead-still once it's in — a slow
        // opacity/scale breathe on the blobs and a small idle float on the mobile badge,
        // same cadence family as the desktop showcase's .ch-float tiles.
        gsap.to(".ci-blob", { scale: 1.08, opacity: "+=0.06", duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.7 });
        gsap.to(".ci-badge", { y: "+=5", duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".ci-blob", ".ci-tag", ".ci-badge", ".ci-heading", ".ci-cta"].join(", "), { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
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
        <div className="max-w-[560px] relative">
          {/* Ambient color blobs — the mobile hero previously had nothing but flat text
              on a flat background once the desktop stat-hub illustration dropped out
              below lg. These give it the same "alive" glow the rest of the site uses. */}
          <div
            className="ci-blob pointer-events-none absolute -top-14 -left-10 w-[220px] h-[220px] rounded-full blur-3xl opacity-40"
            style={{ background: "var(--color-accent-2-200)" }}
            aria-hidden
          />
          <div
            className="ci-blob pointer-events-none absolute top-16 -right-8 w-[180px] h-[180px] rounded-full blur-3xl opacity-30"
            style={{ background: "var(--color-accent-300)" }}
            aria-hidden
          />
          <div className="relative z-[1] flex items-center justify-between gap-3">
            <Tag variant="accent-2" className="ci-tag text-[12px] px-3.5 py-1.5">
              Courses
            </Tag>
            {/* Small mobile-only illustration — the desktop stat-hub (CoursesHeroShowcase)
                is hidden below lg since it has nowhere to go, which left the mobile hero
                as text with nothing decorative in it. This gives it a compact taste of the
                same "150+ courses, verified tutors" proof without adding real height. */}
            <div
              className="ci-badge lg:hidden flex-none inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5"
              style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
              aria-hidden
            >
              <span
                className="w-6 h-6 rounded-full grid place-content-center flex-none"
                style={{ background: "var(--color-accent-2-700)", color: "#fff" }}
              >
                <GraduationCapIcon width={13} height={13} />
              </span>
              <span className="flex flex-col leading-none gap-0.5">
                <span className="text-[11px] font-bold">150+ courses</span>
                <span className="inline-flex items-center gap-1">
                  <StarRating rating={4.9} size={9} />
                </span>
              </span>
            </div>
          </div>
          <h1 className="ci-heading relative z-[1] font-bold text-[clamp(24px,7vw,44px)] mt-3 sm:mt-4 mb-1 leading-[1.15] sm:leading-[1.1]">
            Personalized Online Learning with{" "}
            <span
              style={{
                fontFamily: "var(--font-accent)",
                fontWeight: 600,
                color: "var(--color-accent-2-700)",
                fontSize: "1.05em",
                display: "inline-block",
                transform: "rotate(-2deg)",
              }}
            >
              Expert
            </span>{" "}
            Indian Teachers
          </h1>
          <p
            className="ci-copy relative z-[1] text-[14.5px] sm:text-[16px] mt-2.5 mb-4 sm:mt-4 sm:mb-6 leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            Live 1-on-1 and small-group classes for Grades 6-12, SAT prep, coding, and more
            <span className="hidden sm:inline">
              {" "}— taught by experienced, verified Indian tutors matched to your goals, wherever
              you are in the world.
            </span>
          </p>
          {/* Server-rendered, always-crawlable entry points into the site's core audience —
              Grade 6-12 subjects and the full subject catalog — matching the /courses?category=...
              state the category selector below sets client-side (no href of its own). See the
              internal-linking audit (2026-08-09): ~91 of ~103 /subjects pages had zero inbound
              on-page link. */}
          <div className="ci-cta relative z-[1] flex flex-col items-start gap-2.5 sm:gap-4">
            <Link
              href="#browse"
              className="inline-flex items-center gap-1.5 rounded-2xl sm:rounded-full px-3 py-2 sm:px-3.5 sm:py-1.5 text-[12px] sm:text-[13.5px] leading-snug font-bold transition-transform hover:-translate-y-0.5"
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
              className="inline-flex items-center gap-1.5 rounded-2xl sm:rounded-full px-3 py-2 sm:px-3.5 sm:py-1.5 text-[12px] sm:text-[13.5px] leading-snug font-bold transition-transform hover:-translate-y-0.5"
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

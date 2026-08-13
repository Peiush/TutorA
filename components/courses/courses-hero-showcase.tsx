"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CourseIllustration } from "@/components/courses/course-illustrations";
import { GraduationCapIcon, UserCheckIcon } from "@/components/courses/course-icons";
import { courseCategories } from "@/lib/mock-courses";

gsap.registerPlugin(useGSAP);

// Five categories placed on an even pentagon around the hub — angles start at the
// top (-90deg) and step by 360/5deg so the ring reads as one deliberate shape
// instead of a random scatter, and lines up 1:1 with courseCategories.length.
const ORBIT_POSITIONS = [
  { left: "50%", top: "4%" },
  { left: "92%", top: "35%" },
  { left: "76%", top: "86%" },
  { left: "24%", top: "86%" },
  { left: "8%", top: "35%" },
];

// A purely decorative stat-hub illustration for the /courses hero's right column —
// replaces the older step-by-step "journey" mockup with a single cohesive visual:
// a central catalog stat surrounded by the five course categories, plus two proof
// chips (rating + learners). Split out and lazy-loaded (ssr: false) the same way
// its predecessor was, since it's aria-hidden and only ever shown at lg+.
export function CoursesHeroShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ delay: 0.1 })
          .from(".ch-blob", { autoAlpha: 0, scale: 0.85, duration: 0.9, ease: "power2.out" })
          .from(".ch-ring", { autoAlpha: 0, scale: 0.7, duration: 0.7, ease: "power3.out" }, "-=0.55")
          .from(".ch-hub", { autoAlpha: 0, scale: 0.5, y: 18, duration: 0.6, ease: "back.out(1.7)" }, "-=0.45")
          .from(".ch-medallion", { autoAlpha: 0, scale: 0.3, duration: 0.5, stagger: 0.08, ease: "back.out(1.9)" }, "-=0.25")
          .from(".ch-chip", { autoAlpha: 0, y: 14, scale: 0.85, duration: 0.45, stagger: 0.12, ease: "back.out(2)" }, "-=0.3");

        // Gentle idle float, identical cadence to the homepage hero's portrait tiles
        // (hero-portrait-tiles.tsx) so the "living" feel is consistent site-wide.
        gsap.utils.toArray<HTMLElement>(".ch-float").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? "+=10" : "-=10",
            duration: 3 + (i % 4) * 0.45,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.9 + i * 0.12,
          });
        });

        // One very slow full rotation of the dashed orbit ring — under 0.02deg/frame,
        // reads as a subtle "alive" cue rather than a spinning-loader motion.
        gsap.to(".ch-ring", { rotate: 360, duration: 90, ease: "none", repeat: -1 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".ch-blob", ".ch-ring", ".ch-hub", ".ch-medallion", ".ch-chip"].join(", "), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          clearProps: "transform",
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="hidden lg:block relative w-full max-w-[480px] mx-auto aspect-square" aria-hidden>
      {/* Ambient color blobs behind the composition */}
      <div
        className="ch-blob pointer-events-none absolute -top-6 -right-4 w-[220px] h-[220px] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--color-accent-2-200)" }}
      />
      <div
        className="ch-blob pointer-events-none absolute bottom-0 -left-8 w-[200px] h-[200px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--color-accent-200)" }}
      />

      {/* Dashed orbit ring */}
      <svg viewBox="0 0 100 100" className="ch-ring absolute inset-0 w-full h-full" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-accent-400)" strokeWidth="0.5" strokeDasharray="1 4.5" opacity="0.55" />
      </svg>

      {/* Category medallions on the ring */}
      {courseCategories.map((cat, i) => (
        <div
          key={cat}
          className="ch-medallion ch-float absolute w-[76px] h-[76px] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden"
          style={{ left: ORBIT_POSITIONS[i].left, top: ORBIT_POSITIONS[i].top, boxShadow: "var(--shadow-md)" }}
        >
          <CourseIllustration category={cat} className="w-full h-full" />
        </div>
      ))}

      {/* Center hub — the headline catalog stat */}
      <div
        className="ch-hub absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[172px] h-[172px] rounded-full flex flex-col items-center justify-center text-center gap-1"
        style={{
          background: "linear-gradient(155deg, var(--color-accent-2-600), var(--color-accent-2-900))",
          boxShadow: "0 24px 48px -18px rgba(15,30,56,0.55)",
        }}
      >
        <span
          className="w-9 h-9 rounded-full grid place-content-center mb-1"
          style={{ background: "color-mix(in srgb, #fff 18%, transparent)", color: "var(--color-accent-300)" }}
        >
          <GraduationCapIcon width={18} height={18} />
        </span>
        <span className="text-[30px] font-bold leading-none" style={{ color: "#fff" }}>
          150+
        </span>
        <span className="text-[11.5px] font-medium" style={{ color: "color-mix(in srgb, #fff 78%, transparent)" }}>
          Live courses
        </span>
      </div>

      {/* Proof chips */}
      <span
        className="ch-chip ch-float absolute left-[-4%] top-[46%] inline-flex items-center gap-1.5 rounded-full pl-2 pr-3 py-1.5 whitespace-nowrap"
        style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
      >
        <StarRating rating={4.9} size={11} />
        <span className="text-[11px] font-semibold">4.9 avg rating</span>
      </span>

      <span
        className="ch-chip ch-float absolute right-[2%] bottom-[6%] inline-flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5 whitespace-nowrap"
        style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
      >
        <span
          className="w-5 h-5 rounded-full grid place-content-center flex-none"
          style={{ background: "color-mix(in srgb, var(--color-verified) 18%, var(--color-bg))", color: "var(--color-verified)" }}
        >
          <UserCheckIcon width={11} height={11} />
        </span>
        <span className="text-[11px] font-semibold">12k+ learners</span>
      </span>
    </div>
  );
}

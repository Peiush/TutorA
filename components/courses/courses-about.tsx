"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayersIcon, UserCheckIcon, VideoIcon } from "@/components/courses/course-icons";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FACTS = [
  { icon: LayersIcon, label: "Grouped by grade & subject" },
  { icon: UserCheckIcon, label: "Matched with a verified tutor" },
  { icon: VideoIcon, label: "Live, 1:1 sessions" },
];

export function CoursesAbout() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        gsap
          .timeline({ scrollTrigger: { trigger: root, start: "top 82%", once: true } })
          .from(".ca-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" })
          .from(".ca-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".ca-copy", { autoAlpha: 0, y: 12, duration: 0.45, ease: "power3.out" }, "-=0.25")
          .from(".ca-fact", { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.25");

        if (!root) return;
        const tag = root.querySelector(".ca-tag");
        return scrollRevealSafetyNet(
          root,
          () => tag != null && isGsapHidden(tag),
          () => {
            gsap.set(".ca-tag, .ca-heading, .ca-copy, .ca-fact", { autoAlpha: 1, y: 0 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".ca-tag, .ca-heading, .ca-copy, .ca-fact", { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} id="about-courses" className="max-w-[640px] mx-auto text-center scroll-mt-24 mb-14 md:mb-16">
      <p className="ca-tag text-[11px] font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--color-accent-700)" }}>
        About courses
      </p>
      <h2 className="ca-heading text-[clamp(24px,2.8vw,32px)] mb-4">How TutorA courses work</h2>
      <p
        className="ca-copy text-[15.5px] leading-relaxed mb-7 max-w-[52ch] mx-auto"
        style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}
      >
        Courses are organized by grade and subject — a Grade 6–8 bundle, for example, can span 7
        subjects at once. Tell us what you need, and we match you with a verified tutor for live,
        personalized sessions in every subject.
      </p>

      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5">
        {FACTS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="ca-fact inline-flex items-center gap-1.5 sm:gap-2 rounded-full pl-1.5 sm:pl-2 pr-2.5 sm:pr-3.5 py-1 sm:py-1.5 text-[11.5px] sm:text-[13px] font-medium"
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
  );
}

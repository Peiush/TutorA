"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckBadge } from "@/components/ui/verified-badge";

gsap.registerPlugin(useGSAP);

// Compact top-right badge for screens below lg, matching the CoursesIntro pattern
// (Tag pill on the left, small proof badge on the right, same row — no extra height
// above the heading). The full 320x470 RequestIllustration stays lg-only.
export function RequestMobileIllustration() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "back.out(2)" } });
        tl.from(rootRef.current, { autoAlpha: 0, scale: 0.8, y: -6, duration: 0.45 });
        return () => tl.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(rootRef.current, { autoAlpha: 1, scale: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="lg:hidden flex-none inline-flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5"
      style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
      aria-hidden
    >
      <span
        className="w-7 h-7 rounded-full grid place-content-center flex-none"
        style={{ background: "var(--color-accent-2-700)" }}
      >
        <CheckBadge size={16} />
      </span>
      <span className="flex flex-col leading-none gap-0.5">
        <span className="text-[10.5px] font-bold">Personally reviewed</span>
        <span className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
          Matched in 24&ndash;48h
        </span>
      </span>
    </div>
  );
}

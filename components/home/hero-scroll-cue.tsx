"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Mobile-only affordance: without this, the hero's illustration is the last thing
// visible on first load and the page reads as if it ends after the CTAs.
export function HeroScrollCue() {
  const scope = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          scope.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, delay: 0.9, ease: "power1.out" }
        );
        gsap.to(scope.current, {
          y: 6,
          duration: 1.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.1,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(scope.current, { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope }
  );

  const handleClick = () => {
    document.getElementById("recently-matched")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      ref={scope}
      type="button"
      onClick={handleClick}
      className="lg:hidden mx-auto mt-6 flex flex-col items-center gap-1 cursor-pointer"
      style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
      aria-label="Scroll to recently matched tutors"
    >
      <span className="text-[11px] font-medium tracking-[0.03em]">See recent matches</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

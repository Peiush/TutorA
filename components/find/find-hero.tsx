"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";

gsap.registerPlugin(useGSAP);

export function FindHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".fh-tag", { autoAlpha: 0, y: -8, duration: 0.4 })
          .from(".fh-heading", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.2")
          .from(".fh-copy", { autoAlpha: 0, y: 12, duration: 0.45 }, "-=0.3");
        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Tag variant="accent-2" className="fh-tag text-[12px] px-3.5 py-1.5">
        Find a Tutor
      </Tag>
      <h1 className="fh-heading font-bold text-[clamp(30px,4vw,48px)] mt-4 mb-1">Browse verified tutors</h1>
      <p
        className="fh-copy text-[16px] mb-8"
        style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
      >
        Contact details stay private. Request a tutor and our team makes the introduction.
      </p>
    </div>
  );
}

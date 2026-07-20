"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PillarIcon({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(ref.current, {
          scale: 0,
          rotation: -35,
          duration: 0.5,
          delay: 0.15,
          ease: "back.out(2.6)",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        });
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="w-11 h-11 rounded-full grid place-content-center flex-none"
      style={{ background: "var(--color-accent-2-100)" }}
    >
      {children}
    </div>
  );
}

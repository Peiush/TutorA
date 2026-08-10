"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function StaggerReveal({
  children,
  className = "",
  childSelector = ":scope > *",
  stagger = 0.09,
  y = 24,
  ease = "power3.out",
}: {
  children: ReactNode;
  className?: string;
  childSelector?: string;
  stagger?: number;
  y?: number;
  ease?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll(childSelector);
      if (!items.length) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease,
            stagger: { each: stagger, from: "start" },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );

        return scrollRevealSafetyNet(
          el,
          () => isGsapHidden(items[0]),
          () => gsap.set(items, { autoAlpha: 1, y: 0, scale: 1 })
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { autoAlpha: 1 });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [childSelector, stagger, y, ease] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

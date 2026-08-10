"use client";

import { CSSProperties, ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: delay / 1000,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );

        // Safety net: ScrollTrigger's start position is calculated once and can go
        // stale if web fonts swap in and reflow layout after that calculation (see
        // ScrollTriggerGuard) or if something else on the page interrupts GSAP before
        // it fires. A plain IntersectionObserver doesn't depend on any cached scroll
        // math, so it's a reliable backstop: once the element is actually on screen,
        // give the GSAP reveal a moment to run, then force it visible if it hasn't.
        const io = new IntersectionObserver(
          (entries) => {
            if (!entries[0].isIntersecting) return;
            io.disconnect();
            window.setTimeout(() => {
              if (gsap.getProperty(el, "autoAlpha") === 0) {
                gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 });
              }
            }, 1000);
          },
          { threshold: 0.01 }
        );
        io.observe(el);
        return () => io.disconnect();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { autoAlpha: 1 });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [delay, y] }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

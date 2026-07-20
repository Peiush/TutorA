"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FlowSteps({
  items,
  numberBg,
  numberColor,
}: {
  items: { n: string; text: string }[];
  numberBg: string;
  numberColor: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        });
        tl.from(".fs-row", { autoAlpha: 0, x: -16, stagger: 0.14, duration: 0.45, ease: "power2.out" }).from(
          ".fs-num",
          { scale: 0, rotation: -20, stagger: 0.14, duration: 0.4, ease: "back.out(2.4)" },
          "<"
        );
        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="grid gap-4">
      {items.map((f) => (
        <div key={f.n} className="fs-row flex gap-3.5">
          <span
            className="fs-num font-[var(--font-heading)] font-semibold text-[14px] w-7 h-7 rounded-full grid place-content-center flex-none"
            style={{ background: numberBg, color: numberColor }}
          >
            {f.n.replace(".", "")}
          </span>
          <span className="text-[15px] leading-[1.55] pt-0.5">{f.text}</span>
        </div>
      ))}
    </div>
  );
}

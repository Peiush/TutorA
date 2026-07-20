"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ROWS = [
  { label: "Browse tutors", value: "Free" },
  { label: "Submit a request", value: "Free" },
  { label: "List as a tutor", value: "Free" },
  { label: "Confirmed match", value: "Success fee" },
];

export function PricingTable() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        });
        tl.from(".pt-row", { autoAlpha: 0, x: 18, stagger: 0.1, duration: 0.4, ease: "power2.out" }).to(
          ".pt-highlight",
          { boxShadow: "0 0 0 6px color-mix(in srgb, var(--color-accent-2-700) 22%, transparent)", duration: 0.5, ease: "power2.out", yoyo: true, repeat: 1 },
          "-=0.1"
        );
        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="card elev-md gap-0 p-0 overflow-hidden">
      {ROWS.map((row, i, arr) => {
        const isLast = i === arr.length - 1;
        return (
          <div
            key={row.label}
            className={`pt-row flex items-center justify-between px-6 py-4 ${isLast ? "pt-highlight" : ""}`}
            style={{
              borderBottom: i < arr.length - 1 ? "1px solid var(--color-divider)" : "none",
              background: isLast ? "var(--color-accent-2-100)" : "transparent",
            }}
          >
            <span className="text-[15px] font-medium">{row.label}</span>
            <span
              className="font-[var(--font-heading)] font-semibold text-[14px]"
              style={{ color: isLast ? "var(--color-accent-2-700)" : "var(--color-verified)" }}
            >
              {row.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

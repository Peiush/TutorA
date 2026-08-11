"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ShieldMatchIcon, HandshakeIcon, RefreshIcon } from "@/components/home/step-icons";
import { stats } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP);

const LABELS = ["Every profile reviewed", "Live 1:1, not routed", "No cap, no extra cost"];
const ICONS = [ShieldMatchIcon, HandshakeIcon, RefreshIcon];

export function HeroTrustRow() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-stat", {
          autoAlpha: 0,
          y: 14,
          duration: 0.5,
          delay: 1,
          stagger: 0.1,
          ease: "power2.out",
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-stat", { autoAlpha: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10"
    >
      {stats.map((s, i) => {
        const Icon = ICONS[i] ?? ShieldMatchIcon;
        return (
          <div key={s.num} className="hero-stat flex items-center gap-2.5">
            <span
              className="grid place-content-center rounded-full flex-none"
              style={{ width: 34, height: 34, background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
            >
              <Icon width={16} height={16} />
            </span>
            <span className="text-left leading-tight">
              <span className="block font-[var(--font-heading)] font-bold text-[15px]" style={{ color: "var(--color-text)" }}>
                {s.num}
              </span>
              <span className="block text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
                {LABELS[i]}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

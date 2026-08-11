"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Abstract, premium ambient backdrop for the centered search hero — no illustrated
// scenes. Slow-drifting aurora blobs + a faint rotating orbit ring + a scatter of soft
// glowing dots in the margins suggest "global reach" without competing with the search
// bar for attention. Everything stays clear of the ~720px centered content column.
const DOTS: { top: string; left?: string; right?: string; size: number }[] = [
  { top: "14%", left: "5%", size: 6 },
  { top: "62%", left: "9%", size: 4 },
  { top: "36%", left: "3%", size: 3 },
  { top: "20%", right: "6%", size: 5 },
  { top: "70%", right: "10%", size: 4 },
  { top: "46%", right: "3%", size: 3 },
];

export function HeroAmbient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-amb-blob-1", { x: 24, y: 16, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".hero-amb-blob-2", { x: -18, y: -14, duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".hero-amb-blob-3", { x: 14, y: -18, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".hero-amb-ring", { rotation: 360, duration: 90, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to(".hero-amb-dot", {
          y: "+=10",
          opacity: 0.85,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.35, from: "random" },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="hero-amb-blob-1 hidden lg:block absolute rounded-full"
        style={{
          top: "-160px",
          left: "50%",
          marginLeft: -420,
          width: 620,
          height: 460,
          background: "radial-gradient(ellipse at 50% 20%, var(--color-accent-200), transparent 72%)",
          opacity: 0.5,
          filter: "blur(8px)",
        }}
      />
      <div
        className="hero-amb-blob-2 absolute rounded-full"
        style={{
          top: "60px",
          left: "8%",
          width: 260,
          height: 260,
          background: "radial-gradient(circle, var(--color-accent-2-200), transparent 70%)",
          opacity: 0.32,
          filter: "blur(12px)",
        }}
      />
      <div
        className="hero-amb-blob-3 absolute rounded-full"
        style={{
          top: "180px",
          right: "8%",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, var(--color-accent-200), transparent 70%)",
          opacity: 0.28,
          filter: "blur(14px)",
        }}
      />

      {/* Faint orbit ring, centered behind the whole hero — global-reach motif, kept subtle */}
      <div
        className="hero-amb-ring hidden md:block absolute rounded-full"
        style={{
          top: "50%",
          left: "50%",
          width: 920,
          height: 920,
          marginLeft: -460,
          marginTop: -460,
          border: "1px dashed var(--color-accent-2-300)",
          opacity: 0.16,
        }}
      />

      {DOTS.map((d, i) => (
        <span
          key={i}
          className="hero-amb-dot absolute rounded-full"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            width: d.size,
            height: d.size,
            background: i % 2 === 0 ? "var(--color-accent-400)" : "var(--color-accent-2-400)",
            opacity: 0.55,
            boxShadow: `0 0 ${d.size * 2}px color-mix(in srgb, ${i % 2 === 0 ? "var(--color-accent-400)" : "var(--color-accent-2-400)"} 60%, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { stats } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP);

const REPEATS = 4;
const PX_PER_SECOND = 55;

export function StatsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = track.scrollWidth / 2;
        tweenRef.current = gsap.to(track, {
          x: -distance,
          duration: distance / PX_PER_SECOND,
          ease: "none",
          repeat: -1,
        });
        return () => {
          tweenRef.current?.kill();
          tweenRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: trackRef }
  );

  const group = Array.from({ length: REPEATS }).flatMap((_, g) =>
    stats.map((s, i) => ({ ...s, key: `${g}-${i}` }))
  );

  return (
    <section
      className="relative overflow-hidden py-6"
      style={{ background: "var(--color-neutral-900)" }}
      onMouseEnter={() => tweenRef.current?.timeScale(0.25)}
      onMouseLeave={() => tweenRef.current?.timeScale(1)}
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center flex-none">
            {group.map((s) => (
              <div key={`${copy}-${s.key}`} className="flex items-center gap-3 pl-8 flex-none">
                <span
                  className="font-[var(--font-heading)] font-bold text-[26px] whitespace-nowrap"
                  style={{ color: "var(--color-accent-400)" }}
                >
                  {s.num}
                </span>
                <span
                  className="text-[14px] whitespace-nowrap"
                  style={{ color: "var(--color-neutral-300)" }}
                >
                  {s.label}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full ml-5"
                  style={{ background: "var(--color-neutral-600)" }}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-[1]"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--color-neutral-900) 92%, transparent), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-[1]"
        style={{
          background:
            "linear-gradient(to left, color-mix(in srgb, var(--color-neutral-900) 92%, transparent), transparent)",
        }}
      />
    </section>
  );
}

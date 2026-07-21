"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldMatchIcon, HandshakeIcon } from "@/components/home/step-icons";
import { ClockIcon } from "@/components/courses/course-icons";
import { stats } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP);

const REPEATS = 4;
const PX_PER_SECOND = 55;
const STAT_ICONS = [ShieldMatchIcon, HandshakeIcon, ClockIcon];

export function StatsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(section, { autoAlpha: 0, y: 16 });
        gsap.to(section, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" });

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

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(section, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: trackRef }
  );

  const group = Array.from({ length: REPEATS }).flatMap((_, g) =>
    stats.map((s, i) => ({ ...s, key: `${g}-${i}`, iconIndex: i }))
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-6"
      style={{ background: "var(--color-neutral-900)" }}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div
        className="pointer-events-none absolute -top-20 left-[15%] w-[320px] h-[320px] rounded-full blur-3xl opacity-[0.12]"
        style={{ background: "var(--color-accent-400)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-[20%] w-[280px] h-[280px] rounded-full blur-3xl opacity-[0.1]"
        style={{ background: "var(--color-accent-2-300)" }}
        aria-hidden
      />

      <div ref={trackRef} className="relative flex w-max items-center will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center flex-none">
            {group.map((s) => {
              const Icon = STAT_ICONS[s.iconIndex] ?? ShieldMatchIcon;
              return (
                <div key={`${copy}-${s.key}`} className="flex items-center gap-3 pl-8 flex-none">
                  <span
                    className="w-8 h-8 rounded-full grid place-content-center flex-none"
                    style={{ background: "color-mix(in srgb, var(--color-accent-400) 18%, transparent)", color: "var(--color-accent-400)" }}
                  >
                    <Icon width={16} height={16} />
                  </span>
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
              );
            })}
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

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { initialsOf } from "@/components/ui/tutor-avatar";
import { CheckBadge } from "@/components/ui/verified-badge";

gsap.registerPlugin(useGSAP);

export function HeroIllustration() {
  const scope = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = pathRef.current;
        let length = 0;
        if (path) {
          length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0);
        }
        tl.fromTo(
          ".hero-illo-student",
          { autoAlpha: 0, scale: 0.5, y: 16 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" },
          0.15
        )
          .fromTo(
            ".hero-illo-tutor",
            { autoAlpha: 0, scale: 0.5, y: 16 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" },
            0.55
          )
          .fromTo(
            ".hero-illo-badge",
            { autoAlpha: 0, y: 10, scale: 0.85 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 },
            "-=0.15"
          )
          .fromTo(
            ".hero-illo-bubble",
            { autoAlpha: 0, y: -10, scale: 0.85 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 },
            "-=0.4"
          )
          .fromTo(
            ".hero-illo-note",
            { autoAlpha: 0, y: 8, rotation: 4 },
            { autoAlpha: 1, y: 0, rotation: -4, duration: 0.5 },
            "-=0.3"
          );

        // Gentle continuous float once everything has entered.
        tl.add(() => {
          gsap.to(".hero-illo-student", {
            y: "+=10",
            duration: 2.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(".hero-illo-tutor", {
            y: "-=12",
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.3,
          });
          gsap.to(".hero-illo-bubble-dot", {
            y: -4,
            duration: 0.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.15, repeat: -1, yoyo: true },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".hero-illo-student, .hero-illo-tutor, .hero-illo-badge, .hero-illo-bubble, .hero-illo-note",
          { autoAlpha: 1 }
        );
      });

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="hidden lg:block absolute pointer-events-none"
      style={{ top: 40, right: 10, width: 440, height: 480 }}
      aria-hidden
    >
      <svg width="440" height="480" viewBox="0 0 440 480" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          ref={pathRef}
          d="M100 120 C 220 60, 260 300, 340 340"
          fill="none"
          stroke="var(--color-accent-2-300)"
          strokeWidth="3"
          strokeDasharray="1 12"
          strokeLinecap="round"
        />
      </svg>

      {/* Student avatar */}
      <div
        className="hero-illo-student absolute grid place-content-center"
        style={{
          top: 60,
          left: 30,
          width: 108,
          height: 108,
          borderRadius: "50%",
          background: "var(--color-accent-2-200)",
          color: "var(--color-accent-2-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 34,
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
        }}
      >
        {initialsOf("Amara Okafor")}
      </div>

      {/* Tutor avatar */}
      <div
        className="hero-illo-tutor absolute grid place-content-center"
        style={{
          top: 300,
          left: 300,
          width: 132,
          height: 132,
          borderRadius: "50%",
          background: "var(--color-accent-200)",
          color: "var(--color-accent-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 40,
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
        }}
      >
        {initialsOf("Liang Wei")}
      </div>

      {/* Match badge sitting on the connector */}
      <div
        className="hero-illo-badge absolute flex items-center gap-2"
        style={{
          top: 190,
          left: 150,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "10px 18px 10px 10px",
        }}
      >
        <CheckBadge size={30} />
        <span className="font-[var(--font-heading)] font-semibold text-[14px]" style={{ color: "var(--color-text)" }}>
          Matched
        </span>
      </div>

      {/* Chat bubble accent */}
      <div
        className="hero-illo-bubble absolute"
        style={{
          top: 30,
          left: 220,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: "18px 18px 18px 4px",
          boxShadow: "var(--shadow-sm)",
          padding: "12px 16px",
        }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="hero-illo-bubble-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-accent-2-400)",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      </div>

      {/* Handwritten note */}
      <div
        className="hero-illo-note absolute"
        style={{
          top: 400,
          left: 60,
          fontFamily: "var(--font-accent)",
          fontSize: 22,
          fontWeight: 600,
          color: "var(--color-accent-800)",
        }}
      >
        it just clicked!
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { initialsOf } from "@/components/ui/tutor-avatar";
import { CheckBadge } from "@/components/ui/verified-badge";

gsap.registerPlugin(useGSAP);

export function HeroIllustrationMobile() {
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

        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0);
        }
        tl.fromTo(
          ".hero-illo-m-student",
          { autoAlpha: 0, scale: 0.5, y: 14 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
          0.1
        )
          .fromTo(
            ".hero-illo-m-tutor",
            { autoAlpha: 0, scale: 0.5, y: 14 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
            0.42
          )
          .fromTo(
            ".hero-illo-m-badge",
            { autoAlpha: 0, y: 8, scale: 0.85 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 },
            "-=0.12"
          )
          .fromTo(
            ".hero-illo-m-bubble",
            { autoAlpha: 0, y: -8, scale: 0.85 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 },
            "-=0.32"
          )
          .fromTo(
            ".hero-illo-m-note",
            { autoAlpha: 0, y: 6, rotation: 4 },
            { autoAlpha: 1, y: 0, rotation: -3, duration: 0.45 },
            "-=0.25"
          );

        tl.add(() => {
          gsap.to(".hero-illo-m-student", {
            y: "+=8",
            duration: 2.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(".hero-illo-m-tutor", {
            y: "-=9",
            duration: 2.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.25,
          });
          gsap.to(".hero-illo-m-bubble-dot", {
            y: -3,
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
          ".hero-illo-m-student, .hero-illo-m-tutor, .hero-illo-m-badge, .hero-illo-m-bubble, .hero-illo-m-note",
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
      className="lg:hidden relative mx-auto mt-7 mb-5 w-full max-w-[300px]"
      style={{ height: 256 }}
      aria-hidden
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: -40,
          right: -40,
          width: 150,
          height: 150,
          background: "radial-gradient(circle at 32% 32%, var(--color-accent-200), transparent 72%)",
          opacity: 0.3,
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: -30,
          left: -40,
          width: 130,
          height: 130,
          background: "radial-gradient(circle at 60% 40%, var(--color-accent-2-200), transparent 70%)",
          opacity: 0.26,
          filter: "blur(8px)",
        }}
      />

      <svg width="300" height="256" viewBox="0 0 300 256" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          ref={pathRef}
          d="M60 70 C 140 34, 168 190, 226 212"
          fill="none"
          stroke="var(--color-accent-2-300)"
          strokeWidth="2.5"
          strokeDasharray="1 10"
          strokeLinecap="round"
        />
      </svg>

      {/* Student avatar */}
      <div
        className="hero-illo-m-student absolute grid place-content-center"
        style={{
          top: 34,
          left: 10,
          width: 78,
          height: 78,
          borderRadius: "50%",
          background: "var(--color-accent-2-200)",
          color: "var(--color-accent-2-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 24,
          boxShadow: "var(--shadow-lg)",
          border: "5px solid var(--color-bg)",
        }}
      >
        {initialsOf("Amara Okafor")}
      </div>

      {/* Tutor avatar */}
      <div
        className="hero-illo-m-tutor absolute grid place-content-center"
        style={{
          top: 164,
          left: 198,
          width: 92,
          height: 92,
          borderRadius: "50%",
          background: "var(--color-accent-200)",
          color: "var(--color-accent-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 28,
          boxShadow: "var(--shadow-lg)",
          border: "5px solid var(--color-bg)",
        }}
      >
        {initialsOf("Liang Wei")}
      </div>

      {/* Match badge sitting on the connector */}
      <div
        className="hero-illo-m-badge absolute flex items-center gap-1.5"
        style={{
          top: 104,
          left: 86,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "7px 14px 7px 7px",
        }}
      >
        <CheckBadge size={22} />
        <span className="font-[var(--font-heading)] font-semibold text-[12px]" style={{ color: "var(--color-text)" }}>
          Matched
        </span>
      </div>

      {/* Chat bubble accent */}
      <div
        className="hero-illo-m-bubble absolute"
        style={{
          top: 26,
          left: 122,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: "16px 16px 16px 4px",
          boxShadow: "var(--shadow-sm)",
          padding: "9px 12px",
        }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="hero-illo-m-bubble-dot"
              style={{
                width: 5,
                height: 5,
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
        className="hero-illo-m-note absolute"
        style={{
          top: 204,
          left: 40,
          fontFamily: "var(--font-accent)",
          fontSize: 17,
          fontWeight: 600,
          color: "var(--color-accent-800)",
        }}
      >
        it just clicked!
      </div>
    </div>
  );
}

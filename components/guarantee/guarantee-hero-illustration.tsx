"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckBadge } from "@/components/ui/verified-badge";

gsap.registerPlugin(useGSAP);

// Scene: "You" connects to a first tutor match that fades to a "not quite" state, then a
// second dashed path draws to a new tutor with a "Matched" badge popping in — visualizing
// the actual rematch mechanism the page describes, not a generic shield/handshake icon.
// Built the same way as HeroIllustration/TeachHeroIllustration: DOM-composed pieces
// animated with GSAP, not one static SVG.
export function GuaranteeHeroIllustration() {
  const scope = useRef<HTMLDivElement>(null);
  const pathARef = useRef<SVGPathElement>(null);
  const pathBRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const pathA = pathARef.current;
        const pathB = pathBRef.current;
        [pathA, pathB].forEach((p) => {
          if (!p) return;
          const length = p.getTotalLength();
          gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

        tl.fromTo(
          ".guarantee-illo-you",
          { autoAlpha: 0, scale: 0.5, y: 16 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
          0
        );

        if (pathA) {
          tl.to(pathA, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, 0.35);
        }
        tl.fromTo(
          ".guarantee-illo-tutorA",
          { autoAlpha: 0, scale: 0.6, y: 10 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2)" },
          0.75
        )
          .fromTo(
            ".guarantee-illo-tagA",
            { autoAlpha: 0, y: 6 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            1.15
          )
          // First match recedes — visualizing "not the right fit"
          .to(".guarantee-illo-tutorA", { autoAlpha: 0.38, scale: 0.92, duration: 0.5 }, 1.7)
          .to(pathA, { autoAlpha: 0.3, duration: 0.5 }, 1.7);

        if (pathB) {
          tl.set(pathB, { autoAlpha: 1 }, 1.9).to(
            pathB,
            { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
            1.9
          );
        }
        tl.fromTo(
          ".guarantee-illo-tutorB",
          { autoAlpha: 0, scale: 0.55, y: 12 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(2)" },
          2.35
        ).fromTo(
          ".guarantee-illo-badge",
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.5)" },
          2.75
        );

        // Gentle continuous float once everything has settled.
        tl.add(() => {
          gsap.to(".guarantee-illo-you", {
            y: "+=8",
            duration: 2.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(".guarantee-illo-tutorB", {
            y: "-=10",
            duration: 2.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.15,
          });
          gsap.to(".guarantee-illo-badge", {
            rotation: "+=6",
            duration: 1.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".guarantee-illo-you, .guarantee-illo-tutorB, .guarantee-illo-badge",
          { autoAlpha: 1 }
        );
        gsap.set(".guarantee-illo-tutorA, .guarantee-illo-tagA", { autoAlpha: 0 });
        gsap.set(pathARef.current, { autoAlpha: 0 });
        if (pathBRef.current) {
          gsap.set(pathBRef.current, { autoAlpha: 1, strokeDashoffset: 0 });
        }
      });

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="hidden lg:block relative flex-none pointer-events-none"
      style={{ width: 420, height: 440 }}
      aria-hidden
    >
      <svg width="420" height="440" viewBox="0 0 420 440" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          ref={pathARef}
          d="M100 220 C 180 140, 220 100, 300 90"
          fill="none"
          stroke="var(--color-neutral-300)"
          strokeWidth="3"
          strokeDasharray="1 12"
          strokeLinecap="round"
        />
        <path
          ref={pathBRef}
          d="M100 220 C 170 280, 240 330, 310 340"
          fill="none"
          stroke="var(--color-accent-2-300)"
          strokeWidth="3"
          strokeDasharray="1 12"
          strokeLinecap="round"
          style={{ visibility: "hidden" }}
        />
      </svg>

      {/* "You" avatar */}
      <div
        className="guarantee-illo-you absolute grid place-content-center"
        style={{
          top: 175,
          left: 20,
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: "var(--color-accent-200)",
          color: "var(--color-accent-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 32,
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
        }}
      >
        You
      </div>

      {/* First match — recedes to visualize "not quite" */}
      <div
        className="guarantee-illo-tutorA absolute grid place-content-center"
        style={{
          top: 30,
          left: 280,
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: "var(--color-neutral-200)",
          color: "var(--color-neutral-600)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 24,
          boxShadow: "var(--shadow-md)",
          border: "5px solid var(--color-bg)",
        }}
      >
        T
      </div>
      <div
        className="guarantee-illo-tagA absolute"
        style={{
          top: 118,
          left: 268,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-sm)",
          padding: "5px 12px",
          fontSize: 12,
          fontWeight: 600,
          color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
        }}
      >
        Not quite
      </div>

      {/* Second match — the rematch, with the "Matched" badge */}
      <div
        className="guarantee-illo-tutorB absolute grid place-content-center"
        style={{
          top: 300,
          left: 290,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "var(--color-accent-2-200)",
          color: "var(--color-accent-2-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 28,
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
        }}
      >
        T
      </div>
      <div
        className="guarantee-illo-badge absolute flex items-center gap-2"
        style={{
          top: 390,
          left: 250,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "8px 16px 8px 8px",
        }}
      >
        <CheckBadge size={26} />
        <span className="font-[var(--font-heading)] font-semibold text-[13px]" style={{ color: "var(--color-text)" }}>
          Matched
        </span>
      </div>
    </div>
  );
}

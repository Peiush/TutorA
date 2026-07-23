"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function BecomeIllustration() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = pathRef.current;
        const length = path?.getTotalLength() ?? 0;
        if (path) {
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        }

        const tl = gsap.timeline({ delay: 0.2 });

        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, 0);
        }
        tl.from(".bi-card", { autoAlpha: 0, y: -14, rotation: 6, duration: 0.5, ease: "power3.out" }, 0.1)
          .from(
            ".bi-stamp",
            { autoAlpha: 0, scale: 0.4, rotation: -30, duration: 0.55, ease: "back.out(1.8)" },
            0.4
          )
          .from(".bi-note", { autoAlpha: 0, y: 8, rotation: 6, duration: 0.4, ease: "power2.out" }, 0.65);

        const float = gsap.to(stampRef.current, {
          y: -7,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: tl.duration() + 0.2,
        });

        return () => {
          tl.kill();
          float.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="hidden xl:block relative" style={{ width: 260, height: 300 }} aria-hidden>
      <svg width="260" height="300" viewBox="0 0 260 300" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          ref={pathRef}
          d="M40 30 C 120 10, 150 90, 100 140 C 65 175, 100 210, 175 220"
          fill="none"
          stroke="var(--color-accent-300)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Listing card mockup */}
      <div
        className="bi-card absolute"
        style={{
          top: 0,
          left: 0,
          width: 208,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          padding: "16px 18px",
          transform: "rotate(-3deg)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full grid place-content-center flex-none font-[var(--font-heading)] font-bold text-[13px]"
            style={{ background: "var(--color-accent-200)", color: "var(--color-accent-800)" }}
          >
            PN
          </div>
          <div>
            <div className="font-[var(--font-heading)] font-semibold text-[13px]">Priya N.</div>
            <div className="text-[11px]" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
              Computer Science
            </div>
          </div>
        </div>
        <div className="flex gap-1.5 mt-3">
          <span
            className="text-[11px] font-medium"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-800)", borderRadius: 999, padding: "4px 10px" }}
          >
            $40/hr
          </span>
          <span
            className="text-[11px] font-medium"
            style={{ background: "var(--color-neutral-100)", color: "var(--color-neutral-700)", borderRadius: 999, padding: "4px 10px" }}
          >
            Online
          </span>
        </div>
      </div>

      {/* Verified educator stamp */}
      <div
        ref={stampRef}
        className="bi-stamp absolute grid place-content-center"
        style={{
          top: 130,
          left: 90,
          width: 108,
          height: 108,
          borderRadius: "50%",
          background: "var(--color-accent-800)",
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
          transform: "rotate(8deg)",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-200)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z" />
          </svg>
          <span
            className="font-[var(--font-heading)] font-bold text-[10.5px] uppercase text-center leading-tight"
            style={{ letterSpacing: "0.04em", color: "var(--color-bg)" }}
          >
            Verified
            <br />
            educator
          </span>
        </div>
      </div>

      {/* Handwritten note */}
      <div
        className="bi-note absolute"
        style={{
          top: 260,
          left: 30,
          fontFamily: "var(--font-accent)",
          fontSize: 20,
          fontWeight: 600,
          color: "var(--color-accent-2-700)",
          transform: "rotate(-3deg)",
        }}
      >
        teach on your terms
      </div>
    </div>
  );
}

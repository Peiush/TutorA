"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckBadge } from "@/components/ui/verified-badge";

gsap.registerPlugin(useGSAP);

export function RequestIllustration() {
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

        const tl = gsap.timeline({ delay: 0.15 });

        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0);
        }
        tl.from(".rqi-card", { autoAlpha: 0, y: -16, duration: 0.55, ease: "power3.out" }, 0.1)
          .from(
            ".rqi-stamp",
            { autoAlpha: 0, scale: 0.4, rotation: -30, duration: 0.6, ease: "back.out(1.8)" },
            0.45
          )
          .from(".rqi-badge", { autoAlpha: 0, x: -16, duration: 0.45, ease: "power3.out" }, 0.7)
          .from(".rqi-note", { autoAlpha: 0, y: 8, rotation: 6, duration: 0.4, ease: "power2.out" }, 0.85);

        const float = gsap.to(stampRef.current, {
          y: -8,
          duration: 2.2,
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
    <div ref={rootRef} className="relative" style={{ width: 320, height: 470 }} aria-hidden>
      <svg width="320" height="470" viewBox="0 0 320 470" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          ref={pathRef}
          d="M60 130 C 150 110, 190 220, 130 300 C 90 355, 120 400, 190 420"
          fill="none"
          stroke="var(--color-accent-2-300)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Request card mockup */}
      <div
        className="rqi-card absolute"
        style={{
          top: 10,
          left: 10,
          width: 240,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          padding: "18px 20px",
        }}
      >
        <div
          className="text-[11px] uppercase font-[var(--font-heading)] font-semibold"
          style={{ letterSpacing: "0.06em", color: "color-mix(in srgb, var(--color-text) 67%, transparent)" }}
        >
          Your request
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {["Mathematics", "GCSE", "Online"].map((label) => (
            <span
              key={label}
              className="text-[12px] font-medium"
              style={{
                background: "var(--color-accent-2-100)",
                color: "var(--color-accent-2-800)",
                borderRadius: 999,
                padding: "5px 11px",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Personally reviewed stamp */}
      <div
        ref={stampRef}
        className="rqi-stamp absolute grid place-content-center"
        style={{
          top: 195,
          left: 130,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "var(--color-accent-2-800)",
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
          transform: "rotate(6deg)",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-300)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z" />
          </svg>
          <span
            className="font-[var(--font-heading)] font-bold text-[12px] uppercase text-center leading-tight"
            style={{ letterSpacing: "0.04em", color: "var(--color-bg)" }}
          >
            Personally
            <br />
            reviewed
          </span>
        </div>
      </div>

      {/* Team badge sitting on the connector */}
      <div
        className="rqi-badge absolute flex items-center gap-2"
        style={{
          top: 330,
          left: 20,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "10px 18px 10px 10px",
        }}
      >
        <CheckBadge size={30} />
        <span className="font-[var(--font-heading)] font-semibold text-[14px]" style={{ color: "var(--color-text)" }}>
          Matched in 24–48h
        </span>
      </div>

      {/* Handwritten note */}
      <div
        className="rqi-note absolute"
        style={{
          top: 415,
          left: 70,
          fontFamily: "var(--font-accent)",
          fontSize: 22,
          fontWeight: 600,
          color: "var(--color-accent-800)",
          transform: "rotate(-3deg)",
        }}
      >
        no forms in the void
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckBadge } from "@/components/ui/verified-badge";

gsap.registerPlugin(useGSAP);

export function AboutIllustration() {
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

        const tl = gsap.timeline({ delay: 0.3 });

        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0);
        }
        tl.from(".ai-card", { autoAlpha: 0, y: -18, duration: 0.55, ease: "power3.out" }, 0.1)
          .from(".ai-check", { scale: 0, stagger: 0.1, duration: 0.35, ease: "back.out(2.6)" }, 0.35)
          .from(
            ".ai-stamp",
            { autoAlpha: 0, scale: 0.4, rotation: -30, duration: 0.6, ease: "back.out(1.8)" },
            0.55
          )
          .from(".ai-badge", { autoAlpha: 0, x: -16, duration: 0.45, ease: "power3.out" }, 0.8)
          .from(".ai-note", { autoAlpha: 0, y: 8, rotation: 6, duration: 0.4, ease: "power2.out" }, 0.95);

        const float = gsap.to(stampRef.current, {
          y: -8,
          duration: 2.3,
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
    <div
      ref={rootRef}
      className="hidden lg:block absolute pointer-events-none"
      style={{ top: 30, right: 10, width: 420, height: 470 }}
      aria-hidden
    >
      <svg width="420" height="470" viewBox="0 0 420 470" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          ref={pathRef}
          d="M170 158 C 230 172, 270 185, 300 225 C 260 300, 210 355, 155 398"
          fill="none"
          stroke="var(--color-accent-2-300)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Review card mockup */}
      <div
        className="ai-card absolute"
        style={{
          top: 10,
          left: 40,
          width: 260,
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
          Tutor application
        </div>
        <div className="grid gap-2.5 mt-3.5">
          {["Identity verified", "Credentials checked", "References confirmed"].map((label) => (
            <div key={label} className="flex items-center gap-2.5">
              <div
                className="ai-check w-[18px] h-[18px] rounded-full grid place-content-center flex-none"
                style={{ background: "var(--color-verified)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span className="text-[13px] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified stamp */}
      <div
        ref={stampRef}
        className="ai-stamp absolute grid place-content-center"
        style={{
          top: 225,
          left: 255,
          width: 138,
          height: 138,
          borderRadius: "50%",
          background: "var(--color-accent-2-800)",
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
          transform: "rotate(-8deg)",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-300)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z" />
          </svg>
          <span
            className="font-[var(--font-heading)] font-bold text-[13px] uppercase"
            style={{ letterSpacing: "0.05em", color: "var(--color-bg)" }}
          >
            Verified
          </span>
        </div>
      </div>

      {/* Team review badge sitting on the connector */}
      <div
        className="ai-badge absolute flex items-center gap-2"
        style={{
          top: 170,
          left: 60,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "10px 18px 10px 10px",
        }}
      >
        <CheckBadge size={30} />
        <span className="font-[var(--font-heading)] font-semibold text-[14px]" style={{ color: "var(--color-text)" }}>
          Reviewed by our team
        </span>
      </div>

      {/* Handwritten note */}
      <div
        className="ai-note absolute"
        style={{
          top: 405,
          left: 100,
          fontFamily: "var(--font-accent)",
          fontSize: 22,
          fontWeight: 600,
          color: "var(--color-accent-800)",
          transform: "rotate(-3deg)",
        }}
      >
        no guesswork
      </div>
    </div>
  );
}

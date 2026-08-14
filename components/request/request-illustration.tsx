"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckBadge } from "@/components/ui/verified-badge";

gsap.registerPlugin(useGSAP);

const AVATARS = [
  { initials: "AK", bg: "var(--color-accent-400)" },
  { initials: "MS", bg: "var(--color-accent-2-400)" },
  { initials: "RP", bg: "var(--color-accent-2-600)" },
];

export function RequestIllustration() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = pathRef.current;
        const length = path?.getTotalLength() ?? 0;
        if (path) {
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        }

        const tl = gsap.timeline({ delay: 0.1 });

        tl.from(".rqi-blob", { autoAlpha: 0, scale: 0.6, duration: 0.9, stagger: 0.1, ease: "power2.out" }, 0);

        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.2);
        }
        tl.from(".rqi-card", { autoAlpha: 0, y: -18, duration: 0.55, ease: "power3.out" }, 0.15)
          .from(".rqi-avatars", { autoAlpha: 0, x: 16, duration: 0.5, ease: "power3.out" }, 0.35)
          .from(
            ".rqi-stamp",
            { autoAlpha: 0, scale: 0.4, rotation: -30, duration: 0.65, ease: "back.out(1.8)" },
            0.5
          )
          .from(".rqi-badge", { autoAlpha: 0, x: -16, duration: 0.45, ease: "power3.out" }, 0.8)
          .from(".rqi-chip", { autoAlpha: 0, y: 10, stagger: 0.1, duration: 0.4, ease: "power2.out" }, 0.9)
          .from(".rqi-sparkle", { autoAlpha: 0, scale: 0, stagger: 0.08, duration: 0.4, ease: "back.out(3)" }, 1.0)
          .from(".rqi-note", { autoAlpha: 0, y: 8, rotation: 6, duration: 0.4, ease: "power2.out" }, 1.05);

        const floats = [
          gsap.to(stampRef.current, {
            y: -10,
            duration: 2.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: tl.duration() + 0.1,
          }),
          gsap.to(".rqi-chip", {
            y: -6,
            duration: 2.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.3,
            delay: tl.duration(),
          }),
          gsap.to(".rqi-sparkle", {
            scale: 1.15,
            opacity: 0.6,
            duration: 1.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.4,
            delay: tl.duration(),
          }),
          gsap.to(ringRef.current, {
            rotation: 360,
            duration: 40,
            ease: "none",
            repeat: -1,
          }),
          gsap.to(blobARef.current, {
            x: 14,
            y: -12,
            duration: 7,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }),
          gsap.to(blobBRef.current, {
            x: -12,
            y: 10,
            duration: 8.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }),
        ];

        return () => {
          tl.kill();
          floats.forEach((f) => f.kill());
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".rqi-card", ".rqi-avatars", ".rqi-stamp", ".rqi-badge", ".rqi-chip", ".rqi-sparkle", ".rqi-note", ".rqi-blob"],
          { autoAlpha: 1 }
        );
        if (pathRef.current) gsap.set(pathRef.current, { strokeDashoffset: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full min-h-[540px] overflow-hidden"
      style={{
        borderRadius: "32px",
        background:
          "linear-gradient(155deg, var(--color-accent-2-900) 0%, var(--color-accent-2-700) 55%, var(--color-accent-2-800) 100%)",
        boxShadow: "var(--shadow-lg)",
      }}
      aria-hidden
    >
      {/* dot-grid texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.14]" preserveAspectRatio="none">
        <pattern id="rqi-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="var(--color-bg)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#rqi-dots)" />
      </svg>

      {/* glow blobs */}
      <div
        ref={blobARef}
        className="rqi-blob absolute rounded-full"
        style={{
          width: "46%",
          aspectRatio: "1/1",
          top: "-14%",
          right: "-16%",
          background: "var(--color-accent-400)",
          filter: "blur(64px)",
          opacity: 0.45,
        }}
      />
      <div
        ref={blobBRef}
        className="rqi-blob absolute rounded-full"
        style={{
          width: "38%",
          aspectRatio: "1/1",
          bottom: "-10%",
          left: "-12%",
          background: "var(--color-accent-2-300)",
          filter: "blur(60px)",
          opacity: 0.35,
        }}
      />

      {/* slow-rotating dashed ring behind the stamp */}
      <div
        ref={ringRef}
        className="absolute rounded-full"
        style={{
          width: "50%",
          aspectRatio: "1/1",
          top: "34%",
          left: "27%",
          border: "1.5px dashed color-mix(in srgb, var(--color-accent-300) 55%, transparent)",
        }}
      />

      {/* connector path */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 560"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <path
          ref={pathRef}
          d="M90 150 C 260 120, 320 280, 210 340 C 130 385, 160 450, 260 500"
          fill="none"
          stroke="var(--color-accent-300)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {/* Request card mockup */}
      <div
        className="rqi-card absolute"
        style={{
          top: "6%",
          left: "8%",
          width: "60%",
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

      {/* Tutor avatar cluster + rating */}
      <div
        className="rqi-avatars absolute flex items-center gap-2.5"
        style={{
          top: "24%",
          right: "6%",
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "7px 14px 7px 7px",
        }}
      >
        <div className="flex -space-x-2.5">
          {AVATARS.map((a) => (
            <span
              key={a.initials}
              className="w-7 h-7 rounded-full grid place-content-center text-[10px] font-bold text-white"
              style={{ background: a.bg, border: "2px solid var(--color-bg)" }}
            >
              {a.initials}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1 text-[12.5px] font-semibold" style={{ color: "var(--color-text)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-accent-500)" aria-hidden>
            <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7L12 2.5Z" />
          </svg>
          4.9 avg
        </span>
      </div>

      {/* Personally reviewed stamp */}
      <div
        ref={stampRef}
        className="rqi-stamp absolute grid place-content-center"
        style={{
          top: "37%",
          left: "30%",
          width: "42%",
          aspectRatio: "1/1",
          borderRadius: "50%",
          background: "linear-gradient(155deg, var(--color-accent-2-700), var(--color-accent-2-900))",
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
          transform: "rotate(6deg)",
        }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-300)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z" />
          </svg>
          <span
            className="font-[var(--font-heading)] font-bold text-[13px] uppercase text-center leading-tight"
            style={{ letterSpacing: "0.04em", color: "var(--color-bg)" }}
          >
            Personally
            <br />
            reviewed
          </span>
        </div>
      </div>

      {/* sparkles for pop */}
      <svg className="rqi-sparkle absolute" style={{ top: "18%", left: "22%", width: 20, height: 20 }} viewBox="0 0 24 24" fill="var(--color-accent-300)" aria-hidden>
        <path d="M12 2 13.8 9.2 21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8L12 2Z" />
      </svg>
      <svg className="rqi-sparkle absolute" style={{ top: "58%", right: "16%", width: 14, height: 14 }} viewBox="0 0 24 24" fill="var(--color-bg)" aria-hidden>
        <path d="M12 2 13.8 9.2 21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8L12 2Z" />
      </svg>

      {/* Team badge sitting on the connector */}
      <div
        className="rqi-badge absolute flex items-center gap-2"
        style={{
          top: "62%",
          left: "5%",
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "10px 18px 10px 10px",
        }}
      >
        <CheckBadge size={30} />
        <span className="font-[var(--font-heading)] font-semibold text-[14px]" style={{ color: "var(--color-text)" }}>
          Matched in 24&ndash;48h
        </span>
      </div>

      {/* floating subject chips */}
      <div
        className="rqi-chip absolute text-[12px] font-semibold"
        style={{
          bottom: "26%",
          right: "8%",
          background: "var(--color-accent)",
          color: "var(--color-accent-2-900)",
          borderRadius: 999,
          padding: "6px 13px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        Physics
      </div>
      <div
        className="rqi-chip absolute text-[12px] font-semibold"
        style={{
          bottom: "16%",
          right: "22%",
          background: "var(--color-bg)",
          color: "var(--color-accent-2-800)",
          borderRadius: 999,
          padding: "6px 13px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        IELTS
      </div>

      {/* Handwritten note */}
      <div
        className="rqi-note absolute"
        style={{
          bottom: "6%",
          left: "10%",
          fontFamily: "var(--font-accent)",
          fontSize: 24,
          fontWeight: 600,
          color: "var(--color-accent-300)",
          transform: "rotate(-3deg)",
        }}
      >
        no forms in the void
      </div>
    </div>
  );
}

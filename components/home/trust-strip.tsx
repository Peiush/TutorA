"use client";

import { CSSProperties, SVGProps, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function IdCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <circle cx="8.5" cy="12" r="2.1" />
      <path d="M13.5 10h4M13.5 14h3" />
    </svg>
  );
}

function BackgroundCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 3.5 19.5 6.5v5.3c0 4.6-3.2 7.9-7.5 9-4.3-1.1-7.5-4.4-7.5-9V6.5L12 3.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

function VideoInterviewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="2.5" y="6.5" width="13" height="11" rx="2" />
      <path d="M15.5 10.2 21 7.5v9l-5.5-2.7" />
    </svg>
  );
}

function MatchedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2.5 19.5c.8-3.4 3-5 6-5s5.2 1.6 6 5" />
      <circle cx="17" cy="8.5" r="2.4" />
      <path d="M15.8 11.2c1.9.4 3.2 1.7 3.7 3.8" />
    </svg>
  );
}

function CheckBadgeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const trustPoints = [
  { icon: IdCheckIcon, label: "ID verified", sub: "Government ID confirmed" },
  { icon: BackgroundCheckIcon, label: "Background checked", sub: "Criminal record screened" },
  { icon: VideoInterviewIcon, label: "Video interviewed", sub: "Live 1:1 conversation" },
  { icon: MatchedIcon, label: "Personally matched", sub: "Hand-picked by our team" },
];

// Deterministic pseudo-random positions for the ambient particle field — must not use
// Math.random() at render time or the server/client markup would mismatch on hydrate.
const particles = Array.from({ length: 14 }, (_, i) => {
  const seed = i * 137.5;
  return {
    left: `${(seed * 1.7) % 100}%`,
    top: `${(seed * 2.3) % 100}%`,
    size: 3 + (i % 4),
    duration: 5 + (i % 5),
    delay: (i % 7) * 0.4,
  };
});

export function TrustStrip() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const cards = gsap.utils.toArray<HTMLElement>(".ts-card", root);
      const iconWraps = gsap.utils.toArray<HTMLElement>(".ts-icon-wrap", root);
      const icons = gsap.utils.toArray<HTMLElement>(".ts-icon", root);
      const rings = gsap.utils.toArray<HTMLElement>(".ts-ring", root);
      const checks = gsap.utils.toArray<HTMLElement>(".ts-check", root);
      const numerals = gsap.utils.toArray<HTMLElement>(".ts-numeral", root);
      const line = root.querySelector<HTMLElement>(".ts-line");
      const pulse = root.querySelector<HTMLElement>(".ts-pulse");
      const row = root.querySelector<HTMLElement>(".ts-row");
      const blobs = gsap.utils.toArray<HTMLElement>(".ts-blob", root);
      const dust = gsap.utils.toArray<HTMLElement>(".ts-particle", root);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let lineLeft = 0;
        let lineWidth = 0;

        if (line && row && iconWraps.length >= 2) {
          const rowBox = row.getBoundingClientRect();
          const first = iconWraps[0].getBoundingClientRect();
          const last = iconWraps[iconWraps.length - 1].getBoundingClientRect();
          const centerY = first.top - rowBox.top + first.height / 2;
          lineLeft = first.left - rowBox.left + first.width / 2;
          lineWidth = last.left - first.left;
          gsap.set(line, { top: centerY, left: lineLeft, width: lineWidth, scaleX: 0 });
          if (pulse) gsap.set(pulse, { top: centerY, left: lineLeft, autoAlpha: 0 });
        }

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(root, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7 })
          .fromTo(blobs, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.1, stagger: 0.1, ease: "power2.out" }, 0.05)
          .fromTo(
            root.querySelectorAll(".ts-eyebrow, .ts-heading, .ts-copy"),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
            0.1
          )
          .fromTo(
            cards,
            { autoAlpha: 0, y: 40, rotateX: -12, rotateY: 0, scale: 0.94 },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, stagger: 0.13, transformPerspective: 800 },
            0.35
          )
          .to(line, { scaleX: 1, duration: 1, ease: "power2.inOut" }, 0.55)
          .fromTo(
            numerals,
            { autoAlpha: 0, x: 10 },
            { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.13 },
            0.55
          )
          .fromTo(
            icons,
            { scale: 0, rotation: -25 },
            { scale: 1, rotation: 0, duration: 0.55, stagger: 0.14, ease: "back.out(2.4)" },
            0.65
          )
          .fromTo(
            checks,
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.14, ease: "back.out(3)" },
            1.0
          );

        tl.add(() => {
          gsap.to(rings, {
            scale: 1.8,
            autoAlpha: 0,
            duration: 2,
            ease: "power1.out",
            repeat: -1,
            stagger: { each: 0.6, repeat: -1 },
          });

          if (pulse && lineWidth) {
            gsap.set(pulse, { autoAlpha: 1 });
            gsap.to(pulse, {
              left: lineLeft + lineWidth,
              duration: 2.6,
              ease: "power1.inOut",
              repeat: -1,
              repeatDelay: 0.6,
            });
          }
        });

        // ambient drifting glow blobs
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            y: i % 2 === 0 ? -22 : 20,
            x: i % 2 === 0 ? 14 : -16,
            duration: 6 + i * 1.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        // floating particle dust
        dust.forEach((p, i) => {
          gsap.to(p, {
            y: i % 2 === 0 ? -16 : -22,
            autoAlpha: 0.9,
            duration: 2 + (i % 4) * 0.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: (i % 6) * 0.3,
          });
        });

        // per-card cursor-tracking spotlight + tilt + icon pop
        cards.forEach((card) => {
          const iconWrap = card.querySelector<HTMLElement>(".ts-icon-wrap");
          if (!iconWrap) return;

          const setMx = gsap.quickTo(card, "--mx", { duration: 0.5, ease: "power3" });
          const setMy = gsap.quickTo(card, "--my", { duration: 0.5, ease: "power3" });
          const quickScaleX = gsap.quickTo(iconWrap, "scaleX", { duration: 0.35, ease: "power2.out" });
          const quickScaleY = gsap.quickTo(iconWrap, "scaleY", { duration: 0.35, ease: "power2.out" });
          const quickRotation = gsap.quickTo(iconWrap, "rotation", { duration: 0.35, ease: "power2.out" });

          // 3D tilt (rotateX/rotateY) uses plain gsap.to() rather than quickTo(): GSAP's
          // quickTo relies on an internal resetTo() fast path that doesn't support the
          // non-commutative matrix decomposition 3D rotation needs, which logs a
          // "not eligible for reset" warning on every call even though it still animates.
          const onMove = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width;
            const relY = (e.clientY - rect.top) / rect.height;
            setMx(relX * 100);
            setMy(relY * 100);
            gsap.to(card, {
              rotateX: (0.5 - relY) * 10,
              rotateY: (relX - 0.5) * 10,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          card.addEventListener("pointermove", onMove);
          card.addEventListener("mouseenter", () => {
            quickScaleX(1.14);
            quickScaleY(1.14);
            quickRotation(8);
            gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
            gsap.to(card.querySelector(".ts-glow"), { autoAlpha: 1, duration: 0.3 });
          });
          card.addEventListener("mouseleave", () => {
            quickScaleX(1);
            quickScaleY(1);
            quickRotation(0);
            gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
            gsap.to(card.querySelector(".ts-glow"), { autoAlpha: 0, duration: 0.3 });
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { autoAlpha: 1, y: 0 });
        gsap.set(cards, { autoAlpha: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 });
        gsap.set(icons, { scale: 1, rotation: 0 });
        gsap.set(checks, { scale: 1, autoAlpha: 1 });
        gsap.set(numerals, { autoAlpha: 1, x: 0 });
        gsap.set(blobs, { autoAlpha: 1, scale: 1 });
        if (line) gsap.set(line, { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] mt-4 lg:mt-8">
      <div
        ref={rootRef}
        className="relative overflow-hidden rounded-[24px] py-[clamp(40px,6vw,68px)] px-[clamp(20px,5vw,56px)] isolate"
        style={{
          background:
            "linear-gradient(155deg, var(--color-accent-2-900) 0%, var(--color-accent-2-700) 55%, var(--color-accent-2-600) 100%)",
          boxShadow: "0 24px 64px rgba(15, 30, 56, 0.32), 0 2px 0 rgba(255,255,255,0.06) inset",
        }}
      >
        {/* decorative glow blobs */}
        <div
          className="ts-blob pointer-events-none absolute -top-24 -right-16 w-[340px] h-[340px] rounded-full blur-[70px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)", opacity: 0.32 }}
          aria-hidden
        />
        <div
          className="ts-blob pointer-events-none absolute -bottom-28 -left-20 w-[300px] h-[300px] rounded-full blur-[70px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-2-300) 0%, transparent 70%)", opacity: 0.4 }}
          aria-hidden
        />
        <div
          className="ts-blob pointer-events-none absolute top-1/2 right-1/4 w-[180px] h-[180px] rounded-full blur-[60px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-500) 0%, transparent 70%)", opacity: 0.22 }}
          aria-hidden
        />

        {/* dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />

        {/* ambient floating particles */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {particles.map((p, i) => (
            <span
              key={i}
              className="ts-particle absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: "var(--color-accent-300)",
                opacity: 0.5,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-[560px] mx-auto">
          <span
            className="ts-eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase"
            style={{
              letterSpacing: "0.04em",
              background: "rgba(255,255,255,0.1)",
              color: "var(--color-accent-300)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            Verified by our team, not an algorithm
          </span>

          <h2
            className="ts-heading font-[var(--font-heading)] font-bold text-[clamp(24px,3.2vw,34px)] leading-[1.15] mt-4"
            style={{ color: "#FFFFFF" }}
          >
            Every tutor earns four checkmarks{" "}
            <span style={{ color: "var(--color-accent-400)" }}>before they meet you</span>
          </h2>

          <p className="ts-copy text-[15.5px] leading-[1.6] mt-3" style={{ color: "rgba(255,255,255,0.7)" }}>
            No shortcuts, no bots — our team personally reviews every step below.
          </p>
        </div>

        <div className="ts-row relative grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mt-10 md:mt-12 [transform-style:preserve-3d]">
          <div
            className="ts-line hidden md:block absolute h-[2px] rounded-full origin-left"
            style={{
              backgroundImage: "repeating-linear-gradient(to right, var(--color-accent-400) 0 8px, transparent 8px 16px)",
              opacity: 0.6,
            }}
            aria-hidden
          />
          <div
            className="ts-pulse hidden md:block absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "var(--color-accent-300)",
              boxShadow: "0 0 12px 4px color-mix(in srgb, var(--color-accent-300) 70%, transparent)",
            }}
            aria-hidden
          />

          {trustPoints.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={label}
              className="ts-card group relative flex flex-col items-center text-center gap-2.5 rounded-2xl px-3.5 py-7 cursor-default overflow-hidden [transform-style:preserve-3d]"
              style={
                {
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(10px)",
                  "--mx": "50%",
                  "--my": "0%",
                } as CSSProperties
              }
            >
              {/* cursor-following spotlight */}
              <span
                className="ts-glow pointer-events-none absolute inset-0 opacity-0"
                style={{
                  background:
                    "radial-gradient(220px circle at var(--mx) var(--my), color-mix(in srgb, var(--color-accent-400) 22%, transparent), transparent 70%)",
                }}
                aria-hidden
              />

              {/* oversized faint index numeral */}
              <span
                className="ts-numeral pointer-events-none absolute top-2 right-3 font-[var(--font-heading)] text-[42px] leading-none select-none"
                style={{ color: "rgba(255,255,255,0.08)" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="relative z-10 grid place-content-center">
                <span
                  className="ts-ring absolute inset-0 rounded-full"
                  style={{ background: "var(--color-accent-400)", opacity: 0 }}
                  aria-hidden
                />
                <span
                  className="ts-icon-wrap relative w-16 h-16 rounded-2xl grid place-content-center"
                  style={{
                    background: "linear-gradient(145deg, var(--color-accent-400), var(--color-accent-600))",
                    color: "white",
                    boxShadow:
                      "0 10px 26px -6px color-mix(in srgb, var(--color-accent-500) 65%, transparent), 0 0 0 1px rgba(255,255,255,0.12) inset",
                  }}
                >
                  <Icon className="ts-icon" />
                  <span
                    className="ts-check absolute -top-1 -right-1 w-[20px] h-[20px] rounded-full grid place-content-center"
                    style={{ background: "var(--color-accent-2-800)", border: "2px solid var(--color-accent-2-900)" }}
                  >
                    <CheckBadgeIcon />
                  </span>
                </span>
              </span>

              <span className="relative z-10 text-[15px] font-semibold leading-tight" style={{ color: "#FFFFFF" }}>
                {label}
              </span>
              <span className="relative z-10 text-[12.5px] leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

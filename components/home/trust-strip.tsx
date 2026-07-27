"use client";

import { SVGProps, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
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
      const line = root.querySelector<HTMLElement>(".ts-line");
      const row = root.querySelector<HTMLElement>(".ts-row");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (line && row && iconWraps.length >= 2) {
          const rowBox = row.getBoundingClientRect();
          const first = iconWraps[0].getBoundingClientRect();
          const last = iconWraps[iconWraps.length - 1].getBoundingClientRect();
          const centerY = first.top - rowBox.top + first.height / 2;
          const left = first.left - rowBox.left + first.width / 2;
          const width = last.left - first.left;
          gsap.set(line, { top: centerY, left, width, scaleX: 0 });
        }

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(cards, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 })
          .to(line, { scaleX: 1, duration: 1, ease: "power2.inOut" }, 0.15)
          .fromTo(
            icons,
            { scale: 0, rotation: -25 },
            { scale: 1, rotation: 0, duration: 0.55, stagger: 0.14, ease: "back.out(2.4)" },
            0.35
          )
          .fromTo(
            checks,
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.14, ease: "back.out(3)" },
            0.7
          );

        tl.add(() => {
          gsap.to(rings, {
            scale: 1.7,
            autoAlpha: 0,
            duration: 1.9,
            ease: "power1.out",
            repeat: -1,
            stagger: { each: 0.55, repeat: -1 },
          });
        });

        cards.forEach((card) => {
          const iconWrap = card.querySelector<HTMLElement>(".ts-icon-wrap");
          if (!iconWrap) return;
          const quickScaleX = gsap.quickTo(iconWrap, "scaleX", { duration: 0.35, ease: "power2.out" });
          const quickScaleY = gsap.quickTo(iconWrap, "scaleY", { duration: 0.35, ease: "power2.out" });
          const quickRotation = gsap.quickTo(iconWrap, "rotation", { duration: 0.35, ease: "power2.out" });
          card.addEventListener("mouseenter", () => {
            quickScaleX(1.12);
            quickScaleY(1.12);
            quickRotation(6);
            gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
          });
          card.addEventListener("mouseleave", () => {
            quickScaleX(1);
            quickScaleY(1);
            quickRotation(0);
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        gsap.set(icons, { scale: 1, rotate: 0 });
        gsap.set(checks, { scale: 1, autoAlpha: 1 });
        if (line) gsap.set(line, { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden mt-4 lg:mt-8 py-9 lg:py-14"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            top: "-90px",
            left: "-60px",
            width: 280,
            height: 280,
            background: "radial-gradient(circle, var(--color-accent-200), transparent 70%)",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            bottom: "-110px",
            right: "-70px",
            width: 320,
            height: 320,
            background: "radial-gradient(circle, var(--color-accent-2-200), transparent 70%)",
            opacity: 0.4,
          }}
        />
      </div>

      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] relative">
        <div className="ts-row relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div
            className="ts-line hidden md:block absolute h-[2px] rounded-full origin-left"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--color-accent-400) 0 8px, transparent 8px 16px)",
            }}
            aria-hidden
          />

          {trustPoints.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="ts-card relative flex flex-col items-center text-center gap-2.5 rounded-2xl px-3 py-6 md:py-7 cursor-default"
              style={{
                background: "color-mix(in srgb, white 55%, transparent)",
                border: "1px solid var(--color-divider)",
              }}
            >
              <span className="relative grid place-content-center">
                <span
                  className="ts-ring absolute inset-0 rounded-full"
                  style={{ background: "var(--color-accent-400)", opacity: 0 }}
                  aria-hidden
                />
                <span
                  className="ts-icon-wrap relative w-14 h-14 rounded-full grid place-content-center"
                  style={{
                    background: "linear-gradient(145deg, var(--color-accent-400), var(--color-accent-600))",
                    color: "white",
                    boxShadow: "0 6px 16px -4px color-mix(in srgb, var(--color-accent-600) 55%, transparent)",
                  }}
                >
                  <Icon className="ts-icon" />
                  <span
                    className="ts-check absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full grid place-content-center"
                    style={{ background: "var(--color-accent-2-700)", border: "2px solid var(--color-surface)" }}
                  >
                    <CheckBadgeIcon />
                  </span>
                </span>
              </span>

              <span className="text-[14.5px] font-semibold leading-tight" style={{ color: "var(--color-text)" }}>
                {label}
              </span>
              <span className="text-[12px] leading-snug" style={{ color: "var(--color-neutral-500)" }}>
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

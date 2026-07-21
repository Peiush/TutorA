"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Logo({
  size = 34,
  dark = false,
  wordmark = true,
  href = "/",
  className = "",
}: {
  size?: number;
  dark?: boolean;
  wordmark?: boolean;
  href?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const checkRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const check = checkRef.current;
      if (!root) return;

      const halfA = root.querySelector(".logo-half-a");
      const halfB = root.querySelector(".logo-half-b");
      const letters = root.querySelectorAll(".logo-letter");
      const mark = root.querySelector(".logo-mark");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(halfA, { x: -10, y: -10, autoAlpha: 0 });
        gsap.set(halfB, { x: 10, y: 10, autoAlpha: 0 });
        gsap.set(letters, { autoAlpha: 0, y: 6 });

        const length = check?.getTotalLength() ?? 0;
        if (check) gsap.set(check, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to([halfA, halfB], { x: 0, y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06 })
          .to(check, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "-=0.15")
          .to(letters, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.03 }, "-=0.25");

        let hoverTl: gsap.core.Timeline | null = null;
        const onEnter = () => {
          hoverTl?.kill();
          hoverTl = gsap.timeline();
          hoverTl.to(mark, { scale: 1.08, rotate: 4, duration: 0.35, ease: "back.out(2.4)" });
        };
        const onLeave = () => {
          hoverTl?.kill();
          hoverTl = gsap.timeline();
          hoverTl.to(mark, { scale: 1, rotate: 0, duration: 0.35, ease: "power2.out" });
        };
        root.addEventListener("pointerenter", onEnter);
        root.addEventListener("pointerleave", onLeave);

        return () => {
          tl.kill();
          hoverTl?.kill();
          root.removeEventListener("pointerenter", onEnter);
          root.removeEventListener("pointerleave", onLeave);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([halfA, halfB], { x: 0, y: 0, autoAlpha: 1 });
        gsap.set(letters, { autoAlpha: 1, y: 0 });
        if (check) gsap.set(check, { strokeDashoffset: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const clipId = "logo-clip";

  return (
    <Link
      ref={rootRef}
      href={href}
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="TutorA home"
    >
      <svg
        className="logo-mark flex-none"
        width={size}
        height={size}
        viewBox="0 0 40 40"
        style={{ transformOrigin: "50% 50%" }}
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <rect width="40" height="40" rx="12" />
          </clipPath>
          <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-accent-400)" />
            <stop offset="1" stopColor="var(--color-accent-600)" />
          </linearGradient>
          <linearGradient id="logo-navy" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-accent-2-700)" />
            <stop offset="1" stopColor="var(--color-accent-2-900)" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <path className="logo-half-a" d="M0 0 H40 L0 40 Z" fill="url(#logo-gold)" />
          <path className="logo-half-b" d="M40 0 V40 H0 Z" fill="url(#logo-navy)" />
        </g>
        <path
          ref={checkRef}
          d="M12 20.5 17.5 26 29 13"
          fill="none"
          stroke="#fff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {wordmark && (
        <span
          className="text-[22px] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
        >
          <span className="logo-letter" style={{ color: dark ? "var(--color-bg)" : "var(--color-text)" }}>
            Tutor
          </span>
          <span className="logo-letter" style={{ color: "var(--color-accent-600)" }}>
            A
          </span>
        </span>
      )}
    </Link>
  );
}

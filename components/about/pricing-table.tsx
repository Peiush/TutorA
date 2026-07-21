"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ROWS = [
  {
    label: "Browse tutors",
    value: "Free",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m20 20-4.6-4.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Submit a request",
    value: "Free",
    icon: <path d="m3 11 18-8-8 18-2.2-7.8L3 11Z" strokeLinejoin="round" />,
  },
  {
    label: "List as a tutor",
    value: "Free",
    icon: (
      <path
        d="m12 3 2.5 5.4 5.8.8-4.3 4.2 1 5.9L12 16.5 6.9 19.3l1-5.9-4.2-4.2 5.8-.8L12 3Z"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Confirmed match",
    value: "Success fee",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.5 2.5 2.5 5.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    highlight: true,
  },
];

export function PricingTable() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const rows = root.querySelectorAll(".pt-row");
      const icons = root.querySelectorAll(".pt-icon");
      const line = root.querySelector(".pt-line");
      const badge = root.querySelector(".pt-badge");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });
        gsap.set(icons, { scale: 0, rotate: -20, transformOrigin: "center" });
        gsap.set(rows, { autoAlpha: 0, x: 22 });
        gsap.set(badge, { scale: 0, rotate: -25, autoAlpha: 0, transformOrigin: "center" });

        gsap
          .timeline({ scrollTrigger: { trigger: root, start: "top 85%", once: true } })
          .to(rows, { autoAlpha: 1, x: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" })
          .to(line, { scaleY: 1, duration: 1, ease: "power2.out" }, 0.1)
          .to(icons, { scale: 1, rotate: 0, stagger: 0.12, duration: 0.4, ease: "back.out(2.4)" }, 0.15)
          .to(badge, { scale: 1, rotate: 6, autoAlpha: 1, duration: 0.55, ease: "back.out(2.6)" }, 0.45)
          .to(
            root.querySelector(".pt-highlight"),
            {
              boxShadow: "0 0 0 6px color-mix(in srgb, var(--color-accent-2-500) 26%, transparent)",
              duration: 0.55,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            },
            0.6
          );

        const float = gsap.to(badge, { y: -7, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        return () => float.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([rows, icons], { autoAlpha: 1, x: 0, scale: 1, rotate: 0 });
        gsap.set(line, { scaleY: 1 });
        gsap.set(badge, { autoAlpha: 1, scale: 1, rotate: 6 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative">
      {/* floating success-fee illustration badge */}
      <div
        className="pt-badge absolute -top-5 -right-5 z-20 w-14 h-14 rounded-2xl grid place-content-center"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-600), var(--color-accent-400))",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M19 5 5 19" />
          <circle cx="8" cy="7" r="2.5" />
          <circle cx="16" cy="17" r="2.5" />
        </svg>
      </div>

      <div
        className="relative rounded-[var(--radius-lg)] overflow-hidden"
        style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", boxShadow: "var(--shadow-md)" }}
      >
        <span
          className="pt-line absolute left-[41px] top-8 bottom-8 w-[2px] rounded-full"
          style={{ background: "var(--color-divider)" }}
          aria-hidden
        />

        {ROWS.map((row, i, arr) => {
          const isLast = i === arr.length - 1;
          return (
            <div
              key={row.label}
              className={`pt-row group relative flex items-center gap-4 px-6 py-4.5 transition-colors duration-300 ${
                isLast ? "pt-highlight" : "hover:bg-[var(--color-surface)]"
              }`}
              style={{
                borderBottom: !isLast ? "1px solid var(--color-divider)" : "none",
                background: isLast ? "linear-gradient(90deg, var(--color-accent-2-800), var(--color-accent-2-700))" : undefined,
              }}
            >
              <span
                className="pt-icon relative z-10 w-9 h-9 rounded-full grid place-content-center flex-none transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: isLast ? "rgba(255,255,255,.16)" : "var(--color-accent-2-100)",
                  color: isLast ? "#fff" : "var(--color-accent-2-700)",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  {row.icon}
                </svg>
              </span>

              <span
                className="flex-1 text-[15px] font-medium"
                style={{ color: isLast ? "#fff" : "var(--color-text)" }}
              >
                {row.label}
              </span>

              <span
                className="text-[12.5px] font-semibold px-3 py-1 rounded-full flex-none"
                style={{
                  background: isLast
                    ? "rgba(255,255,255,.18)"
                    : "color-mix(in srgb, var(--color-verified) 14%, transparent)",
                  color: isLast ? "#fff" : "var(--color-verified)",
                }}
              >
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

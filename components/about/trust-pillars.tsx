"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Pillar = {
  title: string;
  body: string;
  icon: ReactNode;
};

const CARD_ACCENTS = [
  { from: "var(--color-accent-2-700)", to: "var(--color-accent-2-500)" },
  { from: "var(--color-accent-600)", to: "var(--color-accent-400)" },
  { from: "var(--color-accent-2-800)", to: "var(--color-accent-2-600)" },
];

export function TrustPillars({ pillars }: { pillars: Pillar[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = gsap.utils.toArray<HTMLElement>(".trust-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        })
          .from(cards, {
            autoAlpha: 0,
            y: 46,
            rotateX: -8,
            transformPerspective: 700,
            duration: 0.7,
            stagger: 0.12,
          })
          .from(
            grid.querySelectorAll(".trust-card-icon"),
            {
              scale: 0.4,
              rotate: -20,
              autoAlpha: 0,
              duration: 0.55,
              stagger: 0.12,
              ease: "back.out(2.4)",
            },
            0
          )
          .from(
            grid.querySelectorAll(".trust-card-index"),
            { autoAlpha: 0, x: 12, duration: 0.5, stagger: 0.12 },
            0.15
          );

        cards.forEach((card) => {
          const setX = gsap.quickTo(card, "--mx", { duration: 0.5, ease: "power3" });
          const setY = gsap.quickTo(card, "--my", { duration: 0.5, ease: "power3" });
          const onMove = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            setX(((e.clientX - rect.left) / rect.width) * 100);
            setY(((e.clientY - rect.top) / rect.height) * 100);
          };
          const tl = gsap.timeline({ paused: true, defaults: { duration: 0.45, ease: "power3.out" } });
          tl.to(card, { y: -10, boxShadow: "var(--shadow-lg)" }, 0)
            .to(card.querySelector(".trust-card-glow"), { autoAlpha: 1 }, 0)
            .to(card.querySelector(".trust-card-icon"), { scale: 1.1, rotate: 6 }, 0)
            .to(card.querySelector(".trust-card-bar"), { scaleX: 1 }, 0);

          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerenter", () => tl.play());
          card.addEventListener("pointerleave", () => tl.reverse());
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [pillars.length] }
  );

  return (
    <div
      ref={gridRef}
      className="relative grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
    >
      <div
        className="pointer-events-none absolute -top-24 -left-16 w-[340px] h-[340px] rounded-full blur-3xl opacity-40"
        style={{ background: "var(--color-accent-200)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-10 w-[300px] h-[300px] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--color-accent-2-200)" }}
        aria-hidden
      />

      {pillars.map((p, i) => {
        const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
        return (
          <div
            key={p.title}
            className="trust-card group relative flex flex-col gap-5 rounded-[var(--radius-lg)] border p-7 h-full overflow-hidden [transform-style:preserve-3d]"
            style={
              {
                background: "var(--color-bg)",
                borderColor: "var(--color-divider)",
                boxShadow: "var(--shadow-sm)",
                "--mx": "50%",
                "--my": "0%",
              } as React.CSSProperties
            }
          >
            {/* animated top accent bar */}
            <span
              className="trust-card-bar absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0"
              style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
              aria-hidden
            />

            {/* cursor-following spotlight glow */}
            <span
              className="trust-card-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity"
              style={{
                background: `radial-gradient(280px circle at var(--mx) var(--my), color-mix(in srgb, ${accent.from} 14%, transparent), transparent 70%)`,
              }}
              aria-hidden
            />

            {/* faint oversized index numeral */}
            <span
              className="trust-card-index pointer-events-none absolute top-3 right-5 font-[var(--font-heading)] text-[64px] leading-none select-none"
              style={{ color: "var(--color-divider)" }}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <span
              className="trust-card-icon relative z-10 w-14 h-14 rounded-2xl grid place-content-center flex-none transition-transform duration-300"
              style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {p.icon}
              </svg>
            </span>

            <h3 className="relative z-10 text-[19px] m-0">{p.title}</h3>
            <p
              className="relative z-10 text-[14.5px] leading-[1.55] m-0"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              {p.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}

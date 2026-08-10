"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Subject = {
  title: string;
  blurb: string;
  icon: React.ReactNode;
};

const subjects: Subject[] = [
  {
    title: "Programming & Technology",
    blurb: "Web dev, data, and computer science fundamentals.",
    icon: (
      <>
        <path d="m9 8-4 4 4 4" />
        <path d="m15 8 4 4-4 4" />
      </>
    ),
  },
  {
    title: "Test Preparation",
    blurb: "SAT, ACT, and standardized exam coaching.",
    icon: (
      <>
        <path d="M6 3.5h9l3 3v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
        <path d="m8.5 13 2.3 2.3L15.5 10.5" />
      </>
    ),
  },
  {
    title: "Languages",
    blurb: "Conversation, grammar, and fluency at any level.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
      </>
    ),
  },
  {
    title: "Creative Skills",
    blurb: "Design, writing, and visual arts mentorship.",
    icon: (
      <>
        <path d="M12 3.5c-4.7 0-8.5 3.6-8.5 8 0 3.4 2.7 5 5 5h.7c.7 0 1.2.6 1.2 1.2 0 .3-.1.5-.3.7-.3.4-.5.8-.5 1.3 0 .9.8 1.8 2.4 1.8 4.7 0 8.5-4.1 8.5-9 0-5-3.8-9-8.5-9Z" />
        <circle cx="8.2" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
        <circle cx="15.8" cy="10.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "Music & Instruments",
    blurb: "Piano, guitar, voice, and music theory lessons.",
    icon: (
      <>
        <circle cx="7" cy="18" r="2.5" />
        <circle cx="17" cy="16" r="2.5" />
        <path d="M9.5 18V6.5L19.5 4v11.5" />
      </>
    ),
  },
];

const CARD_ACCENTS = [
  { from: "var(--color-accent-2-700)", to: "var(--color-accent-2-500)" },
  { from: "var(--color-accent-600)", to: "var(--color-accent-400)" },
  { from: "var(--color-accent-2-800)", to: "var(--color-accent-2-600)" },
  { from: "var(--color-accent-500)", to: "var(--color-accent-300)" },
  { from: "var(--color-accent-2-600)", to: "var(--color-accent-2-400)" },
];

export function SubjectsShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = gsap.utils.toArray<HTMLElement>(".subject-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        })
          .from(cards, {
            autoAlpha: 0,
            y: 40,
            scale: 0.94,
            duration: 0.65,
            stagger: 0.1,
          })
          .from(
            grid.querySelectorAll(".subject-card-icon"),
            {
              scale: 0.3,
              rotate: -18,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(2.6)",
            },
            0.1
          );

        cards.forEach((card) => {
          const tl = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: "power3.out" } });
          tl.to(card, { y: -8, boxShadow: "var(--shadow-lg)" }, 0)
            .to(card.querySelector(".subject-card-icon"), { scale: 1.12, rotate: 8 }, 0)
            .to(card.querySelector(".subject-card-bar"), { scaleX: 1 }, 0);

          card.addEventListener("pointerenter", () => tl.play());
          card.addEventListener("pointerleave", () => tl.reverse());
        });

        return scrollRevealSafetyNet(
          grid,
          () => isGsapHidden(cards[0]),
          () => {
            gsap.set(cards, { autoAlpha: 1, y: 0 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [] }
  );

  return (
    <div ref={gridRef} className="relative">
      <div
        className="pointer-events-none absolute -top-20 -left-10 w-[280px] h-[280px] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--color-accent-200)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-6 w-[240px] h-[240px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--color-accent-2-200)" }}
        aria-hidden
      />

      <div className="relative grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
        {subjects.map((s, i) => {
          const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
          return (
            <div
              key={s.title}
              className="subject-card group relative flex flex-col gap-4 rounded-[var(--radius-lg)] border p-6 overflow-hidden"
              style={{
                background: "var(--color-bg)",
                borderColor: "var(--color-divider)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                className="subject-card-bar absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0"
                style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
                aria-hidden
              />

              <span
                className="subject-card-icon relative z-10 w-12 h-12 rounded-2xl grid place-content-center flex-none transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {s.icon}
                </svg>
              </span>

              <div className="relative z-10">
                <h3 className="text-[16px] leading-snug m-0 mb-1.5">{s.title}</h3>
                <p
                  className="text-[13.5px] leading-relaxed m-0"
                  style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
                >
                  {s.blurb}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

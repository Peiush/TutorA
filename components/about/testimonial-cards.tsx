"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TutorAvatar } from "@/components/ui/tutor-avatar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Testimonial = { quote: string; name: string; role: string };

const ROLE_TINTS: Record<string, { chip: string; chipText: string; quote: string }> = {
  Parent: { chip: "var(--color-neutral-100)", chipText: "var(--color-neutral-700)", quote: "var(--color-neutral-300)" },
  Student: { chip: "var(--color-accent-100)", chipText: "var(--color-accent-800)", quote: "var(--color-accent-300)" },
  Tutor: { chip: "var(--color-accent-2-100)", chipText: "var(--color-accent-2-800)", quote: "var(--color-accent-2-300)" },
};

export function TestimonialCards({ testimonials }: { testimonials: Testimonial[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = gsap.utils.toArray<HTMLElement>(".tm-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 40, rotate: -1.5 });
        gsap.set(grid.querySelectorAll(".tm-quote"), { scale: 0, autoAlpha: 0 });
        gsap.set(grid.querySelectorAll(".tm-avatar"), { scale: 0 });

        gsap
          .timeline({ scrollTrigger: { trigger: grid, start: "top 85%", once: true } })
          .to(cards, { autoAlpha: 1, y: 0, rotate: 0, stagger: 0.12, duration: 0.6, ease: "power3.out" })
          .to(
            grid.querySelectorAll(".tm-quote"),
            { scale: 1, autoAlpha: 1, stagger: 0.12, duration: 0.5, ease: "back.out(2.6)" },
            0.15
          )
          .to(
            grid.querySelectorAll(".tm-avatar"),
            { scale: 1, stagger: 0.12, duration: 0.4, ease: "back.out(2.4)" },
            0.3
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0, rotate: 0 });
        gsap.set(grid.querySelectorAll(".tm-quote, .tm-avatar"), { scale: 1, autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [testimonials.length] }
  );

  return (
    <div ref={gridRef} className="relative grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
      {testimonials.map((q, i) => {
        const tint = ROLE_TINTS[q.role] ?? ROLE_TINTS.Parent;
        return (
          <figure
            key={q.name}
            className="tm-card group relative m-0 flex flex-col justify-between gap-5 h-full rounded-[var(--radius-lg)] border p-6 overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1.5"
            style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: "var(--shadow-lg)" }}
              aria-hidden
            />

            <svg
              className="tm-quote absolute top-4 right-5 pointer-events-none"
              width="46"
              height="46"
              viewBox="0 0 24 24"
              fill={tint.quote}
              aria-hidden
            >
              <path d="M7.5 6C4.9 6 3 8.1 3 10.9c0 2.6 1.8 4.6 4.2 4.6.4 0 .8-.1 1.1-.2-.5 2-2 3.6-4.1 4.4l.8 1.6c3.6-1.2 6-4.2 6-8.4C11 9.4 9.5 6 7.5 6Zm9.3 0c-2.6 0-4.5 2.1-4.5 4.9 0 2.6 1.8 4.6 4.2 4.6.4 0 .8-.1 1.1-.2-.5 2-2 3.6-4.1 4.4l.8 1.6c3.6-1.2 6-4.2 6-8.4 0-3.5-1.5-6.9-3.5-6.9Z" />
            </svg>

            <p className="relative z-10 font-[var(--font-heading)] text-[17.5px] leading-[1.45] m-0 pr-9">
              {q.quote}
            </p>

            <figcaption className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="tm-avatar inline-flex">
                  <TutorAvatar name={q.name} index={i} size={38} withBadge />
                </span>
                <div>
                  <div className="text-[13.5px] font-medium" style={{ color: "var(--color-text)" }}>
                    {q.name}
                  </div>
                  <span
                    className="inline-block mt-0.5 text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: tint.chip, color: tint.chipText }}
                  >
                    {q.role}
                  </span>
                </div>
              </div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

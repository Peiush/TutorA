"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type Testimonial = {
  quote: string;
  name: string;
  role: "Parent" | "Student" | "Tutor";
  rating?: number | null;
};

const ROLE_BAR: Record<string, string> = {
  Parent: "var(--color-accent-2-500)",
  Student: "var(--color-accent)",
  Tutor: "var(--color-verified)",
};
const DEFAULT_BAR = "var(--color-accent-2-500)";

function tagVariantForBar(bar: string): "accent" | "accent-2" {
  return bar === "var(--color-accent-2-500)" ? "accent-2" : "accent";
}

function QuoteIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      className={className}
      aria-hidden
      style={{
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: 44,
        lineHeight: 0.5,
        display: "inline-block",
        ...style,
      }}
    >
      &ldquo;
    </span>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = grid.querySelectorAll(".testimonial-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: grid, start: "top 88%", once: true },
        });

        tl.from(cards, {
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.12,
        }, 0)
          .from(grid.querySelectorAll(".testimonial-bar"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.45,
            stagger: 0.12,
          }, 0.06)
          .from(grid.querySelectorAll(".testimonial-quote-icon"), {
            scale: 0.3,
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.12,
            ease: "back.out(2.8)",
          }, 0.12)
          .from(grid.querySelectorAll(".testimonial-avatar"), {
            scale: 0.5,
            autoAlpha: 0,
            duration: 0.35,
            stagger: 0.12,
            ease: "back.out(2.4)",
          }, 0.3);

        return scrollRevealSafetyNet(
          grid,
          () => isGsapHidden(cards[0]),
          () => {
            gsap.set(cards, { autoAlpha: 1 });
            gsap.set(grid.querySelectorAll(".testimonial-bar"), { scaleX: 1 });
            gsap.set(grid.querySelectorAll(".testimonial-quote-icon"), { autoAlpha: 1, scale: 1 });
            gsap.set(grid.querySelectorAll(".testimonial-avatar"), { autoAlpha: 1, scale: 1 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1 });
        gsap.set(grid.querySelectorAll(".testimonial-bar"), { scaleX: 1 });
        gsap.set(grid.querySelectorAll(".testimonial-quote-icon"), { autoAlpha: 1, scale: 1 });
        gsap.set(grid.querySelectorAll(".testimonial-avatar"), { autoAlpha: 1, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [testimonials.length] }
  );

  return (
    <div ref={gridRef} className="grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
      {testimonials.map((q, i) => {
        const bar = ROLE_BAR[q.role] ?? DEFAULT_BAR;
        const tagVariant = tagVariantForBar(bar);
        return (
          <figure
            key={q.name}
            className="testimonial-card group relative flex flex-col justify-between gap-5 m-0 rounded-[22px] border p-7 cursor-default overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5"
            style={{
              background: "var(--color-bg)",
              borderColor: "var(--color-divider)",
            }}
          >
            <div
              className="testimonial-bar h-[5px] w-full flex-none absolute top-0 left-0"
              style={{ background: bar }}
              aria-hidden
            />
            <div className="relative z-[1] flex flex-col gap-4">
              <QuoteIcon className="testimonial-quote-icon" style={{ color: bar }} />
              <p className="font-[var(--font-heading)] text-[18px] leading-[1.4] m-0" style={{ color: "var(--color-text)" }}>
                {q.quote}
              </p>
              {!!q.rating && <StarRating rating={q.rating} size={14} />}
            </div>
            <figcaption className="relative z-[1] flex items-center gap-2.5">
              <div
                className="testimonial-avatar rounded-full"
                style={{ boxShadow: `0 0 0 3px color-mix(in srgb, ${bar} 22%, transparent)`, borderRadius: "50%" }}
              >
                <TutorAvatar name={q.name} index={i} size={38} />
              </div>
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold" style={{ color: "var(--color-text)" }}>
                  {q.name}
                </div>
                <Tag variant={tagVariant} className="text-[10px] px-2 py-0.5 mt-0.5 inline-block">
                  {q.role}
                </Tag>
              </div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

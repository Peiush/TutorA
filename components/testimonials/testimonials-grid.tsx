"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";
import type { TestimonialItem } from "@/app/lib/testimonials";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ROLE_BAR: Record<string, string> = {
  PARENT: "var(--color-accent-2-500)",
  STUDENT: "var(--color-accent)",
  TUTOR: "var(--color-verified)",
};
const ROLE_LABEL: Record<string, string> = { PARENT: "Parent", STUDENT: "Student", TUTOR: "Tutor" };

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

export function TestimonialsGrid({ testimonials }: { testimonials: TestimonialItem[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = grid.querySelectorAll<HTMLElement>(".testimonial-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();
      const cleanups: (() => void)[] = [];

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 28 });

        const batch = ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batchCards) => {
            gsap.to(batchCards, {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.1,
            });
          },
        });

        cards.forEach((card) => {
          cleanups.push(
            scrollRevealSafetyNet(
              card,
              () => isGsapHidden(card),
              () => gsap.set(card, { autoAlpha: 1, y: 0 })
            )
          );
        });

        return () => {
          batch.forEach((st) => st.kill());
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
      });

      return () => {
        cleanups.forEach((fn) => fn());
        mm.revert();
      };
    },
    { scope: gridRef, dependencies: [testimonials.length] }
  );

  if (testimonials.length === 0) {
    return (
      <div className="card elev-sm p-[clamp(24px,5vw,40px)] text-center">
        <p className="text-[15px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
          Be the first to share your story — your testimonial could be featured here.
        </p>
      </div>
    );
  }

  return (
    <div ref={gridRef} className="grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
      {testimonials.map((t, i) => {
        const bar = ROLE_BAR[t.role] ?? ROLE_BAR.PARENT;
        const tagVariant = tagVariantForBar(bar);
        return (
          <figure
            key={t.id}
            className="testimonial-card group relative flex flex-col justify-between gap-5 m-0 rounded-[22px] border p-7 cursor-default overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5"
            style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)" }}
          >
            <div className="h-[5px] w-full flex-none absolute top-0 left-0" style={{ background: bar }} aria-hidden />
            <div className="relative z-[1] flex flex-col gap-4">
              <QuoteIcon style={{ color: bar }} />
              <p className="font-[var(--font-heading)] text-[17px] leading-[1.45] m-0" style={{ color: "var(--color-text)" }}>
                {t.quote}
              </p>
              {!!t.rating && <StarRating rating={t.rating} size={14} />}
            </div>
            <figcaption className="relative z-[1] flex items-center gap-2.5">
              <div className="rounded-full" style={{ boxShadow: `0 0 0 3px color-mix(in srgb, ${bar} 22%, transparent)`, borderRadius: "50%" }}>
                <TutorAvatar name={t.name} index={i} size={38} />
              </div>
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold" style={{ color: "var(--color-text)" }}>
                  {t.name}
                </div>
                <Tag variant={tagVariant} className="text-[10px] px-2 py-0.5 mt-0.5 inline-block">
                  {ROLE_LABEL[t.role] ?? t.role}
                </Tag>
              </div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

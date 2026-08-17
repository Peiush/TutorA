"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";
import { TestimonialQuoteModal } from "@/components/testimonials/testimonial-quote-modal";
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
  const quoteRefs = useRef<Map<string, HTMLParagraphElement>>(new Map());
  const [truncatedIds, setTruncatedIds] = useState<Set<string>>(new Set());
  const [activeRole, setActiveRole] = useState<"ALL" | "PARENT" | "STUDENT" | "TUTOR">("ALL");
  const [activeTestimonial, setActiveTestimonial] = useState<{ item: TestimonialItem; index: number; rect: DOMRect | null } | null>(null);

  useEffect(() => {
    const next = new Set<string>();
    quoteRefs.current.forEach((el, id) => {
      if (el.scrollHeight - el.clientHeight > 1) next.add(id);
    });
    const frame = window.requestAnimationFrame(() => setTruncatedIds(next));
    return () => window.cancelAnimationFrame(frame);
  }, [testimonials]);

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
    { scope: gridRef, dependencies: [testimonials.length, activeRole] }
  );

  const visibleTestimonials = activeRole === "ALL" ? testimonials : testimonials.filter((item) => item.role === activeRole);

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
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.16em]" style={{ color: "var(--color-accent-700)" }}>The story wall</p><h2 className="text-[clamp(26px,3vw,38px)]">Real people. Real progress.</h2></div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter stories by role">
          {[{ label: "Everyone", value: "ALL" }, { label: "Parents", value: "PARENT" }, { label: "Students", value: "STUDENT" }, { label: "Tutors", value: "TUTOR" }].map((filter) => <button key={filter.value} type="button" aria-pressed={activeRole === filter.value} onClick={() => setActiveRole(filter.value as typeof activeRole)} className="rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-[background,color,border-color,transform] duration-200 hover:-translate-y-0.5" style={{ borderColor: activeRole === filter.value ? "var(--color-accent-600)" : "var(--color-divider)", background: activeRole === filter.value ? "var(--color-accent-600)" : "transparent", color: activeRole === filter.value ? "#fff" : "var(--color-text)" }}>{filter.label}</button>)}
        </div>
      </div>
      {visibleTestimonials.length === 0 ? <div className="rounded-[24px] border border-dashed p-12 text-center" style={{ borderColor: "var(--color-divider)" }}>No stories in this group yet — yours could be the first.</div> : <div ref={gridRef} className="grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] items-stretch">
        {visibleTestimonials.map((t, i) => {
          const bar = ROLE_BAR[t.role] ?? ROLE_BAR.PARENT;
          const tagVariant = tagVariantForBar(bar);
          const isTruncated = truncatedIds.has(t.id);
          return (
            <figure
              key={t.id}
              className={`testimonial-card group relative flex flex-col justify-between gap-5 m-0 h-full rounded-[22px] border p-7 cursor-default overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 ${i === 0 ? "md:col-span-2" : ""}`}
              style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)" }}
            >
              <div className="h-[5px] w-full flex-none absolute top-0 left-0" style={{ background: bar }} aria-hidden />
              <div className="relative z-[1] flex flex-col gap-4">
                <QuoteIcon style={{ color: bar }} />
                <div className="flex flex-col gap-1.5">
                  <p
                    ref={(el) => {
                      if (el) quoteRefs.current.set(t.id, el);
                      else quoteRefs.current.delete(t.id);
                    }}
                    className="testimonial-quote font-[var(--font-heading)] text-[17px] leading-[1.45] m-0 line-clamp-4"
                    style={{ color: "var(--color-text)" }}
                  >
                    {t.quote}
                  </p>
                  {isTruncated && (
                    <button
                      type="button"
                      onClick={(e) => {
                        const card = e.currentTarget.closest(".testimonial-card");
                        const rect = card ? card.getBoundingClientRect() : null;
                        setActiveTestimonial({ item: t, index: i, rect });
                      }}
                      className="self-start cursor-pointer text-[13px] font-semibold underline-offset-2 hover:underline transition-colors duration-200"
                      style={{ color: bar }}
                    >
                      Show more
                    </button>
                  )}
                </div>
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
      </div>}

      {activeTestimonial && (
        <TestimonialQuoteModal
          testimonial={{
            quote: activeTestimonial.item.quote,
            name: activeTestimonial.item.name,
            roleLabel: ROLE_LABEL[activeTestimonial.item.role] ?? activeTestimonial.item.role,
            rating: activeTestimonial.item.rating,
          }}
          avatarIndex={activeTestimonial.index}
          accentColor={ROLE_BAR[activeTestimonial.item.role] ?? ROLE_BAR.PARENT}
          tagVariant={tagVariantForBar(ROLE_BAR[activeTestimonial.item.role] ?? ROLE_BAR.PARENT)}
          originRect={activeTestimonial.rect}
          onClose={() => setActiveTestimonial(null)}
        />
      )}
    </>
  );
}

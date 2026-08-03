"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CodeBracketIcon, TargetIcon, GlobeIcon, PaletteIcon, MusicNoteIcon, CheckIcon } from "@/components/courses/course-icons";
import { CATEGORY_COLORS, CourseIllustration } from "@/components/courses/course-illustrations";
import { GradeBandIllustration } from "@/components/courses/grade-band-illustrations";
import { courseCategories, type CourseCategory } from "@/lib/mock-courses";
import { GRADE_BANDS, GRADE_BAND_COLORS, type GradeBandKey } from "@/lib/grade-bands";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PRIORITY_LABELS = new Set(["Grade 6-8", "Grade 8-10", "Grade 10-12", "Programming & Technology"]);

const CATEGORY_ICON: Record<CourseCategory, typeof CodeBracketIcon> = {
  "Programming & Technology": CodeBracketIcon,
  "Test Preparation": TargetIcon,
  Languages: GlobeIcon,
  "Creative Skills": PaletteIcon,
  "Music & Instruments": MusicNoteIcon,
};

type Item = {
  label: string;
  count: number;
  unit: "course" | "subject";
  gradeBandKey?: GradeBandKey;
  category?: CourseCategory;
  solid: string;
  light: string;
  text: string;
};

export function CategorySelector({
  category,
  onSelect,
  counts,
  total,
  gradeBandCounts,
}: {
  category: string;
  onSelect: (category: string) => void;
  counts: Record<string, number>;
  total: number;
  gradeBandCounts: Record<GradeBandKey, number>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: rootRef.current, start: "top 88%", once: true } })
          .from(".cat-card-priority", { autoAlpha: 0, y: 26, scale: 0.92, duration: 0.6, stagger: 0.09, ease: "back.out(1.5)" })
          .from(
            ".cat-card-secondary",
            { autoAlpha: 0, y: 16, scale: 0.94, duration: 0.45, stagger: 0.06, ease: "back.out(1.5)" },
            "-=0.3"
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".cat-card-priority, .cat-card-secondary", { autoAlpha: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const handleEnter = contextSafe((el: HTMLElement, solid: string, active: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, { y: -5, duration: 0.25, ease: "power2.out" });
    gsap.to(el.querySelector(".cat-icon"), { rotate: -6, scale: 1.08, duration: 0.3, ease: "back.out(2.4)" });
    el.style.boxShadow = active
      ? `0 16px 32px -8px color-mix(in srgb, ${solid} 65%, transparent)`
      : `0 14px 28px -10px color-mix(in srgb, ${solid} 45%, transparent)`;
  });

  const handleLeave = contextSafe((el: HTMLElement, solid: string, active: boolean) => {
    gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(el.querySelector(".cat-icon"), { rotate: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    el.style.boxShadow = active ? `0 10px 24px -8px color-mix(in srgb, ${solid} 55%, transparent)` : "var(--shadow-sm)";
  });

  const handleClick = contextSafe((el: HTMLElement, value: string) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(el, { scale: 0.94 }, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.6)" });
    }
    onSelect(value);
  });

  const items: Item[] = [
    ...GRADE_BANDS.map((b) => ({
      label: b.label,
      count: gradeBandCounts[b.key] ?? 0,
      unit: "subject" as const,
      gradeBandKey: b.key,
      solid: GRADE_BAND_COLORS[b.key].solid,
      light: GRADE_BAND_COLORS[b.key].light,
      text: GRADE_BAND_COLORS[b.key].text,
    })),
    ...courseCategories.map((c) => ({
      label: c,
      count: counts[c] ?? 0,
      unit: "course" as const,
      category: c,
      solid: CATEGORY_COLORS[c].solid,
      light: CATEGORY_COLORS[c].light,
      text: CATEGORY_COLORS[c].text,
    })),
  ];

  const priorityItems = items.filter((i) => PRIORITY_LABELS.has(i.label));
  const secondaryItems = items.filter((i) => !PRIORITY_LABELS.has(i.label));

  return (
    <div ref={rootRef} className="flex flex-col gap-7">
      <div>
        <p
          className="text-[11px] font-semibold uppercase tracking-wide mb-3"
          style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
        >
          Popular right now
        </p>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(210px,1fr))]">
          {priorityItems.map((item) => {
            const active = category === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onMouseEnter={(e) => handleEnter(e.currentTarget, item.solid, active)}
                onMouseLeave={(e) => handleLeave(e.currentTarget, item.solid, active)}
                onClick={(e) => handleClick(e.currentTarget, item.label)}
                aria-pressed={active}
                className="cat-card cat-card-priority group relative flex flex-col justify-between gap-3 cursor-pointer overflow-hidden rounded-[22px] border p-5 text-left transition-[border-color] duration-250 ease-out min-h-[192px]"
                style={{
                  background: active
                    ? `linear-gradient(145deg, ${item.solid} 0%, color-mix(in srgb, ${item.solid} 78%, black 22%) 100%)`
                    : `linear-gradient(145deg, ${item.light} 0%, color-mix(in srgb, ${item.solid} 16%, ${item.light}) 100%)`,
                  borderColor: active ? item.solid : `color-mix(in srgb, ${item.solid} 30%, transparent)`,
                  boxShadow: active ? `0 14px 30px -10px color-mix(in srgb, ${item.solid} 55%, transparent)` : "var(--shadow-sm)",
                }}
              >
                <span
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
                  style={{ background: active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.4)" }}
                  aria-hidden
                />

                {active && (
                  <span
                    className="absolute top-3 right-3 grid place-content-center rounded-full z-10"
                    style={{ width: 22, height: 22, background: "var(--color-accent-500)", color: "var(--color-accent-2-900)" }}
                  >
                    <CheckIcon width={12} height={12} strokeWidth={3} />
                  </span>
                )}

                <span
                  className="relative w-fit text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                  style={{
                    background: active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.65)",
                    color: active ? "#fff" : item.text,
                  }}
                >
                  Popular
                </span>

                <span
                  className="cat-icon pointer-events-none absolute -right-4 -bottom-4 w-28 h-28 transition-transform duration-300"
                  style={{ filter: "drop-shadow(0 12px 20px rgba(20,16,8,0.16))" }}
                  aria-hidden
                >
                  {item.gradeBandKey ? (
                    <GradeBandIllustration band={item.gradeBandKey} className="w-full h-full" />
                  ) : (
                    <CourseIllustration category={item.category!} className="w-full h-full" />
                  )}
                </span>

                <span className="relative mt-auto max-w-[62%]">
                  <span
                    className="block text-[16px] font-bold leading-snug font-[var(--font-heading)]"
                    style={{ color: active ? "#fff" : "var(--color-text)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="block text-[12px] mt-1"
                    style={{ color: active ? "rgba(255,255,255,0.85)" : "color-mix(in srgb, var(--color-text) 67%, transparent)" }}
                  >
                    {item.count} {item.unit}
                    {item.count === 1 ? "" : "s"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p
          className="text-[11px] font-semibold uppercase tracking-wide mb-3"
          style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
        >
        </p>
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(140px,1fr))]">
          {secondaryItems.map((item) => {
            const active = category === item.label;
            const Icon = CATEGORY_ICON[item.category!];

            return (
              <button
                key={item.label}
                type="button"
                onMouseEnter={(e) => handleEnter(e.currentTarget, item.solid, active)}
                onMouseLeave={(e) => handleLeave(e.currentTarget, item.solid, active)}
                onClick={(e) => handleClick(e.currentTarget, item.label)}
                aria-pressed={active}
                className="cat-card cat-card-secondary group relative flex flex-col items-start gap-2.5 cursor-pointer overflow-hidden rounded-[var(--radius-lg)] border p-4 text-left transition-[border-color] duration-250 ease-out"
                style={{
                  background: active
                    ? `linear-gradient(140deg, ${item.solid} 0%, color-mix(in srgb, ${item.solid} 78%, black 22%) 100%)`
                    : `linear-gradient(140deg, ${item.light} 0%, color-mix(in srgb, ${item.solid} 12%, ${item.light}) 100%)`,
                  borderColor: active ? item.solid : `color-mix(in srgb, ${item.solid} 26%, transparent)`,
                  boxShadow: active ? `0 10px 24px -8px color-mix(in srgb, ${item.solid} 55%, transparent)` : "var(--shadow-sm)",
                }}
              >
                <span
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
                  style={{ background: active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.35)" }}
                  aria-hidden
                />
                {active && (
                  <span
                    className="absolute top-2.5 right-2.5 grid place-content-center rounded-full"
                    style={{ width: 20, height: 20, background: "var(--color-accent-500)", color: "var(--color-accent-2-900)" }}
                  >
                    <CheckIcon width={11} height={11} strokeWidth={3} />
                  </span>
                )}
                <span
                  className="cat-icon relative grid place-content-center rounded-[14px] flex-none transition-colors duration-250"
                  style={{
                    width: 40,
                    height: 40,
                    background: active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.55)",
                    color: active ? "#fff" : item.text,
                  }}
                >
                  <Icon width={20} height={20} strokeWidth={2} />
                </span>
                <span className="relative">
                  <span
                    className="block text-[13.5px] font-semibold leading-snug font-[var(--font-heading)]"
                    style={{ color: active ? "#fff" : "var(--color-text)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="block text-[11.5px] mt-0.5"
                    style={{ color: active ? "rgba(255,255,255,0.8)" : "color-mix(in srgb, var(--color-text) 67%, transparent)" }}
                  >
                    {item.count} {item.unit}
                    {item.count === 1 ? "" : "s"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

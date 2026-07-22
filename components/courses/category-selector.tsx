"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CodeBracketIcon, TargetIcon, GlobeIcon, PaletteIcon, MusicNoteIcon, GridIcon, CheckIcon } from "@/components/courses/course-icons";
import { CATEGORY_COLORS } from "@/components/courses/course-illustrations";
import { courseCategories, type CourseCategory } from "@/lib/mock-courses";

gsap.registerPlugin(useGSAP);

const ALL = "All courses";

const CATEGORY_ICON: Record<CourseCategory, typeof CodeBracketIcon> = {
  "Programming & Technology": CodeBracketIcon,
  "Test Preparation": TargetIcon,
  Languages: GlobeIcon,
  "Creative Skills": PaletteIcon,
  "Music & Instruments": MusicNoteIcon,
};

export function CategorySelector({
  category,
  onSelect,
  counts,
  total,
}: {
  category: string;
  onSelect: (category: string) => void;
  counts: Record<string, number>;
  total: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(
    () => {
      const cards = rootRef.current?.querySelectorAll(".cat-card");
      if (!cards || !cards.length) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 18, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.06, ease: "back.out(1.5)" }
      );
    },
    { scope: rootRef }
  );

  const handleEnter = contextSafe((el: HTMLElement, solid: string, active: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, { y: -5, duration: 0.25, ease: "power2.out" });
    gsap.to(el.querySelector(".cat-icon"), { rotate: -8, scale: 1.12, duration: 0.3, ease: "back.out(2.4)" });
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

  const items: { label: string; count: number }[] = [
    { label: ALL, count: total },
    ...courseCategories.map((c) => ({ label: c, count: counts[c] ?? 0 })),
  ];

  return (
    <div ref={rootRef} className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(140px,1fr))]">
      {items.map(({ label, count }) => {
        const active = category === label;
        const isAll = label === ALL;
        const colors = isAll ? null : CATEGORY_COLORS[label as CourseCategory];
        const Icon = isAll ? GridIcon : CATEGORY_ICON[label as CourseCategory];
        const solid = isAll ? "var(--color-accent-2-800)" : colors!.solid;
        const light = isAll ? "var(--color-accent-2-100)" : colors!.light;
        const text = isAll ? "var(--color-accent-2-800)" : colors!.text;

        return (
          <button
            key={label}
            type="button"
            onMouseEnter={(e) => handleEnter(e.currentTarget, solid, active)}
            onMouseLeave={(e) => handleLeave(e.currentTarget, solid, active)}
            onClick={(e) => handleClick(e.currentTarget, label)}
            aria-pressed={active}
            className="cat-card group relative flex flex-col items-start gap-2.5 cursor-pointer overflow-hidden rounded-[var(--radius-lg)] border p-4 text-left transition-[border-color] duration-250 ease-out"
            style={{
              background: active
                ? `linear-gradient(140deg, ${solid} 0%, color-mix(in srgb, ${solid} 78%, black 22%) 100%)`
                : `linear-gradient(140deg, ${light} 0%, color-mix(in srgb, ${solid} 12%, ${light}) 100%)`,
              borderColor: active ? solid : `color-mix(in srgb, ${solid} 26%, transparent)`,
              boxShadow: active ? `0 10px 24px -8px color-mix(in srgb, ${solid} 55%, transparent)` : "var(--shadow-sm)",
            }}
          >
            {/* sheen sweep */}
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
                color: active ? "#fff" : text,
              }}
            >
              <Icon width={20} height={20} strokeWidth={2} />
            </span>
            <span className="relative">
              <span
                className="block text-[13.5px] font-semibold leading-snug font-[var(--font-heading)]"
                style={{ color: active ? "#fff" : "var(--color-text)" }}
              >
                {label}
              </span>
              <span
                className="block text-[11.5px] mt-0.5"
                style={{ color: active ? "rgba(255,255,255,0.8)" : "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
              >
                {count} course{count === 1 ? "" : "s"}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

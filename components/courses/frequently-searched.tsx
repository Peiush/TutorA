"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TargetIcon, CodeBracketIcon, GlobeIcon } from "@/components/courses/course-icons";
import { CATEGORY_COLORS } from "@/components/courses/course-illustrations";
import type { CourseCategory } from "@/lib/mock-courses";

export const FREQUENTLY_SEARCHED: {
  group: string;
  icon: typeof TargetIcon;
  colorKey: CourseCategory;
  items: { label: string; query: string }[];
}[] = [
  {
    group: "Test Preparation",
    icon: TargetIcon,
    colorKey: "Test Preparation",
    items: [
      { label: "SAT", query: "SAT" },
      { label: "ACT", query: "ACT" },
      { label: "AP Subjects", query: "AP" },
      { label: "IB Programme", query: "IB" },
      { label: "IGCSE", query: "IGCSE" },
      { label: "GCSE", query: "GCSE" },
      { label: "A Levels", query: "Level" },
      { label: "PSAT", query: "PSAT" },
      { label: "IELTS", query: "IELTS" },
      { label: "TOEFL", query: "TOEFL" },
      { label: "PTE", query: "PTE" },
    ],
  },
  {
    group: "Coding Courses",
    icon: CodeBracketIcon,
    colorKey: "Programming & Technology",
    items: [
      { label: "Scratch", query: "Scratch" },
      { label: "Python", query: "Python" },
      { label: "Java", query: "Java" },
      { label: "C++", query: "C++" },
      { label: "HTML", query: "HTML" },
      { label: "CSS", query: "CSS" },
      { label: "JavaScript", query: "JavaScript" },
      { label: "SQL", query: "SQL" },
      { label: "React (Basics)", query: "React" },
      { label: "AI for Beginners", query: "AI" },
    ],
  },
  {
    group: "Languages",
    icon: GlobeIcon,
    colorKey: "Languages",
    items: [
      { label: "English Speaking", query: "Spoken" },
      { label: "Spoken English", query: "Spoken" },
      { label: "Business English", query: "Business English" },
      { label: "IELTS English", query: "IELTS" },
      { label: "French", query: "French" },
      { label: "Spanish", query: "Spanish" },
      { label: "Arabic", query: "Arabic" },
      { label: "Hindi", query: "Hindi" },
    ],
  },
];

export function FrequentlySearched({
  onPick,
  title = "Frequently searched",
  description = "Popular exam prep, coding and language searches — tap one to jump straight to it.",
  className = "",
  align = "left",
}: {
  onPick: (query: string) => void;
  title?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  const rootRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const chips = gsap.utils.toArray<HTMLElement>(".fs-chip", rootRef.current);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(chips, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(chips, { autoAlpha: 0, y: 8 });
      gsap.to(chips, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.012, ease: "power2.out" });
    },
    { scope: rootRef }
  );

  const handleEnter = contextSafe((el: HTMLElement, solid: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, { y: -2, scale: 1.04, duration: 0.2, ease: "power2.out" });
    el.style.boxShadow = `0 8px 18px -8px color-mix(in srgb, ${solid} 55%, transparent)`;
  });

  const handleLeave = contextSafe((el: HTMLElement) => {
    gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
    el.style.boxShadow = "none";
  });

  const handleClick = contextSafe((el: HTMLElement, query: string) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(el, { scale: 0.92 }, { scale: 1.04, duration: 0.3, ease: "back.out(2)" });
    }
    onPick(query);
  });

  return (
    <div ref={rootRef} className={className}>
      <h2 className={`text-[18px] mb-1 ${centered ? "text-center" : ""}`} style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <p
        className={`text-[13.5px] mb-4 ${centered ? "text-center" : ""}`}
        style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
      >
        {description}
      </p>
      <div className="flex flex-col gap-4">
        {FREQUENTLY_SEARCHED.map(({ group, icon: Icon, colorKey, items }) => {
          const colors = CATEGORY_COLORS[colorKey];
          return (
            <div key={group}>
              <div className={`flex items-center gap-2 mb-2 ${centered ? "justify-center" : ""}`}>
                <span
                  className="w-6 h-6 rounded-full grid place-content-center flex-none"
                  style={{ background: colors.light, color: colors.text }}
                >
                  <Icon width={12} height={12} />
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: colors.text }}>
                  {group}
                </span>
              </div>
              <div className={`flex flex-wrap gap-2 ${centered ? "justify-center" : ""}`}>
                {items.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onMouseEnter={(e) => handleEnter(e.currentTarget, colors.solid)}
                    onMouseLeave={(e) => handleLeave(e.currentTarget)}
                    onClick={(e) => handleClick(e.currentTarget, item.query)}
                    className="fs-chip cursor-pointer rounded-full px-3.5 py-1.5 text-[12.5px] font-medium"
                    style={{
                      background: colors.light,
                      color: colors.text,
                      border: `1px solid color-mix(in srgb, ${colors.solid} 30%, transparent)`,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

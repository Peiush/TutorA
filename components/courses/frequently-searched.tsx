"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollRevealSafetyNet } from "@/lib/scroll-reveal-safety-net";
import { TargetIcon, CodeBracketIcon, GlobeIcon } from "@/components/courses/course-icons";
import { CATEGORY_COLORS } from "@/components/courses/course-illustrations";
import type { CourseCategory } from "@/lib/mock-courses";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

// Deterministic hash so size/rotation/order stay stable between server and client renders.
function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// Seeded shuffle so items look scattered rather than alphabetically listed.
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const result = [...arr];
  let s = hashString(seed) || 1;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Mobile tiers are kept close together (11-13px, readable) — the dramatic size jumps
// that make the desktop cloud feel playful just read as jumbled clutter on a 375px
// screen. Full variance returns from sm: up.
const CHIP_SIZES = [
  { text: "text-[11px] sm:text-[11px]", pad: "px-2 py-1 sm:px-2.5 sm:py-1" },
  { text: "text-[11.5px] sm:text-[12.5px]", pad: "px-2.5 py-1 sm:px-3.5 sm:py-1.5" },
  { text: "text-[12px] sm:text-[14px]", pad: "px-2.5 py-1 sm:px-4 sm:py-2" },
  { text: "text-[12.5px] sm:text-[16.5px]", pad: "px-3 py-1 sm:px-5 sm:py-2.5" },
  { text: "text-[13px] sm:text-[19px]", pad: "px-3 py-1 sm:px-6 sm:py-3" },
];

function chipStyleFor(label: string) {
  const hash = hashString(label);
  const size = CHIP_SIZES[hash % CHIP_SIZES.length];
  const rotation = (hash % 17) - 8; // -8deg .. 8deg
  const lift = ((hash >> 3) % 11) - 5; // -5px .. 5px
  return { size, rotation, lift };
}

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

  const allItems = useMemo(() => {
    const flat = FREQUENTLY_SEARCHED.flatMap(({ colorKey, items }) =>
      items.map((item) => ({ ...item, colors: CATEGORY_COLORS[colorKey] }))
    );
    return seededShuffle(flat, "frequently-searched-all");
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const chips = gsap.utils.toArray<HTMLElement>(".fs-chip", rootRef.current);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(chips, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(chips, { autoAlpha: 0, y: 8 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: rootRef.current, start: "top 88%", once: true } });
      tl.to(chips, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.012, ease: "power2.out" });
      return scrollRevealSafetyNet(rootRef.current!, () => tl.progress() < 1, () => tl.progress(1));
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
      <h2 className={`text-[15px] sm:text-[18px] mb-0.5 sm:mb-1 ${centered ? "text-center" : ""}`} style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <p
        className={`text-[11.5px] sm:text-[13.5px] mb-2 sm:mb-4 ${centered ? "text-center" : ""}`}
        style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
      >
        {description}
      </p>
      <div className={`flex flex-wrap items-center gap-x-1.5 gap-y-1.5 sm:gap-x-2.5 sm:gap-y-2 ${centered ? "justify-center" : ""}`}>
        {allItems.map(({ label, query, colors }) => {
          const { size, rotation, lift } = chipStyleFor(label);
          return (
            <button
              key={label}
              type="button"
              onMouseEnter={(e) => handleEnter(e.currentTarget, colors.solid)}
              onMouseLeave={(e) => handleLeave(e.currentTarget)}
              onClick={(e) => handleClick(e.currentTarget, query)}
              className={`fs-chip cursor-pointer rounded-full font-medium ${size.text} ${size.pad}`}
              style={{
                background: colors.light,
                color: colors.text,
                border: `1px solid color-mix(in srgb, ${colors.solid} 30%, transparent)`,
                transform: `rotate(${rotation}deg) translateY(${lift}px)`,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

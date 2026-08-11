"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CodeBracketIcon,
  TargetIcon,
  GlobeIcon,
  PaletteIcon,
  MusicNoteIcon,
} from "@/components/courses/course-icons";
import { CATEGORY_COLORS, CourseIllustration } from "@/components/courses/course-illustrations";
import { GradeBandIllustration } from "@/components/courses/grade-band-illustrations";
import type { CourseCategory } from "@/lib/mock-courses";
import { GRADE_BANDS, GRADE_BAND_COLORS, type GradeBandKey } from "@/lib/grade-bands";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORY_ICON: Record<CourseCategory, typeof CodeBracketIcon> = {
  "Programming & Technology": CodeBracketIcon,
  "Test Preparation": TargetIcon,
  Languages: GlobeIcon,
  "Creative Skills": PaletteIcon,
  "Music & Instruments": MusicNoteIcon,
};

const PRIORITY_LABELS = new Set(["Grade 6-8", "Grade 9-10", "Grade 11-12", "Programming & Technology"]);

export interface CategoryCount {
  label: CourseCategory;
  count: number;
}

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

function ShowcaseCard({ item, priority, revealClass }: { item: Item; priority: boolean; revealClass: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const Icon = item.category ? CATEGORY_ICON[item.category] : undefined;

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!fine || reduced) return;

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--spot-x", `${x}%`);
        el.style.setProperty("--spot-y", `${y}%`);
      };
      const handleEnter = () => {
        gsap.to(el, { y: -8, scale: 1.02, duration: 0.35, ease: "power3.out" });
        gsap.to(el.querySelector(".showcase-medallion"), {
          scale: 1.1,
          rotate: -5,
          duration: 0.5,
          ease: "back.out(2.2)",
        });
        gsap.to(el.querySelector(".showcase-arrow"), { x: 4, duration: 0.3, ease: "power2.out" });
      };
      const handleLeave = () => {
        gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(el.querySelector(".showcase-medallion"), { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(el.querySelector(".showcase-arrow"), { x: 0, duration: 0.3, ease: "power2.out" });
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: cardRef, dependencies: [item.count] }
  );

  return (
    <Link
      ref={cardRef}
      href={`/courses?category=${encodeURIComponent(item.label)}`}
      className={`showcase-card ${revealClass} group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        priority ? "p-5 sm:p-6 min-h-[220px] sm:min-h-[248px]" : "p-4 sm:p-5 min-h-[152px] sm:min-h-[168px]"
      }`}
      style={
        {
          background: priority
            ? `linear-gradient(150deg, ${item.light} 0%, color-mix(in srgb, ${item.solid} 46%, ${item.light}) 100%)`
            : `linear-gradient(150deg, ${item.light} 0%, color-mix(in srgb, ${item.solid} 30%, ${item.light}) 100%)`,
          border: `1px solid color-mix(in srgb, ${item.solid} 45%, transparent)`,
          boxShadow: priority
            ? `0 22px 46px -16px color-mix(in srgb, ${item.solid} 58%, transparent)`
            : `0 14px 30px -14px color-mix(in srgb, ${item.solid} 50%, transparent)`,
        } as CSSProperties
      }
    >
      {priority && (
        <span
          className="pointer-events-none absolute top-0 left-6 right-6 h-[3px] rounded-full opacity-70"
          style={{ background: `linear-gradient(90deg, transparent, ${item.solid}, transparent)` }}
          aria-hidden
        />
      )}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${priority ? 300 : 220}px circle at var(--spot-x,50%) var(--spot-y,50%), color-mix(in srgb, ${item.solid} 30%, transparent), transparent 70%)`,
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
        style={{ background: "rgba(255,255,255,0.45)" }}
        aria-hidden
      />

      {priority ? (
        <span
          className="showcase-medallion pointer-events-none absolute -right-4 -bottom-4 w-28 h-28 sm:w-36 sm:h-36"
          style={{ filter: "drop-shadow(0 14px 22px rgba(20,16,8,0.18))" }}
          aria-hidden
        >
          {item.gradeBandKey ? (
            <GradeBandIllustration band={item.gradeBandKey} className="w-full h-full" />
          ) : (
            <CourseIllustration category={item.category!} className="w-full h-full" />
          )}
        </span>
      ) : (
        Icon && (
          <span
            className="showcase-medallion relative z-[1] grid place-content-center rounded-2xl flex-none"
            style={{ width: 40, height: 40, background: "rgba(255,255,255,0.6)", color: item.text }}
          >
            <Icon width={19} height={19} strokeWidth={2} />
          </span>
        )
      )}

      {priority && (
        <span
          className="relative z-[1] w-fit text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
          style={{ background: item.solid, color: "#FFFFFF", boxShadow: `0 4px 12px -2px color-mix(in srgb, ${item.solid} 60%, transparent)` }}
        >
          Popular
        </span>
      )}

      <span className={`relative z-[1] ${priority ? "mt-auto max-w-[68%] sm:max-w-[62%]" : "mt-3"}`}>
        <span
          className={`block font-bold leading-snug font-[var(--font-heading)] ${priority ? "text-[17px] sm:text-[20px]" : "text-[14px]"}`}
          style={{ color: "var(--color-text)" }}
        >
          {item.label}
        </span>
        <span
          className={`block mt-1 ${priority ? "text-[12.5px] sm:text-[13.5px]" : "text-[11.5px]"}`}
          style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}
        >
          {item.count} {item.unit}
          {item.count === 1 ? "" : "s"}
        </span>
        <span
          className="showcase-arrow mt-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold"
          style={{ color: item.text }}
        >
          Explore
          <span aria-hidden>→</span>
        </span>
      </span>
    </Link>
  );
}

export function CourseCategoriesShowcase({
  categories,
  gradeBandCounts,
}: {
  categories: CategoryCount[];
  gradeBandCounts: Record<GradeBandKey, number>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const priorityCards = root.querySelectorAll(".showcase-card-priority");
      const secondaryCards = root.querySelectorAll(".showcase-card-secondary");
      if (!priorityCards.length) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 85%", once: true } });
        tl.fromTo(
          priorityCards,
          { autoAlpha: 0, y: 44, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: "back.out(1.6)" }
        ).fromTo(
          secondaryCards,
          { autoAlpha: 0, y: 26, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: "back.out(1.6)" },
          "-=0.35"
        );

        return scrollRevealSafetyNet(
          root,
          () => isGsapHidden(priorityCards[0]),
          () => {
            gsap.set([...priorityCards, ...secondaryCards], { autoAlpha: 1, y: 0, scale: 1 });
          }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...priorityCards, ...secondaryCards], { autoAlpha: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [categories.length] }
  );

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
    ...categories.map((c) => ({
      label: c.label,
      count: c.count,
      unit: "course" as const,
      category: c.label,
      solid: CATEGORY_COLORS[c.label].solid,
      light: CATEGORY_COLORS[c.label].light,
      text: CATEGORY_COLORS[c.label].text,
    })),
  ];

  const priorityItems = items.filter((i) => PRIORITY_LABELS.has(i.label));
  const secondaryItems = items.filter((i) => !PRIORITY_LABELS.has(i.label));

  return (
    <div ref={rootRef} className="flex flex-col gap-4 sm:gap-5">
      <div className="grid gap-3.5 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {priorityItems.map((item) => (
          <ShowcaseCard key={item.label} item={item} priority revealClass="showcase-card-priority" />
        ))}
      </div>
      <div className="grid gap-3 sm:gap-3.5 grid-cols-2 lg:grid-cols-4">
        {secondaryItems.map((item) => (
          <ShowcaseCard key={item.label} item={item} priority={false} revealClass="showcase-card-secondary" />
        ))}
      </div>
    </div>
  );
}

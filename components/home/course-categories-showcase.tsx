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
  GridIcon,
} from "@/components/courses/course-icons";
import type { CourseCategory } from "@/lib/mock-courses";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORY_ICON: Record<CourseCategory, typeof CodeBracketIcon> = {
  "Programming & Technology": CodeBracketIcon,
  "Test Preparation": TargetIcon,
  Languages: GlobeIcon,
  "Creative Skills": PaletteIcon,
  "Music & Instruments": MusicNoteIcon,
};

// On-brand navy → gold treatments only — no unrelated hues. Each card is a different
// depth/warmth mix of the same two brand colors (deep navy base, gold as the one accent
// thread), so the section pops against the cream page without breaking the site's palette.
const CARD_BG: Record<CourseCategory, string> = {
  "Programming & Technology":
    "linear-gradient(140deg, var(--color-accent-2-900) 0%, var(--color-accent-2-700) 100%)",
  "Test Preparation":
    "linear-gradient(140deg, var(--color-accent-2-800) 0%, var(--color-accent-2-600) 100%)",
  "Creative Skills":
    "linear-gradient(140deg, var(--color-accent-2-900) 0%, color-mix(in srgb, var(--color-accent-2-600) 72%, var(--color-accent-500) 28%) 100%)",
  "Music & Instruments":
    "linear-gradient(140deg, var(--color-accent-2-800) 0%, color-mix(in srgb, var(--color-accent-2-700) 78%, var(--color-accent-500) 22%) 100%)",
  Languages:
    "linear-gradient(115deg, var(--color-accent-2-900) 0%, var(--color-accent-2-700) 48%, var(--color-accent-600) 130%)",
};

// Bento spans per category — this is what turns the grid from a uniform list into a
// composed layout: one hero cell, four square cells, one wide banner for the biggest catalog.
const SPAN: Record<CourseCategory, string> = {
  "Programming & Technology": "col-span-1",
  "Test Preparation": "col-span-1",
  "Creative Skills": "col-span-1",
  "Music & Instruments": "col-span-1",
  Languages: "col-span-1 sm:col-span-2 lg:col-span-4",
};

export interface CategoryCount {
  label: CourseCategory;
  count: number;
}

function CategoryCard({
  label,
  count,
  banner,
}: {
  label: CourseCategory;
  count: number;
  banner?: boolean;
}) {
  const Icon = CATEGORY_ICON[label];
  const cardRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!el) return;

      if (!fine || reduced) return;

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--spot-x", `${x}%`);
        el.style.setProperty("--spot-y", `${y}%`);
      };
      const handleEnter = () => {
        gsap.to(el, { y: -8, scale: 1.015, duration: 0.35, ease: "power3.out" });
        gsap.to(el.querySelector(".cat-ghost-icon"), {
          scale: 1.12,
          rotate: -6,
          duration: 0.5,
          ease: "back.out(2.2)",
        });
        gsap.to(el.querySelector(".cat-arrow"), { x: 4, duration: 0.3, ease: "power2.out" });
      };
      const handleLeave = () => {
        gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(el.querySelector(".cat-ghost-icon"), { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(el.querySelector(".cat-arrow"), { x: 0, duration: 0.3, ease: "power2.out" });
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
    { scope: cardRef, dependencies: [count] }
  );

  return (
    <Link
      ref={cardRef}
      href={`/courses?category=${encodeURIComponent(label)}`}
      className={`cat-showcase-card group relative flex overflow-hidden rounded-[var(--radius-lg)] p-5 sm:p-6 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        SPAN[label]
      } ${banner ? "min-h-[162px] items-center" : "min-h-[190px] flex-col justify-between"}`}
      style={
        {
          background: CARD_BG[label],
          boxShadow: "0 10px 30px -12px rgba(15, 23, 42, 0.4)",
        } as CSSProperties
      }
    >
      {/* signature gold thread */}
      <span
        className="pointer-events-none absolute top-0 left-5 right-5 h-[3px] rounded-full opacity-70"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-400), transparent)" }}
        aria-hidden
      />
      {/* cursor spotlight — warm gold, on-brand */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(280px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(232,163,61,0.28), transparent 70%)",
        }}
        aria-hidden
      />
      {/* sheen sweep */}
      <span
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/10 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
        aria-hidden
      />

      {/* oversized ghost icon motif, gold-tinted */}
      <span
        className={`cat-ghost-icon pointer-events-none absolute ${
          banner ? "-right-2 -bottom-5 w-[130px] h-[130px] sm:w-[158px] sm:h-[158px]" : "-right-3 -bottom-3 w-[100px] h-[100px]"
        }`}
        style={{ color: "color-mix(in srgb, var(--color-accent-400) 55%, transparent)", opacity: 0.22 }}
        aria-hidden
      >
        <Icon width="100%" height="100%" strokeWidth={1.25} />
      </span>

      {banner ? (
        <span className="relative z-[1] flex w-full items-center justify-between gap-5 flex-wrap">
          <span className="flex items-center gap-3.5">
            <span
              className="grid place-content-center rounded-2xl flex-none"
              style={{ width: 47, height: 47, background: "rgba(232,163,61,0.18)", backdropFilter: "blur(6px)" }}
            >
              <Icon width={22} height={22} strokeWidth={2} color="var(--color-accent-300)" />
            </span>
            <span>
              <span className="flex items-center gap-2">
                <span className="block text-[18px] sm:text-[20px] font-semibold leading-tight font-[var(--font-heading)] text-white">
                  {label}
                </span>
                <span
                  className="text-[9.5px] font-semibold uppercase tracking-wide rounded-full px-1.5 py-0.5"
                  style={{ background: "var(--color-accent-500)", color: "var(--color-accent-2-900)" }}
                >
                  Most popular
                </span>
              </span>
              <span className="block mt-1 text-[12px] text-white/70">
                <span
                  className="font-semibold"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent-300), var(--color-accent-600))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {count}
                </span>{" "}
                courses — our biggest catalog
              </span>
            </span>
          </span>
          <span
            className="cat-arrow inline-flex items-center gap-2 text-[12px] font-semibold rounded-full px-3.5 py-2"
            style={{ background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-600))", color: "var(--color-accent-2-900)" }}
          >
            Explore
            <span aria-hidden>→</span>
          </span>
        </span>
      ) : (
        <>
          <span className="relative z-[1] flex items-start justify-between">
            <span
              className="grid place-content-center rounded-2xl flex-none"
              style={{ width: 40, height: 40, background: "rgba(232,163,61,0.18)", backdropFilter: "blur(6px)" }}
            >
              <Icon width={18} height={18} strokeWidth={2} color="var(--color-accent-300)" />
            </span>
          </span>

          <span className="relative z-[1]">
            <span className="block text-[15.5px] font-semibold leading-snug font-[var(--font-heading)] text-white">
              {label}
            </span>
            <span className="mt-2 flex items-baseline gap-1.5">
              <span
                className="text-[25px] font-bold leading-none font-[var(--font-heading)]"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-300), var(--color-accent-600))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <span>{count}</span>
              </span>
              <span className="text-[11.5px] text-white/65">courses</span>
            </span>
            <span
              className="cat-arrow mt-3.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold"
              style={{ color: "var(--color-accent-300)" }}
            >
              Explore
              <span aria-hidden>→</span>
            </span>
          </span>
        </>
      )}
    </Link>
  );
}

function AllCoursesCard({ total, categories }: { total: number; categories: CategoryCount[] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!el) return;

      if (!fine || reduced) return;

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--spot-x", `${x}%`);
        el.style.setProperty("--spot-y", `${y}%`);
      };
      const handleEnter = () => {
        gsap.to(el, { y: -8, scale: 1.015, duration: 0.35, ease: "power3.out" });
        gsap.to(el.querySelector(".cat-arrow"), { x: 4, duration: 0.3, ease: "power2.out" });
        gsap.to(el.querySelectorAll(".mini-chip"), {
          y: -3,
          stagger: 0.03,
          duration: 0.3,
          ease: "power2.out",
        });
      };
      const handleLeave = () => {
        gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(el.querySelector(".cat-arrow"), { x: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(el.querySelectorAll(".mini-chip"), { y: 0, duration: 0.3, ease: "power2.out" });
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
    { scope: cardRef, dependencies: [total] }
  );

  return (
    <Link
      ref={cardRef}
      href="/courses"
      className="cat-showcase-card group relative col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] p-6 sm:p-7 min-h-[252px] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={
        {
          background:
            "radial-gradient(circle at var(--spot-x,75%) var(--spot-y,15%), var(--color-accent-2-600) 0%, var(--color-accent-2-800) 45%, var(--color-accent-2-900) 100%)",
          boxShadow: "0 22px 48px -16px rgba(15, 23, 42, 0.55)",
        } as CSSProperties
      }
    >
      <span
        className="pointer-events-none absolute top-0 left-7 right-7 h-[3px] rounded-full opacity-80"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-400), transparent)" }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(340px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(232,163,61,0.32), transparent 70%)",
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ background: "var(--color-accent-500)" }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/10 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
        aria-hidden
      />

      <span className="relative z-[1] flex items-start justify-between">
        <span
          className="grid place-content-center rounded-2xl flex-none"
          style={{ width: 50, height: 50, background: "rgba(232,163,61,0.18)", backdropFilter: "blur(6px)" }}
        >
          <GridIcon width={23} height={23} strokeWidth={2} color="var(--color-accent-300)" />
        </span>
        <span
          className="text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-1"
          style={{ background: "rgba(232,163,61,0.16)", color: "var(--color-accent-300)" }}
        >
          Every category
        </span>
      </span>

      <span className="relative z-[1]">
        <span className="block text-[14px] font-medium text-white/55 mb-1">Your holistic view of</span>
        <span className="flex items-baseline gap-2">
          <span
            className="text-[50px] sm:text-[58px] font-bold leading-none font-[var(--font-heading)]"
            style={{
              background: "linear-gradient(135deg, #ffffff 25%, var(--color-accent-300) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            <span>{total}</span>
          </span>
          <span className="text-[18px] font-semibold text-white/75">courses</span>
        </span>

        <span className="mt-4 flex items-center gap-1.5">
          {categories.map(({ label }) => {
            const Icon = CATEGORY_ICON[label];
            return (
              <span
                key={label}
                className="mini-chip grid place-content-center rounded-full flex-none"
                style={{ width: 27, height: 27, background: "rgba(232,163,61,0.16)", color: "var(--color-accent-300)" }}
                title={label}
              >
                <Icon width={13} height={13} strokeWidth={2.25} />
              </span>
            );
          })}
        </span>

        <span
          className="cat-arrow mt-4 inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-3.5 py-2"
          style={{ background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-600))", color: "var(--color-accent-2-900)" }}
        >
          Browse all courses
          <span aria-hidden>→</span>
        </span>
      </span>
    </Link>
  );
}

export function CourseCategoriesShowcase({
  categories,
  total,
}: {
  categories: CategoryCount[];
  total: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = root.querySelectorAll(".cat-showcase-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 40, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          }
        );

        return scrollRevealSafetyNet(
          root,
          () => isGsapHidden(cards[0]),
          () => {
            gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
          }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [categories.length] }
  );

  const languages = categories.find((c) => c.label === "Languages");
  const rest = categories.filter((c) => c.label !== "Languages");

  return (
    <div
      ref={rootRef}
      className="grid gap-3.5 sm:gap-4 grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    >
      <AllCoursesCard total={total} categories={categories} />
      {rest.map(({ label, count }) => (
        <CategoryCard key={label} label={label} count={count} />
      ))}
      {languages && <CategoryCard label={languages.label} count={languages.count} banner />}
    </div>
  );
}

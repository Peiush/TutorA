"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { subjectAccent } from "@/components/ui/subject-accent";
import { subjects } from "@/lib/mock-data";
import { POPULAR_SUBJECT_NAMES } from "@/lib/featured-subjects";
import { FrequentlySearched } from "@/components/courses/frequently-searched";

gsap.registerPlugin(useGSAP);

// Autocomplete pulls from the same curated list as the /courses "Popular subjects"
// grid, plus the broader top-level categories, so the hero search surfaces both
// specific courses (e.g. "AP Calculus BC") and general subjects (e.g. "Music").
const curatedSubjectOptions = Array.from(new Set([...POPULAR_SUBJECT_NAMES, ...subjects]));

type Suggestion =
  | { type: "tutor"; label: string; count: number }
  | { type: "course"; label: string; slug: string }
  | { type: "subject"; label: string; slug: string; gradeLevel: string | null };

function SearchGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ArrowGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HeroSearchBar({
  tutors = [],
  courses = [],
  subjectListings = [],
}: {
  tutors?: { subjects: string[] }[];
  courses?: { title: string; slug: string }[];
  subjectListings?: { name: string; slug: string; gradeLevel: string | null }[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const countBySubject = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of tutors) {
      for (const s of t.subjects) map.set(s, (map.get(s) ?? 0) + 1);
    }
    return map;
  }, [tutors]);

  // Subject autocomplete also surfaces real subjects tutors have listed (which may
  // include terms outside the curated set, e.g. "C++"), not just the curated list.
  const tutorSubjectOptions = useMemo(
    () => Array.from(new Set([...curatedSubjectOptions, ...tutors.flatMap((t) => t.subjects)])),
    [tutors]
  );

  // Merges tutor-subject matches, course-title matches, and subject-catalog matches so
  // a single search term (e.g. "Algebra II") can surface a "Find a tutor" result, a
  // "Course" result, and a "Subject" result (with its grade level), each with its own
  // badge and redirect target.
  const matches = useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return tutorSubjectOptions
        .slice(0, 8)
        .map((label) => ({ type: "tutor", label, count: countBySubject.get(label) ?? 0 }));
    }

    const tutorMatches: Suggestion[] = tutorSubjectOptions
      .filter((o) => o.toLowerCase().includes(q))
      .slice(0, 4)
      .map((label) => ({ type: "tutor", label, count: countBySubject.get(label) ?? 0 }));

    const subjectMatches: Suggestion[] = subjectListings
      .filter((s) => s.name.toLowerCase().includes(q))
      .slice(0, 4)
      .map((s) => ({ type: "subject", label: s.name, slug: s.slug, gradeLevel: s.gradeLevel }));

    const courseMatches: Suggestion[] = courses
      .filter((c) => c.title.toLowerCase().includes(q))
      .slice(0, 4)
      .map((c) => ({ type: "course", label: c.title, slug: c.slug }));

    return [...tutorMatches, ...subjectMatches, ...courseMatches].slice(0, 8);
  }, [query, tutorSubjectOptions, countBySubject, subjectListings, courses]);

  useEffect(() => {
    function onDocPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocPointerDown);
    return () => document.removeEventListener("mousedown", onDocPointerDown);
  }, []);

  // Frequently-searched chips (SAT, Python, French, ...) are course/exam-prep terms,
  // so they route into the /courses search rather than the tutor listing.
  function go(term: string) {
    const value = term.trim();
    if (!value) return;
    router.push(`/courses?query=${encodeURIComponent(value)}`);
  }

  function commit(pick: Suggestion | string) {
    const item: Suggestion = typeof pick === "string" ? { type: "tutor", label: pick, count: 0 } : pick;
    if (!item.label.trim()) return;

    setQuery(item.label);
    setOpen(false);
    inputRef.current?.blur();

    if (item.type === "course") {
      router.push(`/courses/${item.slug}`);
    } else if (item.type === "subject") {
      router.push(`/subjects/${item.slug}`);
    } else {
      router.push(`/find-a-tutor?subject=${encodeURIComponent(item.label)}`);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = matches[activeIndex];
      commit(pick ?? query);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-search-card", {
          autoAlpha: 0,
          y: 30,
          scale: 0.9,
          duration: 0.75,
          delay: 0.4,
          ease: "back.out(1.6)",
        });
        gsap.to(".hero-search-glow", {
          scale: 1.08,
          opacity: 0.7,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.1,
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-search-card", { autoAlpha: 1, y: 0, scale: 1 });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative isolate z-20 mt-9 sm:mt-8 mx-auto w-full max-w-[880px]">
      <div className="hero-search-card relative max-w-[640px] mx-auto">
        <span
          className="hero-search-glow pointer-events-none absolute -z-10 rounded-full blur-2xl"
          style={{
            inset: "-16px",
            background: "radial-gradient(closest-side, var(--color-accent-300), transparent 75%)",
            opacity: 0.5,
          }}
          aria-hidden
        />
        <div
          className="relative rounded-full p-[2px]"
          style={{
            background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-2-400) 55%, var(--color-verified))",
            boxShadow: "0 28px 64px -20px color-mix(in srgb, var(--color-accent-2-900) 45%, transparent)",
          }}
        >
          <div
            className="flex items-center gap-2.5 rounded-full pl-5 pr-2 py-2"
            style={{ background: "var(--color-bg)" }}
          >
            <span
              className="grid place-content-center rounded-full flex-none"
              style={{ width: 26, height: 26, color: "var(--color-accent-2-700)" }}
            >
              <SearchGlyph width={19} height={19} />
            </span>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
                setActiveIndex(0);
              }}
              onFocus={() => {
                setOpen(true);
                setActiveIndex(0);
              }}
              onKeyDown={onKeyDown}
              role="combobox"
              aria-expanded={open}
              aria-controls="hero-search-listbox"
              aria-autocomplete="list"
              className="min-w-0 flex-1 bg-transparent outline-none text-[16px] font-medium py-2.5"
              style={{ color: "var(--color-text)" }}
              placeholder="What would you like to learn? e.g. Calculus, Python, IELTS"
              aria-label="Search for a subject or tutor"
            />

            <button
              type="button"
              onClick={() => commit(matches[activeIndex] ?? query)}
              className="grid place-content-center rounded-full flex-none cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95"
              style={{ width: 44, height: 44, background: "var(--color-accent-500)", color: "var(--color-text)" }}
              aria-label="Search"
            >
              <ArrowGlyph width={19} height={19} />
            </button>
          </div>
        </div>

        {open && (
          <div
            id="hero-search-listbox"
            ref={listRef}
            role="listbox"
            className="absolute left-0 right-0 mt-3 rounded-[20px] border overflow-hidden text-left z-30"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-divider)",
              boxShadow: "0 28px 56px -20px color-mix(in srgb, var(--color-accent-2-900) 35%, transparent)",
            }}
          >
            <div className="max-h-[320px] overflow-y-auto py-1.5">
              {matches.length === 0 ? (
                <div className="px-4 py-6 text-[13.5px] text-center" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                  No tutors, subjects, or courses match &ldquo;{query}&rdquo; — press Enter to search anyway
                </div>
              ) : (
                matches.map((item, i) => {
                  const accent = subjectAccent([item.label], i);
                  const badge =
                    item.type === "course"
                      ? {
                          text: "Course",
                          color: "var(--color-accent-2-700)",
                          background: "color-mix(in srgb, var(--color-accent-2-500) 16%, transparent)",
                        }
                      : item.type === "subject"
                        ? {
                            text: "Subject",
                            color: "var(--color-accent-700, #b45309)",
                            background: "color-mix(in srgb, var(--color-accent-500, #f59e0b) 16%, transparent)",
                          }
                        : {
                            text: "Tutor",
                            color: "var(--color-verified, #16a34a)",
                            background: "color-mix(in srgb, var(--color-verified, #16a34a) 14%, transparent)",
                          };
                  return (
                    <button
                      key={`${item.type}-${item.label}`}
                      type="button"
                      role="option"
                      aria-selected={i === activeIndex}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => commit(item)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors duration-100"
                      style={{
                        background: i === activeIndex ? "color-mix(in srgb, var(--color-accent-100) 70%, transparent)" : "transparent",
                      }}
                    >
                      <span
                        className="grid place-content-center rounded-full flex-none"
                        style={{ width: 32, height: 32, background: "color-mix(in srgb, currentColor 14%, transparent)", color: accent.bar }}
                      >
                        <SubjectIcon subject={item.label} width={16} height={16} style={{ color: accent.bar }} />
                      </span>
                      <span className="flex-1 min-w-0 truncate text-[14px] font-medium">{item.label}</span>
                      <span
                        className="flex-none text-[10.5px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5"
                        style={{ color: badge.color, background: badge.background }}
                      >
                        {badge.text}
                      </span>
                      {item.type === "tutor" && item.count > 0 && (
                        <span className="flex-none text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>
                          {item.count} tutor{item.count === 1 ? "" : "s"}
                        </span>
                      )}
                      {item.type === "subject" && item.gradeLevel && (
                        <span className="flex-none text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>
                          {item.gradeLevel}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {!open && (
        <div className="mt-7 sm:mt-6">
          <FrequentlySearched align="center" onPick={go} />
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { subjectAccent } from "@/components/ui/subject-accent";
import type { TutorRaw } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP);

function SearchGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function highlight(label: string, query: string) {
  if (!query.trim()) return label;
  const i = label.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return label;
  return (
    <>
      {label.slice(0, i)}
      <mark className="rounded-[3px] px-0.5 bg-transparent font-semibold" style={{ color: "var(--color-accent-700)", background: "var(--color-accent-100)" }}>
        {label.slice(i, i + query.length)}
      </mark>
      {label.slice(i + query.length)}
    </>
  );
}

export function SubjectSearchBox({
  options,
  tutors,
  value,
  onSelect,
  onClear,
}: {
  options: string[];
  tutors: TutorRaw[];
  value: string;
  onSelect: (subject: string) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState(value);
  const clearBtnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);

  const countBySubject = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of tutors) {
      for (const s of t.subjects) map.set(s, (map.get(s) ?? 0) + 1);
    }
    return map;
  }, [tutors]);

  const featured = useMemo(() => {
    return [...options].sort((a, b) => (countBySubject.get(b) ?? 0) - (countBySubject.get(a) ?? 0)).slice(0, 6);
  }, [options, countBySubject]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return featured;
    return options.filter((o) => o.toLowerCase().includes(q)).slice(0, 8);
  }, [query, options, featured]);

  // Keep the box in sync when the selection changes from outside (e.g. a filter
  // chip removed in the sidebar) without clobbering text the user is actively typing.
  useEffect(() => {
    if (!open) setQuery(value);
  }, [value, open]);

  useEffect(() => setActiveIndex(0), [query, open]);

  // Idle placeholder rotation through popular subjects — pauses once the user is engaged.
  useEffect(() => {
    if (open || query) return;
    const id = setInterval(() => setPlaceholderIdx((i) => (i + 1) % Math.max(featured.length, 1)), 2600);
    return () => clearInterval(id);
  }, [open, query, featured.length]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      if (placeholderRef.current) {
        gsap.fromTo(placeholderRef.current, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
      }
    },
    { dependencies: [placeholderIdx], scope: rootRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ssb-card", {
          autoAlpha: 0,
          y: 34,
          scale: 0.82,
          duration: 0.85,
          delay: 0.35,
          ease: "back.out(1.7)",
        });
        gsap.to(".ssb-glow-a", {
          x: 14,
          y: -6,
          scale: 1.15,
          duration: 5.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(".ssb-glow-b", {
          x: -14,
          y: 6,
          scale: 1.15,
          duration: 6.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(".ssb-card", {
          y: -6,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.1,
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      if (!clearBtnRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.fromTo(
        clearBtnRef.current,
        { autoAlpha: 0, scale: 0.4, rotate: -90 },
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.32, ease: "back.out(2.4)" }
      );
    },
    { dependencies: [Boolean(query)], scope: rootRef }
  );

  useGSAP(
    () => {
      if (!open || !listRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = listRef.current.querySelectorAll(".ssb-item");
      if (reduced) {
        gsap.set(listRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(items, { autoAlpha: 1 });
        return;
      }
      gsap.fromTo(
        listRef.current,
        { autoAlpha: 0, y: -8, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" }
      );
      gsap.fromTo(items, { autoAlpha: 0, y: -4 }, { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.035, ease: "power2.out", delay: 0.03 });
    },
    { dependencies: [open, query], scope: rootRef }
  );

  useEffect(() => {
    function onDocPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocPointerDown);
    return () => document.removeEventListener("mousedown", onDocPointerDown);
  }, []);

  function commit(subject: string) {
    setQuery(subject);
    setOpen(false);
    inputRef.current?.blur();
    onSelect(subject);
  }

  function clearSearch() {
    setQuery("");
    setOpen(false);
    onClear();
    inputRef.current?.focus();
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
      if (pick) commit(pick);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const placeholderSubject = featured[placeholderIdx] ?? "AP Chemistry";

  return (
    <div ref={rootRef} className="relative z-20 -mt-2.5 mb-6">
      <div className="ssb-card relative mx-auto max-w-[620px]">
        <div
          className="ssb-glow-a pointer-events-none absolute -z-10 rounded-full blur-xl"
          style={{
            width: 120,
            height: 120,
            left: -30,
            top: "50%",
            marginTop: -60,
            background: "radial-gradient(circle, var(--color-accent-300) 0%, transparent 70%)",
            opacity: 0.55,
          }}
          aria-hidden
        />
        <div
          className="ssb-glow-b pointer-events-none absolute -z-10 rounded-full blur-xl"
          style={{
            width: 120,
            height: 120,
            right: -30,
            top: "50%",
            marginTop: -60,
            background: "radial-gradient(circle, var(--color-accent-2-300) 0%, transparent 70%)",
            opacity: 0.5,
          }}
          aria-hidden
        />
        <div
          className="relative rounded-full p-[2px]"
          style={{
            background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-2-400) 55%, var(--color-verified))",
            boxShadow: "0 24px 60px -18px color-mix(in srgb, var(--color-accent-2-700) 45%, transparent)",
          }}
        >
          <div
            className="flex items-center gap-2.5 rounded-full pl-5 pr-2 py-2"
            style={{ background: "var(--color-surface)" }}
          >
            <span
              className="grid place-content-center rounded-full flex-none"
              style={{ width: 26, height: 26, color: "var(--color-accent-2-700)" }}
            >
              <SearchGlyph width={19} height={19} />
            </span>

            <div className="relative flex-1 min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDown}
                role="combobox"
                aria-expanded={open}
                aria-controls="ssb-listbox"
                aria-autocomplete="list"
                className="w-full bg-transparent outline-none text-[16px] font-medium py-2"
                style={{ color: "var(--color-text)" }}
                placeholder=""
                aria-label="Search for a subject"
              />
              {!query && (
                <span
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[16px] flex items-center gap-1.5"
                  style={{ color: "color-mix(in srgb, var(--color-text) 46%, transparent)" }}
                >
                  Search
                  <span ref={placeholderRef} className="font-semibold" style={{ color: "var(--color-accent-2-600)" }}>
                    &ldquo;{placeholderSubject}&rdquo;
                  </span>
                </span>
              )}
            </div>

            {query && (
              <button
                ref={clearBtnRef}
                type="button"
                onClick={clearSearch}
                className="ssb-clear grid place-content-center rounded-full flex-none cursor-pointer transition-colors duration-150"
                style={{
                  width: 30,
                  height: 30,
                  color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
                  background: "color-mix(in srgb, var(--color-text) 8%, transparent)",
                }}
                aria-label="Clear search"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                const pick = matches[activeIndex] ?? matches[0];
                if (pick) commit(pick);
              }}
              className="grid place-content-center rounded-full flex-none cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95"
              style={{ width: 42, height: 42, background: "var(--color-accent-500)", color: "#fff" }}
              aria-label="Search subjects"
            >
              <SearchGlyph width={18} height={18} />
            </button>
          </div>
        </div>

        {open && (
          <div
            id="ssb-listbox"
            ref={listRef}
            role="listbox"
            className="absolute left-0 right-0 mt-3 rounded-[20px] border overflow-hidden"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-divider)",
              boxShadow: "0 28px 56px -20px color-mix(in srgb, var(--color-accent-2-900) 35%, transparent)",
            }}
          >
            {!query && (
              <div
                className="px-4 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}
              >
                Popular subjects
              </div>
            )}
            <div className="max-h-[320px] overflow-y-auto py-1.5">
              {matches.length === 0 ? (
                <div className="px-4 py-6 text-[13.5px] text-center" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                  No subjects match &ldquo;{query}&rdquo;
                </div>
              ) : (
                matches.map((subject, i) => {
                  const accent = subjectAccent([subject], i);
                  const count = countBySubject.get(subject) ?? 0;
                  return (
                    <button
                      key={subject}
                      type="button"
                      role="option"
                      aria-selected={i === activeIndex}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => commit(subject)}
                      className="ssb-item w-full flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors duration-100"
                      style={{
                        background: i === activeIndex ? "color-mix(in srgb, var(--color-accent-100) 70%, transparent)" : "transparent",
                      }}
                    >
                      <span
                        className="grid place-content-center rounded-full flex-none"
                        style={{ width: 32, height: 32, background: "color-mix(in srgb, currentColor 14%, transparent)", color: accent.bar }}
                      >
                        <SubjectIcon subject={subject} width={16} height={16} style={{ color: accent.bar }} />
                      </span>
                      <span className="flex-1 min-w-0 truncate text-[14px] font-medium">{highlight(subject, query)}</span>
                      {count > 0 && (
                        <span className="flex-none text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>
                          {count} tutor{count === 1 ? "" : "s"}
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
    </div>
  );
}

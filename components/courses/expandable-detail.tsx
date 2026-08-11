"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Renders a "Quick highlights" bullet list (always visible, scannable) above the full
// courseDetail/subjectDetail prose, which starts collapsed behind a "Read the full
// breakdown" toggle. The full text stays in the DOM even while collapsed (same
// display:none/height-animate approach as components/about/faq-accordion.tsx) rather than
// being conditionally unmounted, so the word-count depth this content exists for isn't
// lost to crawlers just because it's visually collapsed by default. See
// docs/seo-audit-tutora/findings/content-depth-audit-2026-08-10.md.
export function ExpandableDetail({ highlights, paragraphs }: { highlights: string[]; paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const body = bodyRef.current;
      const icon = iconRef.current;
      if (!body) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (icon) gsap.to(icon, { rotate: open ? 180 : 0, duration: 0.3, ease: "power2.out" });
        if (open) {
          gsap.set(body, { display: "block" });
          gsap.fromTo(body, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.34, ease: "power2.out" });
        } else {
          gsap.to(body, {
            height: 0,
            opacity: 0,
            duration: 0.26,
            ease: "power2.in",
            onComplete: () => gsap.set(body, { display: "none" }),
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (icon) gsap.set(icon, { rotate: open ? 180 : 0 });
        gsap.set(body, { display: open ? "block" : "none", height: "auto", opacity: 1 });
      });

      return () => mm.revert();
    },
    { dependencies: [open], scope: bodyRef }
  );

  return (
    <div className="flex flex-col gap-3.5">
      {highlights.length > 0 && (
        <ul className="flex flex-col gap-2 m-0 p-0 list-none">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-[14px] leading-snug">
              <span
                aria-hidden
                className="flex-none rounded-full"
                style={{ width: 5, height: 5, marginTop: 8, background: "var(--color-accent-600)" }}
              />
              <span style={{ color: "color-mix(in srgb, var(--color-text) 84%, transparent)" }}>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div>
        <div ref={bodyRef} style={{ display: "none", height: 0, opacity: 0, overflow: "hidden" }}>
          <div className="flex flex-col gap-3" style={{ paddingTop: highlights.length > 0 ? 2 : 0, paddingBottom: 2 }}>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[14.5px] leading-relaxed m-0"
                style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
          style={{ color: "var(--color-accent-700)" }}
        >
          {open ? "Show less" : "Read the full breakdown"}
          <svg
            ref={iconRef}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

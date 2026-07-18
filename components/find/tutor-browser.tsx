"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { SegmentedControl } from "@/components/ui/segmented";
import { tutorsRaw, subjects } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP);

const REGIONS = ["Anywhere", "United Kingdom", "United States", "Europe", "Asia-Pacific", "Africa"];
const SORTS = ["Top rated", "Lowest price", "Most reviews"] as const;

function priceValue(price: string) {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[12px] font-medium"
      style={{
        background: "var(--color-accent-2-100)",
        color: "var(--color-accent-2-800)",
        borderRadius: 999,
        padding: "4px 6px 4px 11px",
      }}
    >
      {label}
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        onClick={onRemove}
        className="grid place-content-center rounded-full cursor-pointer"
        style={{ width: 16, height: 16, color: "var(--color-accent-2-700)" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

export function TutorBrowser() {
  const [subject, setSubject] = useState("All subjects");
  const [mode, setMode] = useState("Online");
  const [region, setRegion] = useState("Anywhere");
  const [maxBudget, setMaxBudget] = useState(120);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Top rated");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let list = tutorsRaw.filter((t) => {
      if (subject !== "All subjects" && !t.subjects.includes(subject)) return false;
      if (mode !== "Both" && t.mode !== mode && t.mode !== "Both") return false;
      if (region !== "Anywhere" && t.region !== region) return false;
      if (priceValue(t.price) > maxBudget) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Lowest price") return priceValue(a.price) - priceValue(b.price);
      if (sort === "Most reviews") return b.reviews - a.reviews;
      return b.rating - a.rating;
    });
    return list;
  }, [subject, mode, region, maxBudget, sort]);

  const topRatedName = useMemo(
    () => (filtered.length ? filtered.reduce((a, b) => (b.rating > a.rating ? b : a)).name : null),
    [filtered]
  );

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".tutor-card");
      if (!cards || !cards.length) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.04 }
      );
    },
    { dependencies: [filtered], scope: gridRef }
  );

  const activeFilters = [
    subject !== "All subjects" && { label: subject, clear: () => setSubject("All subjects") },
    mode !== "Online" && { label: mode, clear: () => setMode("Online") },
    region !== "Anywhere" && { label: region, clear: () => setRegion("Anywhere") },
    maxBudget !== 120 && { label: `Up to $${maxBudget}/hr`, clear: () => setMaxBudget(120) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="grid gap-8 items-start [grid-template-columns:260px_1fr] max-[860px]:[grid-template-columns:1fr]">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          className="hidden max-[860px]:flex items-center justify-between gap-2 card cursor-pointer"
          style={{ background: "var(--color-surface)" }}
        >
          <span className="flex items-center gap-2 font-[var(--font-heading)] text-[15px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-2-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filters{activeFilters.length > 0 ? ` (${activeFilters.length})` : ""}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: filtersOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <aside
          className={`card gap-4 sticky top-[88px] ${filtersOpen ? "" : "max-[860px]:hidden"}`}
          style={{ background: "var(--color-surface)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full grid place-content-center flex-none"
              style={{ background: "var(--color-accent-2-100)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-2-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
            </div>
            <div className="font-[var(--font-heading)] text-[18px]">Filters</div>
          </div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-1.5 -mt-1">
              {activeFilters.map((f) => (
                <FilterChip key={f.label} label={f.label} onRemove={f.clear} />
              ))}
            </div>
          )}
          <div className="field">
            <label>Subject</label>
            <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option>All subjects</option>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Mode</label>
            <SegmentedControl
              name="mode"
              value={mode}
              onChange={setMode}
              options={[
                { label: "Online", value: "Online" },
                { label: "In person", value: "In person" },
                { label: "Both", value: "Both" },
              ]}
            />
          </div>
          <div className="field">
            <label>Region</label>
            <select className="input" value={region} onChange={(e) => setRegion(e.target.value)}>
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Budget (per hour)</label>
            <input
              className="input p-0"
              type="range"
              min={10}
              max={120}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
            />
            <div
              className="text-[12px] mt-1"
              style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}
            >
              Up to ${maxBudget} / hr
            </div>
          </div>
        </aside>
      </div>

      <div>
        <div className="flex justify-between items-center flex-wrap gap-2.5 mb-4.5">
          <span
            className="text-[14px]"
            style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
          >
            Showing {filtered.length} verified tutor{filtered.length === 1 ? "" : "s"}
          </span>
          <select
            className="input w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
          >
            {SORTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {filtered.length > 0 ? (
          <div ref={gridRef} className="grid gap-4.5 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
            {filtered.map((t, i) => (
              <div
                key={t.name}
                className="tutor-card card elev-sm gap-3 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              >
                <div className="flex gap-3 items-center">
                  <TutorAvatar name={t.name} index={i} size={52} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-[var(--font-heading)] text-[17px]">{t.name}</span>
                      <VerifiedBadge />
                      {t.name === topRatedName && (
                        <Tag variant="accent" className="text-[10px] px-2 py-0.5">
                          Top rated
                        </Tag>
                      )}
                    </div>
                    <div
                      className="text-[12.5px]"
                      style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
                    >
                      {t.headline}
                    </div>
                  </div>
                </div>
                <div
                  className="text-[12.5px]"
                  style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
                >
                  {t.meta}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {t.subjects.map((s) => (
                    <Tag key={s} variant="neutral">
                      {s}
                    </Tag>
                  ))}
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="flex items-center gap-1.5">
                    <StarRating rating={t.rating} />
                    <span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                      {t.rating.toFixed(1)} ({t.reviews})
                    </span>
                  </span>
                  <span className="font-semibold">{t.price}</span>
                </div>
                <Link href="/request-a-tutor" className="btn btn-primary btn-block">
                  Request This Tutor
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="rounded-[var(--radius-lg)] p-8 text-center"
            style={{ background: "var(--color-accent-2-100)" }}
          >
            <h3 className="text-[24px]">No tutors match those filters</h3>
            <p
              className="text-[15px] mx-auto mt-2.5 mb-5 max-w-[44ch]"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              Tell us what you need and our team will source a match for you personally.
            </p>
            <Link href="/request-a-tutor" className="btn btn-primary">
              Request a Tutor
            </Link>
          </div>
        )}

        {filtered.length > 0 && (
          <div
            className="mt-10 rounded-[var(--radius-lg)] p-8 text-center"
            style={{ background: "var(--color-accent-2-100)" }}
          >
            <h3 className="text-[24px]">Can&rsquo;t find the right tutor?</h3>
            <p
              className="text-[15px] mx-auto mt-2.5 mb-5 max-w-[44ch]"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              Tell us what you need and our team will source a match for you personally.
            </p>
            <Link href="/request-a-tutor" className="btn btn-primary">
              Request a Tutor
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

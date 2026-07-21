"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Tag } from "@/components/ui/tag";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { SegmentedControl } from "@/components/ui/segmented";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TutorDetailModal } from "@/components/find/tutor-detail-modal";
import { TutorAdminEditModal } from "@/components/find/tutor-admin-edit-modal";
import { subjects, type TutorRaw } from "@/lib/mock-data";
import { requestSpecificTutor } from "@/app/lib/actions/tutor-request";
import { toggleSavedTutor } from "@/app/lib/actions/saved-tutor";
import { deleteTutorProfile } from "@/app/lib/actions/admin";
import { usePlaneLaunch } from "@/components/ui/plane-launch";

gsap.registerPlugin(useGSAP, Flip);

const REGIONS = ["Anywhere", "United Kingdom", "United States", "Europe", "Asia-Pacific", "Africa"];
const SORTS = ["Top rated", "Lowest price", "Most reviews"] as const;

function priceValue(price: string) {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

const TIERS = [
  { label: "Gold", min: 90, color: "#8A6A12", bg: "#FBEFC7" },
  { label: "Silver", min: 30, color: "#4A5568", bg: "#E7EAEE" },
  { label: "Bronze", min: 0, color: "#8A4B2C", bg: "#F3E1D2" },
] as const;

function tierOf(t: TutorRaw) {
  const score = t.reviews + t.rating * 10;
  return TIERS.find((tier) => score >= tier.min) ?? TIERS[TIERS.length - 1];
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.from(ref.current, { autoAlpha: 0, scale: 0.7, duration: 0.3, ease: "back.out(2.2)" });
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
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

export function TutorBrowser({
  tutors,
  isAdmin = false,
  savedTutorIds = [],
  requestedTutorProfileIds = [],
}: {
  tutors: TutorRaw[];
  isAdmin?: boolean;
  savedTutorIds?: string[];
  requestedTutorProfileIds?: string[];
}) {
  const router = useRouter();
  const [subject, setSubject] = useState("All subjects");
  const [mode, setMode] = useState("Online");
  const [region, setRegion] = useState("Anywhere");
  const [maxBudget, setMaxBudget] = useState(120);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Top rated");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [pendingName, setPendingName] = useState<string | null>(null);
  const [requestedNames, setRequestedNames] = useState<Set<string>>(new Set());
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set(requestedTutorProfileIds));
  const launchPlane = usePlaneLaunch();

  function isAlreadyRequested(t: TutorRaw) {
    return t.id ? requestedIds.has(t.id) : requestedNames.has(t.name);
  }
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [selected, setSelected] = useState<{ tutor: TutorRaw; index: number } | null>(null);
  const [editingTutor, setEditingTutor] = useState<TutorRaw | null>(null);
  const [deletingTutor, setDeletingTutor] = useState<TutorRaw | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set(savedTutorIds));
  const [bookmarkPending, setBookmarkPending] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();
  const gridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const knownIdsRef = useRef<Set<string>>(new Set());

  const subjectOptions = useMemo(
    () => Array.from(new Set([...subjects, ...tutors.flatMap((t) => t.subjects)])),
    [tutors]
  );

  function captureFlip() {
    const cards = gridRef.current?.querySelectorAll(".tutor-card");
    if (cards && cards.length) {
      flipStateRef.current = Flip.getState(cards);
    }
  }

  function handleRequestTutor(t: TutorRaw) {
    if (isAlreadyRequested(t)) return;
    setPendingName(t.name);
    startTransition(async () => {
      const result = await requestSpecificTutor({
        tutorName: t.name,
        subject: t.subjects[0] ?? t.headline,
        mode: t.mode,
        tutorRate: t.price,
        tutorProfileId: t.id,
      });
      setPendingName(null);
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/find-a-tutor")}`);
        return;
      }
      if (result.ok) {
        setRequestedNames((prev) => new Set(prev).add(t.name));
        if (t.id) setRequestedIds((prev) => new Set(prev).add(t.id!));
        setToast({ tone: "success", message: result.message ?? `Your request for ${t.name} has been sent.` });
      } else {
        setToast({ tone: "error", message: result.message ?? "Something went wrong. Please try again." });
      }
    });
  }

  function handleToggleBookmark(t: TutorRaw) {
    if (!t.id) return;
    const id = t.id;
    setBookmarkPending((prev) => new Set(prev).add(id));
    startTransition(async () => {
      const result = await toggleSavedTutor(id);
      setBookmarkPending((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/find-a-tutor")}`);
        return;
      }
      if (result.ok) {
        setBookmarked((prev) => {
          const next = new Set(prev);
          if (result.saved) next.add(id);
          else next.delete(id);
          return next;
        });
        setToast({
          tone: "success",
          message: result.saved ? `${t.name} saved to your dashboard.` : `${t.name} removed from saved tutors.`,
        });
      } else {
        setToast({ tone: "error", message: result.message ?? "Could not update saved tutors." });
      }
    });
  }

  async function handleDeleteTutor() {
    if (!deletingTutor?.id) return;
    setDeletePending(true);
    const result = await deleteTutorProfile(deletingTutor.id);
    setDeletePending(false);
    setDeletingTutor(null);
    if (result.ok) {
      setToast({ tone: "success", message: `${deletingTutor.name}'s listing has been removed.` });
      router.refresh();
    } else {
      setToast({ tone: "error", message: result.message ?? "Could not delete this listing." });
    }
  }

  const filtered = useMemo(() => {
    let list = tutors.filter((t) => {
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
  }, [tutors, subject, mode, region, maxBudget, sort]);

  const topRatedName = useMemo(() => {
    if (!filtered.length) return null;
    const best = filtered.reduce((a, b) => (b.rating > a.rating ? b : a));
    return best.rating > 0 ? best.name : null;
  }, [filtered]);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".tutor-card");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const currentIds = new Set(filtered.map((t) => t.id ?? t.name));
      const newIds = new Set<string>();
      if (knownIdsRef.current.size) {
        currentIds.forEach((id) => {
          if (!knownIdsRef.current.has(id)) newIds.add(id);
        });
      }
      knownIdsRef.current = currentIds;

      if (!cards || !cards.length || reduced) {
        flipStateRef.current = null;
        return;
      }

      const state = flipStateRef.current;
      flipStateRef.current = null;

      if (state) {
        Flip.from(state, {
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.02,
          absolute: true,
          onEnter: (els) =>
            gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }),
        });
      } else {
        const entering = Array.from(cards).filter((c) => newIds.size === 0 || newIds.has(c.dataset.tutorId ?? ""));
        gsap.fromTo(
          entering.length ? entering : cards,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.04 }
        );
      }
    },
    { dependencies: [filtered], scope: gridRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(sidebarRef.current, { autoAlpha: 0, x: -16, duration: 0.5, ease: "power3.out" });
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: sidebarRef }
  );

  useGSAP(
    () => {
      if (!filtersOpen) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.from(sidebarRef.current, { autoAlpha: 0, y: -10, duration: 0.35, ease: "power2.out" });
    },
    { dependencies: [filtersOpen], scope: sidebarRef }
  );

  const activeFilters = [
    subject !== "All subjects" && { label: subject, clear: () => setSubject("All subjects") },
    mode !== "Online" && { label: mode, clear: () => setMode("Online") },
    region !== "Anywhere" && { label: region, clear: () => setRegion("Anywhere") },
    maxBudget !== 120 && { label: `Up to $${maxBudget}/hr`, clear: () => setMaxBudget(120) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <>
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
          ref={sidebarRef}
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
                <FilterChip key={f.label} label={f.label} onRemove={() => { captureFlip(); f.clear(); }} />
              ))}
            </div>
          )}
          <div className="field">
            <label>Subject</label>
            <select
              className="input"
              value={subject}
              onChange={(e) => {
                captureFlip();
                setSubject(e.target.value);
              }}
            >
              <option>All subjects</option>
              {subjectOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Mode</label>
            <SegmentedControl
              name="mode"
              value={mode}
              onChange={(v) => {
                captureFlip();
                setMode(v);
              }}
              options={[
                { label: "Online", value: "Online" },
                { label: "In person", value: "In person" },
                { label: "Both", value: "Both" },
              ]}
            />
          </div>
          <div className="field">
            <label>Region</label>
            <select
              className="input"
              value={region}
              onChange={(e) => {
                captureFlip();
                setRegion(e.target.value);
              }}
            >
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
            onChange={(e) => {
              captureFlip();
              setSort(e.target.value as (typeof SORTS)[number]);
            }}
          >
            {SORTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {filtered.length > 0 ? (
          <div ref={gridRef} className="relative flex flex-col gap-4">
            {filtered.map((t, i) => {
              const tier = tierOf(t);
              const isBookmarked = t.id ? bookmarked.has(t.id) : false;
              const isBookmarkPending = t.id ? bookmarkPending.has(t.id) : false;
              return (
                <div
                  key={t.id ?? t.name}
                  data-tutor-id={t.id ?? t.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected({ tutor: t, index: i })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected({ tutor: t, index: i });
                    }
                  }}
                  className="tutor-card card elev-sm relative cursor-pointer transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] p-0 overflow-hidden gap-0"
                >
                  <div className="flex gap-4 p-5 max-[560px]:flex-col">
                    <div className="flex flex-col items-center gap-1.5 flex-none">
                      <TutorAvatar name={t.name} index={i} size={64} withBadge />
                      <span
                        className="text-[10px] font-semibold inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{ background: tier.bg, color: tier.color }}
                      >
                        {tier.label}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-[var(--font-heading)] text-[18px]">{t.name}</span>
                            <VerifiedBadge />
                            {t.name === topRatedName && (
                              <Tag variant="accent" className="text-[10px] px-2 py-0.5">
                                Top rated
                              </Tag>
                            )}
                            {t.isNew && (
                              <Tag variant="accent-2" className="text-[10px] px-2 py-0.5">
                                New
                              </Tag>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap mt-1">
                            <span
                              className="text-[12.5px]"
                              style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
                            >
                              {t.city}
                            </span>
                            <Tag variant="neutral" className="text-[10px] px-2 py-0.5">
                              {t.mode === "In person" ? "Home Tutor" : t.mode === "Both" ? "Online & Home" : "Online Tutor"}
                            </Tag>
                          </div>
                        </div>
                        <span
                          className="font-[var(--font-heading)] text-[20px] whitespace-nowrap"
                          style={{ color: "var(--color-accent-2-700)" }}
                        >
                          {t.price.replace(/\s*\/\s*hr\s*$/i, "")}
                          <span
                            className="text-[12px] font-[var(--font-body)] font-normal"
                            style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
                          >
                            /hr
                          </span>
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-start gap-1.5 text-[13px]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                          <path d="M4 19.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13.5" />
                          <path d="M2 19.5h20" />
                          <path d="M9 22v-4h6v4" />
                        </svg>
                        <span>
                          <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                            Teaches:
                          </span>{" "}
                          {t.subjects.map((s, si) => (
                            <span key={s}>
                              <strong style={{ color: "var(--color-text)" }}>{s}</strong>
                              {si < t.subjects.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </span>
                      </div>

                      {t.languages && t.languages.length > 0 && (
                        <div
                          className="mt-1 flex items-center gap-1.5 text-[13px]"
                          style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          Speaks {t.languages.join(", ")}
                        </div>
                      )}

                      {(t.bio || t.headline) && (
                        <p
                          className="text-[13px] leading-relaxed line-clamp-2 mt-2.5 mb-0"
                          style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
                        >
                          {t.bio || t.headline}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between gap-3 px-5 py-3 flex-wrap"
                    style={{ borderTop: "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)", background: "color-mix(in srgb, var(--color-surface) 60%, transparent)" }}
                  >
                    <div className="flex items-center gap-3">
                      {t.reviews > 0 ? (
                        <span className="flex items-center gap-1.5 text-[13px]">
                          <StarRating rating={t.rating} />
                          <span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                            {t.rating.toFixed(1)} ({t.reviews})
                          </span>
                        </span>
                      ) : (
                        <span className="text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                          No reviews yet
                        </span>
                      )}
                      {isAdmin && t.id && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            aria-label={`Edit ${t.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTutor(t);
                            }}
                            className="grid place-content-center rounded-[var(--radius-sm)] cursor-pointer transition-colors duration-150"
                            style={{
                              width: 32,
                              height: 32,
                              background: "var(--color-surface)",
                              color: "var(--color-text)",
                              border: "1px solid color-mix(in srgb, var(--color-text) 15%, transparent)",
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${t.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingTutor(t);
                            }}
                            className="grid place-content-center rounded-[var(--radius-sm)] cursor-pointer transition-colors duration-150"
                            style={{ width: 32, height: 32, background: "color-mix(in srgb, #d92d20 12%, transparent)", color: "#d92d20" }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={isBookmarked ? `Remove ${t.name} from saved tutors` : `Save ${t.name}`}
                        aria-pressed={isBookmarked}
                        disabled={isBookmarkPending}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBookmark(t);
                        }}
                        className="grid place-content-center rounded-full cursor-pointer transition-colors duration-150"
                        style={{
                          width: 38,
                          height: 38,
                          color: isBookmarked ? "var(--color-accent-2-700)" : "color-mix(in srgb, var(--color-text) 55%, transparent)",
                          border: "1px solid color-mix(in srgb, var(--color-text) 15%, transparent)",
                          opacity: isBookmarkPending ? 0.6 : 1,
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={pendingName === t.name || isAlreadyRequested(t)}
                        onClick={(e) => {
                          e.stopPropagation();
                          launchPlane(e.currentTarget);
                          handleRequestTutor(t);
                        }}
                      >
                        {isAlreadyRequested(t) ? (
                          <span className="inline-flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Request sent
                          </span>
                        ) : pendingName === t.name ? (
                          "Sending…"
                        ) : (
                          "Send Request"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
    {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    {selected && (
      <TutorDetailModal
        tutor={selected.tutor}
        index={selected.index}
        isTopRated={selected.tutor.name === topRatedName}
        pending={pendingName === selected.tutor.name}
        requested={isAlreadyRequested(selected.tutor)}
        onClose={() => setSelected(null)}
        onRequest={handleRequestTutor}
      />
    )}
    {editingTutor && (
      <TutorAdminEditModal
        tutor={editingTutor}
        onClose={() => setEditingTutor(null)}
        onSaved={() => {
          setToast({ tone: "success", message: `${editingTutor.name}'s listing has been updated.` });
          router.refresh();
        }}
      />
    )}
    {deletingTutor && (
      <ConfirmDialog
        title="Delete this tutor listing?"
        description={`${deletingTutor.name}'s listing will be permanently removed from Find a Tutor.`}
        confirmLabel="Delete"
        pending={deletePending}
        onConfirm={handleDeleteTutor}
        onCancel={() => setDeletingTutor(null)}
      />
    )}
    </>
  );
}

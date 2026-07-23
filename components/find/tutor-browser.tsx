"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Tag } from "@/components/ui/tag";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { SegmentedControl } from "@/components/ui/segmented";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { subjectAccent } from "@/components/ui/subject-accent";
import { SearchEmptyIllustration, RequestSendIllustration } from "@/components/find/illustrations";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TutorDetailModal } from "@/components/find/tutor-detail-modal";
import { TutorAdminEditModal } from "@/components/find/tutor-admin-edit-modal";
import { RequestLoginModal } from "@/components/auth/request-login-modal";
import { subjects, type TutorRaw } from "@/lib/mock-data";
import { requestSpecificTutor } from "@/app/lib/actions/tutor-request";
import { toggleSavedTutor } from "@/app/lib/actions/saved-tutor";
import { deleteTutorProfile } from "@/app/lib/actions/admin";
import { usePlaneLaunch } from "@/components/ui/plane-launch";

gsap.registerPlugin(useGSAP, Flip);

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

function SubjectMultiSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useGSAP(
    () => {
      if (!open) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.fromTo(
        menuRef.current,
        { autoAlpha: 0, y: -6, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" }
      );
    },
    { dependencies: [open], scope: rootRef }
  );

  function toggle(opt: string) {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  }

  const label =
    selected.length === 0
      ? "All subjects"
      : selected.length === 1
      ? selected[0]
      : `${selected.length} subjects selected`;

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="input flex items-center justify-between gap-2 cursor-pointer text-left"
      >
        <span className="truncate" style={{ color: selected.length ? "var(--color-text)" : undefined }}>
          {label}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-none transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-20 mt-1.5 w-full max-h-64 overflow-auto rounded-[var(--radius-md)] border p-1.5"
          style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)", boxShadow: "var(--shadow-lg)" }}
        >
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="w-full text-left text-[12px] font-medium px-2.5 py-1.5 mb-0.5 rounded-[var(--radius-sm)] cursor-pointer transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--color-text)_6%,transparent)]"
              style={{ color: "var(--color-accent-2-700)" }}
            >
              Clear subjects
            </button>
          )}
          {options.map((opt) => {
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                role="option"
                aria-selected={checked}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-[var(--radius-sm)] cursor-pointer text-[13.5px] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--color-text)_6%,transparent)]"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(opt)}
                  className="cursor-pointer"
                  style={{ accentColor: "var(--color-accent-600)", width: 15, height: 15 }}
                />
                <span className="truncate">{opt}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TutorBrowser({
  tutors,
  isAdmin = false,
  savedTutorIds = [],
  requestedTutorProfileIds = [],
  initialSubject,
}: {
  tutors: TutorRaw[];
  isAdmin?: boolean;
  savedTutorIds?: string[];
  requestedTutorProfileIds?: string[];
  initialSubject?: string;
}) {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    initialSubject ? [initialSubject] : []
  );
  const [mode, setMode] = useState("Online");
  const [curriculum, setCurriculum] = useState("All curricula");
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
  const [loginPrompt, setLoginPrompt] = useState<{ rect: DOMRect | null; retry: () => void } | null>(null);
  const [selected, setSelected] = useState<{ tutor: TutorRaw; index: number } | null>(null);
  const [editingTutor, setEditingTutor] = useState<TutorRaw | null>(null);
  const [deletingTutor, setDeletingTutor] = useState<TutorRaw | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set(savedTutorIds));
  const [bookmarkPending, setBookmarkPending] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();
  const gridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const mountedRef = useRef(false);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const knownIdsRef = useRef<Set<string>>(new Set());

  // Cross-filtered so each list only offers values that actually co-occur with the other's current selection.
  const subjectOptions = useMemo(() => {
    const pool = curriculum === "All curricula" ? tutors : tutors.filter((t) => t.curriculum === curriculum);
    const fromTutors = pool.flatMap((t) => t.subjects);
    const base = curriculum === "All curricula" ? [...subjects, ...fromTutors] : fromTutors;
    return Array.from(new Set(base)).sort((a, b) => a.localeCompare(b));
  }, [tutors, curriculum]);

  const curriculumOptions = useMemo(() => {
    const pool =
      selectedSubjects.length === 0
        ? tutors
        : tutors.filter((t) => t.subjects.some((s) => selectedSubjects.includes(s)));
    return Array.from(new Set(pool.map((t) => t.curriculum).filter((c): c is string => Boolean(c)))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [tutors, selectedSubjects]);

  // Drop selections that no longer apply once the other filter narrows the options.
  useEffect(() => {
    setSelectedSubjects((prev) => {
      const next = prev.filter((s) => subjectOptions.includes(s));
      return next.length === prev.length ? prev : next;
    });
  }, [subjectOptions]);

  useEffect(() => {
    setCurriculum((prev) => (prev !== "All curricula" && !curriculumOptions.includes(prev) ? "All curricula" : prev));
  }, [curriculumOptions]);

  function captureFlip() {
    const cards = gridRef.current?.querySelectorAll(".tutor-card");
    if (cards && cards.length) {
      flipStateRef.current = Flip.getState(cards);
    }
  }

  function handleRequestTutor(t: TutorRaw, origin: HTMLElement | null) {
    if (isAlreadyRequested(t)) return;
    const rect = origin?.getBoundingClientRect() ?? null;
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
        setLoginPrompt({ rect, retry: () => handleRequestTutor(t, origin) });
        return;
      }
      launchPlane(origin);
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
      if (selectedSubjects.length > 0 && !t.subjects.some((s) => selectedSubjects.includes(s))) return false;
      if (mode !== "Both" && t.mode !== mode && t.mode !== "Both") return false;
      if (curriculum !== "All curricula" && t.curriculum !== curriculum) return false;
      if (priceValue(t.price) > maxBudget) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Lowest price") return priceValue(a.price) - priceValue(b.price);
      if (sort === "Most reviews") return b.reviews - a.reviews;
      return b.rating - a.rating;
    });
    return list;
  }, [tutors, selectedSubjects, mode, curriculum, maxBudget, sort]);

  const topRatedName = useMemo(() => {
    if (!filtered.length) return null;
    const best = filtered.reduce((a, b) => (b.rating > a.rating ? b : a));
    return best.rating > 0 ? best.name : null;
  }, [filtered]);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".tutor-card");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const currentIds = new Set(filtered.map((t) => t.listingId ?? t.id ?? t.name));
      const newIds = new Set<string>();
      if (knownIdsRef.current.size) {
        currentIds.forEach((id) => {
          if (!knownIdsRef.current.has(id)) newIds.add(id);
        });
      }
      knownIdsRef.current = currentIds;

      if (!cards || !cards.length || reduced) {
        flipStateRef.current = null;
        mountedRef.current = true;
        return;
      }

      if (!mountedRef.current) {
        mountedRef.current = true;
        flipStateRef.current = null;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        // stagger as { amount } caps the TOTAL spread regardless of list length — with a fixed
        // per-item delay (e.g. 0.09s each), a 100+ card list takes 10s+ to fully reveal and the
        // last cards (and their avatars) sit invisible that whole time.
        tl.fromTo(
          cards,
          { autoAlpha: 0, y: 40, scale: 0.94, rotateX: -4 },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 0.65, stagger: { each: 0.09, amount: 0.8 }, clearProps: "transform" }
        ).fromTo(
          gridRef.current!.querySelectorAll(".tutor-avatar-ring"),
          { scale: 0.4, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.5, stagger: { each: 0.09, amount: 0.6 }, ease: "back.out(2.4)", clearProps: "transform" },
          "-=0.55"
        );
        return;
      }

      const state = flipStateRef.current;
      flipStateRef.current = null;

      if (state) {
        Flip.from(state, {
          duration: 0.5,
          ease: "power2.inOut",
          stagger: { each: 0.02, amount: 0.5 },
          absolute: true,
          onEnter: (els) =>
            gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.4, stagger: { each: 0.05, amount: 0.35 }, ease: "power2.out" }),
        });
      } else {
        const entering = Array.from(cards).filter((c) => newIds.size === 0 || newIds.has(c.dataset.tutorId ?? ""));
        gsap.fromTo(
          entering.length ? entering : cards,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: { each: 0.04, amount: 0.3 } }
        );
      }
    },
    { dependencies: [filtered], scope: gridRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const header = sidebarRef.current?.querySelector(".filters-header-icon");
        const fields = sidebarRef.current?.querySelectorAll(".field");
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(sidebarRef.current, { autoAlpha: 0, x: -24, duration: 0.55, clearProps: "transform" })
          .fromTo(
            header ?? [],
            { scale: 0.3, autoAlpha: 0, rotate: -25 },
            { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.45, ease: "back.out(2.4)", clearProps: "transform" },
            "-=0.35"
          )
          .fromTo(
            fields ?? [],
            { autoAlpha: 0, x: -16 },
            { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.09, clearProps: "transform" },
            "-=0.25"
          );
        return () => tl.kill();
      });
      return () => mm.revert();
    },
    { scope: sidebarRef }
  );

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !countRef.current) return;
      gsap.fromTo(countRef.current, { autoAlpha: 0.3, y: -3 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
    },
    { dependencies: [filtered.length], scope: countRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(toolbarRef.current, { autoAlpha: 0, y: -10, duration: 0.5, ease: "power3.out", delay: 0.1 });
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: toolbarRef }
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
    ...selectedSubjects.map((s) => ({
      label: s,
      clear: () => setSelectedSubjects((prev) => prev.filter((x) => x !== s)),
    })),
    mode !== "Online" && { label: mode, clear: () => setMode("Online") },
    curriculum !== "All curricula" && { label: curriculum, clear: () => setCurriculum("All curricula") },
    maxBudget !== 120 && { label: `Up to $${maxBudget}/hr`, clear: () => setMaxBudget(120) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <>
    <div className="grid gap-8 items-start [grid-template-columns:260px_1fr] max-[860px]:[grid-template-columns:1fr]">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          className="hidden max-[860px]:flex items-center justify-between gap-2 card elev-sm cursor-pointer border transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
          style={{ background: "var(--color-surface)", borderColor: "var(--color-divider)" }}
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
          className={`card elev-md gap-4 sticky top-[88px] border ${filtersOpen ? "" : "max-[860px]:hidden"}`}
          style={{ background: "var(--color-surface)", borderColor: "var(--color-divider)" }}
        >
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div
                className="filters-header-icon w-8 h-8 rounded-full grid place-content-center flex-none"
                style={{ background: "var(--color-accent-2-100)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-2-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
              </div>
              <div className="font-[var(--font-heading)] text-[18px]">Filters</div>
            </div>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  captureFlip();
                  setSelectedSubjects([]);
                  setMode("Online");
                  setCurriculum("All curricula");
                  setMaxBudget(120);
                }}
                className="text-[12.5px] font-medium cursor-pointer transition-colors duration-150"
                style={{ color: "var(--color-accent-2-700)" }}
              >
                Clear all
              </button>
            )}
          </div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-1.5 -mt-1">
              {activeFilters.map((f) => (
                <FilterChip key={f.label} label={f.label} onRemove={() => { captureFlip(); f.clear(); }} />
              ))}
            </div>
          )}
          <div className="field">
            <label>Subject{selectedSubjects.length > 1 ? "s" : ""}</label>
            <SubjectMultiSelect
              options={subjectOptions}
              selected={selectedSubjects}
              onChange={(next) => {
                captureFlip();
                setSelectedSubjects(next);
              }}
            />
          </div>
          <div className="field">
            <label>Curriculum</label>
            <select
              className="input"
              value={curriculum}
              onChange={(e) => {
                captureFlip();
                setCurriculum(e.target.value);
              }}
            >
              <option>All curricula</option>
              {curriculumOptions.map((c) => (
                <option key={c}>{c}</option>
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
              style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
            >
              Up to ${maxBudget} / hr
            </div>
          </div>
        </aside>
      </div>

      <div>
        <div ref={toolbarRef} className="flex justify-between items-center flex-wrap gap-2.5 mb-4.5">
          <span
            ref={countRef}
            className="text-[14px]"
            style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
          >
            Showing <strong style={{ color: "var(--color-text)" }}>{filtered.length}</strong> subject listing{filtered.length === 1 ? "" : "s"}
          </span>
          <div className="relative">
            <select
              className="input w-auto pr-9 appearance-none cursor-pointer"
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div ref={gridRef} className="relative flex flex-col gap-4" style={{ perspective: 1000 }}>
            {filtered.map((t, i) => {
              const tier = tierOf(t);
              const accent = subjectAccent(t.subjects, i);
              const isBookmarked = t.id ? bookmarked.has(t.id) : false;
              const isBookmarkPending = t.id ? bookmarkPending.has(t.id) : false;
              return (
                <div
                  key={t.listingId ?? t.id ?? t.name}
                  data-tutor-id={t.listingId ?? t.id ?? t.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected({ tutor: t, index: i })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected({ tutor: t, index: i });
                    }
                  }}
                  className="tutor-card group card elev-sm relative cursor-pointer border transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] p-0 overflow-hidden gap-0"
                  style={{ borderColor: "var(--color-divider)" }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[4px] transition-[width] duration-200 ease-out group-hover:w-[5px]"
                    style={{ background: accent.bar }}
                  />
                  <div className="flex gap-4 p-5 pl-6 max-[560px]:flex-col">
                    <div className="flex flex-col items-center gap-1.5 flex-none">
                      <div
                        className="tutor-avatar-ring rounded-full transition-transform duration-200 ease-out group-hover:scale-[1.04]"
                        style={{ boxShadow: `0 0 0 3px color-mix(in srgb, ${accent.bar} 22%, transparent)`, borderRadius: "50%" }}
                      >
                        <TutorAvatar name={t.name} index={i} size={64} withBadge={!t.onDemand} />
                      </div>
                      {!t.onDemand && (
                        <span
                          className="text-[10px] font-semibold inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                          style={{ background: tier.bg, color: tier.color }}
                        >
                          {tier.label}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {t.slug ? (
                              <Link
                                href={`/find-a-tutor/${t.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="font-[var(--font-heading)] text-[18px] hover:underline"
                              >
                                {t.name}
                              </Link>
                            ) : (
                              <span className="font-[var(--font-heading)] text-[18px]">{t.name}</span>
                            )}
                            {t.onDemand ? (
                              <Tag variant="neutral" className="text-[10px] px-2 py-0.5">
                                On demand
                              </Tag>
                            ) : (
                              <>
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
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap mt-1">
                            <span
                              className="text-[12.5px]"
                              style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
                            >
                              {t.city}
                            </span>
                            {!t.onDemand && (
                              <Tag variant="neutral" className="text-[10px] px-2 py-0.5">
                                {t.mode === "In person" ? "Home Tutor" : t.mode === "Both" ? "Online & Home" : "Online Tutor"}
                              </Tag>
                            )}
                          </div>
                        </div>
                        <span
                          className="font-[var(--font-heading)] text-[20px] whitespace-nowrap rounded-full px-3 py-1"
                          style={{ color: "var(--color-accent-2-700)", background: "var(--color-accent-2-100)" }}
                        >
                          {/\d/.test(t.price) ? (
                            <>
                              {t.price.replace(/\s*\/\s*hr\s*$/i, "")}
                              <span
                                className="text-[12px] font-[var(--font-body)] font-normal"
                                style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
                              >
                                /hr
                              </span>
                            </>
                          ) : (
                            <span className="text-[14px] font-[var(--font-body)] font-medium">{t.price}</span>
                          )}
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-start gap-1.5 text-[13px]">
                        <SubjectIcon
                          subject={t.subjects[0] ?? ""}
                          width={14}
                          height={14}
                          strokeWidth={2}
                          className="flex-none mt-0.5"
                          style={{ color: accent.bar }}
                        />
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
                      {t.onDemand ? (
                        <span className="text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                          No tutor assigned yet
                        </span>
                      ) : t.reviews > 0 ? (
                        <span className="flex items-center gap-1.5 text-[13px]">
                          <StarRating rating={t.rating} />
                          <span style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                            {t.rating.toFixed(1)} ({t.reviews})
                          </span>
                        </span>
                      ) : (
                        <span className="text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
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
                      {!t.onDemand && (
                        <button
                          type="button"
                          aria-label={isBookmarked ? `Remove ${t.name} from saved tutors` : `Save ${t.name}`}
                          aria-pressed={isBookmarked}
                          disabled={isBookmarkPending}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleBookmark(t);
                          }}
                          className="grid place-content-center rounded-full cursor-pointer transition-[color,border-color,transform,box-shadow] duration-150 hover:scale-105 active:scale-95"
                          style={{
                            width: 38,
                            height: 38,
                            color: isBookmarked ? "var(--color-accent-2-700)" : "color-mix(in srgb, var(--color-text) 55%, transparent)",
                            background: isBookmarked ? "var(--color-accent-2-100)" : "transparent",
                            border: `1px solid ${isBookmarked ? "var(--color-accent-2-300)" : "color-mix(in srgb, var(--color-text) 15%, transparent)"}`,
                            opacity: isBookmarkPending ? 0.6 : 1,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary hover:scale-[1.03] active:scale-95 transition-transform duration-150"
                        disabled={pendingName === t.name || isAlreadyRequested(t)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestTutor(t, e.currentTarget);
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
            className="rounded-[var(--radius-lg)] p-10 text-center border"
            style={{
              background: "linear-gradient(155deg, var(--color-accent-2-100), var(--color-accent-100))",
              borderColor: "var(--color-divider)",
            }}
          >
            <SearchEmptyIllustration className="w-[180px] h-auto mx-auto mb-2" />
            <h3 className="text-[24px]">No tutors match those filters</h3>
            <p
              className="text-[15px] mx-auto mt-2.5 mb-5 max-w-[44ch]"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              Tell us what you need and our team will source a match for you personally.
            </p>
            <Link href="/request-a-tutor" className="btn btn-primary hover:scale-[1.03] active:scale-95 transition-transform duration-150">
              Request a Tutor
            </Link>
          </div>
        )}

        {filtered.length > 0 && (
          <div
            className="mt-10 rounded-[var(--radius-lg)] p-10 text-center border"
            style={{
              background: "linear-gradient(155deg, var(--color-accent-2-100), var(--color-accent-100))",
              borderColor: "var(--color-divider)",
            }}
          >
            <RequestSendIllustration className="w-[180px] h-auto mx-auto mb-2" />
            <h3 className="text-[24px]">Can&rsquo;t find the right tutor?</h3>
            <p
              className="text-[15px] mx-auto mt-2.5 mb-5 max-w-[44ch]"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              Tell us what you need and our team will source a match for you personally.
            </p>
            <Link href="/request-a-tutor" className="btn btn-primary hover:scale-[1.03] active:scale-95 transition-transform duration-150">
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
    {loginPrompt && (
      <RequestLoginModal
        originRect={loginPrompt.rect}
        onClose={() => setLoginPrompt(null)}
        onAuthenticated={() => {
          const retry = loginPrompt.retry;
          setLoginPrompt(null);
          router.refresh();
          retry();
        }}
      />
    )}
    </>
  );
}

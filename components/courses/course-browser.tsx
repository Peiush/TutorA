"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Toast, ToastTone } from "@/components/ui/toast";
import { CourseCard } from "@/components/courses/course-card";
import { SubjectCard } from "@/components/courses/subject-card";
import { CourseDetailModal } from "@/components/courses/course-detail-modal";
import { SubjectDetailModal } from "@/components/courses/subject-detail-modal";
import { CategorySelector } from "@/components/courses/category-selector";
import { SearchIcon } from "@/components/courses/course-icons";
import { requestCourse } from "@/app/lib/actions/course-request";
import { requestSubject } from "@/app/lib/actions/subject-request";
import { toggleSavedCourse } from "@/app/lib/actions/saved-course";
import { toggleSavedSubject } from "@/app/lib/actions/saved-subject";
import { usePlaneLaunch } from "@/components/ui/plane-launch";
import { RequestLoginModal } from "@/components/auth/request-login-modal";
import type { CourseRaw } from "@/lib/mock-courses";
import { GRADE_BANDS, matchesGradeBand } from "@/lib/grade-bands";
import type { SubjectListing } from "@/app/lib/subject-listings";

gsap.registerPlugin(useGSAP, Flip);

const SORTS = ["Most popular", "Highest rated", "Lowest price"] as const;
const ALL = "All courses";

export function CourseBrowser({
  courses,
  subjects,
  savedCourseIds = [],
  requestedCourseIds = [],
  savedSubjectIds = [],
  requestedSubjectIds = [],
  initialCategory,
}: {
  courses: CourseRaw[];
  subjects: SubjectListing[];
  savedCourseIds?: string[];
  requestedCourseIds?: string[];
  savedSubjectIds?: string[];
  requestedSubjectIds?: string[];
  initialCategory?: string;
}) {
  const router = useRouter();
  const [category, setCategory] = useState<string>(initialCategory ?? ALL);
  const activeBand = GRADE_BANDS.find((b) => b.label === category) ?? null;
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Most popular");
  const [saved, setSaved] = useState<Set<string>>(new Set(savedCourseIds));
  const [savePending, setSavePending] = useState<Set<string>>(new Set());
  const [savedSubjects, setSavedSubjects] = useState<Set<string>>(new Set(savedSubjectIds));
  const [saveSubjectPending, setSaveSubjectPending] = useState<Set<string>>(new Set());
  const [requested, setRequested] = useState<Set<string>>(new Set(requestedCourseIds));
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const [requestedSubjects, setRequestedSubjects] = useState<Set<string>>(new Set(requestedSubjectIds));
  const [requestingSubjectId, setRequestingSubjectId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [loginPrompt, setLoginPrompt] = useState<{ rect: DOMRect | null; retry: () => void } | null>(null);
  const [openCourse, setOpenCourse] = useState<CourseRaw | null>(null);
  const [openSubject, setOpenSubject] = useState<SubjectListing | null>(null);
  const [, startTransition] = useTransition();
  const launchPlane = usePlaneLaunch();
  const gridRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

  useGSAP(
    () => {
      const bar = filterBarRef.current;
      if (!bar) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(bar.querySelectorAll(".cb-reveal"), { autoAlpha: 0, y: 14 });
        gsap.to(bar.querySelectorAll(".cb-reveal"), {
          autoAlpha: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(bar.querySelectorAll(".cb-reveal"), { autoAlpha: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: filterBarRef }
  );

  function captureFlip() {
    const cards = gridRef.current?.querySelectorAll(".course-card");
    if (cards && cards.length) {
      flipStateRef.current = Flip.getState(cards);
    }
  }

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of courses) counts[c.category] = (counts[c.category] ?? 0) + 1;
    return counts;
  }, [courses]);

  const gradeBandCounts = useMemo(() => {
    const counts = {} as Record<(typeof GRADE_BANDS)[number]["key"], number>;
    for (const band of GRADE_BANDS) {
      counts[band.key] = subjects.filter((s) => matchesGradeBand(s.gradeLevel, band)).length;
    }
    return counts;
  }, [subjects]);

  const filtered = useMemo(() => {
    if (activeBand) return [];
    let list = courses.filter((c) => {
      if (category !== ALL && c.category !== category) return false;
      const q = query.trim().toLowerCase();
      if (q && !c.title.toLowerCase().includes(q) && !(c.instructor ?? "").toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Lowest price") return (a.priceCents ?? a.originalPriceCents ?? 0) - (b.priceCents ?? b.originalPriceCents ?? 0);
      if (sort === "Highest rated") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
    return list;
  }, [courses, category, query, sort, activeBand]);

  const filteredSubjects = useMemo(() => {
    if (!activeBand) return [];
    const q = query.trim().toLowerCase();
    return subjects
      .filter((s) => {
        if (!matchesGradeBand(s.gradeLevel, activeBand)) return false;
        if (q && !s.name.toLowerCase().includes(q) && !(s.curriculum ?? "").toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [subjects, activeBand, query]);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".course-card");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
        gsap.fromTo(cards, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05, overwrite: "auto" });
      }

      // If this effect gets torn down mid-flight (e.g. React Strict Mode's double-invoke
      // on mount, or a rapid filter change), clear GSAP's inline styles instead of leaving a
      // card stuck at its pre-animation opacity/transform — a plain unmount should always
      // resolve to the natural, visible CSS state.
      return () => {
        gsap.set(cards, { clearProps: "opacity,transform" });
      };
    },
    { dependencies: [filtered, filteredSubjects], scope: gridRef }
  );

  function handleToggleSaved(course: CourseRaw) {
    setSavePending((prev) => new Set(prev).add(course.id));
    startTransition(async () => {
      const result = await toggleSavedCourse(course.id);
      setSavePending((prev) => {
        const next = new Set(prev);
        next.delete(course.id);
        return next;
      });
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/courses")}`);
        return;
      }
      if (result.ok) {
        setSaved((prev) => {
          const next = new Set(prev);
          if (result.saved) next.add(course.id);
          else next.delete(course.id);
          return next;
        });
        setToast({
          tone: "success",
          message: result.saved ? `Saved "${course.title}" to your wishlist.` : `Removed "${course.title}" from your wishlist.`,
        });
      } else {
        setToast({ tone: "error", message: result.message ?? "Could not update saved courses." });
      }
    });
  }

  function handleToggleSavedSubject(subject: SubjectListing) {
    setSaveSubjectPending((prev) => new Set(prev).add(subject.id));
    startTransition(async () => {
      const result = await toggleSavedSubject(subject.id);
      setSaveSubjectPending((prev) => {
        const next = new Set(prev);
        next.delete(subject.id);
        return next;
      });
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/courses")}`);
        return;
      }
      if (result.ok) {
        setSavedSubjects((prev) => {
          const next = new Set(prev);
          if (result.saved) next.add(subject.id);
          else next.delete(subject.id);
          return next;
        });
        const label = subject.title ?? subject.name;
        setToast({
          tone: "success",
          message: result.saved ? `Saved "${label}" to your wishlist.` : `Removed "${label}" from your wishlist.`,
        });
      } else {
        setToast({ tone: "error", message: result.message ?? "Could not update saved subjects." });
      }
    });
  }

  function handleRequestCourse(course: CourseRaw, origin: HTMLElement | null) {
    const rect = origin?.getBoundingClientRect() ?? null;
    setRequestingId(course.id);
    startTransition(async () => {
      const result = await requestCourse(course.id);
      setRequestingId(null);
      if (result.requiresAuth) {
        setLoginPrompt({ rect, retry: () => handleRequestCourse(course, origin) });
        return;
      }
      launchPlane(origin);
      if (result.ok) {
        setRequested((prev) => new Set(prev).add(course.id));
        setToast({ tone: "success", message: result.message ?? `Your request for "${course.title}" has been sent.` });
      } else {
        setToast({ tone: "error", message: result.message ?? "Something went wrong. Please try again." });
      }
    });
  }

  function handleRequestSubject(subject: SubjectListing, origin: HTMLElement | null) {
    const rect = origin?.getBoundingClientRect() ?? null;
    setRequestingSubjectId(subject.id);
    startTransition(async () => {
      const result = await requestSubject(subject.id);
      setRequestingSubjectId(null);
      if (result.requiresAuth) {
        setLoginPrompt({ rect, retry: () => handleRequestSubject(subject, origin) });
        return;
      }
      launchPlane(origin);
      const label = subject.title ?? subject.name;
      if (result.ok) {
        setRequestedSubjects((prev) => new Set(prev).add(subject.id));
        setToast({ tone: "success", message: result.message ?? `Your request for "${label}" has been sent.` });
      } else {
        setToast({ tone: "error", message: result.message ?? "Something went wrong. Please try again." });
      }
    });
  }

  return (
    <>
      <div ref={filterBarRef} className="flex flex-col gap-4 mb-6">
        <div className="flex gap-3 flex-wrap items-center justify-between">
          <div className="cb-reveal flex items-center gap-2 flex-1 min-w-[220px] max-w-[360px]">
            <div
              className="field-icon w-full rounded-full transition-shadow duration-300 focus-within:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent-400)_28%,transparent)]"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <SearchIcon width={16} height={16} />
              <input
                className="input"
                placeholder={activeBand ? "Search subjects" : "Search courses or instructors"}
                value={query}
                onChange={(e) => {
                  captureFlip();
                  setQuery(e.target.value);
                }}
              />
            </div>
          </div>
          {!activeBand && (
            <select
              className="cb-reveal input w-auto transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
              style={{ boxShadow: "var(--shadow-sm)" }}
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
          )}
        </div>

        <div className="cb-reveal">
          <CategorySelector
            category={category}
            onSelect={(c) => {
              captureFlip();
              setCategory(c);
            }}
            counts={categoryCounts}
            total={courses.length}
            gradeBandCounts={gradeBandCounts}
          />
        </div>
      </div>

      <p className="text-[14px] mb-4" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        {activeBand
          ? `Showing ${filteredSubjects.length} subject${filteredSubjects.length === 1 ? "" : "s"} for ${activeBand.label}`
          : `Showing ${filtered.length} course${filtered.length === 1 ? "" : "s"}`}
      </p>

      <div ref={gridRef}>
        {activeBand ? (
          filteredSubjects.length > 0 ? (
            <div
              className="relative grid gap-6 items-start"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
            >
              {filteredSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  band={activeBand}
                  saved={savedSubjects.has(subject.id)}
                  savePending={saveSubjectPending.has(subject.id)}
                  requested={requestedSubjects.has(subject.id)}
                  requestPending={requestingSubjectId === subject.id}
                  onToggleSaved={handleToggleSavedSubject}
                  onRequest={handleRequestSubject}
                  onOpen={setOpenSubject}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--radius-lg)] p-8 text-center" style={{ background: "var(--color-accent-2-100)" }}>
              <h3 className="text-[22px]">No subjects match those filters</h3>
              <p className="text-[15px] mx-auto mt-2.5 mb-0 max-w-[44ch]" style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>
                Try a different grade band or search term.
              </p>
            </div>
          )
        ) : filtered.length > 0 ? (
          <div
            className="relative grid gap-6 items-start"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
          >
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                saved={saved.has(course.id)}
                savePending={savePending.has(course.id)}
                requested={requested.has(course.id)}
                requestPending={requestingId === course.id}
                onToggleSaved={handleToggleSaved}
                onRequest={handleRequestCourse}
                onOpen={setOpenCourse}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-lg)] p-8 text-center" style={{ background: "var(--color-accent-2-100)" }}>
            <h3 className="text-[22px]">No courses match those filters</h3>
            <p className="text-[15px] mx-auto mt-2.5 mb-0 max-w-[44ch]" style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>
              Try a different category or search term.
            </p>
          </div>
        )}
      </div>

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
      {openCourse && (
        <CourseDetailModal
          course={openCourse}
          saved={saved.has(openCourse.id)}
          savePending={savePending.has(openCourse.id)}
          requested={requested.has(openCourse.id)}
          requestPending={requestingId === openCourse.id}
          onToggleSaved={handleToggleSaved}
          onRequest={handleRequestCourse}
          onClose={() => setOpenCourse(null)}
        />
      )}
      {openSubject && activeBand && (
        <SubjectDetailModal
          subject={openSubject}
          band={activeBand}
          saved={savedSubjects.has(openSubject.id)}
          savePending={saveSubjectPending.has(openSubject.id)}
          requested={requestedSubjects.has(openSubject.id)}
          requestPending={requestingSubjectId === openSubject.id}
          onToggleSaved={handleToggleSavedSubject}
          onRequest={handleRequestSubject}
          onClose={() => setOpenSubject(null)}
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

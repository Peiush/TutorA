"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Toast, ToastTone } from "@/components/ui/toast";
import { CourseCard } from "@/components/courses/course-card";
import { CourseDetailModal } from "@/components/courses/course-detail-modal";
import { SearchIcon } from "@/components/courses/course-icons";
import { CATEGORY_PALETTE } from "@/components/courses/course-illustrations";
import { requestCourse } from "@/app/lib/actions/course-request";
import { toggleSavedCourse } from "@/app/lib/actions/saved-course";
import { courseCategories, type CourseRaw } from "@/lib/mock-courses";

gsap.registerPlugin(useGSAP, Flip);

const SORTS = ["Most popular", "Highest rated", "Lowest price"] as const;
const ALL = "All courses";

export function CourseBrowser({
  courses,
  savedCourseIds = [],
  requestedCourseIds = [],
}: {
  courses: CourseRaw[];
  savedCourseIds?: string[];
  requestedCourseIds?: string[];
}) {
  const router = useRouter();
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Most popular");
  const [saved, setSaved] = useState<Set<string>>(new Set(savedCourseIds));
  const [savePending, setSavePending] = useState<Set<string>>(new Set());
  const [requested, setRequested] = useState<Set<string>>(new Set(requestedCourseIds));
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [openCourse, setOpenCourse] = useState<CourseRaw | null>(null);
  const [, startTransition] = useTransition();
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

  const filtered = useMemo(() => {
    let list = courses.filter((c) => {
      if (category !== ALL && c.category !== category) return false;
      if (query.trim() && !c.title.toLowerCase().includes(query.trim().toLowerCase()) && !c.instructor.toLowerCase().includes(query.trim().toLowerCase())) {
        return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Lowest price") return a.priceCents - b.priceCents;
      if (sort === "Highest rated") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
    return list;
  }, [courses, category, query, sort]);

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
        gsap.fromTo(cards, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 });
      }
    },
    { dependencies: [filtered], scope: gridRef }
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

  function handleRequestCourse(course: CourseRaw) {
    setRequestingId(course.id);
    startTransition(async () => {
      const result = await requestCourse(course.id);
      setRequestingId(null);
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/courses")}`);
        return;
      }
      if (result.ok) {
        setRequested((prev) => new Set(prev).add(course.id));
        setToast({ tone: "success", message: result.message ?? `Your request for "${course.title}" has been sent.` });
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
                placeholder="Search courses or instructors"
                value={query}
                onChange={(e) => {
                  captureFlip();
                  setQuery(e.target.value);
                }}
              />
            </div>
          </div>
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
        </div>

        <div className="flex gap-2 flex-wrap">
          {[ALL, ...courseCategories].map((c) => {
            const active = category === c;
            const dot = c === ALL ? "var(--color-accent-2-700)" : CATEGORY_PALETTE[c as keyof typeof CATEGORY_PALETTE]?.line;
            return (
              <button
                key={c}
                type="button"
                onClick={() => {
                  captureFlip();
                  setCategory(c);
                }}
                className="cb-reveal group inline-flex items-center gap-2 cursor-pointer rounded-full border text-[12.5px] px-3.5 py-1.5 font-medium transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5"
                style={
                  active
                    ? {
                        background: "var(--color-accent-2-800)",
                        color: "#fff",
                        borderColor: "var(--color-accent-2-800)",
                        boxShadow: "var(--shadow-md)",
                      }
                    : {
                        background: "var(--color-bg)",
                        color: "var(--color-text)",
                        borderColor: "var(--color-divider)",
                        boxShadow: "var(--shadow-sm)",
                      }
                }
              >
                {dot && (
                  <span
                    className="inline-block w-[7px] h-[7px] rounded-full flex-none transition-transform duration-200 group-hover:scale-125"
                    style={{ background: active ? "#fff" : dot }}
                    aria-hidden
                  />
                )}
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-[14px] mb-4" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        Showing {filtered.length} course{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div
          ref={gridRef}
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
    </>
  );
}

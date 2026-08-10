"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
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
import { CourseSearchBox } from "@/components/courses/course-search-box";
import { XIcon, TargetIcon, CodeBracketIcon, GlobeIcon } from "@/components/courses/course-icons";
import { CATEGORY_COLORS } from "@/components/courses/course-illustrations";
import { requestCourse } from "@/app/lib/actions/course-request";
import { requestSubject } from "@/app/lib/actions/subject-request";
import { toggleSavedCourse } from "@/app/lib/actions/saved-course";
import { toggleSavedSubject } from "@/app/lib/actions/saved-subject";
import { usePlaneLaunch } from "@/components/ui/plane-launch";
import { RequestLoginModal } from "@/components/auth/request-login-modal";
import type { CourseRaw, CourseCategory } from "@/lib/mock-courses";
import { GRADE_BANDS, matchesGradeBand } from "@/lib/grade-bands";
import type { SubjectListing } from "@/app/lib/subject-listings";
import { POPULAR_SUBJECT_NAMES as FEATURED_SUBJECT_NAMES } from "@/lib/featured-subjects";

gsap.registerPlugin(useGSAP, Flip);

const SORTS = ["Most popular", "Highest rated", "Lowest price"] as const;
const ALL = "All courses";

// Curated courses shown on first load (no filter, no search) instead of dumping
// all 39 courses — a more useful landing than an unsorted wall. (Featured
// subjects live in "@/lib/featured-subjects" — shared with /find-a-tutor.)
const FEATURED_COURSE_TITLES = [
  "Python Programming for Beginners",
  "JavaScript Programming for Beginners",
  "Computer Science",
  "Data Science",
  "AI & Machine Learning (Advanced)",
];

// Quick-access search shortcuts shown above "Popular subjects" on the default
// (no filter, no search) view. `query` is the substring actually run through
// the search box's matching (course title / subject name & curriculum), which
// isn't always identical to the display `label` — e.g. "AP Subjects" searches
// "AP" so it catches both the AP Exam Preparation Course and AP Calculus AB/BC.
const FREQUENTLY_SEARCHED: {
  group: string;
  icon: typeof TargetIcon;
  colorKey: CourseCategory;
  items: { label: string; query: string }[];
}[] = [
  {
    group: "Test Preparation",
    icon: TargetIcon,
    colorKey: "Test Preparation",
    items: [
      { label: "SAT", query: "SAT" },
      { label: "ACT", query: "ACT" },
      { label: "AP Subjects", query: "AP" },
      { label: "IB Programme", query: "IB" },
      { label: "IGCSE", query: "IGCSE" },
      { label: "GCSE", query: "GCSE" },
      { label: "A Levels", query: "Level" },
      { label: "PSAT", query: "PSAT" },
      { label: "IELTS", query: "IELTS" },
      { label: "TOEFL", query: "TOEFL" },
      { label: "PTE", query: "PTE" },
      { label: "Duolingo English Test", query: "Duolingo" },
    ],
  },
  {
    group: "Coding Courses",
    icon: CodeBracketIcon,
    colorKey: "Programming & Technology",
    items: [
      { label: "Scratch", query: "Scratch" },
      { label: "Python", query: "Python" },
      { label: "Java", query: "Java" },
      { label: "C++", query: "C++" },
      { label: "HTML", query: "HTML" },
      { label: "CSS", query: "CSS" },
      { label: "JavaScript", query: "JavaScript" },
      { label: "SQL", query: "SQL" },
      { label: "React (Basics)", query: "React" },
      { label: "AI for Beginners", query: "AI" },
      { label: "Robotics (Kids)", query: "Robotics" },
    ],
  },
  {
    group: "Languages",
    icon: GlobeIcon,
    colorKey: "Languages",
    items: [
      { label: "English Speaking", query: "Spoken" },
      { label: "Spoken English", query: "Spoken" },
      { label: "Business English", query: "Business English" },
      { label: "IELTS English", query: "IELTS" },
      { label: "French", query: "French" },
      { label: "Spanish", query: "Spanish" },
      { label: "Arabic", query: "Arabic" },
      { label: "Hindi", query: "Hindi" },
    ],
  },
];

function FrequentlySearched({ onPick }: { onPick: (query: string) => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const chips = gsap.utils.toArray<HTMLElement>(".fs-chip", rootRef.current);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(chips, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(chips, { autoAlpha: 0, y: 8 });
      gsap.to(chips, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.012, ease: "power2.out" });
    },
    { scope: rootRef }
  );

  const handleEnter = contextSafe((el: HTMLElement, solid: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, { y: -2, scale: 1.04, duration: 0.2, ease: "power2.out" });
    el.style.boxShadow = `0 8px 18px -8px color-mix(in srgb, ${solid} 55%, transparent)`;
  });

  const handleLeave = contextSafe((el: HTMLElement) => {
    gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
    el.style.boxShadow = "none";
  });

  const handleClick = contextSafe((el: HTMLElement, query: string) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(el, { scale: 0.92 }, { scale: 1.04, duration: 0.3, ease: "back.out(2)" });
    }
    onPick(query);
  });

  return (
    <div ref={rootRef} className="mb-8">
      <h2 className="text-[18px] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
        Frequently searched
      </h2>
      <p className="text-[13.5px] mb-4" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        Popular exam prep, coding and language searches — tap one to jump straight to it.
      </p>
      <div className="flex flex-col gap-4">
        {FREQUENTLY_SEARCHED.map(({ group, icon: Icon, colorKey, items }) => {
          const colors = CATEGORY_COLORS[colorKey];
          return (
            <div key={group}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-6 h-6 rounded-full grid place-content-center flex-none"
                  style={{ background: colors.light, color: colors.text }}
                >
                  <Icon width={12} height={12} />
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: colors.text }}>
                  {group}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onMouseEnter={(e) => handleEnter(e.currentTarget, colors.solid)}
                    onMouseLeave={(e) => handleLeave(e.currentTarget)}
                    onClick={(e) => handleClick(e.currentTarget, item.query)}
                    className="fs-chip cursor-pointer rounded-full px-3.5 py-1.5 text-[12.5px] font-medium"
                    style={{
                      background: colors.light,
                      color: colors.text,
                      border: `1px solid color-mix(in srgb, ${colors.solid} 30%, transparent)`,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RemoveFiltersButton({ onClick }: { onClick: () => void }) {
  const rootRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(rootRef.current, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2)" });
    },
    { scope: rootRef }
  );

  const handleEnter = contextSafe(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(rootRef.current, { scale: 1.05, duration: 0.2, ease: "power2.out" });
    gsap.to(rootRef.current?.querySelector(".remove-filters-icon") ?? [], { rotate: 90, duration: 0.3, ease: "back.out(2.4)" });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(rootRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
    gsap.to(rootRef.current?.querySelector(".remove-filters-icon") ?? [], { rotate: 0, duration: 0.25, ease: "power2.out" });
  });

  const handleClick = contextSafe(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(rootRef.current, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.55)" });
    }
    onClick();
  });

  return (
    <button
      ref={rootRef}
      type="button"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className="cb-reveal inline-flex items-center gap-1.5 cursor-pointer rounded-full pl-3 pr-3.5 py-2 text-[13.5px] font-semibold transition-colors duration-200"
      style={{
        background: "color-mix(in srgb, var(--color-danger, #d92d20) 10%, var(--color-surface))",
        color: "var(--color-danger, #d92d20)",
        border: "1px solid color-mix(in srgb, var(--color-danger, #d92d20) 28%, transparent)",
      }}
    >
      <XIcon className="remove-filters-icon" width={14} height={14} strokeWidth={2.5} />
      Remove filters
    </button>
  );
}

export function CourseBrowser({
  courses,
  subjects,
}: {
  courses: CourseRaw[];
  subjects: SubjectListing[];
}) {
  const router = useRouter();
  const [category, setCategory] = useState<string>(ALL);
  const activeBand = GRADE_BANDS.find((b) => b.label === category) ?? null;
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Most popular");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [savePending, setSavePending] = useState<Set<string>>(new Set());
  const [savedSubjects, setSavedSubjects] = useState<Set<string>>(new Set());
  const [saveSubjectPending, setSaveSubjectPending] = useState<Set<string>>(new Set());
  const [requested, setRequested] = useState<Set<string>>(new Set());
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const [requestedSubjects, setRequestedSubjects] = useState<Set<string>>(new Set());
  const [requestingSubjectId, setRequestingSubjectId] = useState<string | null>(null);

  // The page itself no longer reads the `?category=` URL param or the signed-in
  // user's saved/requested state server-side (both used to force /courses to be
  // dynamically re-rendered, uncached, on every request). Pick both up here once,
  // right after mount, instead — this is what keeps the page's own SSR/static
  // shell (the actual course cards) free of any per-request or per-user work.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get("category");
    if (urlCategory) setCategory(urlCategory);

    let cancelled = false;
    fetch("/api/me/course-state")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setSaved(new Set(data.savedCourseIds));
        setRequested(new Set(data.requestedCourseIds));
        setSavedSubjects(new Set(data.savedSubjectIds));
        setRequestedSubjects(new Set(data.requestedSubjectIds));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
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

  // Subjects only browse inside a grade band by default (matching the "Grade 6-8"
  // style category cards). But a free-text search should also surface matching
  // subjects even with no band selected — otherwise typing e.g. "Biology" (a
  // subject, not a top-level course) came back empty despite existing on the site.
  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!activeBand && !q) return [];
    let list = subjects.filter((s) => {
      if (activeBand && !matchesGradeBand(s.gradeLevel, activeBand)) return false;
      if (q && !s.name.toLowerCase().includes(q) && !(s.curriculum ?? "").toLowerCase().includes(q)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Lowest price") return (a.hourlyRateCents ?? Infinity) - (b.hourlyRateCents ?? Infinity);
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [subjects, activeBand, query, sort]);

  const isDefaultView = category === ALL && !activeBand && query.trim() === "";
  const isSearchAll = category === ALL && !activeBand && query.trim() !== "";

  const featuredSubjects = useMemo(() => {
    return FEATURED_SUBJECT_NAMES.map((name) => subjects.find((s) => s.name === name)).filter(
      (s): s is SubjectListing => s != null
    );
  }, [subjects]);

  const featuredCourses = useMemo(() => {
    return FEATURED_COURSE_TITLES.map((title) => courses.find((c) => c.title === title)).filter(
      (c): c is CourseRaw => c != null
    );
  }, [courses]);

  function bandForSubject(subject: SubjectListing) {
    return GRADE_BANDS.find((b) => matchesGradeBand(subject.gradeLevel, b)) ?? GRADE_BANDS[GRADE_BANDS.length - 1];
  }

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
      <div ref={filterBarRef} className="flex flex-col gap-5 mb-6">
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

        <CourseSearchBox
          subjects={subjects}
          featured={featuredSubjects}
          value={query}
          onQueryChange={(q) => {
            captureFlip();
            setQuery(q);
          }}
        />

        <div className="cb-reveal flex items-center justify-end gap-3">
          <select
            className="input w-auto transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
            style={{ boxShadow: "var(--shadow-sm)" }}
            value={activeBand && sort === "Highest rated" ? "Most popular" : sort}
            onChange={(e) => {
              captureFlip();
              setSort(e.target.value as (typeof SORTS)[number]);
            }}
          >
            {SORTS.filter((s) => !activeBand || s !== "Highest rated").map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {!isDefaultView && (
            <RemoveFiltersButton
              onClick={() => {
                captureFlip();
                setCategory(ALL);
                setQuery("");
              }}
            />
          )}
        </div>
      </div>

      {isDefaultView && (
        <FrequentlySearched
          onPick={(q) => {
            captureFlip();
            setQuery(q);
          }}
        />
      )}

      <p className="text-[14px] mb-4" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        {isDefaultView
          ? "Popular subjects and courses to get you started"
          : activeBand
            ? `Showing ${filteredSubjects.length} subject${filteredSubjects.length === 1 ? "" : "s"} for ${activeBand.label}`
            : isSearchAll
              ? `Showing ${filteredSubjects.length + filtered.length} result${filteredSubjects.length + filtered.length === 1 ? "" : "s"} for "${query.trim()}"`
              : `Showing ${filtered.length} course${filtered.length === 1 ? "" : "s"}`}
      </p>

      <div ref={gridRef}>
        {isDefaultView ? (
          <div className="flex flex-col gap-10">
            {featuredSubjects.length > 0 && (
              <div>
                <h2 className="text-[18px] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Popular subjects
                </h2>
                <div
                  className="relative grid gap-6 items-start"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
                >
                  {featuredSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      band={bandForSubject(subject)}
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
              </div>
            )}
            {featuredCourses.length > 0 && (
              <div>
                <h2 className="text-[18px] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Popular programming courses
                </h2>
                <div
                  className="relative grid gap-6 items-start"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
                >
                  {featuredCourses.map((course) => (
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
              </div>
            )}
          </div>
        ) : activeBand ? (
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
        ) : isSearchAll ? (
          filteredSubjects.length > 0 || filtered.length > 0 ? (
            <div className="flex flex-col gap-10">
              {filteredSubjects.length > 0 && (
                <div>
                  <h2 className="text-[18px] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Subjects
                  </h2>
                  <div
                    className="relative grid gap-6 items-start"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
                  >
                    {filteredSubjects.map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        band={bandForSubject(subject)}
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
                </div>
              )}
              {filtered.length > 0 && (
                <div>
                  <h2 className="text-[18px] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Courses
                  </h2>
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
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-[var(--radius-lg)] p-8 text-center" style={{ background: "var(--color-accent-2-100)" }}>
              <h3 className="text-[22px]">No subjects or courses match &ldquo;{query.trim()}&rdquo;</h3>
              <p className="text-[15px] mx-auto mt-2.5 mb-0 max-w-[44ch]" style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>
                Try a different search term.
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
      {openSubject && (
        <SubjectDetailModal
          subject={openSubject}
          band={activeBand ?? bandForSubject(openSubject)}
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

"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CourseIllustration, CATEGORY_COLORS } from "@/components/courses/course-illustrations";
import { ClockIcon, LayersIcon, BarChartIcon, HeartIcon, SendIcon, CheckIcon } from "@/components/courses/course-icons";
import { priceLabel, type CourseRaw } from "@/lib/mock-courses";
import { usePlaneLaunch } from "@/components/ui/plane-launch";

gsap.registerPlugin(useGSAP);

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function CourseBadge({ tone, children }: { tone: "gold" | "navy" | "green"; children: ReactNode }) {
  const style =
    tone === "gold"
      ? { background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-600))", color: "var(--color-accent-2-900)" }
      : tone === "navy"
      ? { background: "var(--color-accent-2-800)", color: "var(--color-accent-300)" }
      : { background: "var(--color-verified)", color: "#fff" };
  return (
    <span className="text-[10px] font-bold px-2 py-1 rounded-full shadow-sm" style={style}>
      {children}
    </span>
  );
}

export function CourseCard({
  course,
  saved,
  savePending = false,
  requested,
  requestPending,
  onToggleSaved,
  onRequest,
  onOpen,
}: {
  course: CourseRaw;
  saved: boolean;
  savePending?: boolean;
  requested: boolean;
  requestPending: boolean;
  onToggleSaved: (course: CourseRaw) => void;
  onRequest: (course: CourseRaw) => void;
  onOpen: (course: CourseRaw) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const hasDiscount = course.priceCents != null && course.originalPriceCents != null;
  const discountPct = hasDiscount
    ? Math.round((1 - course.priceCents! / course.originalPriceCents!) * 100)
    : 0;
  const primaryPrice =
    course.priceCents != null
      ? `${priceLabel(course.priceCents)}/hr`
      : course.originalPriceCents != null
      ? `${priceLabel(course.originalPriceCents)} full course`
      : "Price on request";
  const launchPlane = usePlaneLaunch();
  const colors = CATEGORY_COLORS[course.category];
  const firstSaveRender = useRef(true);

  const { contextSafe } = useGSAP({ scope: rootRef });

  const openFlyout = contextSafe(() => {
    if (!canHover()) return;
    setHovered(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(rootRef.current);
    if (reduced) {
      gsap.set(rootRef.current, { zIndex: 20 });
      gsap.set(flyoutRef.current, { autoAlpha: 1, y: 0, scale: 1 });
      return;
    }
    gsap.set(rootRef.current, { zIndex: 20 });
    gsap.to(rootRef.current, { y: -6, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      flyoutRef.current,
      { autoAlpha: 0, y: -6, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out" }
    );
    gsap.to(thumbRef.current, { scale: 1.08, rotate: 1.5, duration: 0.4, ease: "power2.out" });
  });

  const closeFlyout = contextSafe(() => {
    if (!canHover()) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(rootRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
    if (reduced) {
      setHovered(false);
      gsap.set(rootRef.current, { zIndex: 1 });
      return;
    }
    gsap.to(flyoutRef.current, {
      autoAlpha: 0,
      y: -6,
      scale: 0.97,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setHovered(false);
        gsap.set(rootRef.current, { zIndex: 1 });
      },
    });
    gsap.to(thumbRef.current, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
  });

  useGSAP(
    () => {
      if (firstSaveRender.current) {
        firstSaveRender.current = false;
        return;
      }
      if (!saved || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        rootRef.current?.querySelectorAll(".save-heart-btn") ?? [],
        { scale: 1.35 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }
      );
    },
    { scope: rootRef, dependencies: [saved] }
  );

  return (
    <div
      ref={rootRef}
      className="course-card group relative"
      style={{ zIndex: 1 }}
      onMouseEnter={openFlyout}
      onMouseLeave={closeFlyout}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(course)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(course);
          }
        }}
        className="card elev-sm relative cursor-pointer p-0 overflow-hidden gap-0 h-full flex flex-col border transition-shadow duration-300 ease-out"
        style={{
          borderColor: "var(--color-divider)",
          boxShadow: "var(--shadow-sm)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 18px 36px -16px color-mix(in srgb, ${colors.solid} 45%, transparent), var(--shadow-md)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        }}
      >
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${colors.light} 0%, color-mix(in srgb, ${colors.solid} 14%, ${colors.light}) 100%)`,
          }}
        >
          <span
            className="pointer-events-none absolute rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"
            style={{ width: 130, height: 130, background: colors.solid, top: "18%", left: "28%" }}
            aria-hidden
          />
          <div ref={thumbRef} className="relative w-full h-full">
            <CourseIllustration category={course.category} className="w-full h-full" />
          </div>
          {/* diagonal sheen sweep */}
          <span
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
            aria-hidden
          />
          {/* bottom fade blending into card body */}
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
            style={{ background: "linear-gradient(to bottom, transparent, var(--color-surface))" }}
            aria-hidden
          />
          {hasDiscount && discountPct > 0 && (
            <span
              className="absolute top-2.5 left-2.5 text-[11px] font-bold px-2 py-1 rounded-full shadow-sm"
              style={{ background: "linear-gradient(135deg, var(--color-accent-500), var(--color-accent-700))", color: "#fff" }}
            >
              -{discountPct}%
            </span>
          )}
          <button
            type="button"
            aria-label={saved ? `Remove ${course.title} from wishlist` : `Save ${course.title} to wishlist`}
            aria-pressed={saved}
            disabled={savePending}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSaved(course);
            }}
            className="save-heart-btn absolute top-2.5 right-2.5 grid place-content-center rounded-full cursor-pointer backdrop-blur-sm transition-[color,background-color,transform] duration-150 hover:scale-110"
            style={{
              width: 34,
              height: 34,
              background: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
              color: saved ? "#d92d20" : "var(--color-text)",
              opacity: savePending ? 0.6 : 1,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <HeartIcon width={16} height={16} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 p-4 flex-1">
          {(course.bestseller || course.premium || course.isNew) && (
            <div className="flex gap-1.5 flex-wrap mb-0.5">
              {course.bestseller && <CourseBadge tone="gold">Bestseller</CourseBadge>}
              {course.premium && <CourseBadge tone="navy">Premium</CourseBadge>}
              {course.isNew && <CourseBadge tone="green">New</CourseBadge>}
            </div>
          )}
          <h3 className="text-[15.5px] leading-snug line-clamp-2 m-0" style={{ fontFamily: "var(--font-heading)" }}>
            <Link
              href={`/courses/${course.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline"
            >
              {course.title}
            </Link>
          </h3>
          {course.instructor && (
            <p className="text-[12.5px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
              {course.instructor}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-[12.5px]">
            <span style={{ color: "var(--color-accent-700)", fontWeight: 700 }}>{course.rating.toFixed(1)}</span>
            <StarRating rating={course.rating} size={12} />
            <span style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
              ({course.reviews.toLocaleString()})
            </span>
          </div>
          <div
            className="flex items-center gap-1 mt-auto pt-1 font-[var(--font-heading)]"
            style={{ color: "var(--color-text)" }}
          >
            <span className="text-[18px] font-bold" style={{ color: "var(--color-accent-700)" }}>
              {primaryPrice}
            </span>
            {hasDiscount && (
              <span
                className="text-[13px] font-[var(--font-body)] line-through"
                style={{ color: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}
              >
                {priceLabel(course.originalPriceCents!)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        ref={flyoutRef}
        className="absolute left-0 top-0 w-full card elev-lg p-4 flex flex-col gap-3 overflow-hidden"
        style={{
          background: "var(--color-bg)",
          opacity: 0,
          visibility: "hidden",
          pointerEvents: hovered ? "auto" : "none",
        }}
        onClick={() => onOpen(course)}
      >
        <span
          className="pointer-events-none absolute top-0 left-6 right-6 h-[3px] rounded-full opacity-80"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-400), transparent)" }}
          aria-hidden
        />
        <h3 className="text-[16px] leading-snug m-0" style={{ fontFamily: "var(--font-heading)" }}>
          {course.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[11.5px] flex-wrap font-medium">
          {course.durationHours != null && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-1"
              style={{ background: colors.light, color: colors.text }}
            >
              <ClockIcon width={12} height={12} />
              {course.durationHours}h
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1" style={{ background: colors.light, color: colors.text }}>
            <LayersIcon width={12} height={12} />
            {course.lectureCount != null ? `${course.lectureCount} lectures` : course.lectureCountLabel ?? "Flexible"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1" style={{ background: colors.light, color: colors.text }}>
            <BarChartIcon width={12} height={12} />
            {course.level}
          </span>
        </div>
        {course.whatYoullLearn.length > 0 && (
          <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
            {course.whatYoullLearn.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-[12.5px] leading-snug">
                <CheckIcon width={13} height={13} className="flex-none mt-0.5" style={{ color: "var(--color-verified)" }} />
                <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{item}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-2 mt-1">
          <button
            type="button"
            className="btn btn-primary flex-1 relative overflow-hidden"
            disabled={requestPending || requested}
            onClick={(e) => {
              e.stopPropagation();
              launchPlane(e.currentTarget);
              onRequest(course);
            }}
          >
            <span
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/35 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
              aria-hidden
            />
            {requested ? (
              <>
                <CheckIcon width={15} height={15} />
                Request sent
              </>
            ) : requestPending ? (
              "Sending…"
            ) : (
              <>
                <SendIcon width={15} height={15} />
                Send Request
              </>
            )}
          </button>
          <button
            type="button"
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            aria-pressed={saved}
            disabled={savePending}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSaved(course);
            }}
            className="save-heart-btn grid place-content-center rounded-full cursor-pointer transition-[color,background-color,transform] duration-150 hover:scale-110"
            style={{
              width: 40,
              height: 40,
              color: saved ? "#d92d20" : "var(--color-text)",
              border: "1px solid color-mix(in srgb, var(--color-text) 18%, transparent)",
              opacity: savePending ? 0.6 : 1,
            }}
          >
            <HeartIcon width={16} height={16} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
        <span
          className="text-[11px] text-center"
          style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
        >
          {hasDiscount ? `${discountPct}% off · ` : ""}
          {primaryPrice}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CourseIllustration } from "@/components/courses/course-illustrations";
import { ClockIcon, LayersIcon, BarChartIcon, HeartIcon, SendIcon, CheckIcon } from "@/components/courses/course-icons";
import { priceLabel, type CourseRaw } from "@/lib/mock-courses";
import { usePlaneLaunch } from "@/components/ui/plane-launch";

gsap.registerPlugin(useGSAP);

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
  const discountPct = Math.round((1 - course.priceCents / course.originalPriceCents) * 100);
  const launchPlane = usePlaneLaunch();

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
    gsap.fromTo(
      flyoutRef.current,
      { autoAlpha: 0, y: -6, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out" }
    );
    gsap.to(thumbRef.current, { scale: 1.04, duration: 0.35, ease: "power2.out" });
  });

  const closeFlyout = contextSafe(() => {
    if (!canHover()) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    gsap.to(thumbRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
  });

  return (
    <div
      ref={rootRef}
      className="course-card relative"
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
        className="card elev-sm relative cursor-pointer p-0 overflow-hidden gap-0 h-full flex flex-col border transition-shadow duration-200 ease-out hover:shadow-[var(--shadow-lg)]"
        style={{ borderColor: "var(--color-divider)" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "var(--color-neutral-100)" }}>
          <div ref={thumbRef} className="w-full h-full">
            <CourseIllustration category={course.category} className="w-full h-full" />
          </div>
          {discountPct > 0 && (
            <span
              className="absolute top-2.5 left-2.5 text-[11px] font-bold px-2 py-1 rounded-full"
              style={{ background: "var(--color-accent-700)", color: "#fff" }}
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
            className="absolute top-2.5 right-2.5 grid place-content-center rounded-full cursor-pointer transition-[color,background-color,transform] duration-150 hover:scale-110"
            style={{
              width: 34,
              height: 34,
              background: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
              color: saved ? "#d92d20" : "var(--color-text)",
              opacity: savePending ? 0.6 : 1,
            }}
          >
            <HeartIcon width={16} height={16} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 p-4 flex-1">
          {(course.bestseller || course.premium || course.isNew) && (
            <div className="flex gap-1.5 flex-wrap mb-0.5">
              {course.bestseller && (
                <Tag variant="accent" className="text-[10px] px-2 py-0.5 font-semibold">
                  Bestseller
                </Tag>
              )}
              {course.premium && (
                <Tag variant="accent-2" className="text-[10px] px-2 py-0.5 font-semibold">
                  Premium
                </Tag>
              )}
              {course.isNew && (
                <Tag variant="success" className="text-[10px] px-2 py-0.5 font-semibold">
                  New
                </Tag>
              )}
            </div>
          )}
          <h3 className="text-[15.5px] leading-snug line-clamp-2 m-0" style={{ fontFamily: "var(--font-heading)" }}>
            {course.title}
          </h3>
          <p className="text-[12.5px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
            {course.instructor}
          </p>
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
            <span className="text-[17px]">{priceLabel(course.priceCents)}</span>
            <span
              className="text-[13px] font-[var(--font-body)] line-through"
              style={{ color: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}
            >
              {priceLabel(course.originalPriceCents)}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={flyoutRef}
        className="absolute left-0 top-0 w-full card elev-lg p-4 flex flex-col gap-3"
        style={{
          background: "var(--color-bg)",
          opacity: 0,
          visibility: "hidden",
          pointerEvents: hovered ? "auto" : "none",
        }}
        onClick={() => onOpen(course)}
      >
        <h3 className="text-[16px] leading-snug m-0" style={{ fontFamily: "var(--font-heading)" }}>
          {course.title}
        </h3>
        <div className="flex items-center gap-2 text-[12px] flex-wrap" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
          <span className="inline-flex items-center gap-1">
            <ClockIcon width={13} height={13} />
            {course.durationHours}h
          </span>
          <span className="inline-flex items-center gap-1">
            <LayersIcon width={13} height={13} />
            {course.lectureCount} lectures
          </span>
          <span className="inline-flex items-center gap-1">
            <BarChartIcon width={13} height={13} />
            {course.level}
          </span>
        </div>
        <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
          {course.whatYoullLearn.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-[12.5px] leading-snug">
              <CheckIcon width={13} height={13} className="flex-none mt-0.5" style={{ color: "var(--color-verified)" }} />
              <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 mt-1">
          <button
            type="button"
            className="btn btn-primary flex-1"
            disabled={requestPending || requested}
            onClick={(e) => {
              e.stopPropagation();
              launchPlane(e.currentTarget);
              onRequest(course);
            }}
          >
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
            className="grid place-content-center rounded-full cursor-pointer transition-[color,background-color,transform] duration-150 hover:scale-110"
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
          {discountPct}% off · {priceLabel(course.priceCents)}
        </span>
      </div>
    </div>
  );
}

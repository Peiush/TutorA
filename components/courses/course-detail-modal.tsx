"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CourseIllustration } from "@/components/courses/course-illustrations";
import { ClockIcon, LayersIcon, BarChartIcon, HeartIcon, SendIcon, CheckIcon, XIcon } from "@/components/courses/course-icons";
import { priceLabel, priceLabelUSD, learningOutcomes, type CourseRaw } from "@/lib/mock-courses";

gsap.registerPlugin(useGSAP);

export function CourseDetailModal({
  course,
  saved,
  savePending = false,
  requested,
  requestPending,
  onToggleSaved,
  onRequest,
  onClose,
}: {
  course: CourseRaw;
  saved: boolean;
  savePending?: boolean;
  requested: boolean;
  requestPending: boolean;
  onToggleSaved: (course: CourseRaw) => void;
  onRequest: (course: CourseRaw, origin: HTMLElement | null) => void;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasDiscount = course.priceCents != null && course.originalPriceCents != null;
  const discountPct = hasDiscount
    ? Math.round((1 - course.priceCents! / course.originalPriceCents!) * 100)
    : 0;
  const primaryPrice =
    course.priceCents != null
      ? `${priceLabelUSD(course.priceCents)}/hr`
      : course.originalPriceCents != null
      ? `${priceLabelUSD(course.originalPriceCents)} full course`
      : "Price on request";

  const { contextSafe } = useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(overlayRef.current, { autoAlpha: 1 });
        gsap.set(panelRef.current, { autoAlpha: 1, scale: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "power2.out" })
        .fromTo(
          panelRef.current,
          { autoAlpha: 0, scale: 0.86, y: 26 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" },
          "-=0.1"
        )
        .fromTo(
          panelRef.current?.querySelectorAll(".cdetail-stagger") ?? [],
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" },
          "-=0.2"
        );
    },
    { scope: overlayRef }
  );

  const closeAnimated = contextSafe(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onClose();
      return;
    }
    gsap.to(panelRef.current, { autoAlpha: 0, scale: 0.92, y: 14, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.22, ease: "power2.in", onComplete: onClose });
  });

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center p-5 overflow-y-auto"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeAnimated();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") closeAnimated();
      }}
    >
      <div
        ref={panelRef}
        className="card elev-lg gap-4 w-full max-w-[560px] my-4 relative p-0 max-h-[94vh]"
        style={{ background: "var(--color-bg)", overflowY: "auto", overflowX: "hidden" }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={closeAnimated}
          className="absolute grid place-content-center cursor-pointer rounded-full z-10"
          style={{
            top: 14,
            right: 14,
            width: 30,
            height: 30,
            background: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
            color: "var(--color-text)",
          }}
        >
          <XIcon width={14} height={14} strokeWidth={2.5} />
        </button>

        <div className="cdetail-stagger relative h-[130px]" style={{ background: "var(--color-neutral-100)" }}>
          <CourseIllustration category={course.category} className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-2.5 px-6 pb-4">
          <div className="cdetail-stagger">
            {(course.bestseller || course.premium || course.isNew) && (
              <div className="flex gap-1.5 flex-wrap mb-1.5">
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
            <h2 className="text-[19px] leading-snug mb-1">{course.title}</h2>
            <p className="text-[13px] m-0 line-clamp-1" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
              {course.subtitle}
            </p>
          </div>

          <div className="cdetail-stagger flex items-center gap-3 text-[13px] flex-wrap" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
            {course.instructor && (
              <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>By {course.instructor}</span>
            )}
            {course.reviews > 0 ? (
              <span className="inline-flex items-center gap-1">
                <span style={{ color: "var(--color-accent-700)", fontWeight: 700 }}>{course.rating.toFixed(1)}</span>
                <StarRating rating={course.rating} size={12} />
                <span>({course.reviews.toLocaleString()})</span>
              </span>
            ) : (
              <span>No reviews yet</span>
            )}
            {course.durationHours != null && (
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon width={13} height={13} />
                {course.durationHours}h
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <LayersIcon width={13} height={13} />
              {course.lectureCount != null ? `${course.lectureCount} lectures` : course.lectureCountLabel ?? "Flexible"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BarChartIcon width={13} height={13} />
              {course.level}
            </span>
          </div>

          {learningOutcomes(course).length > 0 && (
            <div
              className="cdetail-stagger rounded-[var(--radius-md)] p-3"
              style={{ background: "var(--color-surface)" }}
            >
              <div className="text-[12.5px] font-semibold mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                What you&rsquo;ll learn
              </div>
              <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
                {learningOutcomes(course).map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[13px] leading-snug">
                    <CheckIcon width={14} height={14} className="flex-none mt-0.5" style={{ color: "var(--color-verified)" }} />
                    <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="cdetail-stagger flex items-center gap-3 flex-wrap">
            <div className="flex items-baseline gap-2 font-[var(--font-heading)]">
              <span className="text-[26px]">{primaryPrice}</span>
              {hasDiscount && (
                <span
                  className="text-[15px] font-[var(--font-body)] line-through"
                  style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}
                >
                  {priceLabel(course.originalPriceCents!)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <Tag variant="success" className="text-[11px] px-2.5 py-1">
                {discountPct}% off
              </Tag>
            )}
          </div>

          <div className="cdetail-stagger flex items-center gap-2">
            <button
              type="button"
              className="btn btn-primary flex-1"
              disabled={requestPending || requested}
              onClick={(e) => {
                onRequest(course, e.currentTarget);
              }}
            >
              {requested ? (
                <>
                  <CheckIcon width={16} height={16} />
                  Request sent
                </>
              ) : requestPending ? (
                "Sending…"
              ) : (
                <>
                  <SendIcon width={16} height={16} />
                  Send Request
                </>
              )}
            </button>
            <button
              type="button"
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              aria-pressed={saved}
              disabled={savePending}
              onClick={() => onToggleSaved(course)}
              className="grid place-content-center rounded-full cursor-pointer transition-colors duration-150"
              style={{
                width: 44,
                height: 44,
                opacity: savePending ? 0.6 : 1,
                color: saved ? "#d92d20" : "var(--color-text)",
                border: "1px solid color-mix(in srgb, var(--color-text) 18%, transparent)",
              }}
            >
              <HeartIcon width={18} height={18} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="cdetail-stagger text-[13px] text-center font-medium hover:underline"
            style={{ color: "var(--color-accent-700)" }}
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

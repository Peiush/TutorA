"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SubjectIllustration } from "@/components/courses/subject-illustration";
import { ClockIcon, HeartIcon, SendIcon, CheckIcon, XIcon } from "@/components/courses/course-icons";
import { priceLabelUSD } from "@/lib/mock-courses";
import { GRADE_BAND_COLORS, type GradeBand } from "@/lib/grade-bands";
import type { SubjectListing } from "@/app/lib/subject-listings";

gsap.registerPlugin(useGSAP);

export function SubjectDetailModal({
  subject,
  band,
  saved,
  savePending = false,
  requested,
  requestPending,
  onToggleSaved,
  onRequest,
  onClose,
}: {
  subject: SubjectListing;
  band: GradeBand;
  saved: boolean;
  savePending?: boolean;
  requested: boolean;
  requestPending: boolean;
  onToggleSaved: (subject: SubjectListing) => void;
  onRequest: (subject: SubjectListing, origin: HTMLElement | null) => void;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const colors = GRADE_BAND_COLORS[band.key];
  const title = subject.title ?? subject.name;
  const price = subject.hourlyRateCents != null ? `${priceLabelUSD(subject.hourlyRateCents)}/hr` : "Price on request";

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
          panelRef.current?.querySelectorAll(".sdetail-stagger") ?? [],
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="subject-detail-modal-title"
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

        <div className="sdetail-stagger relative h-[130px]" style={{ background: "var(--color-neutral-100)" }}>
          <SubjectIllustration tone={colors} className="w-full h-full" />
          <span
            className="absolute top-3 left-3 text-[11px] font-bold px-2 py-1 rounded-full shadow-sm"
            style={{ background: colors.solid, color: "#fff" }}
          >
            {band.label}
          </span>
        </div>

        <div className="flex flex-col gap-2.5 px-6 pb-4">
          <div className="sdetail-stagger">
            {(subject.curriculum || subject.gradeLevel) && (
              <div className="flex gap-1.5 flex-wrap mb-1.5">
                {subject.curriculum && (
                  <span
                    className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                    style={{ background: colors.light, color: colors.text }}
                  >
                    {subject.curriculum}
                  </span>
                )}
                {subject.gradeLevel && (
                  <span
                    className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                    style={{ background: "var(--color-accent-100)", color: "var(--color-accent-800)" }}
                  >
                    {subject.gradeLevel}
                  </span>
                )}
              </div>
            )}
            <h2 id="subject-detail-modal-title" className="text-[19px] leading-snug mb-1">{title}</h2>
            {subject.subtitle && (
              <p className="text-[13px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                {subject.subtitle}
              </p>
            )}
          </div>

          {subject.durationLabel && (
            <div
              className="sdetail-stagger flex items-center gap-3 text-[13px] flex-wrap"
              style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon width={13} height={13} />
                {subject.durationLabel}
              </span>
            </div>
          )}

          {subject.whatYoullLearn.length > 0 && (
            <div className="sdetail-stagger rounded-[var(--radius-md)] p-3" style={{ background: "var(--color-surface)" }}>
              <div className="text-[12.5px] font-semibold mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                What you&rsquo;ll learn
              </div>
              <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
                {subject.whatYoullLearn.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[13px] leading-snug">
                    <CheckIcon width={14} height={14} className="flex-none mt-0.5" style={{ color: "var(--color-verified)" }} />
                    <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sdetail-stagger flex items-center gap-3 flex-wrap">
            <div className="flex items-baseline gap-2 font-[var(--font-heading)]">
              <span className="text-[26px]">{price}</span>
            </div>
          </div>

          <div className="sdetail-stagger flex items-center gap-2">
            <button
              type="button"
              className="btn btn-primary flex-1"
              disabled={requestPending || requested}
              onClick={(e) => {
                onRequest(subject, e.currentTarget);
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
              onClick={() => onToggleSaved(subject)}
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
            href={`/subjects/${subject.slug}`}
            className="sdetail-stagger text-[13px] text-center font-medium hover:underline"
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

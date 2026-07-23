"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { SubjectIcon } from "@/components/ui/subject-icons";
import type { TutorRaw } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP);

export function TutorDetailModal({
  tutor,
  index,
  isTopRated,
  pending,
  requested,
  onClose,
  onRequest,
}: {
  tutor: TutorRaw;
  index: number;
  isTopRated: boolean;
  pending: boolean;
  requested: boolean;
  onClose: () => void;
  onRequest: (t: TutorRaw, origin: HTMLElement | null) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
          panelRef.current?.querySelectorAll(".detail-stagger") ?? [],
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
      className="fixed inset-0 z-50 flex items-center justify-center p-5 overflow-y-auto"
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
        className="card elev-lg gap-4 w-full max-w-[480px] my-8 relative"
        style={{ background: "var(--color-bg)" }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={closeAnimated}
          className="absolute grid place-content-center cursor-pointer rounded-full"
          style={{
            top: 14,
            right: 14,
            width: 30,
            height: 30,
            background: "var(--color-surface)",
            color: "var(--color-text)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="detail-stagger flex gap-3.5 items-center pr-8">
          <TutorAvatar name={tutor.name} index={index} size={72} withBadge />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-[var(--font-heading)] text-[21px]">{tutor.name}</span>
            </div>
            <div
              className="text-[13.5px] mt-0.5"
              style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
            >
              {tutor.meta}
            </div>
            <div className="flex gap-1.5 flex-wrap mt-1.5">
              {isTopRated && (
                <Tag variant="accent" className="text-[10px] px-2 py-0.5">
                  Top rated
                </Tag>
              )}
              {tutor.isNew && tutor.reviews > 0 && (
                <Tag variant="accent-2" className="text-[10px] px-2 py-0.5">
                  New
                </Tag>
              )}
            </div>
          </div>
        </div>

        <div className="detail-stagger flex justify-between items-center text-[13.5px] flex-wrap gap-2">
          {tutor.onDemand ? (
            <span style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>No tutor assigned yet</span>
          ) : tutor.reviews > 0 ? (
            <span className="flex items-center gap-1.5">
              <StarRating rating={tutor.rating} size={15} />
              <span style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                {tutor.rating.toFixed(1)} ({tutor.reviews} reviews)
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1" style={{ color: "var(--color-verified)", fontWeight: 600 }}>
              <VerifiedBadge size={13} />
              Newly verified
            </span>
          )}
          <span className="font-[var(--font-heading)] text-[19px]">
            {/\d/.test(tutor.price) ? (
              <>
                {tutor.price.replace(/\s*\/\s*hr\s*$/i, "")}
                <span className="text-[13px] font-[var(--font-body)] font-normal" style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                  /hr
                </span>
              </>
            ) : (
              tutor.price
            )}
          </span>
        </div>

        <div className="detail-stagger flex flex-col gap-1.5 text-[13.5px]" style={{ color: "var(--color-text)" }}>
          {tutor.languages && tutor.languages.length > 0 && (
            <div className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-2-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
              </svg>
              <span>Speaks {tutor.languages.join(", ")}</span>
            </div>
          )}
        </div>

        <div className="detail-stagger flex flex-wrap gap-1.5">
          {tutor.subjects.map((s) => (
            <Tag key={s} variant="neutral" className="inline-flex items-center gap-1">
              <SubjectIcon subject={s} />
              {s}
            </Tag>
          ))}
        </div>

        {tutor.bio && (
          <p
            className="detail-stagger text-[13.5px] leading-relaxed m-0"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            {tutor.bio}
          </p>
        )}

        <button
          type="button"
          className="detail-stagger btn btn-primary btn-block mt-1"
          disabled={pending || requested}
          onClick={(e) => {
            onRequest(tutor, e.currentTarget);
          }}
        >
          {requested ? (
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Request sent
            </span>
          ) : pending ? (
            "Sending…"
          ) : (
            "Request This Tutor"
          )}
        </button>
      </div>
    </div>,
    document.body
  );
}

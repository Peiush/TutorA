"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import type { TestimonialItem } from "@/app/lib/testimonials";

gsap.registerPlugin(useGSAP);

const ROLE_LABEL: Record<string, string> = { PARENT: "Parent", STUDENT: "Student", TUTOR: "Tutor" };

export function TestimonialQuoteModal({
  testimonial,
  avatarIndex,
  accentColor,
  originRect,
  onClose,
}: {
  testimonial: TestimonialItem;
  avatarIndex: number;
  accentColor: string;
  originRect: DOMRect | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const overlay = overlayRef.current;
      const panel = panelRef.current;

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.to(overlay, { autoAlpha: 1, duration: reduced ? 0.01 : 0.25, ease: "power2.out" });

      if (reduced || !panel) {
        gsap.set(panel, { autoAlpha: 1, scale: 1, y: 0 });
        return;
      }

      let originX = "50%";
      let originY = "50%";
      if (originRect) {
        originX = `${originRect.left + originRect.width / 2}px`;
        originY = `${originRect.top + originRect.height / 2}px`;
      }

      gsap.fromTo(
        panel,
        { autoAlpha: 0, scale: 0.9, y: 18 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "back.out(1.6)",
          transformOrigin: `${originX} ${originY}`,
        }
      );

      gsap.fromTo(
        ".tqm-stagger",
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, delay: 0.1, stagger: 0.05, ease: "power2.out" }
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
    gsap.to(panelRef.current, { autoAlpha: 0, scale: 0.94, y: 10, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.22, ease: "power2.in", onComplete: onClose });
  });

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center p-5 overflow-y-auto"
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
        className="card elev-lg w-full max-w-[520px] my-8 relative overflow-hidden"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="h-[5px] w-full flex-none absolute top-0 left-0" style={{ background: accentColor }} aria-hidden />

        <button
          type="button"
          aria-label="Close"
          onClick={closeAnimated}
          className="absolute grid place-content-center cursor-pointer rounded-full z-10"
          style={{
            top: 16,
            right: 16,
            width: 34,
            height: 34,
            background: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
            color: "var(--color-text)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-5 px-7 pt-9 pb-7">
          <span
            className="tqm-stagger"
            aria-hidden
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 44,
              lineHeight: 0.5,
              display: "inline-block",
              color: accentColor,
            }}
          >
            &ldquo;
          </span>

          <p
            className="tqm-stagger font-[var(--font-heading)] text-[18px] leading-[1.6] m-0"
            style={{ color: "var(--color-text)" }}
          >
            {testimonial.quote}
          </p>

          {!!testimonial.rating && (
            <div className="tqm-stagger">
              <StarRating rating={testimonial.rating} size={15} />
            </div>
          )}

          <div className="tqm-stagger flex items-center gap-2.5 pt-1">
            <div className="rounded-full" style={{ boxShadow: `0 0 0 3px color-mix(in srgb, ${accentColor} 22%, transparent)`, borderRadius: "50%" }}>
              <TutorAvatar name={testimonial.name} index={avatarIndex} size={42} />
            </div>
            <div className="min-w-0">
              <div className="text-[14.5px] font-semibold" style={{ color: "var(--color-text)" }}>
                {testimonial.name}
              </div>
              <Tag
                variant={accentColor === "var(--color-accent-2-500)" ? "accent-2" : "accent"}
                className="text-[10px] px-2 py-0.5 mt-0.5 inline-block"
              >
                {ROLE_LABEL[testimonial.role] ?? testimonial.role}
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

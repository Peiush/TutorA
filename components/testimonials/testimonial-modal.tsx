"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";
import { TestimonialIllustration } from "@/components/testimonials/testimonial-illustration";
import type { MyTestimonial } from "@/app/lib/testimonials";

gsap.registerPlugin(useGSAP, Flip);

export function TestimonialModal({
  isAuthenticated,
  existing,
  originRect,
  onClose,
}: {
  isAuthenticated: boolean;
  existing: MyTestimonial | null;
  originRect: DOMRect | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const content = contentRef.current;

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.to(overlay, { autoAlpha: 1, duration: reduced ? 0.01 : 0.28, ease: "power2.out" });

      const startIdleMotion = () => {
        if (reduced) return;
        gsap.to(".ti-orbit", { rotate: 360, duration: 42, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to(".ti-orbit-2", { rotate: -360, duration: 58, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to(".ti-star", { scale: 1.25, opacity: 0.7, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3, transformOrigin: "50% 50%" });
        gsap.to(".ti-dot", { y: "-=6", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.25 });
      };

      if (reduced || !originRect || !panel) {
        gsap.set(panel, { autoAlpha: 1 });
        startIdleMotion();
        return;
      }

      gsap.set(content, { autoAlpha: 0, y: 10 });
      gsap.set(panel, {
        position: "fixed",
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: 999,
        overflow: "hidden",
      });
      const flipState = Flip.getState(panel);
      gsap.set(panel, { clearProps: "position,top,left,width,height,borderRadius,overflow" });

      Flip.from(flipState, {
        duration: 0.55,
        ease: "power3.out",
        props: "borderRadius",
        onComplete: () => {
          gsap.to(content, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" });
          gsap.fromTo(
            ".tm-stagger",
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }
          );
          startIdleMotion();
        },
      });
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
        className="card elev-lg w-full max-w-[480px] my-8 relative p-0 gap-0 overflow-hidden"
        style={{ background: "var(--color-bg)" }}
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div
          className="relative h-[120px]"
          style={{ background: "linear-gradient(135deg, var(--color-accent-100), var(--color-surface))" }}
        >
          <TestimonialIllustration className="absolute inset-0" />
        </div>

        <div ref={contentRef} className="flex flex-col gap-5 px-6 pt-5 pb-6">
          <div className="tm-stagger text-center">
            <h2 className="text-[22px]" style={{ fontFamily: "var(--font-heading)" }}>
              Share your story
            </h2>
            <p className="text-[13.5px] mt-1" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
              Your experience helps other parents, students and tutors trust TutorA.
            </p>
          </div>

          <div className="tm-stagger">
            <TestimonialForm isAuthenticated={isAuthenticated} existing={existing} bare />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import type { tutorsRaw } from "@/lib/mock-data";
import type { VibrantAccent } from "@/lib/vibrant-accents";

gsap.registerPlugin(useGSAP);

type Tutor = (typeof tutorsRaw)[number];

// A tutor's homepage card merges every subject they teach into one card (see
// app/page.tsx's mergeTutorsBySubject), which means "Request This Tutor" can no longer
// fire a single request — the student has to say which subject they want. This modal
// lists every subject with its own "Send request" button instead, dressed in the same
// per-tutor vibe accent as the card it was opened from so the two feel like one object.
export function RequestTutorSubjectsModal({
  tutor,
  index,
  vibe,
  pendingSubject,
  requestedSubjects,
  onRequestSubject,
  onClose,
}: {
  tutor: Tutor;
  index: number;
  vibe: VibrantAccent;
  pendingSubject: string | null;
  requestedSubjects: Set<string>;
  onRequestSubject: (subject: string, origin: HTMLElement | null) => void;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevRequested = useRef<Set<string>>(new Set(requestedSubjects));

  const { contextSafe } = useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(overlayRef.current, { autoAlpha: 1 });
        gsap.set(panelRef.current, { autoAlpha: 1, scale: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, ease: "power2.out" })
        .fromTo(
          panelRef.current,
          { autoAlpha: 0, scale: 0.88, y: 30, rotate: -0.6 },
          { autoAlpha: 1, scale: 1, y: 0, rotate: 0, duration: 0.5, ease: "back.out(1.65)" },
          "-=0.12"
        )
        .fromTo(
          panelRef.current?.querySelectorAll(".request-modal-header > *") ?? [],
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" },
          "-=0.22"
        )
        .fromTo(
          panelRef.current?.querySelectorAll(".subject-row") ?? [],
          { autoAlpha: 0, y: 14, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.055, ease: "power3.out" },
          "-=0.18"
        );
    },
    { scope: overlayRef }
  );

  // Pop the row into its "sent" state the moment a request succeeds, rather than the
  // check mark just appearing — a small reward beat for the action just taken.
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const justRequested = [...requestedSubjects].filter((s) => !prevRequested.current.has(s));
      prevRequested.current = new Set(requestedSubjects);
      if (reduced || justRequested.length === 0) return;

      for (const subject of justRequested) {
        const row = rowRefs.current.get(subject);
        if (!row) continue;
        const tl = gsap.timeline();
        tl.fromTo(row, { scale: 1 }, { scale: 1.025, duration: 0.16, ease: "power2.out" })
          .to(row, { scale: 1, duration: 0.28, ease: "elastic.out(1, 0.55)" })
          .fromTo(
            row.querySelector(".sent-check"),
            { scale: 0, rotate: -35 },
            { scale: 1, rotate: 0, duration: 0.4, ease: "back.out(2.4)" },
            "-=0.32"
          );
      }
    },
    { dependencies: [requestedSubjects], scope: overlayRef }
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
      style={{
        background: "color-mix(in srgb, var(--color-neutral-900) 62%, transparent)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeAnimated();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") closeAnimated();
      }}
    >
      <div
        ref={panelRef}
        className="w-full max-w-[460px] my-8 relative rounded-[26px] overflow-hidden"
        style={{
          background: "var(--color-bg)",
          boxShadow: `var(--shadow-lg), 0 30px 70px -28px color-mix(in srgb, ${vibe.solid} 45%, transparent)`,
          border: "1px solid var(--color-divider)",
        }}
      >
        <div
          className="h-[5px] w-full"
          style={{ background: `linear-gradient(90deg, ${vibe.solid}, color-mix(in srgb, ${vibe.solid} 55%, white))` }}
          aria-hidden
        />

        <button
          type="button"
          aria-label="Close"
          onClick={closeAnimated}
          className="absolute grid place-content-center cursor-pointer rounded-full transition-transform duration-200 hover:scale-110"
          style={{
            top: 18,
            right: 18,
            width: 32,
            height: 32,
            background: "var(--color-surface)",
            color: "var(--color-text)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div
          className="request-modal-header relative flex gap-3.5 items-center px-6 sm:px-7 pt-6 sm:pt-7 pb-5"
          style={{
            background: `linear-gradient(160deg, color-mix(in srgb, ${vibe.light} 60%, var(--color-bg)) 0%, var(--color-bg) 78%)`,
          }}
        >
          <div
            className="rounded-full flex-none"
            style={{ boxShadow: `0 0 0 3px color-mix(in srgb, ${vibe.solid} 40%, transparent)`, borderRadius: "50%" }}
          >
            <TutorAvatar name={tutor.name} index={index} size={58} withBadge />
          </div>
          <div className="min-w-0 pr-6">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-[var(--font-heading)] text-[19px] leading-tight" style={{ color: "var(--color-text)" }}>
                {tutor.name}
              </span>
              <VerifiedBadge />
            </div>
            <div className="text-[13px] mt-1" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
              Pick a subject to send your request
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-6 sm:px-7 pb-6 sm:pb-7 pt-1 max-h-[58vh] overflow-y-auto">
          {tutor.subjects.map((s) => {
            const price = tutor.subjectPrices?.[s] ?? tutor.price;
            const requested = requestedSubjects.has(s);
            const pending = pendingSubject === s;
            return (
              <div
                key={s}
                ref={(el) => {
                  if (el) rowRefs.current.set(s, el);
                  else rowRefs.current.delete(s);
                }}
                className="subject-row group flex items-center justify-between gap-3 rounded-2xl px-3.5 py-3 transition-[border-color,box-shadow,transform] duration-200"
                style={
                  requested
                    ? {
                        background: "color-mix(in srgb, var(--color-verified) 10%, var(--color-bg))",
                        border: "1px solid color-mix(in srgb, var(--color-verified) 35%, var(--color-divider))",
                      }
                    : {
                        background: `linear-gradient(160deg, color-mix(in srgb, ${vibe.light} 32%, var(--color-bg)) 0%, var(--color-bg) 70%)`,
                        border: "1px solid var(--color-divider)",
                      }
                }
                onMouseEnter={(e) => {
                  if (requested) return;
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${vibe.solid} 45%, transparent)`;
                  e.currentTarget.style.boxShadow = `0 10px 24px -14px color-mix(in srgb, ${vibe.solid} 55%, transparent)`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  if (requested) return;
                  e.currentTarget.style.borderColor = "var(--color-divider)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="grid place-content-center rounded-xl flex-none transition-transform duration-200 group-hover:scale-105"
                    style={
                      requested
                        ? { width: 38, height: 38, background: "color-mix(in srgb, var(--color-verified) 18%, transparent)", color: "var(--color-verified)" }
                        : { width: 38, height: 38, background: vibe.light, color: vibe.text }
                    }
                  >
                    <SubjectIcon subject={s} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold truncate" style={{ color: "var(--color-text)" }}>
                      {s}
                    </div>
                    <span
                      className="inline-flex mt-0.5 items-center rounded-full px-2 py-0.5 text-[11.5px] font-bold"
                      style={{ background: `color-mix(in srgb, ${vibe.solid} 14%, transparent)`, color: vibe.text }}
                    >
                      {price}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="flex-none inline-flex items-center justify-center gap-1.5 rounded-full font-bold text-[12.5px] transition-[transform,box-shadow,filter] duration-200 active:scale-[0.95] disabled:cursor-default"
                  disabled={pending || requested}
                  style={{
                    minWidth: 108,
                    height: 36,
                    padding: "0 16px",
                    ...(requested
                      ? { background: "transparent", color: "var(--color-verified)" }
                      : {
                          background: `linear-gradient(135deg, ${vibe.solid}, color-mix(in srgb, ${vibe.solid} 65%, black))`,
                          color: "#FFFFFF",
                          boxShadow: `0 8px 18px -8px color-mix(in srgb, ${vibe.solid} 70%, transparent)`,
                        }),
                  }}
                  onMouseEnter={(e) => {
                    if (requested || pending) return;
                    e.currentTarget.style.filter = "brightness(1.1)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  onClick={(e) => onRequestSubject(s, e.currentTarget)}
                >
                  {requested ? (
                    <span className="sent-check inline-flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Sent
                    </span>
                  ) : pending ? (
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending
                    </span>
                  ) : (
                    "Send request"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

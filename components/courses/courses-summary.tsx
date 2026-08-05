"use client";

import { useRef, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CheckIcon, LayersIcon, UserCheckIcon, VideoIcon } from "@/components/courses/course-icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FACTS = [
  { icon: LayersIcon, label: "Grouped by grade & subject" },
  { icon: UserCheckIcon, label: "Matched with a verified tutor" },
  { icon: VideoIcon, label: "Live, 1:1 sessions" },
];

const REQUEST_SUBJECTS = ["Math", "Science", "English", "+4 more"];
const TUTOR_SUBJECTS = ["Math", "Science"];

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function CoursesSummary({
  avgRating,
  categoryCount,
}: {
  avgRating: number;
  categoryCount: number;
}) {
  const footerStats = [
    { value: String(categoryCount), label: "categories" },
    { value: avgRating.toFixed(1), label: "avg. rating" },
    { value: "100%", label: "verified tutors" },
  ];
  const rootRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const tiltX = useRef<((v: number) => void) | null>(null);
  const tiltY = useRef<((v: number) => void) | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".cs-intro", start: "top 80%", once: true } })
          .from(".cs-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" })
          .from(".cs-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".cs-copy", { autoAlpha: 0, y: 12, duration: 0.45, ease: "power3.out" }, "-=0.3")
          .from(".cs-fact", { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.2")
          .from(".cs-panel", { autoAlpha: 0, y: 20, duration: 0.5, ease: "power3.out" }, "-=0.4")
          .from(".cs-request-card", { autoAlpha: 0, y: -12, duration: 0.5, ease: "power3.out" }, "-=0.25")
          .from(".cs-request-chip", { autoAlpha: 0, y: 6, scale: 0.85, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, "-=0.25")
          .fromTo(".cs-connector-line", { height: "0%" }, { height: "100%", duration: 0.55, ease: "power2.inOut" }, "-=0.05")
          .fromTo(".cs-connector-dot", { top: "0%" }, { top: "100%", duration: 0.55, ease: "power2.inOut" }, "<")
          .fromTo(".cs-connector-ping", { autoAlpha: 0.6, scale: 1 }, { autoAlpha: 0, scale: 2.2, duration: 0.5, ease: "power2.out" }, "-=0.1")
          .from(".cs-mockup", { autoAlpha: 0, y: 16, scale: 0.94, duration: 0.5, ease: "back.out(1.5)" }, "-=0.35")
          .fromTo(".cs-avatar", { scale: 0.7 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" }, "-=0.3")
          .from(".cs-matched-badge", { autoAlpha: 0, scale: 0.4, y: -6, duration: 0.45, ease: "back.out(2.2)" }, "-=0.1")
          .from(".cs-footer-stat", { autoAlpha: 0, y: 8, duration: 0.35, stagger: 0.06, ease: "power2.out" }, "-=0.15");

        if (canHover() && mockupRef.current) {
          gsap.set(mockupRef.current, { transformPerspective: 900, transformStyle: "preserve-3d" });
          tiltX.current = gsap.quickTo(mockupRef.current, "rotationX", { duration: 0.6, ease: "power3.out" });
          tiltY.current = gsap.quickTo(mockupRef.current, "rotationY", { duration: 0.6, ease: "power3.out" });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".cs-tag, .cs-heading, .cs-copy, .cs-fact, .cs-panel, .cs-request-card, .cs-request-chip, .cs-mockup, .cs-avatar, .cs-matched-badge, .cs-footer-stat",
          { autoAlpha: 1, y: 0, scale: 1 }
        );
        gsap.set(".cs-connector-line", { height: "100%" });
        gsap.set(".cs-connector-dot", { top: "100%" });
        gsap.set(".cs-connector-ping", { autoAlpha: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const handleTiltMove = contextSafe((e: MouseEvent<HTMLDivElement>) => {
    if (!tiltX.current || !tiltY.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.current(px * 10);
    tiltX.current(-py * 10);
  });

  const resetTilt = contextSafe(() => {
    tiltX.current?.(0);
    tiltY.current?.(0);
  });

  return (
    <div ref={rootRef} id="about-courses" className="mt-5 mb-7 md:mt-8 md:mb-12 scroll-mt-24">
      <div className="cs-intro grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
        <div className="flex flex-col">
          <p
            className="cs-tag text-[11px] font-semibold uppercase tracking-wide mb-3"
            style={{ color: "var(--color-accent-700)" }}
          >
            About courses
          </p>
          <h2 className="cs-heading text-[clamp(24px,2.8vw,32px)] mb-4 max-w-[20ch]">
            How TutorA courses work
          </h2>
          <p
            className="cs-copy text-[15.5px] leading-relaxed mb-4 max-w-[52ch]"
            style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}
          >
            Courses are organized by grade and subject — a Grade 6–8 bundle, for example, can span 7
            subjects at once. Tell us what you need, and we match you with a verified tutor for live,
            personalized sessions in every subject.
          </p>

          <div className="pt-5 mt-2" style={{ borderTop: "1px solid var(--color-divider)" }}>
            <p
              className="text-[11px] font-semibold uppercase tracking-wide mb-3"
              style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
            >
              Quick facts
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
              {FACTS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="cs-fact inline-flex items-center gap-1.5 sm:gap-2 rounded-full pl-1.5 sm:pl-2 pr-2.5 sm:pr-3.5 py-1 sm:py-1.5 text-[11.5px] sm:text-[13px] font-medium"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
                >
                  <span
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full grid place-content-center flex-none"
                    style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                  >
                    <Icon width={11} height={11} />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="cs-panel hidden sm:flex flex-col rounded-[28px] border p-6 sm:p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, var(--color-surface) 0%, var(--color-bg) 100%)",
            borderColor: "var(--color-divider)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            className="pointer-events-none absolute rounded-full blur-3xl opacity-35"
            style={{ width: 280, height: 280, background: "var(--color-accent-200)", top: "-18%", right: "-18%" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute rounded-full blur-3xl opacity-25"
            style={{ width: 200, height: 200, background: "var(--color-accent-2-200)", bottom: "-12%", left: "-10%" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage: "radial-gradient(circle, var(--color-divider) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
            aria-hidden
          />

          <div className="relative flex-1 flex items-center justify-center py-4" style={{ perspective: 900 }}>
            <div className="relative w-full max-w-[248px] flex flex-col items-center" aria-hidden>
              <div
                className="cs-request-card relative z-10 w-full rounded-2xl border p-3.5"
                style={{
                  background: "var(--color-bg)",
                  borderColor: "var(--color-divider)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span
                    className="w-6 h-6 rounded-full grid place-content-center flex-none"
                    style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                  >
                    <LayersIcon width={12} height={12} />
                  </span>
                  <span
                    className="text-[10.5px] font-semibold uppercase tracking-wide"
                    style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
                  >
                    Your request
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold">Grade 6-8 bundle</span>
                  <span className="text-[10px] font-semibold" style={{ color: "var(--color-accent-800)" }}>
                    7 subjects
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {REQUEST_SUBJECTS.map((s) => (
                    <span
                      key={s}
                      className="cs-request-chip inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium"
                      style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
                    >
                      {s !== "+4 more" && <CheckIcon width={8} height={8} style={{ color: "var(--color-verified)" }} />}
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative w-full flex justify-center" style={{ height: 64 }}>
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full"
                  style={{
                    height: "100%",
                    backgroundImage: "repeating-linear-gradient(to bottom, var(--color-accent-400) 0 4px, transparent 4px 9px)",
                    opacity: 0.55,
                  }}
                  aria-hidden
                />
                <span
                  className="cs-connector-line absolute top-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full"
                  style={{ background: "var(--color-accent-600)" }}
                />
                <span
                  className="cs-connector-ping absolute left-1/2 -translate-x-1/2 top-full w-4 h-4 -mt-2 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--color-accent-600) 45%, transparent)" }}
                />
                <span
                  className="cs-connector-dot absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 -mt-[5px] rounded-full"
                  style={{
                    background: "var(--color-accent-600)",
                    boxShadow: "0 0 0 4px color-mix(in srgb, var(--color-accent-600) 20%, transparent)",
                  }}
                />
                <span
                  className="cs-matched-badge absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 inline-flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5 whitespace-nowrap"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-divider)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full grid place-content-center flex-none"
                    style={{ background: "color-mix(in srgb, var(--color-verified) 18%, var(--color-bg))", color: "var(--color-verified)" }}
                  >
                    <CheckIcon width={11} height={11} />
                  </span>
                  <span className="text-[10.5px] font-semibold">Matched!</span>
                </span>
              </div>

              <div
                ref={mockupRef}
                className="cs-mockup relative z-10 w-full rounded-2xl border p-4 will-change-transform"
                style={{
                  background: "var(--color-bg)",
                  borderColor: "var(--color-divider)",
                  boxShadow: "0 28px 50px -20px rgba(20,16,8,0.28)",
                }}
                onMouseMove={handleTiltMove}
                onMouseLeave={resetTilt}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span
                    className="cs-avatar w-9 h-9 rounded-full grid place-content-center flex-none text-[12px] font-bold"
                    style={{ background: "var(--color-accent-600)", color: "#fff" }}
                  >
                    RS
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[13px] font-semibold truncate">Riya S.</span>
                      <UserCheckIcon width={12} height={12} style={{ color: "var(--color-verified)", flexShrink: 0 }} />
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRating rating={4.9} size={11} />
                      <span className="text-[11px] font-semibold" style={{ color: "var(--color-accent-800)" }}>
                        4.9
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {TUTOR_SUBJECTS.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div
                  className="flex items-center justify-between pt-2.5"
                  style={{ borderTop: "1px solid var(--color-divider)" }}
                >
                  <span
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-medium"
                    style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-verified)" }} />
                    Online now
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full"
                    style={{ background: "color-mix(in srgb, var(--color-verified) 14%, var(--color-bg))", color: "var(--color-verified)" }}
                  >
                    <VideoIcon width={10} height={10} />
                    Live 1:1
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-3 gap-2 pt-4 mt-2" style={{ borderTop: "1px solid var(--color-divider)" }}>
            {footerStats.map((s) => (
              <div key={s.label} className="cs-footer-stat text-center">
                <div
                  className="text-[18px] font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-800)" }}
                >
                  {s.value}
                </div>
                <div className="text-[10.5px] leading-tight" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

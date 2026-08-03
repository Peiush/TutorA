"use client";

import { useRef, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CourseIllustration } from "@/components/courses/course-illustrations";
import { CheckIcon, ClockIcon, GraduationCapIcon, PlayCircleIcon } from "@/components/courses/course-icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FACTS = [
  { icon: ClockIcon, label: "Self-paced, watch anytime" },
  { icon: CheckIcon, label: "Every course team-reviewed" },
  { icon: GraduationCapIcon, label: "Certificate on completion" },
];

const FOOTER_STATS = [
  { value: "5", label: "categories" },
  { value: "4.9", label: "avg. rating" },
  { value: "100%", label: "reviewed" },
];

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function CoursesSummary() {
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
          .from(".cs-citation", { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.28")
          .from(".cs-fact", { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.2")
          .from(".cs-panel", { autoAlpha: 0, y: 20, duration: 0.5, ease: "power3.out" }, "-=0.55")
          .from(".cs-mockup", { autoAlpha: 0, y: 24, scale: 0.92, duration: 0.55, ease: "back.out(1.4)" }, "-=0.25")
          .from(".cs-badge", { autoAlpha: 0, scale: 0.4, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, "-=0.25")
          .to(".cs-progress", { width: "64%", duration: 0.7, ease: "power2.out" }, "-=0.15")
          .from(".cs-footer-stat", { autoAlpha: 0, y: 8, duration: 0.35, stagger: 0.06, ease: "power2.out" }, "-=0.3")
          .fromTo(".cs-play", { scale: 0.7 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" }, "-=0.5");

        if (canHover() && mockupRef.current) {
          gsap.set(mockupRef.current, { transformPerspective: 900, transformStyle: "preserve-3d" });
          tiltX.current = gsap.quickTo(mockupRef.current, "rotationX", { duration: 0.6, ease: "power3.out" });
          tiltY.current = gsap.quickTo(mockupRef.current, "rotationY", { duration: 0.6, ease: "power3.out" });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".cs-tag, .cs-heading, .cs-copy, .cs-citation, .cs-fact, .cs-panel, .cs-mockup, .cs-badge, .cs-footer-stat",
          { autoAlpha: 1, y: 0, scale: 1 }
        );
        gsap.set(".cs-progress", { width: "64%" });
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
    <div ref={rootRef} className="mb-16 md:mb-20">
      <div className="cs-intro grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-stretch">
        <div className="flex flex-col">
          <Tag variant="accent" className="cs-tag text-[12px] px-3.5 py-1.5 w-fit">
            About courses
          </Tag>
          <h2 className="cs-heading text-[clamp(24px,2.8vw,32px)] mt-4 mb-4 max-w-[20ch]">
            What are TutorA courses?
          </h2>
          <p
            className="cs-copy text-[15.5px] leading-relaxed mb-4 max-w-[52ch]"
            style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}
          >
            TutorA courses are self-paced video lessons taught by verified tutors, covering programming,
            test prep, languages, creative skills, and music. Every course is reviewed by our team before
            publishing, and you keep access — plus a certificate of completion — once you finish.
          </p>

          <div
            className="cs-citation flex items-start gap-2.5 mb-6 pl-3.5 py-1 max-w-[52ch]"
            style={{ borderLeft: "2px solid var(--color-accent-400)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent-700)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-[3px] flex-none"
              aria-hidden
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6M10 14 21 3" />
            </svg>
            <p
              className="text-[14px] leading-relaxed m-0"
              style={{ color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}
            >
              Self-paced online learning is a well-established format for building skills at your own tempo.{" "}
              <span className="font-semibold" style={{ color: "var(--color-text)" }}>
                Source:
              </span>{" "}
              <a
                href="https://en.wikipedia.org/wiki/Distance_education"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-medium underline decoration-1 underline-offset-2"
                style={{ color: "var(--color-accent-700)" }}
              >
                Distance education — Wikipedia
              </a>
            </p>
          </div>

          <div className="pt-5 mt-auto" style={{ borderTop: "1px solid var(--color-divider)" }}>
            <p
              className="text-[11px] font-semibold uppercase tracking-wide mb-3"
              style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
            >
              Quick facts
            </p>
            <div className="flex flex-wrap gap-2.5">
              {FACTS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="cs-fact inline-flex items-center gap-2 rounded-full pl-2 pr-3.5 py-1.5 text-[13px] font-medium"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
                >
                  <span
                    className="w-6 h-6 rounded-full grid place-content-center flex-none"
                    style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                  >
                    <Icon width={13} height={13} />
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

          <div className="relative flex-1 flex items-center justify-center py-3" style={{ perspective: 900 }}>
            <div className="relative w-full max-w-[260px]" aria-hidden>
              <div
                ref={mockupRef}
                className="cs-mockup relative rounded-2xl border overflow-hidden will-change-transform"
                style={{
                  background: "var(--color-bg)",
                  borderColor: "var(--color-divider)",
                  boxShadow: "0 32px 60px -22px rgba(20,16,8,0.25)",
                }}
                onMouseMove={handleTiltMove}
                onMouseLeave={resetTilt}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-2.5"
                  style={{ borderBottom: "1px solid var(--color-divider)" }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: "#E4A2A2" }} />
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-accent-300)" }} />
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-verified)" }} />
                  <span
                    className="ml-2 text-[10px] truncate"
                    style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}
                  >
                    tutora.it.com/courses
                  </span>
                </div>

                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{ background: "linear-gradient(135deg, var(--color-accent-100), var(--color-accent-2-100))" }}
                >
                  <span
                    className="absolute rounded-full blur-xl opacity-50"
                    style={{ width: 70, height: 70, background: "var(--color-accent-300)", top: "10%", left: "8%" }}
                    aria-hidden
                  />
                  <span
                    className="absolute rounded-full blur-xl opacity-40"
                    style={{ width: 56, height: 56, background: "var(--color-accent-2-300)", bottom: "12%", right: "14%" }}
                    aria-hidden
                  />
                  <span className="cs-play absolute inset-0 grid place-content-center">
                    <span
                      className="w-11 h-11 rounded-full grid place-content-center"
                      style={{ background: "var(--color-accent-600)", boxShadow: "0 8px 20px -6px rgba(0,0,0,0.35)" }}
                    >
                      <PlayCircleIcon width={22} height={22} stroke="#fff" style={{ color: "#fff" }} />
                    </span>
                  </span>
                  <span
                    className="absolute bottom-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
                  >
                    12:40
                  </span>
                </div>

                <div className="h-[3px] w-full" style={{ background: "var(--color-divider)" }}>
                  <div className="cs-progress h-full" style={{ width: "0%", background: "var(--color-accent-600)" }} />
                </div>

                <div className="p-3.5 pr-10 flex flex-col gap-2">
                  <div className="h-2.5 rounded-full" style={{ width: "82%", background: "var(--color-accent-100)" }} />
                  <div className="h-2 rounded-full" style={{ width: "54%", background: "var(--color-divider)" }} />
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={4.9} size={11} />
                      <span className="text-[11px] font-semibold" style={{ color: "var(--color-accent-800)" }}>
                        4.9
                      </span>
                    </div>
                    <span
                      className="text-[10.5px] whitespace-nowrap"
                      style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}
                    >
                      2,340 students
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="cs-badge absolute -top-4 -left-5 flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-divider)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <span
                  className="w-6 h-6 rounded-full grid place-content-center flex-none"
                  style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                >
                  <GraduationCapIcon width={13} height={13} />
                </span>
                <span className="text-[11px] font-semibold">Certificate</span>
              </div>

              <div
                className="cs-badge absolute -top-3 -right-6 flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-divider)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <span
                  className="w-6 h-6 rounded-full grid place-content-center flex-none"
                  style={{ background: "color-mix(in srgb, var(--color-verified) 18%, var(--color-bg))", color: "var(--color-verified)" }}
                >
                  <CheckIcon width={12} height={12} />
                </span>
                <span className="text-[11px] font-semibold">Verified tutor</span>
              </div>

              <div
                className="cs-badge absolute -bottom-8 -right-8 w-14 h-14 rounded-full"
                style={{ filter: "drop-shadow(0 14px 22px rgba(20,16,8,0.18))" }}
              >
                <CourseIllustration category="Music & Instruments" className="w-full h-full" />
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-3 gap-2 pt-4 mt-2" style={{ borderTop: "1px solid var(--color-divider)" }}>
            {FOOTER_STATS.map((s) => (
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

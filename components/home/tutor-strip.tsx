"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { subjectAccent } from "@/components/ui/subject-accent";
import { tutorsRaw } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SPEED_PX_PER_SEC = 34;

function TutorCard({ t, i, isClone }: { t: (typeof tutorsRaw)[number]; i: number; isClone?: boolean }) {
  const accent = subjectAccent(t.subjects, i);
  return (
    <div
      className="tutor-card group relative flex-none w-[228px] p-5 overflow-hidden snap-start transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]"
      aria-hidden={isClone || undefined}
      style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-divider)",
        borderRadius: 18,
        boxShadow: "var(--shadow-md)",
      }}
    >
      <span
        className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: accent.bar }}
        aria-hidden
      />

      <div className="flex items-center gap-3">
        <span className="inline-block transition-transform duration-300 group-hover:scale-[1.08]">
          <TutorAvatar name={t.name} index={i} size={56} withBadge />
        </span>
        <div className="min-w-0">
          <div className="font-[var(--font-heading)] font-semibold text-[16px]">
            {t.name.replace(/^Dr\.?\s+/, "").split(" ")[0]}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <StarRating rating={t.rating} size={12} />
            <span className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
              {t.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <Tag variant={accent.tag} className="text-[11px] mt-3.5 inline-block">
        {t.subjects[0]}
      </Tag>
      <div
        className="text-[12.5px] mt-3 leading-[1.4]"
        style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
      >
        {t.reviews} reviews · {t.city}
      </div>
    </div>
  );
}

export function TutorStrip() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(track, { autoAlpha: 0, y: 20 });
        gsap.to(track, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        });

        let tween: gsap.core.Tween | undefined;
        let resumeTimer: number | undefined;

        const play = () => {
          const singleWidth = track.scrollWidth / 2;
          if (!singleWidth) return;
          const current = track.scrollLeft % singleWidth;
          const remaining = singleWidth - current;
          tween?.kill();
          tween = gsap.to(track, {
            scrollLeft: `+=${remaining}`,
            duration: remaining / SPEED_PX_PER_SEC,
            ease: "none",
            onComplete: () => {
              gsap.set(track, { scrollLeft: 0 });
              play();
            },
          });
        };

        const pause = () => {
          tween?.pause();
          window.clearTimeout(resumeTimer);
        };
        const scheduleResume = (delay = 0) => {
          window.clearTimeout(resumeTimer);
          resumeTimer = window.setTimeout(play, delay);
        };

        play();
        track.addEventListener("pointerenter", pause);
        track.addEventListener("pointerleave", () => scheduleResume(0));
        track.addEventListener("pointerdown", pause);
        track.addEventListener("pointerup", () => scheduleResume(1200));

        const ping = gsap.to(root.querySelectorAll(".tutor-strip-ping"), {
          scale: 2.2,
          autoAlpha: 0,
          duration: 1.4,
          ease: "power1.out",
          repeat: -1,
        });

        return () => {
          tween?.kill();
          ping.kill();
          window.clearTimeout(resumeTimer);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(track, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [tutorsRaw.length] }
  );

  return (
    <div
      id="recently-matched"
      ref={rootRef}
      className="relative mt-4 lg:mt-8 py-5 lg:py-7 scroll-mt-4"
      style={{ background: "var(--color-surface)" }}
    >
      <div
        className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] mb-4 flex items-center gap-2"
        style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
      >
        <span className="relative inline-flex w-2 h-2">
          <span
            className="tutor-strip-ping absolute inset-0 rounded-full"
            style={{ background: "var(--color-verified)" }}
            aria-hidden
          />
          <span
            className="relative inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--color-verified)" }}
          />
        </span>
        <span className="text-[13px] font-semibold tracking-[0.02em]">Recently matched tutors</span>
      </div>
      <div
        ref={trackRef}
        className="hero-strip flex gap-5 overflow-x-auto snap-x snap-proximity pb-2 pt-2"
        style={{
          paddingLeft: "var(--hero-gutter)",
          paddingRight: "var(--hero-gutter)",
          overscrollBehaviorX: "contain",
        }}
      >
        {tutorsRaw.map((t, i) => (
          <TutorCard key={t.listingId ?? t.name} t={t} i={i} />
        ))}
        {tutorsRaw.map((t, i) => (
          <TutorCard key={`${t.name}-dup`} t={t} i={i} isClone />
        ))}
      </div>
      <div
        className="pointer-events-none absolute top-[52px] bottom-0 left-0 z-[2]"
        style={{
          width: "calc(var(--hero-gutter) + 48px)",
          background: "linear-gradient(to right, var(--color-surface) 40%, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute top-[52px] bottom-0 right-0 z-[2]"
        style={{
          width: "calc(var(--hero-gutter) + 48px)",
          background: "linear-gradient(to left, var(--color-surface) 40%, transparent)",
        }}
      />
    </div>
  );
}

"use client";

import { Tag } from "@/components/ui/tag";
import { TutorAvatar, starsOf } from "@/components/ui/tutor-avatar";
import { tutorsRaw } from "@/lib/mock-data";

export function TutorStrip() {
  return (
    <div className="relative mt-8 py-7" style={{ background: "var(--color-surface)" }}>
      <div
        className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] mb-4 flex items-center gap-2"
        style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: "var(--color-verified)" }}
        />
        <span className="text-[13px] font-semibold tracking-[0.02em]">Recently matched tutors</span>
      </div>
      <div
        className="hero-strip flex gap-5 overflow-x-auto pb-2 pt-2"
        style={{
          scrollSnapType: "x proximity",
          // Tell the snap engine the scrollable "start" already sits inset by
          // the gutter, otherwise it re-snaps on load so the first card's own
          // edge (not the padding) touches the viewport edge — landing it
          // right under the fade overlay below, looking cropped/missing.
          scrollPaddingInline: "var(--hero-gutter)",
          paddingLeft: "var(--hero-gutter)",
          paddingRight: "var(--hero-gutter)",
          overscrollBehaviorX: "contain",
        }}
      >
        {tutorsRaw.map((t, i) => (
          <div
            key={t.name}
            className="flex-none w-[228px] p-5 transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
            style={{
              scrollSnapAlign: "start",
              background: "var(--color-bg)",
              border: "1px solid var(--color-divider)",
              borderRadius: 18,
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div className="flex items-center gap-3">
              <TutorAvatar name={t.name} index={i} size={56} withBadge />
              <div className="min-w-0">
                <div className="font-[var(--font-heading)] font-semibold text-[16px]">
                  {t.name.replace(/^Dr\.?\s+/, "").split(" ")[0]}
                </div>
                <div className="text-[12px]" style={{ color: "var(--color-accent-700)", letterSpacing: "0.5px" }}>
                  {starsOf(t.rating)}{" "}
                  <span style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                    {t.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
            <Tag variant="accent-2" className="text-[11px] mt-3.5 inline-block">
              {t.subjects[0]}
            </Tag>
            <div
              className="text-[12.5px] mt-3 leading-[1.4]"
              style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
            >
              {t.reviews} reviews · {t.city}
            </div>
          </div>
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

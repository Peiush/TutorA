import { useId } from "react";
import type { CourseCategory } from "@/lib/mock-courses";

// A muted, editorial identity color per category — used for icons, badges and the
// category selector. Two categories reuse the site's own navy/gold brand tokens
// directly; the rest are desaturated, warm-neutral-compatible tones (sage,
// terracotta, plum) chosen to sit in the same family as the cream/navy/gold
// palette instead of introducing unrelated saturated hues.
export const CATEGORY_COLORS: Record<CourseCategory, { solid: string; light: string; text: string }> = {
  "Programming & Technology": { solid: "var(--color-accent-2-700)", light: "var(--color-accent-2-100)", text: "var(--color-accent-2-900)" },
  "Test Preparation": { solid: "#5C7A5E", light: "#EBF1EB", text: "#33452F" },
  Languages: { solid: "#B0674B", light: "#F7ECE4", text: "#6E3F26" },
  "Creative Skills": { solid: "#7C5C7F", light: "#F2ECF2", text: "#4A374C" },
  "Music & Instruments": { solid: "var(--color-accent-600)", light: "var(--color-accent-100)", text: "var(--color-accent-900)" },
};

export const CATEGORY_PALETTE: Record<CourseCategory, { bg: string; line: string; dot: string }> = {
  "Programming & Technology": { bg: CATEGORY_COLORS["Programming & Technology"].light, line: CATEGORY_COLORS["Programming & Technology"].text, dot: CATEGORY_COLORS["Programming & Technology"].solid },
  "Test Preparation": { bg: CATEGORY_COLORS["Test Preparation"].light, line: CATEGORY_COLORS["Test Preparation"].text, dot: CATEGORY_COLORS["Test Preparation"].solid },
  Languages: { bg: CATEGORY_COLORS.Languages.light, line: CATEGORY_COLORS.Languages.text, dot: CATEGORY_COLORS.Languages.solid },
  "Creative Skills": { bg: CATEGORY_COLORS["Creative Skills"].light, line: CATEGORY_COLORS["Creative Skills"].text, dot: CATEGORY_COLORS["Creative Skills"].solid },
  "Music & Instruments": { bg: CATEGORY_COLORS["Music & Instruments"].light, line: CATEGORY_COLORS["Music & Instruments"].text, dot: CATEGORY_COLORS["Music & Instruments"].solid },
};

// The medallion: a glossy disc framed by a thin gold seal-ring and a dashed
// outer orbit in the category color. This is the one shared "premium" motif
// every category renders inside, so the grid reads as one cohesive product
// instead of a different colored blob per card.
function Medallion({ solid, gradientId }: { solid: string; gradientId: string }) {
  return (
    <g>
      <circle cx="80" cy="80" r="63" fill="none" stroke={solid} strokeWidth="1.5" strokeDasharray="1.5 7" opacity="0.4" />
      <circle cx="80" cy="80" r="54" fill="none" stroke="var(--color-accent-400)" strokeWidth="1.5" opacity="0.75" />
      <circle cx="80" cy="80" r="50" fill={`url(#${gradientId})`} />
      <path
        d="M46 54c8-16 26-24 38-24"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M118 44l2.2 6 6 2.2-6 2.2-2.2 6-2.2-6-6-2.2 6-2.2Z"
        fill="var(--color-accent-400)"
        opacity="0.9"
      />
    </g>
  );
}

function Motif({ category, line, dot }: { category: CourseCategory; line: string; dot: string }) {
  return (
    <g transform="translate(80 80) scale(0.82) translate(-80 -80)">
      {(() => {
        switch (category) {
          case "Programming & Technology":
            return (
              <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="42" y="46" width="76" height="50" rx="6" />
                <path d="M42 96h76l6 14H36Z" />
                <path d="M64 62 54 71l10 9M96 62l10 9-10 9" />
                <circle cx="112" cy="40" r="2.4" fill={dot} stroke="none" />
                <circle cx="48" cy="40" r="2" fill={dot} stroke="none" />
              </g>
            );
          case "Test Preparation":
            return (
              <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="46" y="38" width="60" height="76" rx="8" />
                <path d="M62 60h28M62 76h28M62 92h18" />
                <path d="M56 52h4M56 68h4M56 84h4" strokeLinecap="round" />
                <path d="M96 100 106 110l18-22" transform="translate(-4 -2)" stroke={dot} strokeWidth="3.4" />
              </g>
            );
          case "Languages":
            return (
              <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M38 48h60v40H70l-12 14v-14H38Z" />
                <path d="M50 62h36M50 72h24" />
                <circle cx="112" cy="96" r="14" />
                <path d="M98 96h28M112 82c5 5 8 9 8 14s-3 9-8 14c-5-5-8-9-8-14s3-9 8-14Z" strokeWidth="2.4" />
              </g>
            );
          case "Creative Skills":
            return (
              <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M70 96V44l32-8v52" />
                <circle cx="62" cy="98" r="12" fill={line} stroke="none" />
                <path d="M96 92 116 72a5 5 0 0 1 7 7L103 99l-11 3 3-11Z" fill={line} />
                <circle cx="40" cy="60" r="2.4" fill={dot} stroke="none" />
                <circle cx="112" cy="46" r="2.4" fill={dot} stroke="none" />
              </g>
            );
          case "Music & Instruments":
            return (
              <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M70 96V44l32-8v52" />
                <circle cx="62" cy="98" r="12" fill={line} stroke="none" />
                <circle cx="90" cy="88" r="12" fill={line} stroke="none" />
                <circle cx="40" cy="60" r="2.4" fill={dot} stroke="none" />
                <circle cx="112" cy="46" r="2.4" fill={dot} stroke="none" />
              </g>
            );
        }
      })()}
    </g>
  );
}

export function CourseIllustration({
  category,
  className,
}: {
  category: CourseCategory;
  className?: string;
}) {
  const p = CATEGORY_PALETTE[category];
  const gradientId = `medallion-${useId()}`;
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label={`${category} illustration`}>
      <defs>
        <radialGradient id={gradientId} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bg} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <Medallion solid={p.dot} gradientId={gradientId} />
      <Motif category={category} line={p.line} dot={p.dot} />
    </svg>
  );
}

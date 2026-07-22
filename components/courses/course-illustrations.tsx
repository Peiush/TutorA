import type { CourseCategory } from "@/lib/mock-courses";

// One vivid, distinct identity color per category — used for icons, badges and the
// category selector. Kept separate from the two-tone brand palette (amber/navy) so
// categories read as visually distinct at a glance instead of blurring together.
export const CATEGORY_COLORS: Record<CourseCategory, { solid: string; light: string; text: string }> = {
  "Programming & Technology": { solid: "#4F46E5", light: "#EEF2FF", text: "#3730A3" },
  "Test Preparation": { solid: "#059669", light: "#ECFDF5", text: "#065F46" },
  Languages: { solid: "#E11D48", light: "#FFF1F2", text: "#9F1239" },
  "Creative Skills": { solid: "#C026D3", light: "#FDF4FF", text: "#86198F" },
  "Music & Instruments": { solid: "#7C3AED", light: "#F5F3FF", text: "#5B21B6" },
};

export const CATEGORY_PALETTE: Record<CourseCategory, { bg: string; line: string; dot: string }> = {
  "Programming & Technology": { bg: CATEGORY_COLORS["Programming & Technology"].light, line: CATEGORY_COLORS["Programming & Technology"].text, dot: CATEGORY_COLORS["Programming & Technology"].solid },
  "Test Preparation": { bg: CATEGORY_COLORS["Test Preparation"].light, line: CATEGORY_COLORS["Test Preparation"].text, dot: CATEGORY_COLORS["Test Preparation"].solid },
  Languages: { bg: CATEGORY_COLORS.Languages.light, line: CATEGORY_COLORS.Languages.text, dot: CATEGORY_COLORS.Languages.solid },
  "Creative Skills": { bg: CATEGORY_COLORS["Creative Skills"].light, line: CATEGORY_COLORS["Creative Skills"].text, dot: CATEGORY_COLORS["Creative Skills"].solid },
  "Music & Instruments": { bg: CATEGORY_COLORS["Music & Instruments"].light, line: CATEGORY_COLORS["Music & Instruments"].text, dot: CATEGORY_COLORS["Music & Instruments"].solid },
};

function Blob({ bg }: { bg: string }) {
  return <path d="M80 12c34 0 62 22 66 52 4 32-18 66-52 78-38 14-78-6-90-42S8 30 44 16c11-4 24-4 36-4Z" fill={bg} />;
}

function Motif({ category, line, dot }: { category: CourseCategory; line: string; dot: string }) {
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
}

export function CourseIllustration({
  category,
  className,
}: {
  category: CourseCategory;
  className?: string;
}) {
  const p = CATEGORY_PALETTE[category];
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label={`${category} illustration`}>
      <Blob bg={p.bg} />
      <Motif category={category} line={p.line} dot={p.dot} />
    </svg>
  );
}

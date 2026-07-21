import type { CourseCategory } from "@/lib/mock-courses";

const PALETTE: Record<CourseCategory, { bg: string; line: string; dot: string }> = {
  Mathematics: { bg: "var(--color-accent-200)", line: "var(--color-accent-800)", dot: "var(--color-accent-2-700)" },
  Science: { bg: "var(--color-accent-2-200)", line: "var(--color-accent-2-800)", dot: "var(--color-accent-600)" },
  "Computer Science": { bg: "var(--color-neutral-200)", line: "var(--color-neutral-800)", dot: "var(--color-accent-600)" },
  Languages: { bg: "var(--color-accent-100)", line: "var(--color-accent-2-800)", dot: "var(--color-accent-700)" },
  Music: { bg: "var(--color-accent-2-100)", line: "var(--color-accent-2-800)", dot: "var(--color-accent-600)" },
  "Test Prep": { bg: "var(--color-accent-200)", line: "var(--color-accent-2-800)", dot: "var(--color-verified)" },
  Writing: { bg: "var(--color-neutral-100)", line: "var(--color-accent-2-800)", dot: "var(--color-accent-700)" },
};

function Blob({ bg }: { bg: string }) {
  return <path d="M80 12c34 0 62 22 66 52 4 32-18 66-52 78-38 14-78-6-90-42S8 30 44 16c11-4 24-4 36-4Z" fill={bg} />;
}

function Motif({ category, line, dot }: { category: CourseCategory; line: string; dot: string }) {
  switch (category) {
    case "Mathematics":
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 108 78 44l28 64" />
          <path d="M60 88h36" />
          <circle cx="108" cy="52" r="14" />
          <path d="M108 44v16M100 52h16" strokeWidth="2.5" />
          <circle cx="46" cy="112" r="2.4" fill={dot} stroke="none" />
          <circle cx="112" cy="104" r="2.4" fill={dot} stroke="none" />
        </g>
      );
    case "Science":
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M68 40h24v26l18 34a8 8 0 0 1-7 12H57a8 8 0 0 1-7-12l18-34Z" />
          <path d="M64 40h32" />
          <path d="M63 88h34" />
          <circle cx="79" cy="102" r="3" fill={dot} stroke="none" />
          <circle cx="70" cy="96" r="2" fill={dot} stroke="none" />
          <circle cx="90" cy="96" r="2" fill={dot} stroke="none" />
        </g>
      );
    case "Computer Science":
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="42" y="46" width="76" height="50" rx="6" />
          <path d="M42 96h76l6 14H36Z" />
          <path d="M64 62 54 71l10 9M96 62l10 9-10 9" />
          <circle cx="112" cy="40" r="2.4" fill={dot} stroke="none" />
          <circle cx="48" cy="40" r="2" fill={dot} stroke="none" />
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
    case "Music":
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M70 96V44l32-8v52" />
          <circle cx="62" cy="98" r="12" fill={line} stroke="none" />
          <circle cx="90" cy="88" r="12" fill={line} stroke="none" />
          <circle cx="40" cy="60" r="2.4" fill={dot} stroke="none" />
          <circle cx="112" cy="46" r="2.4" fill={dot} stroke="none" />
        </g>
      );
    case "Test Prep":
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="46" y="38" width="60" height="76" rx="8" />
          <path d="M62 60h28M62 76h28M62 92h18" />
          <path d="M56 52h4M56 68h4M56 84h4" strokeLinecap="round" />
          <path d="M96 100 106 110l18-22" transform="translate(-4 -2)" stroke={dot} strokeWidth="3.4" />
        </g>
      );
    case "Writing":
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="44" y="40" width="56" height="72" rx="4" />
          <path d="M56 58h32M56 72h32M56 86h20" />
          <path d="M96 92 116 72a5 5 0 0 1 7 7L103 99l-11 3 3-11Z" fill={line} />
          <circle cx="46" cy="112" r="2" fill={dot} stroke="none" />
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
  const p = PALETTE[category];
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label={`${category} illustration`}>
      <Blob bg={p.bg} />
      <Motif category={category} line={p.line} dot={p.dot} />
    </svg>
  );
}

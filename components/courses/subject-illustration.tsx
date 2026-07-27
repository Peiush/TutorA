import { useId } from "react";
import { Medallion } from "@/components/courses/course-illustrations";

// Same medallion shell as CourseIllustration (glossy disc, dashed orbit, gold
// sparkle) so grade-band subject cards read as one family with course cards —
// just recolored per band and carrying a graduation-cap motif instead of a
// category-specific one, since all three bands are the same kind of content.
function GradCapMotif({ line, dot }: { line: string; dot: string }) {
  return (
    <g transform="translate(80 80) scale(0.82) translate(-80 -80)" fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 64 80 46l40 18-40 18Z" />
      <path d="M58 72v20c0 5 10 10 22 10s22-5 22-10V72" />
      <path d="M120 64v22" />
      <circle cx="120" cy="90" r="2.6" fill={dot} stroke="none" />
      <circle cx="112" cy="40" r="2.4" fill={dot} stroke="none" />
      <circle cx="46" cy="98" r="2" fill={dot} stroke="none" />
    </g>
  );
}

export function SubjectIllustration({
  tone,
  className,
}: {
  tone: { solid: string; light: string; text: string };
  className?: string;
}) {
  const gradientId = `subject-medallion-${useId()}`;
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label="Subject illustration">
      <defs>
        <radialGradient id={gradientId} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor={tone.light} />
          <stop offset="100%" stopColor={tone.light} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <Medallion solid={tone.solid} gradientId={gradientId} />
      <GradCapMotif line={tone.text} dot={tone.solid} />
    </svg>
  );
}

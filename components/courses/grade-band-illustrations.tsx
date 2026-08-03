import { useId } from "react";
import { Medallion } from "@/components/courses/course-illustrations";
import { GRADE_BAND_COLORS, type GradeBandKey } from "@/lib/grade-bands";

export const GRADE_BAND_PALETTE: Record<GradeBandKey, { bg: string; line: string; dot: string }> = {
  GRADE_6_8: { bg: GRADE_BAND_COLORS.GRADE_6_8.light, line: GRADE_BAND_COLORS.GRADE_6_8.text, dot: GRADE_BAND_COLORS.GRADE_6_8.solid },
  GRADE_8_10: { bg: GRADE_BAND_COLORS.GRADE_8_10.light, line: GRADE_BAND_COLORS.GRADE_8_10.text, dot: GRADE_BAND_COLORS.GRADE_8_10.solid },
  GRADE_10_12: { bg: GRADE_BAND_COLORS.GRADE_10_12.light, line: GRADE_BAND_COLORS.GRADE_10_12.text, dot: GRADE_BAND_COLORS.GRADE_10_12.solid },
};

function GradeMotif({ band, line, dot }: { band: GradeBandKey; line: string; dot: string }) {
  return (
    <g transform="translate(80 80) scale(0.82) translate(-80 -80)">
      {(() => {
        switch (band) {
          case "GRADE_6_8":
            // open storybook + a small star — early/middle-school reading level
            return (
              <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M80 52c-8-8-24-10-34-6v52c10-4 26-2 34 6" />
                <path d="M80 52c8-8 24-10 34-6v52c-10-4-26-2-34 6Z" />
                <path d="M80 52v58" />
                <path d="M112 40l2.6 6.4L121 49l-6.4 2.6L112 58l-2.6-6.4L103 49l6.4-2.6Z" fill={dot} stroke="none" />
              </g>
            );
          case "GRADE_8_10":
            // stacked books + pencil — junior-high workload
            return (
              <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="40" y="86" width="60" height="14" rx="3" />
                <rect x="48" y="72" width="52" height="14" rx="3" />
                <rect x="42" y="58" width="46" height="14" rx="3" />
                <path d="M104 100 118 56l6 2-14 44Z" fill={line} stroke="none" />
                <circle cx="122" cy="52" r="2.2" fill={dot} stroke="none" />
              </g>
            );
          case "GRADE_10_12":
            // graduation cap + diploma scroll — senior-secondary milestone
            return (
              <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M42 58 80 44l38 14-38 14Z" />
                <path d="M62 66v18c0 6 8 11 18 11s18-5 18-11V66" />
                <path d="M118 58v20" strokeWidth="2.6" />
                <circle cx="118" cy="82" r="2.6" fill={dot} stroke="none" />
                <path d="M50 100c6-4 14-4 20 0s14 4 20 0" strokeWidth="2.6" />
              </g>
            );
        }
      })()}
    </g>
  );
}

export function GradeBandIllustration({ band, className }: { band: GradeBandKey; className?: string }) {
  const p = GRADE_BAND_PALETTE[band];
  const gradientId = `grade-medallion-${useId()}`;
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label={`${band} illustration`}>
      <defs>
        <radialGradient id={gradientId} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bg} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <Medallion solid={p.dot} gradientId={gradientId} />
      <GradeMotif band={band} line={p.line} dot={p.dot} />
    </svg>
  );
}

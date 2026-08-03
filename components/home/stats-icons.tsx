// Same blob-and-line motif visual grammar as AudienceIllustration (who-its-for-illustrations.tsx)
// and StepIllustration, reused here so the stats section reads as part of one illustration system.
function Blob() {
  return (
    <path
      d="M80 12c34 0 62 22 66 52 4 32-18 66-52 78-38 14-78-6-90-42S8 30 44 16c11-4 24-4 36-4Z"
      fill="rgba(255,255,255,0.6)"
    />
  );
}

function StatMotif({ index, line }: { index: number; line: string }) {
  switch (index) {
    case 0:
      // Verified tutors — a shield with a check, every credential vetted before listing
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M70 26 104 38v30c0 26-14 44-34 52-20-8-34-26-34-52V38l34-12Z" />
          <path d="m54 70 12 12 22-24" />
        </g>
      );
    case 1:
      // Successful matches — two nodes joined by a completed, checked connection
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="46" cy="58" r="15" />
          <circle cx="98" cy="92" r="15" />
          <path d="M58 68 86 82" />
          <circle cx="72" cy="76" r="13" fill="var(--color-bg)" />
          <path d="m66.5 76 4 4 8-8" />
        </g>
      );
    case 2:
    default:
      // Average time to match — a clock ticking forward
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="70" cy="76" r="34" />
          <path d="M70 58v20l16 10" />
          <path d="M56 30h28M70 30v14" />
        </g>
      );
  }
}

export function StatIllustration({
  index,
  line,
  className,
}: {
  index: number;
  line: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-hidden>
      <Blob />
      <StatMotif index={index} line={line} />
    </svg>
  );
}

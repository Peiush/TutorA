// Same blob-and-line-motif visual grammar as StepIllustration (components/home/step-illustrations.tsx)
// and CourseIllustration, reused here so this section reads as part of one consistent illustration system.
function Blob() {
  return (
    <path
      d="M80 12c34 0 62 22 66 52 4 32-18 66-52 78-38 14-78-6-90-42S8 30 44 16c11-4 24-4 36-4Z"
      fill="rgba(255,255,255,0.6)"
    />
  );
}

function AudienceMotif({ index, line }: { index: number; line: string }) {
  switch (index) {
    case 0:
      // Students & parents — an open book with a graduation cap and a "vetted" check badge
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 62c10-6 22-6 32 0v40c-10-6-22-6-32 0V62Z" />
          <path d="M104 62c-10-6-22-6-32 0v40c10-6 22-6 32 0V62Z" />
          <path d="M72 62v40" />
          <path d="M40 44 72 30l32 14-32 14-32-14Z" />
          <circle cx="110" cy="100" r="14" fill="var(--color-bg)" />
          <path d="M104 100l4.5 4.5L117 95" />
        </g>
      );
    case 1:
      // Adult learners — a laptop with a progress checklist, picking up a structured skill
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="38" y="46" width="68" height="46" rx="6" />
          <path d="M30 104h84l-8-12H38l-8 12Z" />
          <path d="M52 60h8M52 72h30" />
          <circle cx="52" cy="60" r="1.6" fill={line} stroke="none" />
          <path d="M84 66l6 6 12-12" />
        </g>
      );
    case 2:
    default:
      // Tutors — a target with a matched checkmark, replacing the noise of an open marketplace
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="70" cy="70" r="34" />
          <circle cx="70" cy="70" r="20" />
          <circle cx="70" cy="70" r="4" fill={line} stroke="none" />
          <path d="M96 44 108 32" />
          <path d="M100 30h10v10" />
          <circle cx="108" cy="104" r="13" fill="var(--color-bg)" />
          <path d="M102.5 104l4 4 8-8" />
        </g>
      );
  }
}

export function AudienceIllustration({
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
      <AudienceMotif index={index} line={line} />
    </svg>
  );
}

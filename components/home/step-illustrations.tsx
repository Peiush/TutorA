// Same blob-and-line-motif visual grammar as CourseIllustration (components/courses/course-illustrations.tsx),
// reused here so the homepage narrative reads as part of one consistent illustration system.
function Blob() {
  return (
    <path
      d="M80 12c34 0 62 22 66 52 4 32-18 66-52 78-38 14-78-6-90-42S8 30 44 16c11-4 24-4 36-4Z"
      fill="rgba(255,255,255,0.6)"
    />
  );
}

function StepMotif({ index, line }: { index: number; line: string }) {
  switch (index) {
    case 0:
      // You tell us — a private message bubble
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M38 50h62v42H76l-15 15v-15H38Z" />
          <circle cx="55" cy="71" r="2.6" fill={line} stroke="none" />
          <circle cx="69" cy="71" r="2.6" fill={line} stroke="none" />
          <circle cx="83" cy="71" r="2.6" fill={line} stroke="none" />
          <path d="M96 40a11 11 0 0 1 11 11v6a11 11 0 0 1-22 0v-6a11 11 0 0 1 11-11Z" />
          <path d="M91 57v3.5a5 5 0 0 0 10 0V57" />
        </g>
      );
    case 1:
      // We verify & match — shield with check + magnifier
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M80 32 110 43v27c0 25-18 43-30 49-12-6-30-24-30-49V43Z" />
          <path d="M66 80 76 90 97 66" />
          <circle cx="107" cy="108" r="12" />
          <path d="M116 117l9 9" />
        </g>
      );
    case 2:
    default:
      // You connect — two linked people
      return (
        <g fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="56" cy="60" r="14" />
          <path d="M32 108c3-17 12-25 24-25s21 8 24 25" />
          <circle cx="106" cy="64" r="11" />
          <path d="M87 108c2-14 10-21 21-21" />
          <circle cx="80" cy="86" r="3" fill={line} stroke="none" />
        </g>
      );
  }
}

export function StepIllustration({ index, line, className }: { index: number; line: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-hidden>
      <Blob />
      <StepMotif index={index} line={line} />
    </svg>
  );
}

import { SVGProps } from "react";

function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function CalculatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="4.5" y="3" width="15" height="18" rx="2.5" />
      <path d="M8 8h8M12 12v6M9 15h6" />
    </svg>
  );
}

function FlaskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M9 2.5h6M10 3v6.2L4.8 18a1.8 1.8 0 0 0 1.55 2.7h11.3A1.8 1.8 0 0 0 19.2 18L14 9.2V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}

function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.4 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.4-3.6-8.5S9.6 5.8 12 3.5Z" />
    </svg>
  );
}

function MusicNoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M9 18V4.5l10-2v13.5" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </svg>
  );
}

function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M4 5.5c2-1 5-1 8 .5 3-1.5 6-1.5 8-.5v13c-2-1-5-1-8 .5-3-1.5-6-1.5-8-.5v-13Z" />
      <path d="M12 6v13" />
    </svg>
  );
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 21.5s-7-6.4-7-11.7a7 7 0 0 1 14 0c0 5.3-7 11.7-7 11.7Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </svg>
  );
}

function PaletteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 3a9 8 0 0 0 0 16c1.4 0 1.7-1.6.6-2.3-.9-.6-.6-2 .5-2h2a4 4 0 0 0 4-4c0-4.3-3.4-7.7-7.1-7.7Z" />
      <circle cx="9" cy="9.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GraduationCapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M2.5 9.5 12 5l9.5 4.5-9.5 4.5-9.5-4.5Z" />
      <path d="M6.5 11.6v4.1c0 1.5 2.46 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-4.1" />
    </svg>
  );
}

const CATEGORIES = [
  { keywords: ["math", "statistic", "calculus", "algebra", "econom", "test prep", "sat", "act"], Icon: CalculatorIcon },
  { keywords: ["computer", "python", "programming", "coding", "software"], Icon: CodeIcon },
  { keywords: ["physic", "chemistry", "biology", "science"], Icon: FlaskIcon },
  { keywords: ["music", "piano", "guitar", "violin", "singing", "vocal"], Icon: MusicNoteIcon },
  { keywords: ["geography", "history"], Icon: MapPinIcon },
  { keywords: ["art", "drama", "theatre", "theater", "design"], Icon: PaletteIcon },
  { keywords: ["language", "spanish", "italian", "portuguese", "arabic", "mandarin", "french", "german", "hindi", "tamil", "korean", "chinese", "japanese", "russian"], Icon: GlobeIcon },
  { keywords: ["english", "writing", "literature", "reading"], Icon: BookIcon },
];

export function SubjectIcon({ subject, ...props }: { subject: string } & SVGProps<SVGSVGElement>) {
  const text = subject.toLowerCase();
  const match = CATEGORIES.find((c) => c.keywords.some((k) => text.includes(k)));
  const Icon = match?.Icon ?? GraduationCapIcon;
  return <Icon {...props} />;
}

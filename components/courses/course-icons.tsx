import { SVGProps } from "react";

function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 3.5 4 8l8 4.5L20 8Z" />
      <path d="M4 12.5 12 17l8-4.5M4 17l8 4.5L20 17" />
    </svg>
  );
}

export function BarChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M5 20V11M12 20V6M19 20v-7" />
      <path d="M3.5 20h17" />
    </svg>
  );
}

export function PlayCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.2 8.8v6.4L15.5 12Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 20.2s-7.5-4.6-9.9-9A5.3 5.3 0 0 1 12 6.2a5.3 5.3 0 0 1 9.9 5c-2.4 4.4-9.9 9-9.9 9Z" />
    </svg>
  );
}

export function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="m21 3-9 18-3.5-7.5L1 10Z" />
      <path d="M21 3 10.5 13.5" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function GraduationCapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14Z" />
      <path d="M6.5 11.5v4.7c0 1 3 2.6 5.5 2.6s5.5-1.6 5.5-2.6v-4.7" />
      <path d="M21.5 9.5v6" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="11" cy="11" r="7.5" />
      <path d="m20.5 20.5-4.3-4.3" />
    </svg>
  );
}

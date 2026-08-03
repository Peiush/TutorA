import { SVGProps } from "react";

function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="0.4" fill="currentColor" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.8 9.2-1.7 4.8-4.8 1.7 1.7-4.8 4.8-1.7Z" />
    </svg>
  );
}

export function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 3.5 19 6.2v5.1c0 4.4-3 7.6-7 8.7-4-1.1-7-4.3-7-8.7V6.2L12 3.5Z" />
      <path d="m9 12 2.1 2.1L15.5 10" />
    </svg>
  );
}

export function TagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M20 12.5 12.5 20 4 11.5V4h7.5L20 12.5Z" />
      <circle cx="8.2" cy="8.2" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12.5" r="8" />
      <path d="M12 8v4.5l3.2 2" />
    </svg>
  );
}

export function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M4 5.5c2-1 5-1 7 0v13c-2-1-5-1-7 0v-13Z" />
      <path d="M18 5.5c-2-1-5-1-7 0v13c2-1 5-1 7 0v-13Z" />
    </svg>
  );
}

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

export function VettingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 3.5 19 6.2v5.1c0 4.4-3 7.6-7 8.7-4-1.1-7-4.3-7-8.7V6.2L12 3.5Z" />
      <path d="m9 12 2.1 2.1L15.5 10" />
    </svg>
  );
}

export function PricingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M20 12.5 12.5 20 4 11.5V4h7.5L20 12.5Z" />
      <circle cx="8.2" cy="8.2" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ReviewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="5" y="4.5" width="14" height="16" rx="2" />
      <path d="M9 4.5V3.2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.3" />
      <path d="m8.5 13 2.2 2.2L15.7 10" />
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

export function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.2 12.3 2.6 2.6 5-5.2" />
    </svg>
  );
}

export function DashCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12h7" />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none" aria-hidden>
      <path d="m12 3 2.7 5.9 6.3.7-4.7 4.4 1.3 6.3-5.6-3.2-5.6 3.2 1.3-6.3-4.7-4.4 6.3-.7L12 3Z" />
    </svg>
  );
}

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

export function GraduationCapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M2.5 9.5 12 5l9.5 4.5-9.5 4.5-9.5-4.5Z" />
      <path d="M6.5 11.6v4.1c0 1.5 2.46 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-4.1" />
      <path d="M21.5 9.5v6" />
    </svg>
  );
}

export function CoinsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <ellipse cx="9" cy="6.5" rx="6.5" ry="3.2" />
      <path d="M2.5 6.5v5c0 1.77 2.91 3.2 6.5 3.2s6.5-1.43 6.5-3.2v-5" />
      <path d="M2.5 11.5v5c0 1.77 2.91 3.2 6.5 3.2 1.06 0 2.06-.13 2.94-.35" />
      <path d="M14.2 12.3c1.9.5 4.3 1.9 4.3 3.7 0 1.34-1.34 2.47-3.25 3" />
    </svg>
  );
}

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M2.8 19c.9-3.3 3.2-5 6.2-5s5.3 1.7 6.2 5" />
      <circle cx="17.5" cy="8.5" r="2.6" />
      <path d="M15.5 13.3c2.3.4 4 1.9 4.7 4.7" />
    </svg>
  );
}

export function ClipboardCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="5" y="4.5" width="14" height="17" rx="2" />
      <path d="M9 4.5h6a1 1 0 0 1 1 1V7h-8V5.5a1 1 0 0 1 1-1Z" />
      <path d="m8.5 13.5 2 2 4.5-4.5" />
    </svg>
  );
}

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 21.5s7-6.6 7-11.9A7 7 0 0 0 5 9.6c0 5.3 7 11.9 7 11.9Z" />
      <circle cx="12" cy="9.6" r="2.6" />
    </svg>
  );
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

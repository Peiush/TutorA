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

export function RequestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z" />
      <path d="M8.2 10.5h.01M12 10.5h.01M15.8 10.5h.01" />
    </svg>
  );
}

export function ShieldMatchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 3.5 19.5 6.5v5.3c0 4.6-3.2 7.9-7.5 9-4.3-1.1-7.5-4.4-7.5-9V6.5L12 3.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function HandshakeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2.5 19.5c.8-3.4 3-5 6-5s5.2 1.6 6 5" />
      <circle cx="17" cy="8.5" r="2.4" />
      <path d="M15.8 11.2c1.9.4 3.2 1.7 3.7 3.8" />
    </svg>
  );
}

export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M19 8a7.5 7.5 0 0 0-13-3.5M5 4v4h4" />
      <path d="M5 16a7.5 7.5 0 0 0 13 3.5M19 20v-4h-4" />
    </svg>
  );
}

export function FlowArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

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

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
    </svg>
  );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M5.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3c0 1-.9 1.8-1.9 1.6-4.2-.7-8.2-2.8-11.1-5.7C3.2 11 1.1 7 .5 2.9.3 1.9 1 1 2 1h3.5Z" />
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

export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M3.5 3.5l17 17" />
      <path d="M10.6 5.7c.45-.1.92-.15 1.4-.15 6 0 9.5 6.4 9.5 6.4a15.6 15.6 0 0 1-3.28 4.05M6.8 6.9C4.02 8.55 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.24 0 2.36-.28 3.35-.73" />
      <path d="M9.6 10.6a2.75 2.75 0 0 0 3.9 3.9" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
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

export function ChalkboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M7 9.5l3 2.5 2.5-3.5L17 11" />
    </svg>
  );
}

export function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M4 5.5c2-1 5-1 8 .5 3-1.5 6-1.5 8-.5v13c-2-1-5-1-8 .5-3-1.5-6-1.5-8-.5v-13Z" />
      <path d="M12 6v13" />
    </svg>
  );
}

export function CalculatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7.5h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  );
}

export function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.4 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.4-3.6-8.5S9.6 5.8 12 3.5Z" />
    </svg>
  );
}

export function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 3.5 19.5 6.5v5.3c0 4.6-3.2 7.9-7.5 9-4.3-1.1-7.5-4.4-7.5-9V6.5L12 3.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function ChatDotsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z" />
      <path d="M8.2 10.5h.01M12 10.5h.01M15.8 10.5h.01" />
    </svg>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M7 3.5h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5v4h4" />
      <path d="M9 12.5h6M9 16h6" />
    </svg>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4-4" />
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

export function SpinnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} className="auth-spinner" aria-hidden>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

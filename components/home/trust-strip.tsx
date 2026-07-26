import { SVGProps } from "react";
import { Reveal } from "@/components/ui/reveal";

function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function IdCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <circle cx="8.5" cy="12" r="2.1" />
      <path d="M13.5 10h4M13.5 14h3" />
    </svg>
  );
}

function BackgroundCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <path d="M12 3.5 19.5 6.5v5.3c0 4.6-3.2 7.9-7.5 9-4.3-1.1-7.5-4.4-7.5-9V6.5L12 3.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

function VideoInterviewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <rect x="2.5" y="6.5" width="13" height="11" rx="2" />
      <path d="M15.5 10.2 21 7.5v9l-5.5-2.7" />
    </svg>
  );
}

function MatchedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} aria-hidden>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2.5 19.5c.8-3.4 3-5 6-5s5.2 1.6 6 5" />
      <circle cx="17" cy="8.5" r="2.4" />
      <path d="M15.8 11.2c1.9.4 3.2 1.7 3.7 3.8" />
    </svg>
  );
}

const trustPoints = [
  { icon: IdCheckIcon, label: "ID verified" },
  { icon: BackgroundCheckIcon, label: "Background checked" },
  { icon: VideoInterviewIcon, label: "Video interviewed" },
  { icon: MatchedIcon, label: "Personally matched" },
];

export function TrustStrip() {
  return (
    <div className="relative mt-4 lg:mt-8 py-5 lg:py-7" style={{ background: "var(--color-surface)" }}>
      <Reveal>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          {trustPoints.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span
                className="w-9 h-9 rounded-full grid place-content-center flex-none"
                style={{
                  background: "color-mix(in srgb, var(--color-accent-400) 14%, transparent)",
                  color: "var(--color-accent-700)",
                }}
              >
                <Icon />
              </span>
              <span className="text-[13.5px] font-medium whitespace-nowrap" style={{ color: "var(--color-text)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

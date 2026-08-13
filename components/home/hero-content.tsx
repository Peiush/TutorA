import Link from "next/link";
import { Tag } from "@/components/ui/tag";

export function HeroHeading() {
  return (
    <div className="text-center">
      <Tag variant="accent" className="reveal-up hero-tag text-[12px] px-3.5 py-1.5 inline-block">
        Taught by verified Indian teachers
      </Tag>
      <h1 className="reveal-up d1 font-[var(--font-heading)] font-bold text-[clamp(34px,5vw,60px)] leading-[1.1] mt-5 sm:mt-4 mx-auto max-w-[26ch]">
        <span className="hero-word inline-block">Personalized</span>{" "}
        <span className="hero-word inline-block">Online</span>{" "}
        <span className="hero-word inline-block">Learning</span>{" "}
        <span className="hero-word inline-block">with</span>{" "}
        <span
          className="hero-word inline-block"
          style={{
            fontFamily: "var(--font-accent)",
            fontWeight: 600,
            color: "var(--color-accent-700)",
            fontSize: "1.1em",
            transform: "rotate(-2deg)",
          }}
        >
          Expert
        </span>{" "}
        <span className="hero-word inline-block">Indian</span>{" "}
        <span className="hero-word inline-block">Teachers</span>
      </h1>
    </div>
  );
}

export function HeroCopy() {
  return (
    <p className="reveal-up d3 hero-copy-p mt-4 sm:mt-5 mx-auto text-[14.5px] sm:text-[17px] lg:text-[18px] leading-[1.48] sm:leading-[1.62] max-w-[36ch] sm:max-w-[52ch] lg:max-w-[62ch] text-center">
      <span className="font-medium" style={{ color: "var(--color-text)" }}>
        Live 1-on-1 and small group classes for Grades 6–12, SAT, Coding &amp; more.
      </span>{" "}
      <span
        className="hidden sm:inline"
        style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
      >
        Learn from{" "}
        <span className="font-medium" style={{ color: "var(--color-accent-2-700)" }}>
          experienced Indian teachers
        </span>{" "}
        — wherever you are in the world.
      </span>
    </p>
  );
}

export function HeroSecondaryLink() {
  return (
    <div className="reveal-up d5 hero-secondary-link mt-4 sm:mt-4 flex flex-wrap items-center justify-center gap-2 text-center text-[13.5px]">
      <span style={{ color: "color-mix(in srgb, var(--color-text) 56%, transparent)" }}>
        Not sure what you need?
      </span>
      <Link
        href="/request-a-tutor"
        className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-bold transition-transform hover:-translate-y-0.5"
        style={{
          color: "var(--color-accent-800)",
          background: "var(--color-accent-100)",
          boxShadow: "0 1px 2px color-mix(in srgb, var(--color-accent-600) 25%, transparent)",
        }}
      >
        Request a tutor for me <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

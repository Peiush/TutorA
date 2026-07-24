import Link from "next/link";
import { Tag } from "@/components/ui/tag";

export function HeroHeading() {
  return (
    <div>
      <Tag variant="accent" className="reveal-up hero-tag text-[12px] px-3.5 py-1.5 inline-block">
        Every match personally verified
      </Tag>
      <h1 className="reveal-up d1 font-[var(--font-heading)] font-bold text-[clamp(38px,5.6vw,68px)] leading-[1.06] mt-4 max-w-[16ch]">
        <span className="hero-word inline-block">The&nbsp;right</span>{" "}
        <span className="hero-word inline-block">tutor,</span>{" "}
        <span
          className="hero-word inline-block"
          style={{
            fontFamily: "var(--font-accent)",
            fontWeight: 600,
            color: "var(--color-accent-700)",
            fontSize: "1.12em",
            transform: "rotate(-2deg)",
          }}
        >
          personally
        </span>{" "}
        <span className="hero-word inline-block">matched.</span>
      </h1>
    </div>
  );
}

export function HeroCopy() {
  return (
    <>
      <p
        className="reveal-up d3 hero-copy-p text-[18px] leading-[1.62] max-w-[52ch] mt-6"
        style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
      >
        TutorA sits between students and tutors so no one has to guess. You tell us what
        you need; our team vets, matches and introduces — students and tutors never chase each
        other, and no connection slips through unverified.
      </p>
      <div className="reveal-up d4 flex gap-3 flex-wrap mt-8">
        <Link href="/find-a-tutor" className="hero-cta-btn btn btn-primary relative inline-block isolate">
          <span
            className="hero-cta-glow absolute inset-0 rounded-full pointer-events-none -z-10"
            style={{ background: "var(--color-accent-400)" }}
            aria-hidden
          />
          Find a Tutor
        </Link>
        <Link href="/request-a-tutor" className="hero-cta-btn btn btn-secondary inline-block">
          Request a Tutor
        </Link>
      </div>
    </>
  );
}

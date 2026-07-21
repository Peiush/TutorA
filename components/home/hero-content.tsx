import Link from "next/link";
import { Tag } from "@/components/ui/tag";

export function HeroContent() {
  return (
    <div>
      <Tag variant="accent" className="reveal-up text-[12px] px-3.5 py-1.5 inline-block">
        Every match personally verified
      </Tag>
      <h1 className="reveal-up d1 font-[var(--font-heading)] font-bold text-[clamp(38px,5.6vw,68px)] leading-[1.06] mt-4 max-w-[16ch]">
        The&nbsp;right tutor,{" "}
        <span
          style={{
            fontFamily: "var(--font-accent)",
            fontWeight: 600,
            color: "var(--color-accent-700)",
            fontSize: "1.12em",
            transform: "rotate(-2deg)",
            display: "inline-block",
          }}
        >
          personally
        </span>{" "}
        matched.
      </h1>
      <p
        className="reveal-up d2 text-[18px] leading-[1.62] max-w-[52ch] mt-6"
        style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
      >
        TutorA sits between students and tutors so no one has to guess. You tell us what
        you need; our team vets, matches and introduces — students and tutors never chase each
        other, and no connection slips through unverified.
      </p>
      <div className="reveal-up d3 flex gap-3 flex-wrap mt-8">
        <Link href="/find-a-tutor" className="btn btn-primary inline-block">
          Find a Tutor
        </Link>
        <Link href="/request-a-tutor" className="btn btn-secondary inline-block">
          Request a Tutor
        </Link>
      </div>
    </div>
  );
}

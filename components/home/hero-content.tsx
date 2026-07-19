"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tag } from "@/components/ui/tag";

gsap.registerPlugin(useGSAP);

export function HeroContent() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".hero-tag",
          { autoAlpha: 0, y: 14, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)" }
        )
          .fromTo(
            ".hero-title-word",
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.05 },
            "-=0.25"
          )
          .fromTo(
            ".hero-sub",
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            ".hero-cta",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
            "-=0.35"
          );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-tag, .hero-title-word, .hero-sub, .hero-cta", { autoAlpha: 1 });
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div ref={scope}>
      <Tag variant="accent" className="hero-tag text-[12px] px-3.5 py-1.5 inline-block">
        Every match personally verified
      </Tag>
      <h1 className="font-[var(--font-heading)] font-bold text-[clamp(38px,5.6vw,68px)] leading-[1.06] mt-4 max-w-[16ch]">
        <span className="hero-title-word inline-block">The&nbsp;right</span>{" "}
        <span className="hero-title-word inline-block">tutor,</span>{" "}
        <span
          className="hero-title-word inline-block"
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
        <span className="hero-title-word inline-block">matched.</span>
      </h1>
      <p
        className="hero-sub text-[18px] leading-[1.62] max-w-[52ch] mt-6"
        style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
      >
        TutorConnect sits between students and tutors so no one has to guess. You tell us what
        you need; our team vets, matches and introduces — students and tutors never chase each
        other, and no connection slips through unverified.
      </p>
      <div className="flex gap-3 flex-wrap mt-8">
        <Link href="/find-a-tutor" className="hero-cta btn btn-primary inline-block">
          Find a Tutor
        </Link>
        <Link href="/become-a-tutor" className="hero-cta btn btn-secondary inline-block">
          Become a Tutor
        </Link>
      </div>
    </div>
  );
}

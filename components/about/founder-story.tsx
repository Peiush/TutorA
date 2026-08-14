"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STORY_PARAGRAPHS = [
  "TutorA started from a simple frustration with how online tutoring usually works: browse a public list of tutors, message a few, hope one responds, and figure out on your own whether they're actually who they claim to be. Founder Nancy Gupta built TutorA to close that gap — a platform where every tutor listing and every student request passes through a real review before either side ever sees the other, so no one has to guess who they're getting matched with.",
  "That review process is still the core of how TutorA works today. Tutors don't self-list into an open marketplace where anyone can pitch a student directly — every profile is checked by our team first, and every match is proposed by a person, not an algorithm guessing from a database. Students never chase a name down from a public list; they tell us what they need, and we make the introduction once we're confident it's a genuine fit. Pricing is shown up front before anyone books, and TutorA only charges a success fee once a match is actually confirmed — never for browsing, never for listing.",
  "That's still the standard every new tutor and every new student request gets held to: personally reviewed, clearly priced, and backed by a rematch guarantee if the first introduction isn't the right one. It's a slower way to build a marketplace than opening the doors to anyone — but it's the one Nancy set out to build.",
];

export function FounderStory() {
  const rootRef = useRef<HTMLElement>(null);
  const name = "Nancy Gupta";
  const [expanded, setExpanded] = useState(false);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });

        tl.from(".fs-avatar", { autoAlpha: 0, scale: 0.6, duration: 0.6, ease: "back.out(2.2)" })
          .from(".fs-name", { autoAlpha: 0, y: 14, duration: 0.5 }, "-=0.25")
          .from(".fs-role", { autoAlpha: 0, y: 10, duration: 0.45 }, "-=0.3")
          .from(".fs-quote", { autoAlpha: 0, y: 10, duration: 0.45 }, "-=0.2")
          .from(".fs-para", { autoAlpha: 0, y: 16, duration: 0.55, stagger: 0.14 }, "-=0.15");

        const avatar = root.querySelector(".fs-avatar");
        return scrollRevealSafetyNet(
          root,
          () => avatar != null && isGsapHidden(avatar),
          () => {
            gsap.set(".fs-avatar, .fs-name, .fs-role, .fs-quote, .fs-para", { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".fs-avatar, .fs-name, .fs-role, .fs-quote, .fs-para", { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-20 -left-24 w-[320px] h-[320px] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--color-accent-2-200)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 w-[300px] h-[300px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--color-accent-200)" }}
        aria-hidden
      />

      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(36px,6vw,84px)] relative z-[1]">
        <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
          Our Story
        </Tag>
        <h2 className="text-[clamp(24px,3.2vw,36px)] mt-4 mb-8 sm:mb-10 max-w-[26ch]">
          Built by someone who got tired of guessing.
        </h2>

        <div className="grid gap-6 sm:gap-10 lg:gap-14 [grid-template-columns:1fr] lg:[grid-template-columns:240px_1fr] items-start">
          {/* Signature card */}
          <div className="flex lg:flex-col items-center lg:items-start gap-3.5 sm:gap-4 lg:gap-3">
            <div
              className="fs-avatar relative overflow-hidden rounded-full flex-none w-14 h-14 sm:w-[88px] sm:h-[88px]"
              style={{ background: "var(--color-accent-2-200)" }}
            >
              <Image
                src="/about/nancy-gupta.jpeg"
                alt="Nancy Gupta, founder of TutorA"
                fill
                sizes="(min-width: 640px) 88px, 56px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="fs-name font-[var(--font-heading)] font-bold text-[17px] sm:text-[19px] m-0">{name}</p>
              <Tag variant="accent-2" className="fs-role text-[11px] px-2.5 py-1 mt-1.5 inline-block">
                Founder
              </Tag>
              <p className="fs-quote" aria-label='Nancy Gupta: “We don’t match profiles. We match people.”'>
                <span aria-hidden="true">&ldquo;</span>
                We don&rsquo;t match profiles. We match people.
                <span aria-hidden="true">&rdquo;</span>
              </p>
            </div>
          </div>

          {/* Story */}
          <div className="flex flex-col gap-4 sm:gap-5 max-w-[68ch] min-w-0">
            <p className="fs-para text-[15px] sm:text-[16px] leading-[1.6] sm:leading-[1.62] m-0" style={{ color: "var(--color-text)" }}>
              {STORY_PARAGRAPHS[0]}
            </p>

            <div
              className="grid transition-[grid-template-rows] duration-500 ease-out"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden flex flex-col gap-4 sm:gap-5">
                {STORY_PARAGRAPHS.slice(1).map((paragraph, i) => (
                  <p
                    key={i}
                    className="fs-para text-[15px] sm:text-[16px] leading-[1.6] sm:leading-[1.62] m-0"
                    style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="fs-para self-start text-[14px] font-semibold cursor-pointer"
              style={{ color: "var(--color-accent-700)" }}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

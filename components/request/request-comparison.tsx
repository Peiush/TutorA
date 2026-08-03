"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const OPTIONS = [
  {
    tag: "Recommended if you want it handled",
    title: "Request a tutor",
    bestFor: "Parents and students who want one verified match without the legwork.",
    points: [
      "Describe your needs once, in one form",
      "Our team hand-picks a verified tutor for you",
      "No profiles to compare, no messages to send",
      "Matched within 24–48 hours",
    ],
    cta: null,
    accent: "accent-2" as const,
  },
  {
    tag: "Good if you like to compare first",
    title: "Browse tutors yourself",
    bestFor: "Students who already know what they're looking for and want to compare profiles directly.",
    points: [
      "See verified tutor profiles and rates upfront",
      "Filter by subject, level, and price",
      "Reach out to more than one tutor",
      "Same verified pool, self-serve pace",
    ],
    cta: { href: "/find-a-tutor", label: "Browse tutors" },
    accent: "accent" as const,
  },
];

export function RequestComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } })
          .from(".rc-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" })
          .from(".rc-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.25")
          .from(".rc-copy", { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.3")
          .from(".rc-card", { autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.14, ease: "power3.out" }, "-=0.2");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".rc-tag, .rc-heading, .rc-copy, .rc-card", { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] mt-16 md:mt-24">
      <div className="max-w-[680px] mx-auto text-center mb-10">
        <Tag variant="accent-2" className="rc-tag text-[12px] px-3.5 py-1.5">
          Which is right for you?
        </Tag>
        <h2 className="rc-heading text-[clamp(26px,3.2vw,36px)] mt-4 mb-3">
          Should I request a tutor or browse tutors myself?
        </h2>
        <p
          className="rc-copy text-[15.5px] leading-relaxed max-w-[58ch] mx-auto"
          style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}
        >
          Both paths lead to the same pool of verified TutorA tutors — the difference is who does
          the searching. Not sure yet? You can also explore self-paced{" "}
          <Link href="/courses" className="underline font-medium" style={{ color: "var(--color-accent-2-700)" }}>
            courses
          </Link>{" "}
          if live 1:1 tutoring isn&rsquo;t what you need right now.
        </p>
      </div>

      <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] max-w-[880px] mx-auto">
        {OPTIONS.map((opt) => (
          <div
            key={opt.title}
            className="rc-card relative rounded-[var(--radius-lg)] border p-6 sm:p-7 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1.5"
            style={{
              background: "var(--color-surface)",
              borderColor: opt.accent === "accent-2" ? "var(--color-accent-2-400)" : "var(--color-divider)",
              boxShadow: opt.accent === "accent-2" ? "var(--shadow-md)" : "var(--shadow-sm)",
            }}
          >
            <Tag variant={opt.accent} className="text-[11px] px-3 py-1 self-start">
              {opt.tag}
            </Tag>
            <h3 className="font-[var(--font-heading)] font-bold text-[21px] m-0">{opt.title}</h3>
            <p
              className="text-[14px] leading-[1.55] m-0"
              style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}
            >
              {opt.bestFor}
            </p>
            <ul className="grid gap-2 m-0 p-0" style={{ listStyle: "none" }}>
              {opt.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px]" style={{ color: "var(--color-text)" }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={opt.accent === "accent-2" ? "var(--color-accent-2-700)" : "var(--color-accent-700)"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none mt-[3px]"
                    aria-hidden
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            {opt.cta && (
              <Link href={opt.cta.href} className="btn btn-secondary mt-1 self-start">
                {opt.cta.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

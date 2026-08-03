"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { AudienceIllustration } from "@/components/home/who-its-for-illustrations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Audience = {
  title: string;
  body: string;
  bg: string;
  line: string;
};

const audiences: Audience[] = [
  {
    title: "Students & parents",
    body: "Looking for a subject tutor — academic, test prep, or skill-based — who's already been vetted, not an open listing to gamble on.",
    bg: "var(--color-accent-100)",
    line: "var(--color-accent-700)",
  },
  {
    title: "Adult learners",
    body: "Picking up a new skill — programming, a language, or an instrument — through structured, reviewed courses.",
    bg: "color-mix(in srgb, var(--color-accent-2-100) 70%, var(--color-accent-100) 30%)",
    line: "var(--color-accent-2-700)",
  },
  {
    title: "Tutors",
    body: "Who want to be matched with serious requests instead of competing in an open, unvetted marketplace.",
    bg: "var(--color-accent-2-100)",
    line: "var(--color-accent-2-800)",
  },
];

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function AudienceCard({ audience, index }: { audience: Audience; index: number }) {
  const cardRef = useRef<HTMLLIElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const ping = contextSafe((card: HTMLElement) => {
    if (reduced()) return;
    const ring = card.querySelector(".who-ping");
    const illo = card.querySelector(".who-illo");
    if (ring) {
      gsap.killTweensOf(ring);
      gsap.fromTo(ring, { scale: 1, autoAlpha: 0.5 }, { scale: 1.6, autoAlpha: 0, duration: 0.6, ease: "power2.out" });
    }
    if (illo) {
      gsap.killTweensOf(illo);
      gsap.to(illo, { rotate: index % 2 === 0 ? 6 : -6, duration: 0.35, ease: "power2.out", yoyo: true, repeat: 1 });
    }
  });

  return (
    <li
      ref={cardRef}
      className="who-card group relative flex-1 list-none rounded-[var(--radius-lg)] p-6 overflow-hidden border transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5"
      style={{ borderColor: "var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
      onMouseEnter={(e) => canHover() && ping(e.currentTarget)}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "var(--shadow-lg)" }}
        aria-hidden
      />

      <div className="relative w-16 h-16">
        <span
          className="who-ping pointer-events-none absolute inset-0 rounded-full"
          style={{ background: audience.line, opacity: 0 }}
          aria-hidden
        />
        <div
          className="who-illo relative w-16 h-16 rounded-full"
          style={{ background: audience.bg, transformOrigin: "center" }}
        >
          <AudienceIllustration index={index} line={audience.line} className="w-full h-full" />
        </div>
      </div>

      <h3 className="relative z-10 text-[18px] mt-4 mb-1.5">{audience.title}</h3>
      <p
        className="relative z-10 text-[14.5px] leading-relaxed m-0"
        style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}
      >
        {audience.body}
      </p>
    </li>
  );
}

export function WhoItsFor() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const tag = root.querySelector(".who-tag");
      const heading = root.querySelector(".who-heading");
      const cards = root.querySelectorAll(".who-card");
      const illos = root.querySelectorAll(".who-illo");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([tag, heading], { autoAlpha: 0, y: 20 });
        gsap.set(cards, { autoAlpha: 0, y: 32, scale: 0.97 });
        gsap.set(illos, { scale: 0.3, rotate: -18, autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        });

        tl.to(tag, { autoAlpha: 1, y: 0, duration: 0.5 })
          .to(heading, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
          .to(cards, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.14, duration: 0.6 }, "-=0.25")
          .to(illos, { scale: 1, rotate: 0, autoAlpha: 1, stagger: 0.14, duration: 0.5, ease: "back.out(2.2)" }, "-=0.5");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([tag, heading, ...cards, ...illos], { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(28px,5vw,64px)]"
    >
      <div
        className="pointer-events-none absolute -top-16 -left-10 w-[260px] h-[260px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--color-accent-200)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-10 w-[260px] h-[260px] rounded-full blur-3xl opacity-20"
        style={{ background: "var(--color-accent-2-200)" }}
        aria-hidden
      />

      <div className="relative">
        <Tag variant="accent" className="who-tag text-[12px] px-3.5 py-1.5">
          Who it&apos;s for
        </Tag>
        <h2 className="who-heading text-[clamp(26px,3.2vw,36px)] mt-4 mb-6 max-w-[24ch]">
          Built for anyone tired of guessing on a marketplace.
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3 list-none p-0 m-0">
          {audiences.map((audience, i) => (
            <AudienceCard key={audience.title} audience={audience} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

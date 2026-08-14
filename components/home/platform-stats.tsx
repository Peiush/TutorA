"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { StatIllustration } from "@/components/home/stats-icons";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Stat = {
  headline: string;
  label: string;
  bg: string;
  line: string;
};

// Real, verifiable policy facts, not measured counts — TutorA doesn't track aggregate
// figures like total tutors or total matches yet, so this section describes what actually
// happens on every request rather than inventing numbers to fill a "stats" slot. Each claim
// is already stated, consistently, across dozens of pages (comparison-showdown.tsx,
// homepage-faq.tsx, app/guarantee/page.tsx, lib/subject-content.ts) — repeated here, not new.
const stats: Stat[] = [
  {
    headline: "Manually reviewed",
    label: "Every tutor profile is reviewed by our team before it's ever published.",
    bg: "var(--color-accent-100)",
    line: "var(--color-accent-700)",
  },
  {
    headline: "Personally matched",
    label: "A real person proposes your match — live 1:1 sessions, never an algorithm.",
    bg: "color-mix(in srgb, var(--color-accent-2-100) 70%, var(--color-accent-100) 30%)",
    line: "var(--color-accent-2-700)",
  },
  {
    headline: "Free rematch",
    label: "If your first tutor isn't the right fit, we rematch you at no extra cost — no cap.",
    bg: "var(--color-accent-2-100)",
    line: "var(--color-accent-2-800)",
  },
];

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const ping = contextSafe((card: HTMLElement) => {
    if (reduced()) return;
    const ring = card.querySelector(".stat-ping");
    const illo = card.querySelector(".stat-illo");
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
    <div
      ref={cardRef}
      className="stat-card group relative rounded-[var(--radius-lg)] p-6 overflow-hidden border transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5"
      style={{ borderColor: "var(--color-divider)", background: "var(--color-bg)", boxShadow: "var(--shadow-sm)" }}
      onMouseEnter={(e) => canHover() && ping(e.currentTarget)}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "var(--shadow-lg)" }}
        aria-hidden
      />

      <div className="relative w-14 h-14">
        <span
          className="stat-ping pointer-events-none absolute inset-0 rounded-full"
          style={{ background: stat.line, opacity: 0 }}
          aria-hidden
        />
        <div
          className="stat-illo relative w-14 h-14 rounded-full"
          style={{ background: stat.bg, transformOrigin: "center" }}
        >
          <StatIllustration index={index} line={stat.line} className="w-full h-full" />
        </div>
      </div>

      <dt
        className="stat-value relative z-10 font-[var(--font-heading)] font-bold text-[clamp(19px,2.2vw,22px)] mt-4 leading-tight"
        style={{ color: stat.line }}
      >
        {stat.headline}
      </dt>
      <dd
        className="relative z-10 text-[13.5px] mt-2 leading-relaxed"
        style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
      >
        {stat.label}
      </dd>
    </div>
  );
}

export function PlatformStats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const tag = root.querySelector(".stats-tag");
      const heading = root.querySelector(".stats-heading");
      const sub = root.querySelector(".stats-sub");
      const cards = root.querySelectorAll(".stat-card");
      const illos = root.querySelectorAll(".stat-illo");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([tag, heading, sub], { autoAlpha: 0, y: 20 });
        gsap.set(cards, { autoAlpha: 0, y: 32, scale: 0.97 });
        gsap.set(illos, { scale: 0.3, rotate: -18, autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        });

        tl.to(tag, { autoAlpha: 1, y: 0, duration: 0.5 })
          .to(heading, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
          .to(sub, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35")
          .to(cards, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.14, duration: 0.6 }, "-=0.25")
          .to(illos, { scale: 1, rotate: 0, autoAlpha: 1, stagger: 0.14, duration: 0.5, ease: "back.out(2.2)" }, "-=0.5");

        return scrollRevealSafetyNet(
          root,
          // Cards and illos animate via separate tweens in the same timeline — check both,
          // not just cards[0], since one can stall (stale ScrollTrigger start after a font
          // reflow) while the other completes, leaving just that element stuck invisible.
          () => [...cards, ...illos].some((el) => isGsapHidden(el)),
          () => {
            gsap.set([tag, heading, sub, ...cards, ...illos], { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([tag, heading, sub, ...cards, ...illos], { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(20px,4vw,48px)] pb-[clamp(32px,6vw,72px)]"
    >
      <div
        className="pointer-events-none absolute -top-10 right-[8%] w-[240px] h-[240px] rounded-full blur-3xl opacity-20"
        style={{ background: "var(--color-accent-200)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[4%] w-[220px] h-[220px] rounded-full blur-3xl opacity-15"
        style={{ background: "var(--color-accent-2-200)" }}
        aria-hidden
      />

      <div className="relative">
        <Tag variant="accent-2" className="stats-tag text-[12px] px-3.5 py-1.5">
          How we build trust
        </Tag>
        <h2 className="stats-heading text-[clamp(24px,3vw,32px)] mt-4 mb-2.5 max-w-[24ch]">
          What happens when you submit a request to TutorA?
        </h2>
        <p
          className="stats-sub text-[15px] max-w-[58ch] mb-9"
          style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
        >
          These are our actual policies, applied to every tutor and every match — not vague marketing claims.
        </p>

        <dl className="grid gap-4 sm:grid-cols-3 m-0">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}

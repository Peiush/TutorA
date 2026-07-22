"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LegalHero({
  eyebrow,
  title,
  description,
  updated,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  updated: string;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".lh-blob-1", {
          y: 50,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.to(".lh-blob-2", {
          y: -34,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="lh-blob-1 hidden lg:block absolute rounded-full"
          style={{
            top: "-120px",
            right: "-100px",
            width: 420,
            height: 420,
            background: "radial-gradient(circle at 32% 32%, var(--color-accent-200), transparent 72%)",
            opacity: 0.5,
            filter: "blur(6px)",
          }}
        />
        <div
          className="lh-blob-2 hidden lg:block absolute rounded-full"
          style={{
            top: "120px",
            left: "-60px",
            width: 260,
            height: 260,
            background: "radial-gradient(circle at 60% 40%, var(--color-accent-2-200), transparent 70%)",
            opacity: 0.4,
            filter: "blur(10px)",
          }}
        />
      </div>

      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(52px,7vw,88px)] pb-[clamp(32px,4vw,48px)] relative z-[1]">
        <div className="max-w-[680px]">
          <Tag variant="accent-2" className="reveal-up text-[12px] px-3.5 py-1.5">
            {eyebrow}
          </Tag>
          <h1 className="reveal-up d1 font-bold text-[clamp(32px,4.4vw,50px)] mt-4">{title}</h1>
          <p
            className="reveal-up d2 text-[16.5px] leading-[1.62] mt-5 max-w-[56ch]"
            style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
          >
            {description}
          </p>
          <p
            className="reveal-up d3 text-[13px] mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "var(--color-surface)", color: "color-mix(in srgb, var(--color-text) 64%, transparent)" }}
          >
            Last updated: {updated}
          </p>
        </div>
      </div>
    </section>
  );
}

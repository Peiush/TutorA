"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tag } from "@/components/ui/tag";

gsap.registerPlugin(useGSAP);

export function TestimonialsHero({ count }: { count: number }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".testi-hero-tag", { autoAlpha: 0, y: -10, duration: 0.5 })
          .from(".testi-hero-heading", { autoAlpha: 0, y: 22, duration: 0.6 }, "-=0.25")
          .from(".testi-hero-copy", { autoAlpha: 0, y: 16, duration: 0.55 }, "-=0.35")
          .from(".testi-hero-stat", { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.1 }, "-=0.3")
          .from(".testi-hero-mark", { autoAlpha: 0, scale: 0.6, rotate: -12, duration: 0.7, ease: "back.out(2)" }, "-=0.6");

        gsap.to(".testi-hero-blob-1", { x: 20, y: 14, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".testi-hero-blob-2", { x: -16, y: -12, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".testi-hero-mark", { y: "+=8", rotate: 2, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".testi-hero-tag, .testi-hero-heading, .testi-hero-copy, .testi-hero-stat, .testi-hero-mark", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: 0,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <div
        className="testi-hero-blob-1 hidden md:block absolute rounded-full pointer-events-none"
        aria-hidden
        style={{
          top: -140,
          left: "50%",
          marginLeft: -380,
          width: 560,
          height: 420,
          background: "radial-gradient(ellipse at 50% 20%, var(--color-accent-200), transparent 72%)",
          opacity: 0.5,
          filter: "blur(8px)",
        }}
      />
      <div
        className="testi-hero-blob-2 absolute rounded-full pointer-events-none"
        aria-hidden
        style={{
          top: 40,
          right: "6%",
          width: 260,
          height: 260,
          background: "radial-gradient(circle, var(--color-accent-2-200), transparent 70%)",
          opacity: 0.3,
          filter: "blur(12px)",
        }}
      />

      <div className="relative max-w-[820px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(48px,8vw,96px)] pb-[clamp(24px,4vw,40px)] text-center">
        <span
          className="testi-hero-mark absolute select-none pointer-events-none"
          aria-hidden
          style={{
            top: -6,
            left: "50%",
            marginLeft: -220,
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(90px,14vw,150px)",
            lineHeight: 1,
            color: "var(--color-accent-200)",
          }}
        >
          &ldquo;
        </span>

        <Tag variant="accent-2" className="testi-hero-tag text-[12px] px-3.5 py-1.5">
          Real stories
        </Tag>
        <h1 className="testi-hero-heading text-[clamp(32px,5vw,52px)] mt-4 mb-4">Trusted by parents, students &amp; tutors</h1>
        <p
          className="testi-hero-copy text-[clamp(15px,1.6vw,17px)] leading-[1.6] max-w-[560px] mx-auto"
          style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
        >
          Every story below comes from a verified TutorA account and is reviewed by our team before it goes live.
          Had a good experience? Add yours below.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          <div className="testi-hero-stat">
            <div className="text-[26px] font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-2)" }}>
              {count}
            </div>
            <div className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
              verified {count === 1 ? "story" : "stories"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

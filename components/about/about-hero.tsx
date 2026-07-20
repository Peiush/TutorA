"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { AboutIllustration } from "@/components/about/about-illustration";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutHero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".ah-tag", { autoAlpha: 0, y: -10, duration: 0.4 })
          .from(".ah-heading", { autoAlpha: 0, y: 26, duration: 0.65 }, "-=0.2")
          .from(".ah-trust", { scale: 0.6, rotation: -8, duration: 0.5, ease: "back.out(2.2)" }, "-=0.35")
          .from(".ah-copy", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.35")
          .from(".ah-cta", { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.4 }, "-=0.3");

        gsap.to(".ah-blob-1", {
          y: 60,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.to(".ah-blob-2", {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden"
      style={{
        ["--hero-gutter" as string]:
          "max(clamp(20px,5vw,64px), calc((100vw - 1180px) / 2 + clamp(20px,5vw,64px)))",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="ah-blob-1 hidden lg:block absolute rounded-full"
          style={{
            top: "-140px",
            right: "-120px",
            width: 480,
            height: 480,
            background: "radial-gradient(circle at 32% 32%, var(--color-accent-200), transparent 72%)",
            opacity: 0.55,
            filter: "blur(6px)",
          }}
        />
        <div
          className="ah-blob-2 hidden lg:block absolute rounded-full"
          style={{
            top: "160px",
            right: "40px",
            width: 300,
            height: 300,
            background: "radial-gradient(circle at 60% 40%, var(--color-accent-2-200), transparent 70%)",
            opacity: 0.45,
            filter: "blur(10px)",
          }}
        />
      </div>

      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(52px,7vw,96px)] pb-[clamp(40px,5vw,64px)] relative z-[1]">
        <div className="max-w-[680px]">
          <Tag variant="accent-2" className="ah-tag text-[12px] px-3.5 py-1.5">
            About &amp; How It Works
          </Tag>
          <h1 className="ah-heading font-bold text-[clamp(34px,4.6vw,54px)] mt-4 max-w-[18ch]">
            A tutoring platform built on{" "}
            <span
              className="ah-trust"
              style={{
                fontFamily: "var(--font-accent)",
                fontWeight: 600,
                color: "var(--color-accent-700)",
                fontSize: "1.1em",
                transform: "rotate(-2deg)",
                display: "inline-block",
              }}
            >
              trust
            </span>
            , not a lead list.
          </h1>
          <p
            className="ah-copy text-[17px] leading-[1.62] mt-6 max-w-[56ch]"
            style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
          >
            We started TutorConnect because good tutoring is a relationship, and relationships
            deserve a careful introduction. Every student request and every tutor listing passes
            through our team before anyone connects.
          </p>
          <div className="flex gap-3 flex-wrap mt-8">
            <Link href="/find-a-tutor" className="ah-cta btn btn-primary">
              Find a Tutor
            </Link>
            <Link href="/request-a-tutor" className="ah-cta btn btn-secondary">
              Request a Tutor
            </Link>
          </div>
        </div>
      </div>
      <AboutIllustration />
    </section>
  );
}

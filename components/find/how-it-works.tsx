"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { FilterStepIcon, SendStepIcon, ShieldStepIcon, LessonStepIcon } from "@/components/find/find-tutor-icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    icon: FilterStepIcon,
    title: "Browse & filter",
    body: "Search by subject, curriculum, teaching mode, or budget to shortlist tutors that actually fit.",
  },
  {
    icon: SendStepIcon,
    title: "Send a request",
    body: "Pick a tutor — or let us match you — and send a request in one click. No forms, no cold emails.",
  },
  {
    icon: ShieldStepIcon,
    title: "We verify & introduce you",
    body: "Our team confirms availability and makes the introduction personally, keeping contact details private.",
  },
  {
    icon: LessonStepIcon,
    title: "Start lessons",
    body: "Agree on a schedule directly with your tutor and begin. Most students hear back within a day.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } })
          .from(".hiw-blob", { autoAlpha: 0, scale: 0.6, duration: 0.8, ease: "power2.out" })
          .from(".hiw-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" }, "-=0.5")
          .from(".hiw-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.25")
          .from(".hiw-copy", { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.3")
          .from(
            ".hiw-step",
            { autoAlpha: 0, y: 34, scale: 0.94, duration: 0.55, stagger: 0.14, ease: "back.out(1.6)" },
            "-=0.15"
          )
          .from(
            ".hiw-connector",
            { scaleX: 0, transformOrigin: "left center", duration: 0.5, stagger: 0.14, ease: "power2.out" },
            "-=0.9"
          )
          .fromTo(
            ".hiw-number",
            { scale: 0.4, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.14, ease: "back.out(2.4)" },
            "-=1.0"
          );

        gsap.to(".hiw-blob-a", { y: 16, x: 10, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".hiw-blob-b", { y: -14, x: -8, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".hiw-blob, .hiw-tag, .hiw-heading, .hiw-copy, .hiw-step, .hiw-connector, .hiw-number",
          { autoAlpha: 1, y: 0, x: 0, scale: 1, scaleX: 1 }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mt-4 md:mt-8">
      <div className="relative overflow-hidden" style={{ background: "var(--color-accent-2-700)" }}>
        <div
          className="hiw-blob hiw-blob-a pointer-events-none absolute top-[-10%] left-[6%] w-[360px] h-[360px] rounded-full blur-3xl opacity-25"
          style={{ background: "var(--color-accent-400)" }}
          aria-hidden
        />
        <div
          className="hiw-blob hiw-blob-b pointer-events-none absolute bottom-[-15%] right-[8%] w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--color-accent-2-300)" }}
          aria-hidden
        />

        <div className="relative max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(56px,7vw,96px)]">
          <div className="max-w-[720px] mx-auto text-center mb-12">
            <Tag variant="accent" className="hiw-tag text-[12px] px-3.5 py-1.5">
              How it works
            </Tag>
            <h2 className="hiw-heading text-[clamp(26px,3.2vw,36px)] mt-4 mb-3" style={{ color: "#fff" }}>
              How does Find a Tutor work, step by step?
            </h2>
            <p
              className="hiw-copy text-[15px] leading-relaxed max-w-[54ch] mx-auto"
              style={{ color: "color-mix(in srgb, #fff 78%, transparent)" }}
            >
              Four steps get you from “searching” to “in a lesson” — filter for a fit, request an intro, let our
              team verify and connect you, then start.
            </p>
          </div>

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
                  {i < STEPS.length - 1 && (
                    <div
                      className="hiw-connector hidden lg:block absolute top-8 left-[calc(100%-8px)] w-[calc(100%-16px)] h-[2px] z-0"
                      style={{ background: "color-mix(in srgb, var(--color-accent-300) 55%, transparent)" }}
                      aria-hidden
                    />
                  )}
                  <div
                    className="hiw-step relative z-10 h-full rounded-[var(--radius-lg)] p-6 flex flex-col gap-3 border transition-transform duration-300 ease-out hover:-translate-y-1.5"
                    style={{
                      background: "color-mix(in srgb, var(--color-bg) 96%, transparent)",
                      borderColor: "color-mix(in srgb, #fff 12%, transparent)",
                      boxShadow: "0 20px 44px -18px rgba(8,14,28,0.45)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="hiw-number grid place-content-center rounded-full font-[var(--font-heading)] font-bold text-[13px] flex-none"
                        style={{ width: 30, height: 30, background: "var(--color-accent-500)", color: "var(--color-accent-2-900)" }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="grid place-content-center rounded-full flex-none"
                        style={{ width: 38, height: 38, background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
                      >
                        <Icon width={18} height={18} />
                      </span>
                    </div>
                    <h3 className="font-[var(--font-heading)] text-[16.5px] font-semibold m-0">{step.title}</h3>
                    <p
                      className="text-[13.5px] leading-relaxed m-0"
                      style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

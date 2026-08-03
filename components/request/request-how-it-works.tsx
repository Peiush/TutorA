"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    n: "1",
    title: "Tell us what you need",
    body: "Share your subject, level, goals, schedule, and budget in the form above — it takes about two minutes.",
    icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />,
  },
  {
    n: "2",
    title: "Our team reviews it",
    body: "A real person on our team checks your request against verified tutors in that subject — no algorithm guessing, no public lead list.",
    icon: <path d="M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  },
  {
    n: "3",
    title: "We propose a match",
    body: "Within 24–48 hours you'll get an email with a hand-picked tutor's profile, credentials, and availability.",
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />,
  },
  {
    n: "4",
    title: "You confirm and start",
    body: "Approve the match and we introduce you directly — sessions begin on your schedule, with a single success fee charged only now.",
    icon: <path d="M20 6 9 17l-5-5" />,
  },
];

export function RequestHowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const line = sectionRef.current?.querySelector(".rhw-line") ?? null;
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });

        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } })
          .from(".rhw-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" })
          .from(".rhw-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.25")
          .from(".rhw-answer", { autoAlpha: 0, y: 12, duration: 0.45, ease: "power3.out" }, "-=0.3")
          .to(line, { scaleY: 1, duration: 1, ease: "power2.out" }, "-=0.15")
          .from(
            ".rhw-step",
            { autoAlpha: 0, x: -20, duration: 0.5, stagger: 0.15, ease: "power3.out" },
            "-=0.85"
          )
          .from(
            ".rhw-num",
            { scale: 0, rotate: -20, duration: 0.4, stagger: 0.15, ease: "back.out(2.6)" },
            "-=0.9"
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".rhw-tag, .rhw-heading, .rhw-answer, .rhw-step, .rhw-num", {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
        });
        gsap.set(".rhw-line", { scaleY: 1 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] mt-16 md:mt-24">
      <div className="max-w-[680px] mx-auto text-center mb-12">
        <Tag variant="accent" className="rhw-tag text-[12px] px-3.5 py-1.5">
          How it works
        </Tag>
        <h2 className="rhw-heading text-[clamp(26px,3.2vw,36px)] mt-4 mb-3">
          How does requesting a tutor work?
        </h2>
        <p
          className="rhw-answer text-[15.5px] leading-relaxed max-w-[56ch] mx-auto"
          style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}
        >
          <strong style={{ color: "var(--color-text)" }}>In short:</strong> you submit one request,
          our team personally reviews it, and we propose a verified, hand-picked tutor within
          24–48 hours — you never have to browse or cold-message anyone yourself.
        </p>
      </div>

      <div className="relative max-w-[720px] mx-auto grid gap-8 pl-2">
        <span
          className="rhw-line absolute left-[19px] top-2 bottom-2 w-[2px] rounded-full"
          style={{ background: "var(--color-accent-300)" }}
          aria-hidden
        />
        {STEPS.map((step) => (
          <div key={step.n} className="rhw-step relative flex gap-5 items-start">
            <span
              className="rhw-num relative z-10 w-10 h-10 rounded-full grid place-content-center flex-none"
              style={{
                background: "var(--color-accent)",
                boxShadow: "0 0 0 5px var(--color-bg)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-bg)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                {step.icon}
              </svg>
            </span>
            <div
              className="flex-1 rounded-[var(--radius-lg)] border p-5 transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-divider)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="font-[var(--font-heading)] font-bold text-[13px]"
                  style={{ color: "var(--color-accent-700)" }}
                >
                  Step {step.n}
                </span>
              </div>
              <h3 className="font-[var(--font-heading)] font-semibold text-[17px] mb-1.5">{step.title}</h3>
              <p
                className="text-[14.5px] leading-[1.6] m-0"
                style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
              >
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FlowItem = { n: string; text: string };

function StudentIllustration({ color }: { color: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="15" cy="13" r="7" stroke={color} strokeWidth="2.2" />
      <path d="M4 33c1-8 6.5-12 11-12s10 4 11 12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="29" cy="27" r="8" fill="#fff" stroke={color} strokeWidth="2.2" />
      <path d="m25.5 27 2.3 2.3 4.7-4.7" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TutorIllustration({ color }: { color: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 4 7 9v8c0 9.5 5.4 15 13 18 7.6-3 13-8.5 13-18V9L20 4Z"
        fill="#fff"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="m14 20.5 4.2 4.2 8.3-8.3" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlowPanel({
  role,
  tagline,
  items,
  illustration,
  tint,
  numberBg,
  numberColor,
  labelColor,
  lineColor,
}: {
  role: string;
  tagline: string;
  items: FlowItem[];
  illustration: React.ReactNode;
  tint: string;
  numberBg: string;
  numberColor: string;
  labelColor: string;
  lineColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const rows = root.querySelectorAll(".flow-row");
      const nums = root.querySelectorAll(".flow-num");
      const line = root.querySelector(".flow-line");
      const illo = root.querySelector(".flow-illustration");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });

        gsap
          .timeline({ scrollTrigger: { trigger: root, start: "top 82%", once: true } })
          .from(illo, { autoAlpha: 0, y: -10, scale: 0.85, duration: 0.5, ease: "back.out(2)" }, 0)
          .to(line, { scaleY: 1, duration: 0.9, ease: "power2.out" }, 0.05)
          .from(rows, { autoAlpha: 0, x: -18, stagger: 0.16, duration: 0.5, ease: "power3.out" }, 0.1)
          .from(nums, { scale: 0, rotate: -25, stagger: 0.16, duration: 0.45, ease: "back.out(2.6)" }, 0.1);

        const float = gsap.to(illo, {
          y: -6,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        const safetyCleanup = scrollRevealSafetyNet(
          root,
          () => illo != null && isGsapHidden(illo),
          () => {
            gsap.set([rows, nums], { autoAlpha: 1, x: 0, scale: 1, rotate: 0 });
            gsap.set(line, { scaleY: 1 });
            gsap.set(illo, { autoAlpha: 1, y: 0, scale: 1 });
          }
        );

        return () => {
          float.kill();
          safetyCleanup();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([rows, nums], { autoAlpha: 1, x: 0, scale: 1, rotate: 0 });
        gsap.set(line, { scaleY: 1 });
        gsap.set(illo, { autoAlpha: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="flow-panel group relative rounded-[var(--radius-lg)] border p-7 sm:p-8 h-full overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1.5"
      style={{ background: tint, borderColor: "var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "var(--shadow-lg)" }}
        aria-hidden
      />

      <div className="relative z-10 flex items-start justify-between gap-4 mb-7">
        <div>
          <h3 className="text-[21px] mb-1.5">{role}</h3>
          <p className="text-[13.5px]" style={{ color: labelColor }}>
            {tagline}
          </p>
        </div>
        <div
          className="flow-illustration w-14 h-14 flex-none rounded-2xl grid place-content-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: "color-mix(in srgb, #fff 55%, transparent)" }}
        >
          {illustration}
        </div>
      </div>

      <div className="relative z-10 grid gap-5">
        <span
          className="flow-line absolute left-[13px] top-1 bottom-1 w-[2px] rounded-full"
          style={{ background: lineColor }}
          aria-hidden
        />
        {items.map((f) => (
          <div key={f.n} className="flow-row relative flex gap-4">
            <span
              className="flow-num relative z-10 font-[var(--font-heading)] font-semibold text-[13px] w-7 h-7 rounded-full grid place-content-center flex-none"
              style={{ background: numberBg, color: numberColor, boxShadow: `0 0 0 4px ${tint}` }}
            >
              {f.n.replace(".", "")}
            </span>
            <span className="text-[15px] leading-[1.55] pt-0.5">{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlowPanels({
  studentFlow,
  tutorFlow,
}: {
  studentFlow: FlowItem[];
  tutorFlow: FlowItem[];
}) {
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
      <FlowPanel
        role="For students"
        tagline="Get matched, not marketed to."
        items={studentFlow}
        illustration={<StudentIllustration color="var(--color-accent-700)" />}
        tint="var(--color-accent-100)"
        numberBg="var(--color-accent)"
        numberColor="var(--color-bg)"
        labelColor="var(--color-accent-700)"
        lineColor="var(--color-accent-300)"
      />
      <FlowPanel
        role="For tutors"
        tagline="Verified leads, zero cold outreach."
        items={tutorFlow}
        illustration={<TutorIllustration color="var(--color-accent-2-700)" />}
        tint="var(--color-accent-2-100)"
        numberBg="var(--color-accent-2-700)"
        numberColor="#fff"
        labelColor="var(--color-accent-2-700)"
        lineColor="var(--color-accent-2-300)"
      />
    </div>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RequestIcon, ShieldMatchIcon, HandshakeIcon, FlowArrowIcon } from "@/components/home/step-icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEP_ICONS = [RequestIcon, ShieldMatchIcon, HandshakeIcon];

type Step = { n: string; title: string; body: string; bg: string; dot: string };

export function HowItWorksSteps({ steps }: { steps: Step[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const row = rowRef.current;
      if (!row) return;
      const cards = row.querySelectorAll(".step-card");
      const icons = row.querySelectorAll(".step-icon");
      const arrows = row.querySelectorAll(".step-arrow");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 32 });
        gsap.set(icons, { scale: 0.3, rotate: -18, autoAlpha: 0, transformOrigin: "center" });
        gsap.set(arrows, { autoAlpha: 0, x: -8 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          })
          .to(cards, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.6 }, 0)
          .to(icons, { scale: 1, rotate: 0, autoAlpha: 1, stagger: 0.15, duration: 0.45, ease: "back.out(2.4)" }, 0.15)
          .to(arrows, { autoAlpha: 1, x: 0, stagger: 0.15, duration: 0.4 }, 0.4);

        const flow = gsap.to(arrows, {
          x: 5,
          duration: 0.8,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.15,
          delay: 1.2,
        });
        return () => flow.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        gsap.set(icons, { autoAlpha: 1, scale: 1, rotate: 0 });
        gsap.set(arrows, { autoAlpha: 1, x: 0 });
      });

      return () => mm.revert();
    },
    { scope: rowRef, dependencies: [steps.length] }
  );

  return (
    <div ref={rowRef} className="flex flex-col lg:flex-row items-stretch gap-5">
      {steps.map((st, i) => {
        const Icon = STEP_ICONS[i] ?? RequestIcon;
        return (
          <div key={st.title} className="contents lg:flex lg:flex-1 lg:items-center lg:gap-5">
            <div
              className="step-card group relative flex-1 h-full rounded-[var(--radius-lg)] p-7 overflow-hidden border transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5"
              style={{ background: st.bg, borderColor: "var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "var(--shadow-lg)" }}
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -top-8 -right-6 font-[var(--font-heading)] text-[92px] font-bold leading-none select-none opacity-[0.08]"
                style={{ color: st.dot }}
                aria-hidden
              >
                {st.n}
              </span>

              <div
                className="step-icon relative z-10 w-11 h-11 rounded-full grid place-content-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: st.dot, color: "var(--color-bg)" }}
              >
                <Icon />
                <span
                  className="absolute -bottom-1 -right-1 w-[18px] h-[18px] rounded-full grid place-content-center text-[10px] font-bold font-[var(--font-heading)]"
                  style={{
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                    border: "1.5px solid var(--color-divider)",
                  }}
                >
                  {st.n}
                </span>
              </div>
              <h3 className="relative z-10 text-[21px] mt-4.5 mb-2">{st.title}</h3>
              <p
                className="relative z-10 text-[15px] leading-[1.55] m-0"
                style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
              >
                {st.body}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div
                className="step-arrow hidden lg:flex items-center justify-center flex-none"
                style={{ color: "var(--color-accent-2-300)" }}
                aria-hidden
              >
                <FlowArrowIcon />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

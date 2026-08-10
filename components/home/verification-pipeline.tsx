"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PipelineStep {
  label: string;
  time: string;
  dot: string;
  dotText: string;
  pulse: boolean;
  hasNext: boolean;
  done: boolean;
}

export function VerificationPipeline({
  items,
  requestId,
}: {
  items: PipelineStep[];
  requestId: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const nodes = root.querySelectorAll(".vp-node");
      const labels = root.querySelectorAll(".vp-label");
      const lines = root.querySelectorAll<HTMLDivElement>(".vp-line");
      const ring = root.querySelector(".vp-pulse-ring");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });

        tl.from(nodes, {
          scale: 0.3,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.28,
          ease: "back.out(2.4)",
        }, 0)
          .from(labels, {
            autoAlpha: 0,
            y: 8,
            duration: 0.4,
            stagger: 0.28,
          }, 0.12)
          .fromTo(
            lines,
            { scaleX: 0 },
            {
              scaleX: (_i, el) => parseFloat(el.dataset.fill ?? "1"),
              duration: 0.55,
              stagger: 0.28,
              transformOrigin: "left center",
              ease: "power2.out",
            },
            0.3
          );

        if (ring) {
          tl.fromTo(
            ring,
            { scale: 1, autoAlpha: 0.6 },
            {
              scale: 1.7,
              autoAlpha: 0,
              duration: 1.3,
              ease: "power1.out",
              repeat: -1,
            },
            "-=0.2"
          );
        }

        return scrollRevealSafetyNet(
          root,
          () => isGsapHidden(nodes[0]),
          () => {
            gsap.set(nodes, { autoAlpha: 1, scale: 1 });
            gsap.set(labels, { autoAlpha: 1, y: 0 });
            gsap.set(lines, { scaleX: (_i, el) => parseFloat(el.dataset.fill ?? "1") });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(nodes, { autoAlpha: 1, scale: 1 });
        gsap.set(labels, { autoAlpha: 1, y: 0 });
        gsap.set(lines, { scaleX: (_i, el) => parseFloat(el.dataset.fill ?? "1") });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [items] }
  );

  return (
    <div ref={rootRef}>
      <div
        className="text-[12px] uppercase"
        style={{ letterSpacing: "0.04em", color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
      >
        Live verification pipeline · Request #{requestId}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mt-1.5 w-full">
        {items.map((p, i) => (
          <div key={p.label} className={`flex items-center ${p.hasNext ? "sm:flex-1" : "flex-none"}`}>
            <div className="flex items-center gap-2.5 flex-none">
              <div
                className="vp-node w-[30px] h-[30px] rounded-full grid place-content-center flex-none relative"
                style={{ background: p.dot, color: p.dotText }}
              >
                {p.pulse && (
                  <span
                    className="vp-pulse-ring absolute -inset-1 rounded-full"
                    style={{ border: "2px solid var(--color-verified)" }}
                    aria-hidden
                  />
                )}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div className="vp-label">
                <div className="font-[var(--font-heading)] font-semibold text-[14.5px]">{p.label}</div>
                <div className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                  {p.time}
                </div>
              </div>
            </div>
            {p.hasNext && (
              <div
                className="vp-line hidden sm:block sm:flex-1 h-0.5 mx-3 min-w-[24px]"
                data-fill={items[i + 1]?.done ? "1" : "0.45"}
                style={{ background: "var(--color-divider)" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { StepIllustration } from "@/components/home/step-illustrations";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

// A gentle S-curve the connector "signal" travels along — passes through the same
// vertical center on both ends so it lines up with the illustration row regardless of card height.
const CONNECTOR_PATH = "M4,24 C44,-6 76,54 116,24";

type Step = { n: string; title: string; short: string; body: string; bg: string; dot: string };

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function StepConnector() {
  const gradientId = useId();
  return (
    <div
      className="step-connector hidden lg:flex items-center justify-center flex-none"
      style={{ width: 96, height: 48 }}
      aria-hidden
    >
      <svg viewBox="0 0 120 48" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-accent-400)" />
            <stop offset="100%" stopColor="var(--color-accent-700)" />
          </linearGradient>
        </defs>
        <path
          className="connector-bg"
          d={CONNECTOR_PATH}
          stroke="var(--color-divider)"
          strokeWidth={2}
          strokeDasharray="1 7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className="connector-progress"
          d={CONNECTOR_PATH}
          stroke={`url(#${gradientId})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
        <circle className="connector-dot" r={4.5} style={{ fill: "var(--color-accent-500)", filter: "drop-shadow(0 0 4px var(--color-accent-400))" }} />
      </svg>
    </div>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const ping = contextSafe((card: HTMLElement) => {
    if (reduced()) return;
    const ring = card.querySelector(".step-ping");
    const illo = card.querySelector(".step-illo");
    if (ring) {
      gsap.killTweensOf(ring);
      gsap.fromTo(ring, { scale: 1, autoAlpha: 0.5 }, { scale: 1.7, autoAlpha: 0, duration: 0.65, ease: "power2.out" });
    }
    if (illo) {
      gsap.killTweensOf(illo);
      gsap.fromTo(illo, { scale: 1 }, { scale: 1.08, duration: 0.22, ease: "back.out(3)", yoyo: true, repeat: 1 });
    }
  });

  const toggleDetails = contextSafe(() => {
    const el = detailsRef.current;
    if (!el) return;
    const next = !open;
    setOpen(next);
    gsap.killTweensOf(el);
    if (reduced()) {
      gsap.set(el, { height: next ? "auto" : 0, autoAlpha: next ? 1 : 0 });
      return;
    }
    gsap.to(el, { height: next ? "auto" : 0, autoAlpha: next ? 1 : 0, duration: 0.4, ease: "power2.inOut" });
  });

  return (
    <div
      ref={cardRef}
      className="step-card group relative flex-1 h-full rounded-[var(--radius-lg)] p-6 overflow-hidden border transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5"
      style={{ background: step.bg, borderColor: "var(--color-divider)", boxShadow: "var(--shadow-sm)" }}
      onMouseEnter={(e) => canHover() && ping(e.currentTarget)}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "var(--shadow-lg)" }}
        aria-hidden
      />

      <div className="relative flex items-start justify-between">
        <div className="relative w-20 h-20">
          <span className="step-ping pointer-events-none absolute inset-0 rounded-full" style={{ background: step.dot, opacity: 0 }} aria-hidden />
          <div className="step-illo relative w-20 h-20">
            <StepIllustration index={index} line={step.dot} className="w-full h-full" />
          </div>
          <span
            className="absolute -bottom-1 -right-1 w-[22px] h-[22px] rounded-full grid place-content-center text-[11px] font-bold font-[var(--font-heading)]"
            style={{ background: "var(--color-bg)", color: "var(--color-text)", border: "1.5px solid var(--color-divider)" }}
          >
            {step.n}
          </span>
        </div>
      </div>

      <h3 className="relative z-10 text-[20px] mt-3.5 mb-1">{step.title}</h3>
      <p className="relative z-10 text-[14px] leading-snug m-0" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
        {step.short}
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleDetails();
        }}
        aria-expanded={open}
        className="relative z-10 mt-2.5 inline-flex items-center gap-1 text-[12.5px] font-semibold cursor-pointer"
        style={{ color: step.dot }}
      >
        {open ? "Show less" : "More detail"}
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div ref={detailsRef} className="relative z-10 overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="text-[13.5px] leading-[1.55] m-0 pt-2.5" style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}>
          {step.body}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSteps({ steps }: { steps: Step[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const row = rowRef.current;
      if (!row) return;
      const cards = row.querySelectorAll(".step-card");
      const illos = row.querySelectorAll(".step-illo");
      const connectorPaths = row.querySelectorAll<SVGPathElement>(".connector-progress");
      const connectorDots = row.querySelectorAll<SVGCircleElement>(".connector-dot");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 32 });
        gsap.set(illos, { scale: 0.3, rotate: -18, autoAlpha: 0, transformOrigin: "center" });
        gsap.set(connectorPaths, { drawSVG: "0% 0%" });
        connectorDots.forEach((dot, i) => {
          gsap.set(dot, { motionPath: { path: connectorPaths[i], align: connectorPaths[i], alignOrigin: [0.5, 0.5], start: 0, end: 0 } });
        });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });

        tl.to(cards, { autoAlpha: 1, y: 0, stagger: 0.16, duration: 0.6 }, 0);
        tl.to(illos, { scale: 1, rotate: 0, autoAlpha: 1, stagger: 0.16, duration: 0.5, ease: "back.out(2.2)" }, 0.12);

        connectorPaths.forEach((path, i) => {
          const dot = connectorDots[i];
          const t = 0.6 + i * 0.55;
          tl.to(path, { drawSVG: "0% 100%", duration: 0.5, ease: "power1.inOut" }, t);
          tl.to(
            dot,
            { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 }, duration: 0.5, ease: "power1.inOut" },
            t
          );
          tl.to(illos[i + 1], { scale: 1.12, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, t + 0.42);
        });

        // Safety net: this scrollTrigger's start position is calculated once and can
        // go stale if web fonts reflow layout afterward (see ScrollTriggerGuard) or if
        // something interrupts GSAP before it fires, leaving the cards/icons stuck at
        // their hidden initial state (autoAlpha:0, scale:0.3) forever. A plain
        // IntersectionObserver doesn't depend on any cached scroll math, so once the
        // row is actually on screen, give the timeline a moment to run, then force the
        // finished state if it hasn't.
        const io = new IntersectionObserver(
          (entries) => {
            if (!entries[0].isIntersecting) return;
            io.disconnect();
            window.setTimeout(() => {
              if (gsap.getProperty(cards[0], "autoAlpha") === 0) {
                gsap.set(cards, { autoAlpha: 1, y: 0 });
                gsap.set(illos, { scale: 1, rotate: 0, autoAlpha: 1 });
                gsap.set(connectorPaths, { drawSVG: "0% 100%" });
                connectorDots.forEach((dot, i) => {
                  gsap.set(dot, {
                    motionPath: { path: connectorPaths[i], align: connectorPaths[i], alignOrigin: [0.5, 0.5], start: 0, end: 1 },
                  });
                });
              }
            }, 1200);
          },
          { threshold: 0.01 }
        );
        io.observe(row);
        return () => io.disconnect();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        gsap.set(illos, { autoAlpha: 1, scale: 1, rotate: 0 });
        gsap.set(connectorPaths, { drawSVG: "0% 100%" });
        connectorDots.forEach((dot, i) => {
          gsap.set(dot, { motionPath: { path: connectorPaths[i], align: connectorPaths[i], alignOrigin: [0.5, 0.5], start: 0, end: 1 } });
        });
      });

      return () => mm.revert();
    },
    { scope: rowRef, dependencies: [steps.length] }
  );

  return (
    <div ref={rowRef} className="flex flex-col lg:flex-row items-stretch gap-5">
      {steps.map((st, i) => (
        <div key={st.title} className="contents lg:flex lg:flex-1 lg:items-center lg:gap-5">
          <StepCard step={st} index={i} />
          {i < steps.length - 1 && <StepConnector />}
        </div>
      ))}
    </div>
  );
}

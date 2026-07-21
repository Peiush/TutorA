"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function FaqIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const bubble = root.querySelector(".faq-bubble-main");
      const dot = root.querySelector(".faq-bubble-dot");

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(root, { autoAlpha: 0, y: -12, scale: 0.85 });
        gsap.to(root, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)", delay: 0.1 });

        const float = gsap.to(bubble, { y: -8, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
        const floatDot = gsap.to(dot, {
          y: 6,
          duration: 2.1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.3,
        });
        return () => {
          float.kill();
          floatDot.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { autoAlpha: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative hidden sm:block w-20 h-20 flex-none">
      <div
        className="faq-bubble-main absolute top-0 right-0 w-16 h-16 rounded-2xl grid place-content-center rotate-6"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-2-700), var(--color-accent-2-500))",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 5h16v11H9l-4 4V5Z" />
          <path d="M9 9.5h6M9 12.5h4" />
        </svg>
      </div>
      <div
        className="faq-bubble-dot absolute -bottom-1 left-0 w-8 h-8 rounded-full grid place-content-center"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-600), var(--color-accent-400))",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <span className="font-[var(--font-heading)] font-bold text-[15px]" style={{ color: "#fff" }}>
          ?
        </span>
      </div>
    </div>
  );
}

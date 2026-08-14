"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const items = list.querySelectorAll(".faq-item");
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { autoAlpha: 0, y: 24 });
        gsap
          .timeline({ scrollTrigger: { trigger: list, start: "top 85%", once: true } })
          .to(items, { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.5, ease: "power3.out" });

        return scrollRevealSafetyNet(
          list,
          () => isGsapHidden(items[0]),
          () => {
            gsap.set(items, { autoAlpha: 1, y: 0 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: listRef, dependencies: [faqs.length] }
  );

  return (
    <div ref={listRef} className="grid gap-3.5">
      {faqs.map((f, i) => (
        <FaqItem key={f.q} q={f.q} a={f.a} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </div>
  );
}

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const body = bodyRef.current;
      const icon = iconRef.current;
      if (!body || !icon) return;

      gsap.to(icon, {
        rotate: isOpen ? 45 : 0,
        duration: 0.3,
        ease: "power2.out",
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (isOpen) {
          gsap.set(body, { display: "block" });
          gsap.fromTo(
            body,
            { height: 0, opacity: 0 },
            { height: "auto", opacity: 1, duration: 0.32, ease: "power2.out" }
          );
        } else {
          gsap.to(body, {
            height: 0,
            opacity: 0,
            duration: 0.26,
            ease: "power2.in",
            onComplete: () => gsap.set(body, { display: "none" }),
          });
        }
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(body, { display: isOpen ? "block" : "none", height: "auto", opacity: 1 });
      });

      return () => mm.revert();
    },
    { dependencies: [isOpen], scope: bodyRef }
  );

  return (
    <div
      className={`faq-item group rounded-[18px] sm:rounded-[var(--radius-lg)] overflow-hidden border transition-[box-shadow,border-color,background-color] duration-300 ${
        isOpen ? "" : "hover:shadow-[var(--shadow-md)] hover:border-[var(--color-accent-300)]"
      }`}
      style={{
        background: isOpen ? "var(--color-bg)" : "var(--color-surface)",
        borderColor: isOpen ? "var(--color-accent-400)" : "var(--color-divider)",
        boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer px-4 py-3.5 sm:px-5 sm:py-[18px]"
      >
        <h3 className="m-0 font-[var(--font-heading)] font-semibold text-[14.5px] sm:text-[16.5px]">{q}</h3>
        <span
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full grid place-content-center flex-none transition-[background-color,transform] duration-300 group-hover:scale-105"
          style={{ background: isOpen ? "var(--color-accent-600)" : "var(--color-accent-100)" }}
        >
          <svg
            ref={iconRef}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "#fff" : "var(--color-accent-700)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div ref={bodyRef} style={{ display: "none", height: 0, opacity: 0 }}>
        <p
          className="text-[13.5px] sm:text-[15px] leading-[1.6] m-0 px-4 pb-3.5 sm:px-5 sm:pb-5"
          style={{
            color: "color-mix(in srgb, var(--color-text) 74%, transparent)",
            borderTop: "1px solid var(--color-divider)",
            paddingTop: 14,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

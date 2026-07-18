"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid gap-3">
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
      className="card m-0 p-0 overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
        style={{ padding: "18px 22px" }}
      >
        <span className="font-[var(--font-heading)] font-semibold text-[16.5px]">{q}</span>
        <svg
          ref={iconRef}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-accent-700)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="flex-none"
          aria-hidden
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div ref={bodyRef} style={{ display: "none", height: 0, opacity: 0 }}>
        <p
          className="text-[15px] leading-[1.6] m-0"
          style={{
            color: "color-mix(in srgb, var(--color-text) 74%, transparent)",
            padding: "0 22px 20px",
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

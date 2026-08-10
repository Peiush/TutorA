"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { FIND_TUTOR_FAQS } from "@/lib/find-tutor-faqs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FindTutorFaq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } })
          .from(".ftf-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power3.out" })
          .from(".ftf-heading", { autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.25")
          .from(".ftf-copy", { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.3")
          .from(".ftf-item", { autoAlpha: 0, y: 22, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.2");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".ftf-tag, .ftf-heading, .ftf-copy, .ftf-item", { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="mt-16 md:mt-24 mb-4">
      <div className="max-w-[720px] mx-auto text-center mb-10">
        <Tag variant="accent-2" className="ftf-tag text-[12px] px-3.5 py-1.5">
          FAQ
        </Tag>
        <h2 className="ftf-heading text-[clamp(26px,3.2vw,36px)] mt-4 mb-3">
          Frequently asked questions about finding a tutor
        </h2>
        <p
          className="ftf-copy text-[15px] leading-relaxed max-w-[54ch] mx-auto"
          style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}
        >
          Everything families ask us before sending their first tutor request.
        </p>
      </div>

      <div className="grid gap-3.5 max-w-[760px] mx-auto">
        {FIND_TUTOR_FAQS.map((f, i) => (
          <FaqItem key={f.q} q={f.q} a={f.a} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </div>
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

      gsap.to(icon, { rotate: isOpen ? 45 : 0, duration: 0.3, ease: "power2.out" });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (isOpen) {
          gsap.set(body, { display: "block" });
          gsap.fromTo(body, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.32, ease: "power2.out" });
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
      className={`ftf-item group rounded-[var(--radius-lg)] overflow-hidden border transition-[box-shadow,border-color,background-color] duration-300 ${
        isOpen ? "" : "hover:shadow-[var(--shadow-md)] hover:border-[var(--color-accent-2-400)]"
      }`}
      style={{
        background: isOpen ? "var(--color-surface)" : "color-mix(in srgb, var(--color-surface) 55%, transparent)",
        borderColor: isOpen ? "var(--color-accent-2-500)" : "var(--color-divider)",
        boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)",
      }}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
          style={{ padding: "18px 22px" }}
        >
          <h3 className="m-0 font-[var(--font-heading)] font-semibold text-[16px]">{q}</h3>
          <span
            className="w-8 h-8 rounded-full grid place-content-center flex-none transition-[background-color,transform] duration-300 group-hover:scale-105"
            style={{ background: isOpen ? "var(--color-accent-2-700)" : "var(--color-accent-2-100)" }}
          >
            <svg
              ref={iconRef}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isOpen ? "#fff" : "var(--color-accent-2-700)"}
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>
      <div ref={bodyRef} style={{ display: "none", height: 0, opacity: 0 }}>
        <p
          className="text-[14.5px] leading-[1.65] m-0"
          style={{
            color: "color-mix(in srgb, var(--color-text) 76%, transparent)",
            padding: "0 22px 20px",
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

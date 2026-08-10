"use client";

import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { FaqIllustration } from "@/components/about/faq-illustration";
import { InfoIcon, CompassIcon, ShieldCheckIcon, TagIcon, ClockIcon, BookIcon } from "@/components/home/faq-icons";
import type { Faq } from "@/components/home/homepage-faq";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const faqIcons = [InfoIcon, CompassIcon, ShieldCheckIcon, TagIcon, ClockIcon, BookIcon];

function FaqItem({
  faq,
  index,
  extra,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  index: number;
  extra?: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const Icon = faqIcons[index % faqIcons.length];

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
          gsap.fromTo(body, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.34, ease: "power2.out" });
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
      className={`faq-item group rounded-[18px] overflow-hidden border transition-[box-shadow,border-color,background-color] duration-300 ${
        isOpen ? "" : "hover:shadow-[var(--shadow-md)] hover:border-[var(--color-accent-300)]"
      }`}
      style={{
        background: isOpen ? "var(--color-bg)" : "color-mix(in srgb, var(--color-bg) 60%, transparent)",
        borderColor: isOpen ? "var(--color-accent-400)" : "var(--color-divider)",
        boxShadow: isOpen ? "var(--shadow-md)" : "none",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-3.5 text-left cursor-pointer"
        style={{ padding: "16px 18px" }}
      >
        <span
          className="grid place-content-center w-9 h-9 rounded-full flex-none transition-colors duration-300"
          style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
        >
          <Icon width={17} height={17} />
        </span>
        <h3 className="m-0 flex-1 font-[var(--font-heading)] font-semibold text-[16px]">{faq.question}</h3>
        <span
          className="w-8 h-8 rounded-full grid place-content-center flex-none transition-[background-color,transform] duration-300 group-hover:scale-105"
          style={{ background: isOpen ? "var(--color-accent-600)" : "var(--color-accent-100)" }}
        >
          <svg
            ref={iconRef}
            width="16"
            height="16"
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
        <div style={{ padding: "0 18px 20px 66px", borderTop: "1px solid var(--color-divider)", marginLeft: 0 }}>
          <p
            className="text-[14.5px] leading-relaxed m-0 pt-4"
            style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
          >
            {faq.answer}
            {faq.question.startsWith("What subjects") && (
              <>
                {" "}
                <a
                  href="https://ies.ed.gov/learn/blog/how-high-quality-small-group-tutoring-can-accelerate-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                  style={{ color: "var(--color-accent-2-700)" }}
                >
                  Read the IES research on high-quality tutoring
                </a>
                .
              </>
            )}
          </p>
          {extra}
        </div>
      </div>
    </div>
  );
}

export function FaqShowcase({
  faqs,
  steps,
}: {
  faqs: Faq[];
  steps: { n: string; title: string; body: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const tag = root.querySelector(".faq-tag");
      const heading = root.querySelector(".faq-heading");
      const panel = root.querySelector(".faq-panel");
      const items = root.querySelectorAll(".faq-item");
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([tag, heading], { autoAlpha: 0, y: 20 });
        gsap.set(panel, { autoAlpha: 0, y: 30, scale: 0.98 });
        gsap.set(items, { autoAlpha: 0, y: 18 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });

        tl.to(tag, { autoAlpha: 1, y: 0, duration: 0.5 })
          .to(heading, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
          .to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 }, "-=0.3")
          .to(items, { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.5 }, "-=0.35");

        return scrollRevealSafetyNet(
          root,
          () => isGsapHidden(items[0]),
          () => {
            gsap.set([tag, heading, panel, ...items], { autoAlpha: 1, y: 0, scale: 1 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([tag, heading, panel, ...items], { autoAlpha: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [faqs.length] }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--color-accent-200)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[6%] w-[260px] h-[260px] rounded-full blur-3xl opacity-15"
        style={{ background: "var(--color-accent-2-200)" }}
        aria-hidden
      />

      <div className="relative max-w-[880px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,80px)]">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <Tag variant="accent" className="faq-tag text-[12px] px-3.5 py-1.5">
              Common questions
            </Tag>
            <h2 className="faq-heading text-[clamp(26px,3.2vw,36px)] mt-4">Still have questions?</h2>
          </div>
          <FaqIllustration />
        </div>

        <div
          className="faq-panel rounded-[28px] border p-2.5 sm:p-3.5"
          style={{
            background: "color-mix(in srgb, var(--color-accent-100) 35%, var(--color-bg))",
            borderColor: "var(--color-accent-200)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div className="grid gap-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
                extra={
                  faq.question.startsWith("How do I find") ? (
                    <ol
                      className="mt-2.5 pl-5 flex flex-col gap-1 text-[14.5px] leading-relaxed"
                      style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
                    >
                      {steps.map((s) => (
                        <li key={s.n}>
                          <strong style={{ color: "var(--color-text)" }}>{s.title}.</strong> {s.body}
                        </li>
                      ))}
                    </ol>
                  ) : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

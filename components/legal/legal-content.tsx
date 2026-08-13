"use client";

import { useRef, useState, type SVGProps } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type LegalSection = {
  id: string;
  title: string;
  icon: string;
  body?: string[];
  list?: string[];
};

function Icon({ d, ...props }: { d: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d={d} />
    </svg>
  );
}

function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SectionCard({ id, title, icon, body, list, index }: LegalSection & { index: number }) {
  const tinted = index % 2 === 1;
  const badgeBg = tinted ? "var(--color-accent-2-100)" : "var(--color-accent-100)";
  const badgeFg = tinted ? "var(--color-accent-2-700)" : "var(--color-accent-700)";
  const accentLine = tinted ? "var(--color-accent-2-500)" : "var(--color-accent-500)";

  return (
    <section id={id} className="scroll-mt-24">
      <Reveal>
        <div
          className="legal-card card elev-sm relative overflow-hidden"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)" }}
        >
          <span
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: accentLine }}
            aria-hidden
          />
          <div className="flex items-start gap-3.5">
            <span
              className="grid place-content-center rounded-2xl flex-none"
              style={{ width: 44, height: 44, background: badgeBg, color: badgeFg, boxShadow: "var(--shadow-sm)" }}
            >
              <Icon d={icon} />
            </span>
            <div className="flex-1 min-w-0 pt-0.5">
              <span
                className="block text-[11px] font-semibold tracking-[0.08em] uppercase mb-1"
                style={{ color: badgeFg }}
              >
                Section {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-[19px] sm:text-[21px] leading-tight">{title}</h2>
            </div>
          </div>
          <div className="mt-1 pl-0 sm:pl-[58px]">
            {body?.map((p, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.65] mt-3"
                style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}
              >
                {p}
              </p>
            ))}
            {list && (
              <ul className="flex flex-col gap-2.5 mt-3">
                {list.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[15px] leading-[1.55]" style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
                    <span
                      className="mt-[7px] w-1.5 h-1.5 rounded-full flex-none"
                      style={{ background: accentLine }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function LegalContent({ sections }: { sections: LegalSection[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const jumpSelectRef = useRef<HTMLSelectElement>(null);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useGSAP(
    () => {
      const root = rootRef.current;
      const progress = progressRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (progress) {
          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(progress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 15%", end: "bottom bottom", scrub: 0.3 },
          });
        }

        sections.forEach(({ id }) => {
          const section = root.querySelector(`#${id}`);
          const link = root.querySelector(`.toc-link[href="#${id}"]`);
          ScrollTrigger.create({
            trigger: section,
            start: "top 40%",
            end: "bottom 40%",
            toggleClass: link ? { targets: link, className: "is-active" } : undefined,
            onToggle: (self) => {
              if (self.isActive) setActiveId(id);
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [sections] }
  );

  return (
    <div ref={rootRef} className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,96px)]">
      {/* reading-progress bar */}
      <div
        className="sticky top-0 z-10 h-[3px] w-full rounded-full overflow-hidden mb-6 lg:mb-8"
        style={{ background: "var(--color-divider)" }}
        aria-hidden
      >
        <div
          ref={progressRef}
          className="h-full w-full"
          style={{ background: "linear-gradient(90deg, var(--color-accent-500), var(--color-accent-2-500))" }}
        />
      </div>

      {/* mobile: clear "jump to section" dropdown replaces the ambiguous scroll strip */}
      <div className="lg:hidden sticky top-3 z-[9] mb-6">
        <div className="relative">
          <select
            ref={jumpSelectRef}
            aria-label="Jump to section"
            value={activeId}
            onChange={(e) => {
              const el = document.getElementById(e.target.value);
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="w-full appearance-none rounded-2xl pl-4 pr-11 py-3.5 text-[14.5px] font-semibold"
            style={{
              background: "var(--color-accent-2-900)",
              color: "#fff",
              boxShadow: "var(--shadow-md)",
              border: "1px solid color-mix(in srgb, var(--color-accent-2-900) 60%, black)",
            }}
          >
            {sections.map(({ id, title }, i) => (
              <option key={id} value={id} style={{ color: "var(--color-text)" }}>
                {String(i + 1).padStart(2, "0")} — {title}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 grid place-content-center rounded-full"
            style={{ width: 22, height: 22, background: "var(--color-accent-500)", color: "var(--color-accent-2-900)" }}
            aria-hidden
          >
            <ChevronDown />
          </span>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr] items-start">
        <nav
          className="hidden lg:flex lg:sticky lg:top-8 lg:flex-col gap-1"
          aria-label="Table of contents"
        >
          {sections.map(({ id, title }) => (
            <a key={id} href={`#${id}`} className="toc-link">
              {title}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-5 lg:gap-6">
          {sections.map((section, i) => (
            <SectionCard key={section.id} {...section} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

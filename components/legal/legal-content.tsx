"use client";

import { useRef, type SVGProps } from "react";
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
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d={d} />
    </svg>
  );
}

function SectionCard({ id, title, icon, body, list }: LegalSection) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <div className="card elev-sm" style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)" }}>
          <div className="flex items-center gap-3">
            <span
              className="grid place-content-center rounded-xl flex-none"
              style={{ width: 38, height: 38, background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
            >
              <Icon d={icon} />
            </span>
            <h2 className="text-[19px] sm:text-[21px]">{title}</h2>
          </div>
          <div className="mt-1">
            {body?.map((p, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.65] mt-3"
                style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}
              >
                {p}
              </p>
            ))}
            {list && (
              <ul className="flex flex-col gap-2.5 mt-3">
                {list.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[15px] leading-[1.55]" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                    <span
                      className="mt-[7px] w-1.5 h-1.5 rounded-full flex-none"
                      style={{ background: "var(--color-accent-500)" }}
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
          if (!section || !link) return;
          ScrollTrigger.create({
            trigger: section,
            start: "top 40%",
            end: "bottom 40%",
            toggleClass: { targets: link, className: "is-active" },
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
        className="sticky top-0 z-10 h-[3px] w-full rounded-full overflow-hidden mb-8"
        style={{ background: "var(--color-divider)" }}
        aria-hidden
      >
        <div ref={progressRef} className="h-full w-full" style={{ background: "var(--color-accent-500)" }} />
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr] items-start">
        <nav
          className="hero-strip lg:sticky lg:top-8 flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 -mx-1 px-1"
          aria-label="Table of contents"
        >
          {sections.map(({ id, title }) => (
            <a key={id} href={`#${id}`} className="toc-link">
              {title}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <SectionCard key={section.id} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}

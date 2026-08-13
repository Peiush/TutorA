"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import {
  VettingIcon,
  PricingIcon,
  ReviewIcon,
  ClockIcon,
  CheckCircleIcon,
  DashCircleIcon,
  StarIcon,
} from "@/components/home/comparison-icons";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Row = {
  aspect: string;
  open: string;
  tutora: string;
  Icon: typeof VettingIcon;
};

const comparisonRows: Row[] = [
  {
    aspect: "Tutor vetting",
    open: "Anyone can list themselves",
    tutora: "Every tutor manually reviewed before publishing",
    Icon: VettingIcon,
  },
  {
    aspect: "Pricing visibility",
    open: "Often unclear until you make contact",
    tutora: "Hourly rate shown upfront on every profile",
    Icon: PricingIcon,
  },
  {
    aspect: "Who reviews requests",
    open: "No review — first response wins",
    tutora: "Our team reviews every request before matching",
    Icon: ReviewIcon,
  },
  {
    aspect: "Typical time to a match",
    open: "You search and vet candidates yourself",
    tutora: "~31 hours average, pre-verified tutors",
    Icon: ClockIcon,
  },
];

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function ComparisonShowdown() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const tag = root.querySelector(".cmp-tag");
      const heading = root.querySelector(".cmp-heading");
      const sub = root.querySelector(".cmp-sub");
      const panels = root.querySelectorAll(".cmp-panel");
      const headerCells = root.querySelectorAll(".cmp-head-cell");
      const rows = root.querySelectorAll(".cmp-row");
      const rowIcons = root.querySelectorAll(".cmp-row-icon");
      const winIcons = root.querySelectorAll(".cmp-win-icon, .cmp-win-icon-m");
      const badge = root.querySelectorAll(".cmp-badge, .cmp-badge-m");
      const mcards = root.querySelectorAll(".cmp-mcard");
      const mIcons = root.querySelectorAll(".cmp-mcard-icon");
      if (!panels.length || (!rows.length && !mcards.length)) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([tag, heading, sub], { autoAlpha: 0, y: 20 });
        gsap.set(panels, { autoAlpha: 0, y: 36, scale: 0.98 });
        gsap.set(headerCells, { autoAlpha: 0, y: -10 });
        gsap.set(badge, { autoAlpha: 0, scale: 0.5 });
        gsap.set(rows, { autoAlpha: 0, x: -24 });
        gsap.set(rowIcons, { autoAlpha: 0, scale: 0.4, rotate: -12 });
        gsap.set(mcards, { autoAlpha: 0, y: 28, scale: 0.97 });
        gsap.set(mIcons, { autoAlpha: 0, scale: 0.4, rotate: -12 });
        gsap.set(winIcons, { autoAlpha: 0, scale: 0.3 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 92%", once: true },
        });

        tl.to(tag, { autoAlpha: 1, y: 0, duration: 0.35 })
          .to(heading, { autoAlpha: 1, y: 0, duration: 0.42 }, "-=0.2")
          .to(sub, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.25")
          .to(panels, { autoAlpha: 1, y: 0, scale: 1, duration: 0.42 }, "-=0.18")
          .to(headerCells, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.3 }, "-=0.2")
          .to(badge, { autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.35, ease: "back.out(2.6)" }, "-=0.14")
          .to(rows, { autoAlpha: 1, x: 0, stagger: 0.07, duration: 0.35 }, "-=0.18")
          .to(mcards, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.35 }, "-=0.18")
          .to(
            rowIcons,
            { autoAlpha: 1, scale: 1, rotate: 0, stagger: 0.07, duration: 0.32, ease: "back.out(2.4)" },
            "-=0.35"
          )
          .to(
            mIcons,
            { autoAlpha: 1, scale: 1, rotate: 0, stagger: 0.07, duration: 0.32, ease: "back.out(2.4)" },
            "-=0.35"
          )
          .to(
            winIcons,
            { autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.28, ease: "back.out(2.8)" },
            "-=0.28"
          );

        return scrollRevealSafetyNet(
          root,
          () => isGsapHidden(panels[0]),
          () => {
            gsap.set(
              [tag, heading, sub, ...panels, ...headerCells, ...badge, ...rows, ...rowIcons, ...mcards, ...mIcons, ...winIcons],
              { autoAlpha: 1, x: 0, y: 0, scale: 1, rotate: 0 }
            );
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [tag, heading, sub, ...panels, ...headerCells, ...badge, ...rows, ...rowIcons, ...mcards, ...mIcons, ...winIcons],
          { autoAlpha: 1, x: 0, y: 0, scale: 1, rotate: 0 }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const pulseIcon = (row: HTMLElement, selector = ".cmp-win-icon") => {
    if (!canHover()) return;
    const win = row.querySelector(selector);
    if (!win) return;
    gsap.killTweensOf(win);
    gsap.fromTo(win, { scale: 1 }, { scale: 1.25, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
      <div
        className="pointer-events-none absolute top-0 left-[10%] w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
        style={{ background: "var(--color-accent-200)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[6%] w-[280px] h-[280px] rounded-full blur-3xl opacity-20"
        style={{ background: "var(--color-accent-2-200)" }}
        aria-hidden
      />

      <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,72px)]">
        <Tag variant="accent" className="cmp-tag text-[12px] px-3.5 py-1.5">
          Why it&apos;s different
        </Tag>
        <h2 className="cmp-heading text-[clamp(24px,3vw,32px)] mt-4 mb-2.5 max-w-[28ch]">
          An open marketplace vs. TutorA&apos;s reviewed model
        </h2>
        <p
          className="cmp-sub text-[15px] max-w-[58ch] mb-9"
          style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
        >
          Same goal, different process. Here&apos;s what changes when every listing and request passes through a
          human review before it reaches you.
        </p>

        <div className="cmp-panel hidden sm:block overflow-x-auto -mx-1 px-1 pt-5">
          <table className="w-full min-w-[560px] text-[14px] border-separate" style={{ borderSpacing: 0 }}>
            <caption className="sr-only">Comparison of a typical open tutor marketplace against TutorA</caption>
            <thead>
              <tr>
                <th scope="col" className="cmp-head-cell text-left py-3 pr-4 font-semibold align-bottom">
                  Decision factor
                </th>
                <th
                  scope="col"
                  className="cmp-head-cell text-left py-3 px-4 font-semibold align-bottom rounded-t-[16px]"
                  style={{ background: "var(--color-bg)", color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}
                >
                  Open marketplace
                </th>
                <th
                  scope="col"
                  className="cmp-head-cell relative text-left py-3 px-4 font-semibold align-bottom rounded-t-[16px] border-x border-t"
                  style={{
                    background: "color-mix(in srgb, var(--color-accent-100) 70%, var(--color-bg))",
                    borderColor: "var(--color-accent-300)",
                    color: "var(--color-accent-800)",
                  }}
                >
                  <span
                    className="cmp-badge absolute -top-3.5 right-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide"
                    style={{ background: "var(--color-accent-500)", color: "#fff", boxShadow: "var(--shadow-md)" }}
                  >
                    <StarIcon width={11} height={11} />
                    Recommended
                  </span>
                  TutorA
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => {
                const isLast = i === comparisonRows.length - 1;
                const { Icon } = row;
                return (
                  <tr
                    key={row.aspect}
                    className="cmp-row group transition-colors duration-200"
                    onMouseEnter={(e) => pulseIcon(e.currentTarget)}
                  >
                    <th
                      scope="row"
                      className="text-left py-3.5 pr-4 font-medium align-middle"
                      style={{ borderBottom: isLast ? "none" : "1px solid var(--color-divider)" }}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className="cmp-row-icon grid place-content-center w-7 h-7 rounded-full flex-none"
                          style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                        >
                          <Icon width={15} height={15} />
                        </span>
                        {row.aspect}
                      </span>
                    </th>
                    <td
                      className="py-3.5 px-4 align-middle transition-colors duration-200 group-hover:bg-[var(--color-neutral-100)]"
                      style={{
                        color: "color-mix(in srgb, var(--color-text) 68%, transparent)",
                        background: "var(--color-bg)",
                        borderBottom: isLast ? "none" : "1px solid var(--color-divider)",
                      }}
                    >
                      <span className="flex items-start gap-2">
                        <DashCircleIcon
                          width={15}
                          height={15}
                          className="flex-none mt-0.5"
                          style={{ color: "var(--color-neutral-400)" }}
                        />
                        {row.open}
                      </span>
                    </td>
                    <td
                      className="py-3.5 px-4 align-middle font-medium border-x transition-shadow duration-200"
                      style={{
                        color: "var(--color-text)",
                        background: "color-mix(in srgb, var(--color-accent-100) 42%, var(--color-bg))",
                        borderColor: "var(--color-accent-300)",
                        borderBottom: isLast ? "1px solid var(--color-accent-300)" : "1px solid color-mix(in srgb, var(--color-accent-300) 55%, transparent)",
                        borderBottomLeftRadius: isLast ? 16 : 0,
                        borderBottomRightRadius: isLast ? 16 : 0,
                      }}
                    >
                      <span className="flex items-start gap-2">
                        <CheckCircleIcon
                          width={16}
                          height={16}
                          className="cmp-win-icon flex-none mt-0.5"
                          style={{ color: "var(--color-verified)" }}
                        />
                        {row.tutora}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile: same data as the table above, restyled as stacked comparison cards so
            nothing forces a horizontal scroll on small screens. */}
        <div className="cmp-panel sm:hidden flex flex-col gap-4">
          {comparisonRows.map((row) => {
            const { Icon } = row;
            return (
              <div
                key={row.aspect}
                className="cmp-mcard rounded-[18px] border overflow-hidden"
                style={{ borderColor: "var(--color-divider)", background: "var(--color-bg)", boxShadow: "var(--shadow-sm)" }}
                onTouchStart={(e) => pulseIcon(e.currentTarget, ".cmp-win-icon-m")}
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-3"
                  style={{ borderBottom: "1px solid var(--color-divider)" }}
                >
                  <span
                    className="cmp-mcard-icon grid place-content-center w-7 h-7 rounded-full flex-none"
                    style={{ background: "var(--color-accent-100)", color: "var(--color-accent-700)" }}
                  >
                    <Icon width={15} height={15} />
                  </span>
                  <span className="text-[14.5px] font-semibold">{row.aspect}</span>
                </div>

                <div
                  className="flex items-start gap-2 px-4 py-3"
                  style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)", borderBottom: "1px solid var(--color-divider)" }}
                >
                  <DashCircleIcon width={15} height={15} className="flex-none mt-0.5" style={{ color: "var(--color-neutral-400)" }} />
                  <div>
                    <span
                      className="block text-[10.5px] font-bold uppercase tracking-wide mb-0.5"
                      style={{ color: "var(--color-neutral-500)" }}
                    >
                      Open marketplace
                    </span>
                    <span className="text-[14px] leading-snug">{row.open}</span>
                  </div>
                </div>

                <div
                  className="relative flex items-start gap-2 px-4 py-3"
                  style={{ background: "color-mix(in srgb, var(--color-accent-100) 42%, var(--color-bg))" }}
                >
                  <span
                    className="cmp-badge-m absolute top-2.5 right-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide"
                    style={{ background: "var(--color-accent-500)", color: "#fff" }}
                  >
                    <StarIcon width={9} height={9} />
                    Best
                  </span>
                  <CheckCircleIcon
                    width={16}
                    height={16}
                    className="cmp-win-icon-m flex-none mt-0.5"
                    style={{ color: "var(--color-verified)" }}
                  />
                  <div>
                    <span
                      className="block text-[10.5px] font-bold uppercase tracking-wide mb-0.5"
                      style={{ color: "var(--color-accent-800)" }}
                    >
                      TutorA
                    </span>
                    <span className="text-[14px] leading-snug font-medium">{row.tutora}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

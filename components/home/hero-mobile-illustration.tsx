"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SubjectIcon } from "@/components/ui/subject-icons";

gsap.registerPlugin(useGSAP);

// Below ~1440px HeroPortraitTiles (the desktop side-margin diamond collage) has nowhere
// to go — the 880px content column eats the whole viewport. This gives mobile/tablet a
// scaled-down taste of the same diamond motif instead of leaving the hero photo-less:
// four small tiles tucked into the section's own top/bottom padding gutters (not beside
// the text column), so they add visual interest without competing with the headline or
// pushing content down. Hidden once HeroPortraitTiles takes over at 1440px.
const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

type MobileTile = {
  pos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size: number;
  tint: string;
  subject: string;
  rotate: number;
};

const TILES: MobileTile[] = [
  { pos: "top-left", size: 34, tint: "var(--color-accent-300)", subject: "Python", rotate: -7 },
  { pos: "top-right", size: 30, tint: "var(--color-accent-2-300)", subject: "IELTS", rotate: 8 },
  { pos: "bottom-left", size: 30, tint: "var(--color-verified)", subject: "SAT", rotate: 6 },
  { pos: "bottom-right", size: 34, tint: "var(--color-accent-500)", subject: "Coding", rotate: -6 },
];

const POS_STYLE: Record<MobileTile["pos"], React.CSSProperties> = {
  "top-left": { top: "4px", left: "2%" },
  "top-right": { top: "10px", right: "2%" },
  "bottom-left": { bottom: "6px", left: "3%" },
  "bottom-right": { bottom: "2px", right: "3%" },
};

export function HeroMobileIllustration() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-mtile", {
          autoAlpha: 0,
          scale: 0.5,
          y: 14,
          duration: 0.6,
          delay: 0.7,
          stagger: 0.08,
          ease: "back.out(1.7)",
        });
        gsap.utils.toArray<HTMLElement>(".hero-mtile").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? "+=7" : "-=7",
            duration: 3 + (i % 3) * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1 + i * 0.15,
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-mtile", { autoAlpha: 1, y: 0, scale: 1 });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 min-[1440px]:hidden"
      aria-hidden
    >
      {TILES.map((t) => (
        <div
          key={t.pos}
          className="hero-mtile absolute"
          style={{
            ...POS_STYLE[t.pos],
            width: t.size,
            height: t.size,
            transform: `rotate(${t.rotate}deg)`,
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              clipPath: DIAMOND_CLIP,
              background: t.tint,
              boxShadow: "0 10px 22px -10px color-mix(in srgb, var(--color-accent-2-900) 35%, transparent)",
            }}
          >
            <div
              className="absolute grid place-content-center"
              style={{ inset: 0, transform: `rotate(${-t.rotate}deg)`, color: "var(--color-bg)" }}
            >
              <SubjectIcon subject={t.subject} width={t.size * 0.36} height={t.size * 0.36} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

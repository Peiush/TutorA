"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SubjectIcon } from "@/components/ui/subject-icons";

gsap.registerPlugin(useGSAP);

// Fills the wide, empty side margins of the centered-search hero (visible from ~1440px
// up, where the 720px content column leaves 300px+ of dead space on each side) with a
// Wyzant-style diamond-tile collage — a mix of flat illustrated tutor/student avatars and
// plain accent-color diamonds. No photography: we have no real tutor photos yet and no
// image-generation tool in this environment, so hand-drawn flat-illustration busts (not
// claiming to depict any specific real person) stand in for the eventual photo treatment —
// swap AVATAR_TILES' illustrated <Avatar> for real photos later without touching layout/anim.
type HairStyle = "short" | "bun" | "wavy";

function Avatar({
  hair,
  skin,
  hairStyle,
  glasses,
}: {
  hair: string;
  skin: string;
  hairStyle: HairStyle;
  glasses?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
      {hairStyle === "wavy" && (
        <path
          d="M20 46 Q16 78 26 96 L34 96 Q28 70 30 44 Z M70 44 Q72 70 66 96 L74 96 Q84 78 80 46 Z"
          fill={hair}
        />
      )}
      <path d="M10 100 Q10 66 50 61 Q90 66 90 100 Z" fill="var(--color-accent-2-800)" />
      <circle cx="50" cy="43" r="25" fill={skin} />
      {hairStyle === "short" && (
        <path d="M23 40 Q20 12 50 12 Q80 12 77 40 Q75 22 50 22 Q25 22 23 40 Z" fill={hair} />
      )}
      {hairStyle === "bun" && (
        <>
          <path d="M24 38 Q22 16 50 15 Q78 16 76 38 Q74 24 50 24 Q26 24 24 38 Z" fill={hair} />
          <circle cx="50" cy="9" r="8" fill={hair} />
        </>
      )}
      {hairStyle === "wavy" && (
        <path d="M22 42 Q18 14 50 13 Q82 14 78 42 Q77 24 50 23 Q23 24 22 42 Z" fill={hair} />
      )}
      <ellipse cx="41" cy="44" rx="2.6" ry="3.2" fill="var(--color-accent-2-900)" />
      <ellipse cx="59" cy="44" rx="2.6" ry="3.2" fill="var(--color-accent-2-900)" />
      <path d="M42 55 Q50 60 58 55" stroke="var(--color-accent-2-900)" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      {glasses && (
        <path
          d="M30 43 h14 a1 1 0 0 1 1 1 v1 a8 8 0 0 1 -16 0 v-1 a1 1 0 0 1 1 -1 Z M56 43 h14 a1 1 0 0 1 1 1 v1 a8 8 0 0 1 -16 0 v-1 a1 1 0 0 1 1 -1 Z M45 44 h10"
          fill="none"
          stroke="var(--color-accent-2-900)"
          strokeWidth={1.6}
        />
      )}
    </svg>
  );
}

interface TileSpec {
  side: "left" | "right";
  top: string;
  edge: string;
  size: number;
  kind: "avatar" | "accent";
  tint: string;
  hair?: string;
  skin?: string;
  hairStyle?: HairStyle;
  glasses?: boolean;
  subject?: string;
  rotate: number;
}

const TILES: TileSpec[] = [
  { side: "left", top: "4%", edge: "clamp(4px,2.6vw,64px)", size: 56, kind: "accent", tint: "var(--color-accent-300)", subject: "Calculus", rotate: -6 },
  { side: "left", top: "23%", edge: "clamp(30px,6.4vw,150px)", size: 132, kind: "avatar", tint: "var(--color-accent-2-100)", hair: "#3B2416", skin: "#C68642", hairStyle: "short", rotate: 4 },
  { side: "left", top: "54%", edge: "clamp(0px,1.6vw,42px)", size: 68, kind: "accent", tint: "var(--color-verified)", subject: "Coding", rotate: 8 },
  { side: "left", top: "72%", edge: "clamp(26px,5.6vw,128px)", size: 106, kind: "avatar", tint: "var(--color-accent-100)", hair: "#8A5A2B", skin: "#F1C27D", hairStyle: "bun", glasses: true, rotate: -5 },

  { side: "right", top: "2%", edge: "clamp(24px,5.2vw,120px)", size: 100, kind: "avatar", tint: "var(--color-accent-2-100)", hair: "#1D1A17", skin: "#8D5524", hairStyle: "wavy", rotate: -4 },
  { side: "right", top: "27%", edge: "clamp(2px,2vw,50px)", size: 60, kind: "accent", tint: "var(--color-accent-2-300)", subject: "SAT", rotate: 7 },
  { side: "right", top: "50%", edge: "clamp(32px,6.8vw,158px)", size: 138, kind: "avatar", tint: "var(--color-accent-100)", hair: "#4A2E1A", skin: "#E8B98A", hairStyle: "short", glasses: true, rotate: 5 },
  { side: "right", top: "80%", edge: "clamp(2px,1.8vw,44px)", size: 58, kind: "accent", tint: "var(--color-accent-500)", subject: "Music", rotate: -8 },
];

const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

export function HeroPortraitTiles() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-ptile", {
          autoAlpha: 0,
          scale: 0.6,
          y: 24,
          duration: 0.7,
          delay: 0.5,
          stagger: 0.09,
          ease: "back.out(1.7)",
        });
        gsap.utils.toArray<HTMLElement>(".hero-ptile").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? "+=14" : "-=14",
            rotation: `+=${i % 2 === 0 ? 3 : -3}`,
            duration: 3.4 + (i % 4) * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.2 + i * 0.15,
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-ptile", { autoAlpha: 1, y: 0, scale: 1 });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 hidden min-[1440px]:block"
      aria-hidden
    >
      {TILES.map((t, i) => (
        <div
          key={i}
          className="hero-ptile absolute"
          style={{
            top: t.top,
            [t.side]: t.edge,
            width: t.size,
            height: t.size,
            transform: `rotate(${t.rotate}deg)`,
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              clipPath: DIAMOND_CLIP,
              background: t.kind === "avatar" ? t.tint : t.tint,
              boxShadow: "0 18px 40px -14px color-mix(in srgb, var(--color-accent-2-900) 38%, transparent)",
            }}
          >
            {t.kind === "avatar" ? (
              <div
                className="absolute"
                style={{ inset: "-14%", transform: `rotate(${-t.rotate}deg)` }}
              >
                <Avatar hair={t.hair!} skin={t.skin!} hairStyle={t.hairStyle!} glasses={t.glasses} />
              </div>
            ) : (
              <div
                className="absolute grid place-content-center"
                style={{ inset: 0, transform: `rotate(${-t.rotate}deg)`, color: "var(--color-bg)" }}
              >
                <SubjectIcon subject={t.subject ?? ""} width={t.size * 0.34} height={t.size * 0.34} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

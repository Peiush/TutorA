"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckBadge } from "@/components/ui/verified-badge";

gsap.registerPlugin(useGSAP);

// Scene: a prospective tutor's avatar connects (dashed path) to a "Reviewed" badge —
// visualizing the real vetting-then-match flow described in the page copy, not a generic
// decorative graphic. Built the same way as HeroIllustration on the homepage: DOM-composed
// pieces animated with GSAP rather than one static SVG, so it can float/stagger like the
// rest of the site's illustrations.
export function TeachHeroIllustration() {
  const scope = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = pathRef.current;
        let length = 0;
        if (path) {
          length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0);
        }
        tl.fromTo(
          ".teach-illo-tutor",
          { autoAlpha: 0, scale: 0.5, y: 16 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" },
          0.15
        )
          .fromTo(
            ".teach-illo-badge",
            { autoAlpha: 0, scale: 0.6, y: 10 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(2)" },
            0.55
          )
          .fromTo(
            ".teach-illo-rate",
            { autoAlpha: 0, y: -10, scale: 0.85 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 },
            "-=0.25"
          )
          .fromTo(
            ".teach-illo-subject",
            { autoAlpha: 0, y: 10, rotation: 6 },
            { autoAlpha: 1, y: 0, rotation: -4, duration: 0.5, stagger: 0.1 },
            "-=0.3"
          )
          .fromTo(
            ".teach-illo-note",
            { autoAlpha: 0, y: 8, rotation: 4 },
            { autoAlpha: 1, y: 0, rotation: -3, duration: 0.5 },
            "-=0.2"
          );

        // Gentle continuous float once everything has entered.
        tl.add(() => {
          gsap.to(".teach-illo-tutor", {
            y: "+=10",
            duration: 2.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(".teach-illo-badge", {
            y: "-=8",
            duration: 2.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.2,
          });
          gsap.to(".teach-illo-subject", {
            y: "+=8",
            duration: 2.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.3, repeat: -1, yoyo: true },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".teach-illo-tutor, .teach-illo-badge, .teach-illo-rate, .teach-illo-subject, .teach-illo-note", {
          autoAlpha: 1,
        });
      });

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="hidden lg:block relative flex-none pointer-events-none"
      style={{ width: 420, height: 440 }}
      aria-hidden
    >
      <svg width="420" height="440" viewBox="0 0 420 440" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          ref={pathRef}
          d="M80 110 C 200 60, 260 260, 320 300"
          fill="none"
          stroke="var(--color-accent-2-300)"
          strokeWidth="3"
          strokeDasharray="1 12"
          strokeLinecap="round"
        />
      </svg>

      {/* Prospective tutor avatar */}
      <div
        className="teach-illo-tutor absolute grid place-content-center"
        style={{
          top: 40,
          left: 10,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "var(--color-accent-200)",
          color: "var(--color-accent-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 36,
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
        }}
      >
        You
      </div>

      {/* "Reviewed" badge sitting on the connector */}
      <div
        className="teach-illo-badge absolute flex items-center gap-2"
        style={{
          top: 260,
          left: 260,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "10px 18px 10px 10px",
        }}
      >
        <CheckBadge size={30} />
        <span className="font-[var(--font-heading)] font-semibold text-[14px]" style={{ color: "var(--color-text)" }}>
          Reviewed
        </span>
      </div>

      {/* Rate chip */}
      <div
        className="teach-illo-rate absolute"
        style={{
          top: 20,
          left: 210,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: "18px 18px 18px 4px",
          boxShadow: "var(--shadow-sm)",
          padding: "10px 16px",
        }}
      >
        <span className="font-[var(--font-heading)] font-bold text-[15px]" style={{ color: "var(--color-accent-700)" }}>
          $35/hr
        </span>
      </div>

      {/* Floating subject chips */}
      <div
        className="teach-illo-subject absolute"
        style={{
          top: 190,
          left: 20,
          background: "var(--color-accent-2-100)",
          color: "var(--color-accent-2-800)",
          borderRadius: 999,
          boxShadow: "var(--shadow-sm)",
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        Python
      </div>
      <div
        className="teach-illo-subject absolute"
        style={{
          top: 350,
          left: 130,
          background: "var(--color-accent-100)",
          color: "var(--color-accent-800)",
          borderRadius: 999,
          boxShadow: "var(--shadow-sm)",
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        Guitar
      </div>

      {/* Handwritten note */}
      <div
        className="teach-illo-note absolute"
        style={{
          top: 20,
          left: 300,
          fontFamily: "var(--font-accent)",
          fontSize: 20,
          fontWeight: 600,
          color: "var(--color-accent-800)",
        }}
      >
        you&rsquo;re in!
      </div>
    </div>
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const MOBILE = "(max-width: 1023.98px)";

// Mobile hero (<lg) gets a richer, fully-choreographed GSAP entrance instead of the
// desktop's plain CSS .reveal-up fade — tag pops in, headline cascades word-by-word,
// then the secondary text link fades up. The search bar and trust row animate
// themselves independently (see hero-search-bar.tsx / hero-trust-row.tsx). Desktop is
// untouched (matchMedia gates all of this to <1024px, and .reveal-up's CSS keyframe
// is itself lg-only).
export function HeroMobileFx({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${MOBILE} and (prefers-reduced-motion: no-preference)`, () => {
        gsap.set(".hero-tag", { autoAlpha: 0, y: -8, scale: 0.75 });
        gsap.set(".hero-word", { autoAlpha: 0, y: 22 });
        // .hero-copy-p is this page's LCP candidate on mobile and is intentionally left
        // completely untouched by this timeline — no autoAlpha, no y, no filter. Chrome
        // defers an element's LCP timestamp until any transform/opacity/filter transition
        // targeting it settles, so even the transform-only blur+y "focus into place" tried
        // previously still added ~5.7s of pure render-delay to LCP (RE-AUDIT-REPORT-2026-08-10-POSTFIX.md).
        // It must render fully static from first paint.
        gsap.set(".hero-secondary-link", { autoAlpha: 0, y: 10 });

        // Safety net: if the timeline never completes (script interrupted mid-run by a
        // dropped connection, a low-memory tab kill, or an unrelated JS error elsewhere
        // on the page), the elements above would otherwise stay stuck at autoAlpha:0
        // forever since nothing else ever sets them visible. Force them visible after a
        // generous timeout so a failed animation degrades to "no animation", not "no content".
        const safety = window.setTimeout(() => {
          gsap.set(".hero-tag, .hero-word, .hero-secondary-link", {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          });
        }, 4000);

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => window.clearTimeout(safety),
        });

        tl.to(".hero-tag", { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" })
          .to(".hero-word", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.09 }, "-=0.25")
          .to(".hero-secondary-link", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.15");

        return () => window.clearTimeout(safety);
      });

      mm.add(`${MOBILE} and (prefers-reduced-motion: reduce)`, () => {
        gsap.set(".hero-tag, .hero-word, .hero-secondary-link", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
      });

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}

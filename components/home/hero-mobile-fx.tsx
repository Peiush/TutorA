"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const MOBILE = "(max-width: 1023.98px)";

// Mobile hero (<lg) gets a richer, fully-choreographed GSAP entrance instead of the
// desktop's plain CSS .reveal-up fade — tag pops in, headline cascades word-by-word,
// paragraph blurs into focus, CTAs pop in with an elastic ease, then the primary
// button gets a soft looping glow to invite a tap. Desktop is untouched (matchMedia
// gates all of this to <1024px, and .reveal-up's CSS keyframe is itself lg-only).
export function HeroMobileFx({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${MOBILE} and (prefers-reduced-motion: no-preference)`, () => {
        gsap.set(".hero-tag", { autoAlpha: 0, y: -8, scale: 0.75 });
        gsap.set(".hero-word", { autoAlpha: 0, y: 22 });
        // Not autoAlpha here — this paragraph is the page's LCP candidate on mobile, and
        // opacity:0 (from autoAlpha) makes Chrome wait for this timeline to run, JS-hydrate,
        // and animate back to visible before it counts the paint, adding ~1.5s of pure
        // render-delay to LCP for no visual benefit (RE-AUDIT-REPORT.md, 2026-08-10). The
        // blur+y transform alone still gives the same "focuses into place" effect without
        // hiding the text from first paint.
        gsap.set(".hero-copy-p", { y: 14, filter: "blur(6px)" });
        gsap.set(".hero-cta-btn", { autoAlpha: 0, y: 18, scale: 0.9 });
        gsap.set(".hero-cta-glow", { autoAlpha: 0, scale: 1 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(".hero-tag", { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" })
          .to(".hero-word", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.09 }, "-=0.25")
          .to(".hero-copy-p", { y: 0, filter: "blur(0px)", duration: 0.7 }, "-=0.15")
          .to(
            ".hero-cta-btn",
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)", stagger: 0.12 },
            "-=0.35"
          );

        tl.add(() => {
          gsap.to(".hero-cta-glow", {
            autoAlpha: 0.4,
            scale: 1.3,
            duration: 1.6,
            ease: "power1.out",
            repeat: -1,
          });
        });
      });

      mm.add(`${MOBILE} and (prefers-reduced-motion: reduce)`, () => {
        gsap.set(".hero-tag, .hero-word, .hero-copy-p, .hero-cta-btn", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
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

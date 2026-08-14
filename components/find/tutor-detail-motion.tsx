"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function TutorDetailMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intro = scope.current?.querySelectorAll("[data-profile-intro]");
    const cards = scope.current?.querySelectorAll("[data-subject-card]");
    const relatedLinks = scope.current?.querySelectorAll("[data-related-link]");
    const relatedCards = scope.current?.querySelectorAll("[data-related-card]");
    const illustration = scope.current?.querySelector("[data-profile-illustration]") ?? null;

    if (reduced) {
      gsap.set([...Array.from(intro ?? []), ...Array.from(cards ?? []), ...Array.from(relatedLinks ?? []), ...Array.from(relatedCards ?? []), illustration].filter(Boolean), {
        autoAlpha: 1,
        clearProps: "transform",
      });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(intro ?? [], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07 })
      .fromTo(cards ?? [], { autoAlpha: 0, y: 22, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 }, "-=0.28")
      .fromTo(relatedLinks ?? [], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.06 }, "-=0.2")
      .fromTo(relatedCards ?? [], { autoAlpha: 0, y: 20, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.07 }, "-=0.16");
    if (illustration) {
      timeline.fromTo(illustration, { autoAlpha: 0, y: 12, rotate: -3 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.7, ease: "back.out(1.4)" }, "-=0.4");
    }
  }, { scope });

  return <div ref={scope}>{children}</div>;
}

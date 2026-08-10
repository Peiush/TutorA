"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function BecomeTestimonials({
  testimonials,
}: {
  testimonials: { quote: string; name: string; role: string }[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });
        tl.from(".bt-heading", { autoAlpha: 0, y: 16, duration: 0.5 }).from(
          ".bt-card",
          { autoAlpha: 0, y: 24, stagger: 0.12, duration: 0.5 },
          "-=0.25"
        );

        const heading = root?.querySelector(".bt-heading") ?? null;
        const safetyCleanup = root
          ? scrollRevealSafetyNet(
              root,
              () => heading != null && isGsapHidden(heading),
              () => {
                gsap.set(".bt-heading, .bt-card", { autoAlpha: 1, y: 0 });
              }
            )
          : undefined;

        return () => {
          tl.kill();
          safetyCleanup?.();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(44px,5vw,72px)]">
      <h2 className="bt-heading text-[clamp(24px,3vw,34px)] mb-6.5">From tutors already on the platform</h2>
      <div className="grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        {testimonials.map((q) => (
          <figure
            key={q.name}
            className="bt-card card m-0 gap-3 transition-transform duration-200 ease-out hover:-translate-y-1"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <p className="font-[var(--font-heading)] text-[18px] leading-[1.4] m-0">&ldquo;{q.quote}&rdquo;</p>
            <figcaption
              className="text-[13px]"
              style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
            >
              {q.name} · {q.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

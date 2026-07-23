"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import type { tutorsRaw } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP);

export function FeaturedTutorsIllustration({ tutors }: { tutors: (typeof tutorsRaw)[number][] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(root, { autoAlpha: 0, y: -14, scale: 0.9 });
        const tl = gsap.timeline({ delay: 0.15 });
        tl.to(root, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(2)" }).from(
          root.querySelectorAll(".ft-avatar"),
          { scale: 0, autoAlpha: 0, stagger: 0.08, duration: 0.35, ease: "back.out(2.6)" },
          0.15
        );

        const float = gsap.to(root, { y: -7, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.9 });
        return () => {
          tl.kill();
          float.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { autoAlpha: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="hidden md:flex items-center gap-3 rounded-2xl px-4 py-3 flex-none"
      style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-divider)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div className="flex -space-x-2.5">
        {tutors.slice(0, 3).map((t, i) => (
          <span
            key={t.listingId ?? t.id ?? t.name}
            className="ft-avatar rounded-full"
            style={{ boxShadow: "0 0 0 2.5px var(--color-bg)" }}
          >
            <TutorAvatar name={t.name} index={i} size={30} />
          </span>
        ))}
        <span
          className="ft-avatar w-[30px] h-[30px] rounded-full grid place-content-center flex-none"
          style={{
            boxShadow: "0 0 0 2.5px var(--color-bg)",
            background: "var(--color-accent-2-700)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          +12
        </span>
      </div>
      <div>
        <div className="text-[12.5px] font-semibold leading-tight">Vetted this week</div>
        <div className="text-[11px] leading-tight" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
          15 new tutors approved
        </div>
      </div>
    </div>
  );
}

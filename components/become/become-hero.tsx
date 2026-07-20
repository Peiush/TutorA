"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag } from "@/components/ui/tag";
import { BecomeIllustration } from "@/components/become/become-illustration";

gsap.registerPlugin(useGSAP);

const PERK_ICON_PATHS = [
  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  "M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z M9 12l2 2 4-4",
  "M8 2v4 M16 2v4 M3.5 9h17 M4 4.5h16A1.5 1.5 0 0 1 21.5 6v14a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 20V6A1.5 1.5 0 0 1 4 4.5Z",
  "M19 5 5 19 M7.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z M16.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
];

export function BecomeHero({ perks, form }: { perks: string[]; form: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".bh-tag", { autoAlpha: 0, y: -8, duration: 0.4 })
          .from(".bh-heading", { autoAlpha: 0, y: 22, duration: 0.6 }, "-=0.2")
          .from(".bh-copy", { autoAlpha: 0, y: 14, duration: 0.5 }, "-=0.35")
          .from(".bh-perk", { autoAlpha: 0, x: -14, stagger: 0.1, duration: 0.4 }, "-=0.25")
          .from(".bh-perk .bh-perk-icon", { scale: 0, rotation: -25, stagger: 0.1, duration: 0.4, ease: "back.out(2.4)" }, "<")
          .from(".bh-form", { autoAlpha: 0, y: 24, scale: 0.98, duration: 0.6, ease: "power3.out" }, "-=0.25");
        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(44px,5vw,80px)] grid gap-10 items-center [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]"
    >
      <div>
        <Tag variant="accent-2" className="bh-tag text-[12px] px-3.5 py-1.5">
          Admin
        </Tag>
        <h1 className="bh-heading text-[clamp(32px,4.4vw,54px)] leading-[1.05] mt-4">
          Add a teacher to the platform.
        </h1>
        <p
          className="bh-copy text-[17px] leading-[1.6] mt-5 max-w-[46ch]"
          style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
        >
          Teachers don&rsquo;t sign up themselves — you create their listing here and it goes
          live immediately for students to find and request.
        </p>
        <div className="grid gap-4 mt-7 max-w-[44ch]">
          {perks.map((p, i) => (
            <div key={p} className="bh-perk flex gap-3 items-start">
              <div
                className="bh-perk-icon w-6.5 h-6.5 rounded-full grid place-content-center flex-none mt-0.5"
                style={{ background: "color-mix(in srgb, var(--color-verified) 18%, transparent)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-verified)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d={PERK_ICON_PATHS[i]} />
                </svg>
              </div>
              <span className="text-[15px] leading-[1.5]">{p}</span>
            </div>
          ))}
        </div>

        <div className="bh-illustration hidden xl:flex mt-8 pl-2">
          <BecomeIllustration />
        </div>
      </div>

      <div className="bh-form">{form}</div>
    </div>
  );
}

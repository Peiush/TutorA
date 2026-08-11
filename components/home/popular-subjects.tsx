"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { vibrantAccent } from "@/lib/vibrant-accents";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PopularSubjects({ subjects }: { subjects: string[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<number, HTMLAnchorElement>>(new Map());

  useGSAP(
    () => {
      const row = rowRef.current;
      if (!row) return;
      const pills = row.querySelectorAll(".subject-pill");
      if (!pills.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // A single tween on the pill itself (not a separate nested tween on the icon)
        // — two independently GSAP-animated layers proved fragile: a later
        // ScrollTrigger.refresh() (ScrollTriggerGuard, fired once fonts/below-the-fold
        // chunks settle) could replay/desync the icon's own hidden->shown state after
        // the pill had already finished, leaving icons visible-then-collapsed. The
        // icon still gets its pop via the pill's own scale/rotate, just not separately.
        const tl = gsap.timeline({
          defaults: { ease: "back.out(1.8)" },
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });

        tl.from(pills, {
          autoAlpha: 0,
          y: 26,
          scale: 0.82,
          rotate: -4,
          duration: 0.55,
          stagger: { each: 0.055, from: "start" },
        }, 0);

        return scrollRevealSafetyNet(
          row,
          () => isGsapHidden(pills[0]),
          () => {
            gsap.set(pills, { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(pills, { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
      });

      return () => mm.revert();
    },
    { scope: rowRef, dependencies: [subjects.length] }
  );

  // A subtle magnetic tilt that follows the cursor — makes each pill feel like a
  // physical, poppable object rather than a flat link. Cursor-only (fine pointers)
  // and skipped under prefers-reduced-motion.
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!fine || reduced) return;

      const cleanups: (() => void)[] = [];
      pillRefs.current.forEach((el) => {
        const rotateX = gsap.quickTo(el, "rotateX", { duration: 0.4, ease: "power3.out" });
        const rotateY = gsap.quickTo(el, "rotateY", { duration: 0.4, ease: "power3.out" });
        const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

        const handleMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          rotateX(py * -14);
          rotateY(px * 14);
          moveY(-6);
          el.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
          el.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
        };
        const handleLeave = () => {
          rotateX(0);
          rotateY(0);
          moveY(0);
        };

        gsap.set(el, { transformPerspective: 600 });
        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", handleMove);
          el.removeEventListener("mouseleave", handleLeave);
        });
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: rowRef, dependencies: [subjects.length] }
  );

  return (
    <div ref={rowRef} className="flex flex-wrap gap-3.5">
      {subjects.map((s, i) => {
        const vibe = vibrantAccent(i);
        return (
          <Link
            key={s}
            href={`/find-a-tutor?subject=${encodeURIComponent(s)}`}
            ref={(el) => {
              if (el) pillRefs.current.set(i, el);
              else pillRefs.current.delete(i);
            }}
            className="subject-pill group relative inline-flex items-center gap-2.5 rounded-full border pl-2 pr-5 py-2 cursor-pointer will-change-transform"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${vibe.light} 70%, var(--color-bg)) 0%, var(--color-bg) 65%)`,
              borderColor: `color-mix(in srgb, ${vibe.solid} 38%, transparent)`,
              boxShadow: `0 10px 22px -14px color-mix(in srgb, ${vibe.solid} 55%, transparent)`,
              transformStyle: "preserve-3d",
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(120px circle at var(--spot-x,50%) var(--spot-y,50%), color-mix(in srgb, ${vibe.solid} 26%, transparent), transparent 70%)`,
              }}
              aria-hidden
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: `0 16px 34px -14px color-mix(in srgb, ${vibe.solid} 65%, transparent)` }}
              aria-hidden
            />
            <span
              className="subject-pill-icon relative z-[1] w-10 h-10 rounded-full grid place-content-center flex-none transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(150deg, ${vibe.solid}, color-mix(in srgb, ${vibe.solid} 65%, black))`,
                color: "#fff",
                boxShadow: `0 4px 10px -3px color-mix(in srgb, ${vibe.solid} 60%, transparent)`,
              }}
            >
              <SubjectIcon subject={s} width={22} height={22} strokeWidth={2.25} />
            </span>
            <span className="relative z-[1] font-semibold text-[16px]" style={{ color: "var(--color-text)" }}>
              {s}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

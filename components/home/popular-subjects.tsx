"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { subjectAccent } from "@/components/ui/subject-accent";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PopularSubjects({ subjects }: { subjects: string[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const row = rowRef.current;
      if (!row) return;
      const pills = row.querySelectorAll(".subject-pill");
      if (!pills.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });

        tl.from(pills, {
          autoAlpha: 0,
          y: 14,
          duration: 0.4,
          stagger: 0.045,
        }, 0)
          .from(row.querySelectorAll(".subject-pill-icon"), {
            scale: 0.3,
            autoAlpha: 0,
            duration: 0.35,
            stagger: 0.045,
            ease: "back.out(2.6)",
          }, 0.08);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(pills, { autoAlpha: 1, y: 0 });
        gsap.set(row.querySelectorAll(".subject-pill-icon"), { autoAlpha: 1, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: rowRef, dependencies: [subjects.length] }
  );

  return (
    <div ref={rowRef} className="flex flex-wrap gap-3">
      {subjects.map((s, i) => {
        const accent = subjectAccent([s], i);
        return (
          <Link
            key={s}
            href="/find-a-tutor"
            className="subject-pill group relative inline-flex items-center gap-2.5 rounded-full border pl-2 pr-5 py-2 cursor-pointer transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1"
            style={{
              background: "var(--color-bg)",
              borderColor: "var(--color-divider)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: "var(--shadow-lg)" }}
              aria-hidden
            />
            <span
              className="subject-pill-icon w-10 h-10 rounded-full grid place-content-center flex-none transition-transform duration-300 group-hover:scale-110"
              style={{ background: accent.bar, color: "#fff" }}
            >
              <SubjectIcon subject={s} width={22} height={22} strokeWidth={2.25} />
            </span>
            <span className="font-medium text-[16px]" style={{ color: "var(--color-text)" }}>
              {s}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { CourseIllustration } from "@/components/courses/course-illustrations";
import type { CourseCategory } from "@/lib/mock-courses";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FLOATERS: { category: CourseCategory; size: number; top: string; left: string; depth: number }[] = [
  { category: "Programming & Technology", size: 78, top: "2%", left: "68%", depth: 30 },
  { category: "Test Preparation", size: 60, top: "48%", left: "88%", depth: 55 },
  { category: "Music & Instruments", size: 56, top: "62%", left: "58%", depth: 20 },
  { category: "Creative Skills", size: 68, top: "8%", left: "86%", depth: 45 },
];

export function CoursesHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".ch-tag", { autoAlpha: 0, y: -8, duration: 0.4 })
          .from(".ch-heading", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.2")
          .from(".ch-copy", { autoAlpha: 0, y: 12, duration: 0.45 }, "-=0.3")
          .from(".ch-cta", { autoAlpha: 0, y: 10, duration: 0.4 }, "-=0.3")
          .from(".ch-float", { autoAlpha: 0, scale: 0.6, y: 20, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" }, "-=0.25");

        const floats = gsap.utils.toArray<HTMLElement>(".ch-float");
        floats.forEach((el) => {
          const depth = Number(el.dataset.depth ?? 30);
          gsap.to(el, {
            y: `-=${depth}`,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <div className="hidden sm:block absolute top-0 right-0 w-[320px] h-[200px] pointer-events-none" aria-hidden>
        {FLOATERS.map((f) => (
          <div
            key={f.category}
            className="ch-float absolute"
            data-depth={f.depth}
            style={{ top: f.top, left: f.left, width: f.size, height: f.size, opacity: 0.9 }}
          >
            <CourseIllustration category={f.category} className="w-full h-full" />
          </div>
        ))}
      </div>

      <div className="relative max-w-[620px]">
        <Tag variant="accent-2" className="ch-tag text-[12px] px-3.5 py-1.5">
          Courses
        </Tag>
        <h1 className="ch-heading font-bold text-[clamp(30px,4vw,48px)] mt-4 mb-1">
          Courses taught by verified tutors, not anonymous uploads
        </h1>
        <p
          className="ch-copy text-[16px] mb-6"
          style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
        >
          Every course is reviewed by our team before it goes live. Pick a subject, learn at your own pace, and keep a certificate when you finish.
        </p>
        <div className="ch-cta flex flex-wrap gap-3">
          <Link href="#browse" className="btn btn-primary inline-block">
            Browse courses
          </Link>
          <Link href="#about-courses" className="btn btn-secondary inline-block">
            How it works
          </Link>
        </div>
      </div>
    </div>
  );
}

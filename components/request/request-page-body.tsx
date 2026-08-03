"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { RequestForm } from "@/components/request/request-form";
import { RequestIllustration } from "@/components/request/request-illustration";

gsap.registerPlugin(useGSAP);

export function RequestPageBody({ trustStats }: { trustStats: { num: string; label: string }[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".rq-illustration", { autoAlpha: 0, x: -24, duration: 0.7 })
          .from(".rq-stat", { autoAlpha: 0, y: 14, stagger: 0.12, duration: 0.5 }, "-=0.4")
          .from(".rq-tag", { autoAlpha: 0, y: -8, duration: 0.4 }, "-=0.9")
          .from(".rq-heading", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.25")
          .from(".rq-sub", { autoAlpha: 0, y: 12, duration: 0.45 }, "-=0.3")
          .from(".rq-summary", { autoAlpha: 0, y: 12, duration: 0.45 }, "-=0.3")
          .from(".rq-form", { autoAlpha: 0, y: 20, duration: 0.55 }, "-=0.25");

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]"
    >
      <div className="grid lg:grid-cols-[1fr_480px] gap-[clamp(32px,5vw,72px)] items-start">
        <div className="hidden lg:flex flex-col gap-9 pt-4">
          <div className="rq-illustration">
            <RequestIllustration />
          </div>
          <div className="flex flex-col gap-5 max-w-[300px]">
            {trustStats.map((s) => (
              <div key={s.num} className="rq-stat flex gap-3.5">
                <div
                  className="font-[var(--font-heading)] font-bold text-[26px] flex-none"
                  style={{ color: "var(--color-accent-2)" }}
                >
                  {s.num}
                </div>
                <div
                  className="text-[13px] leading-[1.5] pt-1"
                  style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Tag variant="accent-2" className="rq-tag text-[12px] px-3.5 py-1.5">
            Request a Tutor
          </Tag>
          <h1 className="rq-heading font-bold text-[clamp(30px,4vw,46px)] mt-4 mb-1">
            Request a tutor: tell us what you&rsquo;re looking for
          </h1>
          <p
            className="rq-sub text-[16px] mb-3"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            Our team will review your request and personally match you within 24–48 hours.
          </p>
          <p
            className="rq-summary text-[14.5px] leading-[1.55] mb-4 max-w-[46ch]"
            style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}
          >
            A tutor request puts the search in our hands — for any subject, level, or budget —
            instead of you browsing and messaging tutors yourself.
          </p>
          <div className="rq-summary flex flex-wrap gap-2 mb-7">
            <Link
              href="/find-a-tutor"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium rounded-full transition-colors duration-200"
              style={{
                background: "var(--color-accent-2-100)",
                color: "var(--color-accent-2-800)",
                padding: "7px 14px",
              }}
            >
              Compare with browsing tutors
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium rounded-full transition-colors duration-200"
              style={{
                background: "var(--color-neutral-200)",
                color: "var(--color-text)",
                padding: "7px 14px",
              }}
            >
              See how matching works
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="rq-form">
            <RequestForm />
          </div>
        </div>
      </div>
    </div>
  );
}

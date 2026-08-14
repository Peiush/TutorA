"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { RequestForm } from "@/components/request/request-form";
import { RequestIllustration } from "@/components/request/request-illustration";
import { RequestMobileIllustration } from "@/components/request/request-mobile-illustration";

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
              <div key={s.num} className="rq-stat">
                <div
                  className="font-[var(--font-heading)] font-bold text-[17px] leading-tight"
                  style={{ color: "var(--color-accent-2)" }}
                >
                  {s.num}
                </div>
                <div
                  className="text-[13px] leading-[1.5] mt-1"
                  style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <Tag variant="accent-2" className="rq-tag text-[12px] px-3.5 py-1.5">
              Request a Tutor
            </Tag>
            <div className="rq-illustration">
              <RequestMobileIllustration />
            </div>
          </div>
          <h1 className="rq-heading font-bold text-[clamp(26px,4vw,46px)] mt-3 sm:mt-4 mb-1">
            Request a tutor: tell us what you&rsquo;re looking for
          </h1>
          <p
            className="rq-sub text-[15px] sm:text-[16px] mb-3 sm:hidden"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            Tell us your subject and budget — we&rsquo;ll hand-pick a verified tutor within 24–48
            hours.
          </p>
          <p
            className="rq-sub hidden sm:block text-[16px] mb-3"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            Our team will review your request and personally match you within 24–48 hours.
          </p>
          <p
            className="rq-summary hidden sm:block text-[14.5px] leading-[1.55] mb-4 max-w-[46ch]"
            style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}
          >
            A tutor request puts the search in our hands — for any subject, level, or budget —
            instead of you browsing and messaging tutors yourself.
          </p>
          <div className="rq-summary flex flex-wrap gap-2.5 mb-6 sm:mb-7">
            <Link
              href="/find-a-tutor"
              className="inline-flex items-center justify-center gap-1.5 text-[13.5px] font-semibold rounded-full transition-colors duration-200 hover:bg-[var(--color-accent-2-800)]"
              style={{
                background: "var(--color-accent-2-700)",
                color: "#fff",
                padding: "10px 16px",
                minHeight: 40,
              }}
            >
              Compare with browsing tutors
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-1.5 text-[13.5px] font-semibold rounded-full border-2 transition-colors duration-200 hover:bg-[var(--color-accent-2-100)]"
              style={{
                borderColor: "var(--color-accent-2-700)",
                color: "var(--color-accent-2-700)",
                padding: "8px 16px",
                minHeight: 40,
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

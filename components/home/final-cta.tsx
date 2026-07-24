"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RequestIcon, ShieldMatchIcon, HandshakeIcon } from "@/components/home/step-icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TRUST_ITEMS = [
  { icon: RequestIcon, label: "Request in 2 minutes" },
  { icon: ShieldMatchIcon, label: "Personally vetted matches" },
  { icon: HandshakeIcon, label: "Matched within 24–48h" },
];

export function FinalCta() {
  const rootRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });

        tl.fromTo(
          root,
          { autoAlpha: 0, y: 36, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }
        )
          .from(root.querySelectorAll(".cta-blob"), { autoAlpha: 0, scale: 0.6, duration: 1.1, ease: "power2.out", stagger: 0.1 }, 0)
          .from(root.querySelector(".cta-eyebrow"), { autoAlpha: 0, y: 14, duration: 0.5 }, 0.2)
          .from(root.querySelector(".cta-heading"), { autoAlpha: 0, y: 22, duration: 0.6 }, 0.3)
          .from(root.querySelector(".cta-copy"), { autoAlpha: 0, y: 18, duration: 0.55 }, 0.4)
          .from(root.querySelectorAll(".cta-trust-item"), { autoAlpha: 0, y: 14, duration: 0.45, stagger: 0.1 }, 0.5)
          .from(root.querySelectorAll(".cta-btn"), { autoAlpha: 0, y: 16, scale: 0.95, duration: 0.5, stagger: 0.1, ease: "back.out(1.8)" }, 0.62);

        const blobs = root.querySelectorAll(".cta-blob");
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            y: i % 2 === 0 ? -18 : 16,
            x: i % 2 === 0 ? 10 : -12,
            duration: 5 + i,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        [primaryBtnRef, secondaryBtnRef].forEach((btnRef) => {
          const btn = btnRef.current;
          if (!btn) return;
          const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });

          const handleMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            xTo(relX * 0.25);
            yTo(relY * 0.35);
          };
          const handleLeave = () => {
            xTo(0);
            yTo(0);
          };

          btn.addEventListener("mousemove", handleMove);
          btn.addEventListener("mouseleave", handleLeave);
          return () => {
            btn.removeEventListener("mousemove", handleMove);
            btn.removeEventListener("mouseleave", handleLeave);
          };
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(root.querySelectorAll(".cta-blob, .cta-eyebrow, .cta-heading, .cta-copy, .cta-trust-item, .cta-btn"), {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(32px,6vw,80px)]">
      <div
        ref={rootRef}
        className="relative overflow-hidden rounded-[24px] p-[clamp(36px,6vw,64px)] isolate"
        style={{
          background: "linear-gradient(155deg, var(--color-accent-2-900) 0%, var(--color-accent-2-700) 52%, var(--color-accent-2-600) 100%)",
          boxShadow: "0 24px 64px rgba(15, 30, 56, 0.32), 0 2px 0 rgba(255,255,255,0.06) inset",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="cta-blob pointer-events-none absolute -top-24 -right-16 w-[340px] h-[340px] rounded-full blur-[70px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)", opacity: 0.35 }}
          aria-hidden
        />
        <div
          className="cta-blob pointer-events-none absolute -bottom-28 -left-20 w-[300px] h-[300px] rounded-full blur-[70px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-2-300) 0%, transparent 70%)", opacity: 0.4 }}
          aria-hidden
        />
        <div
          className="cta-blob pointer-events-none absolute top-1/2 right-1/4 w-[180px] h-[180px] rounded-full blur-[60px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-500) 0%, transparent 70%)", opacity: 0.22 }}
          aria-hidden
        />

        {/* Subtle dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-[640px]">
          <span
            className="cta-eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase"
            style={{
              letterSpacing: "0.04em",
              background: "rgba(255,255,255,0.1)",
              color: "var(--color-accent-300)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            Get matched, personally
          </span>

          <h2
            className="cta-heading font-[var(--font-heading)] font-bold text-[clamp(28px,3.6vw,42px)] leading-[1.12] max-w-[16ch] mt-5"
            style={{ color: "#FFFFFF" }}
          >
            Tell us what you need.{" "}
            <span style={{ color: "var(--color-accent-400)" }}>We&rsquo;ll find who fits.</span>
          </h2>

          <p
            className="cta-copy text-[16.5px] leading-[1.65] max-w-[48ch] mt-4"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Our team reviews every request and matches you personally, usually within 24–48 hours.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="cta-trust-item flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-full grid place-content-center flex-none"
                  style={{ background: "rgba(255,255,255,0.1)", color: "var(--color-accent-300)" }}
                >
                  <Icon width={15} height={15} strokeWidth={2.4} />
                </span>
                <span className="text-[13.5px] font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap mt-9">
            <Link
              ref={primaryBtnRef}
              href="/request-a-tutor"
              className="cta-btn group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-[var(--font-heading)] font-semibold text-[15.5px] cursor-pointer transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(232,163,61,0.55)]"
              style={{
                background: "var(--color-accent-500)",
                color: "var(--color-accent-2-900)",
                boxShadow: "0 8px 24px color-mix(in srgb, var(--color-accent-500) 55%, transparent)",
              }}
            >
              Request a Tutor
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              ref={secondaryBtnRef}
              href="/find-a-tutor"
              className="cta-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-[var(--font-heading)] font-semibold text-[15.5px] cursor-pointer transition-colors duration-300 hover:bg-white/12 hover:border-white/40"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              Browse first
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

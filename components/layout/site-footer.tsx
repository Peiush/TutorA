"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/ui/logo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EXPLORE_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/find-a-tutor", label: "Find a Tutor" },
  { href: "/request-a-tutor", label: "Request a Tutor" },
  { href: "/about", label: "About Us" },
];

const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Student" },
  // { href: "/tutor", label: "Tutor" },
  { href: "/admin", label: "Admin" },
];

const ACCOUNT_LINKS = [
  { href: "/login", label: "Log in" },
  { href: "/signup", label: "Sign up" },
  // { href: "/become-a-tutor", label: "Become a Tutor" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  // { href: "#", label: "Commission policy" },
];

const SOCIALS = [
  {
    label: "X (Twitter)",
    href: "#",
    path: "M18.9 2H22l-7.6 8.7L23.3 22H16.7l-5.2-6.8L5.5 22H2.3l8.1-9.3L1.7 2h6.8l4.7 6.2Zm-1.2 18.1h1.7L6.4 4H4.6Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm4 3.4A4.6 4.6 0 1 1 7.4 12 4.6 4.6 0 0 1 12 7.4Zm0 2A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Zm4.9-3.5a1.05 1.05 0 1 1-1.05 1.05A1.05 1.05 0 0 1 16.9 5.9Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3ZM10 9h3.8v1.7h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.55 4.78 5.87V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.44-2.16 2.96V21h-4Z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.35C15.9 4.24 15 4.15 14 4.15c-2.4 0-4 1.46-4 4.15v2.25H7.4v3H10V21Z",
  },
];

function GlobeIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const arcs = svg.querySelectorAll(".fx-arc");
        arcs.forEach((arc) => {
          const path = arc as SVGPathElement;
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: svg, start: "top 80%", once: true },
          });
        });

        gsap.to(".fx-lat", {
          rotate: 360,
          transformOrigin: "50% 50%",
          duration: 40,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".fx-lat-2", {
          rotate: -360,
          transformOrigin: "50% 50%",
          duration: 55,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".fx-pin", {
          scale: 1.35,
          opacity: 0.35,
          transformOrigin: "50% 50%",
          duration: 1.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.35,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        svg.querySelectorAll(".fx-arc").forEach((arc) => gsap.set(arc, { strokeDashoffset: 0 }));
      });

      return () => mm.revert();
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 260 260"
      width="260"
      height="260"
      fill="none"
      aria-hidden
      className="overflow-visible"
    >
      <circle cx="130" cy="130" r="108" stroke="var(--color-accent-2-500)" strokeOpacity="0.35" strokeWidth="1.2" />
      <g className="fx-lat" style={{ transformBox: "fill-box" }}>
        <ellipse cx="130" cy="130" rx="108" ry="40" stroke="var(--color-accent-400)" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <g className="fx-lat-2" style={{ transformBox: "fill-box" }}>
        <ellipse cx="130" cy="130" rx="70" ry="108" stroke="var(--color-accent-2-300)" strokeOpacity="0.22" strokeWidth="1" />
      </g>

      {/* connection arcs — "matched across borders" */}
      <path className="fx-arc" d="M70 92 Q130 40 198 78" stroke="var(--color-accent-400)" strokeWidth="1.4" strokeLinecap="round" />
      <path className="fx-arc" d="M198 78 Q170 150 128 182" stroke="var(--color-accent-300)" strokeWidth="1.4" strokeLinecap="round" />
      <path className="fx-arc" d="M128 182 Q80 160 70 92" stroke="var(--color-accent-2-300)" strokeWidth="1.4" strokeLinecap="round" />

      {/* pins */}
      {[
        [70, 92],
        [198, 78],
        [128, 182],
        [190, 170],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle className="fx-pin" cx={cx} cy={cy} r="10" fill="var(--color-accent-400)" opacity="0.25" />
          <circle cx={cx} cy={cy} r="4" fill="var(--color-accent-300)" />
        </g>
      ))}
    </svg>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="footer-col text-[14px]">
      <div
        className="mb-3 text-[13px] font-semibold uppercase tracking-[0.06em]"
        style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-300)" }}
      >
        {title}
      </div>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group relative inline-flex items-center"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {link.label}
              <span
                className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ background: "var(--color-accent-400)" }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);
  const topBtnRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        });

        tl.from(".footer-brand", { autoAlpha: 0, y: 24, duration: 0.6 })
          .from(".footer-globe", { autoAlpha: 0, scale: 0.85, duration: 0.8, ease: "back.out(1.6)" }, "-=0.4")
          .from(".footer-col", { autoAlpha: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.5")
          .from(".footer-social", { autoAlpha: 0, y: 12, scale: 0.9, duration: 0.4, stagger: 0.06, ease: "back.out(2)" }, "-=0.3")
          .from(".footer-bottom", { autoAlpha: 0, y: 10, duration: 0.4 }, "-=0.2");

        gsap.to(".footer-blob", {
          y: -16,
          x: 10,
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        const btn = topBtnRef.current;
        if (btn) {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });
          const handleMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
            yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3);
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
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".footer-brand, .footer-globe, .footer-col, .footer-social, .footer-bottom", {
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
    <footer
      ref={rootRef}
      className="relative overflow-hidden isolate"
      style={{
        background: "linear-gradient(175deg, var(--color-accent-2-900) 0%, var(--color-accent-2-800) 60%, var(--color-accent-2-900) 100%)",
        color: "var(--color-neutral-200)",
      }}
    >
      {/* ambient blobs */}
      <div
        className="footer-blob pointer-events-none absolute -top-20 left-[8%] w-[280px] h-[280px] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)", opacity: 0.14 }}
        aria-hidden
      />
      <div
        className="footer-blob pointer-events-none absolute bottom-0 right-[6%] w-[240px] h-[240px] rounded-full blur-[70px]"
        style={{ background: "radial-gradient(circle, var(--color-accent-2-300) 0%, transparent 70%)", opacity: 0.18 }}
        aria-hidden
      />
      {/* dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        aria-hidden
      />
      {/* decorative watermark — sits behind all content, never affects layout */}
      <div
        className="footer-globe hidden lg:block pointer-events-none absolute -top-6 -right-10 opacity-[0.55]"
        aria-hidden
      >
        <GlobeIllustration />
      </div>

      <div className="relative z-[1] max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(48px,6vw,72px)]">
        <div className="footer-brand max-w-[36ch]">
          <Logo size={32} dark />
          <p className="text-[13.5px] leading-[1.65] mt-3.5" style={{ color: "rgba(255,255,255,0.62)" }}>
            Admin-mediated tutoring, matched with care across borders.
          </p>
          <div className="flex items-center gap-2.5 mt-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="footer-social grid place-content-center rounded-full w-9 h-9 cursor-pointer transition-colors duration-200"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-accent-500)";
                  e.currentTarget.style.color = "var(--color-accent-2-900)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-10 mt-14 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
          <FooterColumn title="Explore" links={EXPLORE_LINKS} />
          <FooterColumn title="Dashboards" links={DASHBOARD_LINKS} />
          <FooterColumn title="Account" links={ACCOUNT_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div
          className="footer-bottom flex flex-wrap items-center justify-between gap-4 mt-12 py-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="text-[12.5px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} TutorA. All rights reserved.
          </p>
          <button
            ref={topBtnRef}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold cursor-pointer transition-colors duration-200 will-change-transform"
            style={{ background: "rgba(255,255,255,0.08)", color: "var(--color-accent-300)" }}
          >
            Back to top
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

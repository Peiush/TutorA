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

// nofollow: these are auth-gated app routes, not public content — without it they'd be
// both linked (crawlable) and disallowed in robots.txt on every page site-wide, wasting
// crawl budget and risking an "indexed though blocked by robots.txt" warning in GSC.
const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Student", rel: "nofollow" },
  // { href: "/tutor", label: "Tutor" },
  { href: "/admin", label: "Admin", rel: "nofollow" },
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

/**
 * Orbit network — a hub with tutor/student nodes orbiting and matching in, arcs drawn on
 * scroll-in, rings rotating at different speeds, particles drifting. Reads as "global matching",
 * not a floating decorative watermark.
 */
function OrbitMatchIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const arcs = svg.querySelectorAll<SVGPathElement>(".om-arc");
        const nodes = svg.querySelectorAll(".om-node");
        const rings = svg.querySelectorAll(".om-ring");
        const hub = svg.querySelector(".om-hub");
        const particles = svg.querySelectorAll(".om-particle");

        arcs.forEach((arc) => {
          const length = arc.getTotalLength();
          gsap.set(arc, { strokeDasharray: length, strokeDashoffset: length });
        });
        gsap.set(nodes, { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(hub, { scale: 0, transformOrigin: "50% 50%" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: svg, start: "top 85%", once: true },
          defaults: { ease: "power3.out" },
        });
        tl.to(hub, { scale: 1, duration: 0.5, ease: "back.out(2.4)" })
          .to(arcs, { strokeDashoffset: 0, duration: 1, stagger: 0.18, ease: "power2.inOut" }, "-=0.1")
          .to(nodes, { scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(2.4)" }, "-=0.9");

        // concentric rings drifting at different speeds — the "global network" feel
        rings.forEach((ring, i) => {
          gsap.to(ring, {
            rotate: i % 2 === 0 ? 360 : -360,
            transformOrigin: "50% 50%",
            duration: 26 + i * 14,
            repeat: -1,
            ease: "none",
          });
        });

        // soft pulse on each orbiting node
        gsap.to(".om-node-ping", {
          scale: 1.7,
          opacity: 0,
          transformOrigin: "50% 50%",
          duration: 2,
          ease: "sine.out",
          repeat: -1,
          stagger: 0.5,
        });

        // hub glow breathing
        gsap.to(".om-hub-glow", {
          scale: 1.25,
          opacity: 0.15,
          transformOrigin: "50% 50%",
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // drifting particles
        particles.forEach((p, i) => {
          gsap.to(p, {
            y: i % 2 === 0 ? -10 : 10,
            x: i % 2 === 0 ? 6 : -6,
            duration: 3.4 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".om-arc", { strokeDashoffset: 0 });
        gsap.set(".om-node, .om-hub", { scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: svgRef }
  );

  const orbitNodes = [
    { x: 170, y: 60, r: 18, fill: "var(--color-accent-500)", stroke: "var(--color-accent-300)", label: "T", textFill: "var(--color-accent-2-900)" },
    { x: 190, y: 170, r: 15, fill: "var(--color-accent-2-600)", stroke: "var(--color-accent-2-300)", label: "S", textFill: "var(--color-neutral-100)" },
    { x: 60, y: 190, r: 14, fill: "var(--color-accent-2-700)", stroke: "var(--color-accent-2-400)", label: "S", textFill: "var(--color-neutral-100)" },
    { x: 40, y: 70, r: 13, fill: "var(--color-accent-400)", stroke: "var(--color-accent-200)", label: "T", textFill: "var(--color-accent-2-900)" },
  ];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 260 260"
      width="300"
      height="300"
      fill="none"
      aria-hidden
      className="overflow-visible max-w-full h-auto"
    >
      <g className="om-ring" style={{ transformBox: "fill-box" }}>
        <circle cx="130" cy="130" r="112" stroke="var(--color-accent-2-400)" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="1 7" />
      </g>
      <g className="om-ring" style={{ transformBox: "fill-box" }}>
        <ellipse cx="130" cy="130" rx="94" ry="60" stroke="var(--color-accent-300)" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="1 6" />
      </g>
      <g className="om-ring" style={{ transformBox: "fill-box" }}>
        <ellipse cx="130" cy="130" rx="60" ry="94" stroke="var(--color-accent-2-300)" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="1 6" />
      </g>

      {[
        [30, 30],
        [230, 40],
        [225, 225],
        [35, 210],
      ].map(([cx, cy], i) => (
        <circle key={i} className="om-particle" cx={cx} cy={cy} r="1.6" fill="var(--color-accent-300)" opacity="0.5" />
      ))}

      {orbitNodes.map((n, i) => (
        <path
          key={i}
          className="om-arc"
          d={`M130 130 Q ${(130 + n.x) / 2 + (i % 2 === 0 ? 14 : -14)} ${(130 + n.y) / 2 - (i % 2 === 0 ? 10 : -10)}, ${n.x} ${n.y}`}
          stroke="var(--color-accent-400)"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}

      <g className="om-hub">
        <circle className="om-hub-glow" cx="130" cy="130" r="26" fill="var(--color-accent-400)" opacity="0.22" />
        <circle cx="130" cy="130" r="17" fill="var(--color-accent-2-900)" stroke="var(--color-accent-400)" strokeWidth="1.4" />
        <path d="M123 130.5 127.5 135 138 122" stroke="var(--color-accent-300)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {orbitNodes.map((n, i) => (
        <g key={i} className="om-node">
          <circle className="om-node-ping" cx={n.x} cy={n.y} r={n.r} fill={n.fill} opacity="0.28" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.fill} stroke={n.stroke} strokeWidth="1.2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={n.textFill} fontFamily="var(--font-heading)">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; rel?: string }[];
}) {
  return (
    <div className="footer-col text-[14px] w-[130px] flex-none">
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
              rel={link.rel}
              className="group relative inline-flex items-center cursor-pointer"
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

        tl.from(".footer-brand", { autoAlpha: 0, y: 20, duration: 0.55 })
          .from(".footer-illustration", { autoAlpha: 0, scale: 0.85, duration: 0.7, ease: "back.out(1.6)" }, "-=0.4")
          .from(".footer-col", { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.08 }, "-=0.5")
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
        gsap.set(".footer-brand, .footer-illustration, .footer-col, .footer-social, .footer-bottom", {
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

      <div className="relative z-[1] max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(40px,5vw,56px)]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-x-8 gap-y-12">
          <div className="footer-brand max-w-[30ch] lg:flex-none">
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

          <div className="flex flex-wrap gap-x-16 gap-y-10 lg:flex-1 lg:justify-center">
            <FooterColumn title="Explore" links={EXPLORE_LINKS} />
            <FooterColumn title="Dashboards" links={DASHBOARD_LINKS} />
            <FooterColumn title="Account" links={ACCOUNT_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>

          <div className="footer-illustration flex-none hidden lg:flex items-center justify-center w-[220px] xl:w-[260px] lg:ml-6 xl:ml-10" aria-hidden>
            <OrbitMatchIllustration />
          </div>
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

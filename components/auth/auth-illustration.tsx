"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { initialsOf } from "@/components/ui/tutor-avatar";
import { CheckBadge } from "@/components/ui/verified-badge";
import {
  GraduationCapIcon,
  ChalkboardIcon,
  BookIcon,
  CalculatorIcon,
  GlobeIcon,
  ShieldCheckIcon,
  ChatDotsIcon,
} from "@/components/auth/auth-icons";

gsap.registerPlugin(useGSAP);

const COPY = {
  login: {
    tag: "Welcome back",
    title: "Pick up right where you left off.",
    body: "Your matched tutors, sessions and messages are all exactly where you left them.",
    bullets: ["Every match personally verified", "Real tutors, real reviews", "No bots, no spam — ever"] as string[],
  },
  signup: {
    tag: "Join TutorA",
    title: "Every request, personally verified.",
    body: "Submit what you need — our team reviews it before any introduction is made.",
    bullets: [] as string[],
  },
} as const;

const ORBIT_ICONS = [
  { Icon: BookIcon, angle: -150, bg: "var(--color-accent-200)", color: "var(--color-accent-800)" },
  { Icon: GlobeIcon, angle: 40, bg: "var(--color-accent-2-200)", color: "var(--color-accent-2-800)" },
  { Icon: CalculatorIcon, angle: 160, bg: "var(--color-neutral-200)", color: "var(--color-neutral-700)" },
];

const SEAL_PETALS = Array.from({ length: 10 }, (_, i) => (360 / 10) * i);
const SEAL_SPARKS = [-42, -14, 14, 42];

export function AuthIllustration({ variant }: { variant: "login" | "signup" }) {
  const scope = useRef<HTMLDivElement>(null);
  const copy = COPY[variant];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(".auth-illo-blob", { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 1.1 }, 0)
          .fromTo(".auth-illo-tag", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.1)
          .fromTo(".auth-illo-title", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.25")
          .fromTo(".auth-illo-body", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.35");

        if (variant === "login") {
          tl.fromTo(
            ".auth-illo-ring",
            { autoAlpha: 0, scale: 0.7 },
            { autoAlpha: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
            "-=0.25"
          )
            .fromTo(
              ".auth-illo-orbit-icon",
              { autoAlpha: 0, scale: 0.4 },
              { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(2)" },
              "-=0.35"
            )
            .fromTo(
              ".auth-illo-card",
              { autoAlpha: 0, y: 22, rotate: 0, scale: 0.92 },
              { autoAlpha: 1, y: 0, rotate: -3, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
              "-=0.5"
            )
            .fromTo(".auth-illo-toast", { autoAlpha: 0, y: -12, scale: 0.85 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, "-=0.3")
            .fromTo(
              ".auth-illo-bullet",
              { autoAlpha: 0, x: -14 },
              { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.1 },
              "-=0.3"
            );

          tl.add(() => {
            gsap.to(".auth-illo-orbit-track", { rotation: 360, duration: 26, ease: "none", repeat: -1 });
            gsap.to(".auth-illo-orbit-icon", { rotation: -360, duration: 26, ease: "none", repeat: -1 });
            gsap.to(".auth-illo-card", { y: "+=8", rotate: -1, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true });
            gsap.to(".auth-illo-toast", { y: "-=6", duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
          });
        } else {
          tl.fromTo(
            ".auth-illo-req-card",
            { autoAlpha: 0, y: 18, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
            "-=0.2"
          )
            .fromTo(
              ".auth-illo-seal",
              { autoAlpha: 0, y: -70, scale: 0.5, rotate: -30 },
              { autoAlpha: 1, y: 0, scale: 1, rotate: -8, duration: 0.55, ease: "back.out(1.4)" },
              "-=0.15"
            )
            .add(() => {
              gsap.fromTo(
                ".auth-illo-ripple",
                { autoAlpha: 0.55, scale: 0.6 },
                { autoAlpha: 0, scale: 2.1, duration: 0.7, ease: "power2.out" }
              );
              gsap.fromTo(
                ".auth-illo-spark",
                { autoAlpha: 1, x: 0, y: 0, scale: 1 },
                {
                  autoAlpha: 0,
                  x: (i) => SEAL_SPARKS[i] * 0.9,
                  y: (i) => -Math.abs(SEAL_SPARKS[i]) * 0.5 - 6,
                  scale: 0.3,
                  duration: 0.6,
                  ease: "power2.out",
                  stagger: 0.03,
                }
              );
            })
            .fromTo(".auth-illo-caption", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.1");

          tl.add(() => {
            gsap.to(".auth-illo-seal", { rotate: -4, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true });
            gsap.to(".auth-illo-req-card", { y: "+=6", duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
          });
        }

        gsap.to(".auth-illo-blob", {
          x: "+=18",
          y: "-=14",
          duration: 7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.8,
          delay: 1,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".auth-illo-blob, .auth-illo-tag, .auth-illo-title, .auth-illo-body, .auth-illo-ring, .auth-illo-orbit-icon, .auth-illo-card, .auth-illo-toast, .auth-illo-bullet, .auth-illo-req-card, .auth-illo-seal, .auth-illo-caption",
          { autoAlpha: 1 }
        );
        gsap.set(".auth-illo-ripple, .auth-illo-spark", { autoAlpha: 0 });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [variant] }
  );

  return (
    <div
      ref={scope}
      className="relative h-full w-full overflow-hidden flex flex-col justify-between px-[clamp(28px,4vw,56px)] py-[clamp(32px,5vw,56px)]"
      style={{
        background: "linear-gradient(160deg, var(--color-accent-2-900), var(--color-accent-2-700) 62%, var(--color-accent-2-600))",
        color: "var(--color-bg)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="auth-illo-blob absolute rounded-full"
          style={{
            top: "-120px",
            left: "-90px",
            width: 320,
            height: 320,
            background: "radial-gradient(circle at 35% 35%, var(--color-accent-400), transparent 72%)",
            opacity: 0.35,
            filter: "blur(8px)",
          }}
        />
        <div
          className="auth-illo-blob absolute rounded-full"
          style={{
            bottom: "-100px",
            right: "-80px",
            width: 300,
            height: 300,
            background: "radial-gradient(circle at 60% 40%, var(--color-accent-2-300), transparent 70%)",
            opacity: 0.3,
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Top: wordmark + headline */}
      <div className="relative z-[1]">
        <div
          className="auth-illo-tag inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full"
          style={{ background: "rgba(247,245,240,0.12)", border: "1px solid rgba(247,245,240,0.22)" }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-accent-400)",
              display: "inline-block",
            }}
          />
          {copy.tag}
        </div>
        <h2 className="auth-illo-title text-[clamp(24px,2.6vw,32px)] leading-[1.16] mt-4 max-w-[15ch]" style={{ color: "var(--color-bg)" }}>
          {copy.title}
        </h2>
        <p
          className="auth-illo-body text-[14.5px] leading-[1.6] mt-3 max-w-[34ch]"
          style={{ color: "rgba(247,245,240,0.72)" }}
        >
          {copy.body}
        </p>
      </div>

      {/* Middle: variant-specific scene */}
      {variant === "login" ? (
        <div className="relative z-[1] mx-auto my-9 grid place-content-center" style={{ width: 340, height: 340 }} aria-hidden>
          {/* Orbit ring + subject icons, centered on the scene */}
          <div className="auth-illo-ring absolute" style={{ top: "50%", left: "50%", width: 260, height: 260, marginTop: -130, marginLeft: -130 }}>
            <div className="absolute inset-0 rounded-full" style={{ border: "1.5px dashed rgba(247,245,240,0.35)" }} />
            <div className="auth-illo-orbit-track absolute inset-0">
              {ORBIT_ICONS.map(({ Icon, angle, bg, color }, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    width: 0,
                    height: 0,
                    transform: `rotate(${angle}deg) translate(130px) rotate(${-angle}deg)`,
                  }}
                >
                  <div
                    className="auth-illo-orbit-icon grid place-content-center rounded-full"
                    style={{
                      width: 40,
                      height: 40,
                      marginLeft: -20,
                      marginTop: -20,
                      background: bg,
                      color,
                      boxShadow: "0 8px 18px rgba(0,0,0,0.24)",
                    }}
                  >
                    <Icon width={18} height={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Central verified-profile card */}
          <div
            className="auth-illo-card relative rounded-[18px] p-4"
            style={{ width: 168, background: "var(--color-bg)", boxShadow: "0 20px 40px rgba(0,0,0,0.32)", color: "var(--color-text)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="grid place-content-center rounded-full flex-none"
                style={{
                  width: 38,
                  height: 38,
                  background: "var(--color-accent-2-200)",
                  color: "var(--color-accent-2-800)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {initialsOf("Amara Okafor")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="h-2 rounded-full" style={{ width: "78%", background: "var(--color-divider)" }} />
                <div className="h-2 rounded-full mt-1.5" style={{ width: "52%", background: "var(--color-divider)" }} />
              </div>
              <CheckBadge size={20} />
            </div>
            <div className="h-px my-3" style={{ background: "var(--color-divider)" }} />
            <div className="flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: "var(--color-verified)" }}>
              <ShieldCheckIcon width={15} height={15} />
              Profile verified
            </div>
          </div>

          {/* Notification toast */}
          <div
            className="auth-illo-toast absolute flex items-center gap-2"
            style={{ top: -10, right: -6, background: "var(--color-bg)", borderRadius: 14, boxShadow: "0 10px 24px rgba(0,0,0,0.24)", padding: "9px 12px" }}
          >
            <div
              className="grid place-content-center rounded-full flex-none"
              style={{ width: 22, height: 22, background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
            >
              <ChatDotsIcon width={13} height={13} />
            </div>
            <div>
              <div className="h-1.5 rounded-full" style={{ width: 54, background: "var(--color-divider)" }} />
              <div className="h-1.5 rounded-full mt-1" style={{ width: 34, background: "var(--color-divider)" }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-[1] flex flex-col items-center my-9" aria-hidden>
          <div className="relative grid place-content-center" style={{ width: 300, height: 260 }}>
            {/* Request card, waiting to be verified */}
            <div
              className="auth-illo-req-card relative rounded-[18px] p-4"
              style={{ width: 190, background: "var(--color-bg)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", color: "var(--color-text)" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="grid place-content-center rounded-full flex-none"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--color-neutral-200)",
                    color: "var(--color-neutral-700)",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  YOU
                </div>
                <div className="min-w-0 flex-1">
                  <div className="h-2 rounded-full" style={{ width: "82%", background: "var(--color-divider)" }} />
                  <div className="h-2 rounded-full mt-1.5" style={{ width: "58%", background: "var(--color-divider)" }} />
                </div>
              </div>
              <div className="h-px my-3" style={{ background: "var(--color-divider)" }} />
              <div className="flex flex-wrap gap-1.5">
                <span className="tag tag-accent-2" style={{ fontSize: 11 }}>
                  Calculus
                </span>
                <span className="tag tag-neutral" style={{ fontSize: 11 }}>
                  Grade 11
                </span>
              </div>
            </div>

            {/* Impact ripple + sparks, centered on the seal's landing point */}
            <div
              className="absolute pointer-events-none"
              style={{ top: "50%", left: "50%", width: 0, height: 0, marginTop: -110, marginLeft: 66 }}
            >
              <div
                className="auth-illo-ripple absolute rounded-full"
                style={{ width: 72, height: 72, marginLeft: -36, marginTop: -36, border: "3px solid var(--color-accent-400)", opacity: 0 }}
              />
              {SEAL_SPARKS.map((_, i) => (
                <span
                  key={i}
                  className="auth-illo-spark absolute rounded-full"
                  style={{ width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5, background: "var(--color-accent-300)", opacity: 0 }}
                />
              ))}
            </div>

            {/* Verification seal, stamped onto the card's corner */}
            <div
              className="auth-illo-seal absolute"
              style={{ top: "50%", left: "50%", width: 96, height: 96, marginTop: -158, marginLeft: 18 }}
            >
              {SEAL_PETALS.map((angle) => (
                <div
                  key={angle}
                  className="absolute rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    top: "50%",
                    left: "50%",
                    background: "var(--color-accent-300)",
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(38px) rotate(${-angle}deg)`,
                  }}
                />
              ))}
              <div
                className="absolute grid place-content-center rounded-full"
                style={{
                  inset: 0,
                  margin: "auto",
                  width: 70,
                  height: 70,
                  background: "var(--color-accent-600)",
                  boxShadow: "0 12px 26px rgba(0,0,0,0.35)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="auth-illo-caption text-[19px] mt-1"
            style={{ fontFamily: "var(--font-accent)", fontWeight: 600, color: "var(--color-accent-300)", transform: "rotate(-2deg)" }}
          >
            verified by real people
          </div>
        </div>
      )}

      {/* Bottom: trust bullets (login only) */}
      {copy.bullets.length > 0 && (
        <ul className="relative z-[1] flex flex-col gap-2.5 m-0 p-0 list-none">
          {copy.bullets.map((b) => (
            <li key={b} className="auth-illo-bullet flex items-center gap-2.5 text-[13.5px]" style={{ color: "rgba(247,245,240,0.86)" }}>
              <CheckBadge size={20} dotColor="var(--color-accent-400)" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="relative z-[1] flex items-center gap-4 mt-6 pt-5" style={{ borderTop: "1px solid rgba(247,245,240,0.16)" }}>
        <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(247,245,240,0.62)" }}>
          <GraduationCapIcon width={15} height={15} />
          Students
        </span>
        <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(247,245,240,0.62)" }}>
          <ChalkboardIcon width={15} height={15} />
          Tutors
        </span>
      </div>
    </div>
  );
}

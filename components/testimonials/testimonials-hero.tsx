"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function TestimonialsHero({ count, averageRating }: { count: number; averageRating: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".testi-hero-kicker", { autoAlpha: 0, y: 14, duration: 0.45 })
        .from(".testi-hero-title-line", { autoAlpha: 0, yPercent: 105, rotateX: -35, duration: 0.75, stagger: 0.08 }, "-=0.2")
        .from(".testi-hero-copy, .testi-hero-actions", { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".testi-hero-visual", { autoAlpha: 0, scale: 0.78, rotate: 6, duration: 0.85, ease: "back.out(1.5)" }, "-=0.7")
        .from(".testi-float-card", { autoAlpha: 0, y: 22, rotate: 8, duration: 0.5, stagger: 0.12 }, "-=0.45");
      gsap.to(".testi-hero-visual", { y: -12, rotate: -2, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".ti-orbit", { rotate: 360, duration: 28, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(".ti-orbit-2", { rotate: -360, duration: 38, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(".testi-float-card", { y: "-=7", duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
      return () => tl.kill();
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".testi-hero-kicker, .testi-hero-title-line, .testi-hero-copy, .testi-hero-actions, .testi-hero-visual, .testi-float-card", { autoAlpha: 1, y: 0, yPercent: 0, scale: 1, rotate: 0 });
    });
    return () => mm.revert();
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="relative overflow-hidden border-b" style={{ borderColor: "var(--color-divider)", background: "linear-gradient(135deg, #fffaf0 0%, var(--color-bg) 52%, #edf3f8 100%)" }}>
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: "var(--color-accent-200)", opacity: 0.28 }} aria-hidden />
      <div className="absolute -right-24 -top-20 h-96 w-96 rounded-full blur-3xl" style={{ background: "var(--color-accent-2-200)", opacity: 0.38 }} aria-hidden />
      <div className="pointer-events-none absolute right-5 top-8 grid h-16 w-16 place-items-center rounded-[20px] border shadow-sm lg:hidden" style={{ background: "rgba(255,253,248,.78)", borderColor: "var(--color-accent-2-200)", transform: "rotate(8deg)" }} aria-hidden>
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <circle cx="21" cy="21" r="15" stroke="var(--color-accent-2-300)" strokeDasharray="2 4" />
          <path d="M14 22.5 18.5 27 29 16" stroke="var(--color-verified)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="12" r="2.5" fill="var(--color-accent-400)" />
          <circle cx="32" cy="31" r="2" fill="var(--color-accent-2-400)" />
        </svg>
      </div>
      <div className="relative mx-auto grid max-w-[1160px] items-center gap-8 px-[clamp(20px,4vw,48px)] py-[clamp(44px,6vw,72px)] lg:grid-cols-[1.04fr_.96fr]">
        <div className="max-w-[600px]">
          <div className="testi-hero-kicker mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.16em]" style={{ borderColor: "var(--color-accent-300)", background: "rgba(255,255,255,.64)", color: "var(--color-accent-800)" }}><span className="h-2 w-2 rounded-full" style={{ background: "var(--color-verified)" }} aria-hidden /> Verified stories</div>
          <h1 className="mb-5 text-[clamp(38px,4.4vw,64px)] leading-[.98] tracking-[-.055em]" style={{ perspective: 800 }}><span className="testi-hero-title-line block">The people</span><span className="testi-hero-title-line block" style={{ color: "var(--color-accent-600)" }}>behind the</span><span className="testi-hero-title-line block">progress.</span></h1>
          <p className="testi-hero-copy max-w-[500px] text-[clamp(15px,1.3vw,18px)] leading-[1.55]" style={{ color: "var(--color-neutral-600)" }}>Honest notes from parents, students and tutors who found a better way to learn, teach and keep going.</p>
          <div className="testi-hero-actions mt-6 flex flex-wrap items-center gap-3"><a href="#share-story" className="btn btn-primary">Share your story <span aria-hidden>↗</span></a><a href="#all-stories" className="btn btn-secondary">Read the stories <span aria-hidden>↓</span></a></div>
          <div className="mt-8 flex flex-wrap gap-7 border-t pt-5" style={{ borderColor: "var(--color-divider)" }}><div><strong className="block text-[25px]" style={{ fontFamily: "var(--font-heading)" }}>{count}</strong><span className="text-[11px] uppercase tracking-[.1em]" style={{ color: "var(--color-neutral-500)" }}>verified stories</span></div><div><strong className="block text-[25px]" style={{ fontFamily: "var(--font-heading)" }}>{averageRating}<span className="text-[15px]">{averageRating === "—" ? "" : "/5"}</span></strong><span className="text-[11px] uppercase tracking-[.1em]" style={{ color: "var(--color-neutral-500)" }}>average rating</span></div><div><strong className="block text-[25px]" style={{ fontFamily: "var(--font-heading)", color: "var(--color-verified)" }}>100%</strong><span className="text-[11px] uppercase tracking-[.1em]" style={{ color: "var(--color-neutral-500)" }}>real accounts</span></div></div>
        </div>
        <div className="testi-hero-visual relative mx-auto hidden h-[320px] w-full max-w-[460px] sm:h-[370px] lg:block lg:h-[460px] lg:max-w-[600px]" aria-label="Illustration of connected TutorA community stories">
          <div className="absolute inset-[8%] rounded-[40%] border-[1.5px] border-dashed" style={{ borderColor: "var(--color-accent-2-300)", transform: "rotate(-12deg)" }} aria-hidden /><div className="absolute inset-[16%] rounded-full border border-dashed" style={{ borderColor: "var(--color-accent-300)" }} aria-hidden />
          <div className="absolute inset-0 z-[2] m-auto grid h-16 w-16 place-items-center rounded-[20px] border shadow-[0_12px_24px_rgba(21,33,58,.12)] sm:h-18 sm:w-18 sm:rounded-[22px] lg:h-20 lg:w-20" style={{ background: "rgba(255,255,255,.94)", borderColor: "var(--color-accent-2-200)", transform: "rotate(6deg)" }} aria-label="Illustration of a completed learning milestone">
            <svg className="h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14" viewBox="0 0 72 72" fill="none" aria-hidden>
              <circle cx="36" cy="36" r="23" stroke="var(--color-accent-2-200)" strokeWidth="1.5" strokeDasharray="2.5 4.5" />
              <circle cx="22" cy="20" r="4" fill="var(--color-accent-400)" />
              <circle cx="54" cy="51" r="3.5" fill="var(--color-accent-2-300)" />
              <circle cx="17" cy="52" r="2.5" fill="var(--color-accent-300)" />
              <path d="m26 36 7 7 15-16" stroke="var(--color-verified)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="testi-float-card absolute left-[0%] top-[1%] z-[3] w-[150px] rounded-[22px] border p-3.5 sm:w-[180px] sm:p-4 lg:w-[215px] lg:rounded-[26px] lg:p-5" style={{ background: "#fffdf8", borderColor: "var(--color-accent-200)", transform: "rotate(-5deg)" }}><span className="text-[26px] lg:text-[30px]">✦</span><p className="mt-2 text-[14px] font-semibold leading-tight lg:text-[16px]">“I finally enjoy maths again.”</p><small style={{ color: "var(--color-neutral-500)" }}>— a student</small></div>
          <div className="testi-float-card absolute bottom-[0%] right-[0%] z-[3] w-[155px] rounded-[22px] border p-3.5 sm:w-[170px] sm:p-4 lg:w-[210px] lg:rounded-[26px] lg:p-5" style={{ background: "#f2f7fb", borderColor: "var(--color-accent-2-200)", transform: "rotate(5deg)" }}><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full text-[15px] font-bold text-white lg:h-10 lg:w-10" style={{ background: "var(--color-accent-600)" }}>P</span><span className="text-[12px] font-semibold lg:text-[14px]">Parent verified</span></div><p className="mt-3 text-[13px] leading-[1.45] lg:text-[15px]">“The right tutor changed the whole week.”</p><div className="mt-2 text-[12px] font-semibold lg:text-[13px]" style={{ color: "var(--color-accent-700)" }}>5.0 rating</div></div>
          <div className="testi-float-card absolute right-[13%] top-[2%] rounded-full border px-4 py-2 text-[12px] font-semibold shadow-sm lg:px-5 lg:py-2.5 lg:text-[14px]" style={{ background: "#fff", borderColor: "var(--color-accent-2-200)", transform: "rotate(5deg)" }}><span aria-hidden>✦</span> trusted by learners</div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getMyTestimonialState } from "@/app/lib/actions/testimonial";
import { TestimonialModal } from "@/components/testimonials/testimonial-modal";
import type { MyTestimonial } from "@/app/lib/testimonials";

gsap.registerPlugin(useGSAP);

const HIDDEN_PATH_PREFIXES = ["/testimonials", "/login", "/signup", "/admin"];

function QuoteStarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.5 6.5c-2.6 0-4.5 2-4.5 4.6 0 2.4 1.8 4.2 4 4.4-.3 1.4-1.3 2.4-1.3 2.4a.6.6 0 0 0 .6.9c2.6-.5 4.7-2.5 4.7-6.1 0-3.4-1.6-6.2-3.5-6.2Z"
        fill="currentColor"
      />
      <path
        d="M17 6.5c-2.6 0-4.5 2-4.5 4.6 0 2.4 1.8 4.2 4 4.4-.3 1.4-1.3 2.4-1.3 2.4a.6.6 0 0 0 .6.9c2.6-.5 4.7-2.5 4.7-6.1 0-3.4-1.6-6.2-3.5-6.2Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function useTestimonialState() {
  const { status } = useSession();
  const [state, setState] = useState<{ isAuthenticated: boolean; existing: MyTestimonial | null }>({
    isAuthenticated: false,
    existing: null,
  });

  useEffect(() => {
    if (status !== "authenticated") {
      setState({ isAuthenticated: false, existing: null });
      return;
    }
    let cancelled = false;
    getMyTestimonialState().then((result) => {
      if (!cancelled) setState(result);
    });
    return () => {
      cancelled = true;
    };
  }, [status]);

  return state;
}

/** Shared trigger: opens the Add Testimonial modal, flipping in from the clicked element's position. */
function useLauncher() {
  const { isAuthenticated, existing } = useTestimonialState();
  const [open, setOpen] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const openFrom = (el: HTMLElement | null) => {
    setOriginRect(el?.getBoundingClientRect() ?? null);
    setOpen(true);
  };

  const modal = open ? (
    <TestimonialModal
      isAuthenticated={isAuthenticated}
      existing={existing}
      originRect={originRect}
      onClose={() => setOpen(false)}
    />
  ) : null;

  return { openFrom, modal, hasExisting: !!existing };
}

export function AddTestimonialButton({ children, className }: { children?: ReactNode; className?: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { openFrom, modal, hasExisting } = useLauncher();

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={className ?? "btn btn-primary text-[14px]"}
        onClick={() => openFrom(btnRef.current)}
      >
        {children ?? (
          <>
            <QuoteStarIcon size={16} />
            {hasExisting ? "Edit your story" : "Add your story"}
          </>
        )}
      </button>
      {modal}
    </>
  );
}

export function TestimonialFab() {
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { openFrom, modal, hasExisting } = useLauncher();

  const hidden = HIDDEN_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useGSAP(
    () => {
      if (hidden) return;
      const el = wrapRef.current;
      const btn = btnRef.current;
      if (!el || !btn) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { autoAlpha: 0, scale: 0.4, y: 24 });
        gsap.set([".tf-ring-1", ".tf-ring-2"], { scale: 1, autoAlpha: 0 });

        const tl = gsap.timeline({ delay: 1 });
        tl.to(el, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.8)" })
          // Sonar rings: two staggered expanding pulses, looping continuously.
          .add(() => {
            gsap.to(".tf-ring-1", {
              scale: 1.7,
              autoAlpha: 0,
              duration: 1.6,
              ease: "power2.out",
              repeat: -1,
              repeatDelay: 0.9,
              startAt: { scale: 1, autoAlpha: 0.5 },
            });
            gsap.to(".tf-ring-2", {
              scale: 1.7,
              autoAlpha: 0,
              duration: 1.6,
              ease: "power2.out",
              repeat: -1,
              repeatDelay: 0.9,
              delay: 0.8,
              startAt: { scale: 1, autoAlpha: 0.5 },
            });
          })
          // Periodic gentle bounce on the button itself to keep it eye-catching.
          .to(btn, { y: -7, duration: 0.32, ease: "power2.out", repeat: 3, yoyo: true, repeatDelay: 5.2 }, "+=0.4");

        return () => {
          tl.kill();
          gsap.killTweensOf([".tf-ring-1", ".tf-ring-2", btn]);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { autoAlpha: 1, scale: 1 });
        gsap.set([".tf-ring-1", ".tf-ring-2"], { autoAlpha: 0 });
      });

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [hidden] }
  );

  if (hidden) return null;

  return (
    <>
      <div ref={wrapRef} className="fixed z-[55] bottom-24 right-5 md:bottom-8 md:right-8">
        <button
          ref={btnRef}
          type="button"
          onClick={() => openFrom(btnRef.current)}
          aria-label={hasExisting ? "Edit your testimonial" : "Add your testimonial"}
          className="relative flex items-center gap-2 cursor-pointer rounded-full pl-4 pr-4 md:pr-5 py-3.5 md:py-3 font-semibold text-[14px] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: "linear-gradient(135deg, var(--color-accent-500), var(--color-accent-600))",
            color: "var(--color-accent-2-900)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <span className="tf-ring-1 pointer-events-none absolute inset-0 rounded-full" aria-hidden style={{ border: "2.5px solid var(--color-accent-2-500)" }} />
          <span className="tf-ring-2 pointer-events-none absolute inset-0 rounded-full" aria-hidden style={{ border: "2.5px solid var(--color-bg)" }} />
          <QuoteStarIcon size={18} />
          <span className="hidden md:inline">{hasExisting ? "Edit your story" : "Add your story"}</span>
        </button>
      </div>
      {modal}
    </>
  );
}

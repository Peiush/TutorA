"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export type ToastTone = "success" | "error";

export function Toast({
  tone,
  message,
  onClose,
  duration = 3500,
}: {
  tone: ToastTone;
  message: string;
  onClose: () => void;
  duration?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const timeoutId = setTimeout(() => {
        if (reduced) {
          onClose();
          return;
        }
        gsap.to(el, { autoAlpha: 0, y: 12, scale: 0.96, duration: 0.25, ease: "power2.in", onComplete: onClose });
      }, duration);

      if (reduced) return () => clearTimeout(timeoutId);

      gsap.from(el, { autoAlpha: 0, y: 16, scale: 0.94, duration: 0.35, ease: "back.out(1.6)" });

      return () => clearTimeout(timeoutId);
    },
    { scope: rootRef }
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={rootRef}
      role="status"
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 px-4 py-3 max-w-[360px]"
      style={{
        borderRadius: "var(--radius-md)",
        background: "var(--color-bg)",
        border: "1px solid var(--color-divider)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div
        className="w-7 h-7 rounded-full grid place-content-center flex-none"
        style={{
          background:
            tone === "success"
              ? "color-mix(in srgb, var(--color-verified) 18%, transparent)"
              : "color-mix(in srgb, #d92d20 15%, transparent)",
          color: tone === "success" ? "var(--color-verified)" : "#d92d20",
        }}
      >
        {tone === "success" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8v5M12 16h.01" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        )}
      </div>
      <span className="text-[13.5px]">{message}</span>
    </div>,
    document.body
  );
}

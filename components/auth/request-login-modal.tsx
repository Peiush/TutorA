"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { loginInline, loginWithGoogle } from "@/app/lib/actions/auth";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  SpinnerIcon,
  GoogleIcon,
} from "@/components/auth/auth-icons";

gsap.registerPlugin(useGSAP, Flip);

export function RequestLoginModal({
  originRect,
  onClose,
  onAuthenticated,
}: {
  originRect: DOMRect | null;
  onClose: () => void;
  onAuthenticated: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const { contextSafe } = useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const content = contentRef.current;

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.to(overlay, { autoAlpha: 1, duration: reduced ? 0.01 : 0.25, ease: "power2.out" });

      if (reduced || !originRect || !panel) {
        gsap.set(panel, { autoAlpha: 1 });
        emailInputRef.current?.focus();
        return;
      }

      gsap.set(content, { autoAlpha: 0, y: 8 });
      gsap.set(panel, {
        position: "fixed",
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: 999,
        overflow: "hidden",
      });
      const state = Flip.getState(panel);
      gsap.set(panel, { clearProps: "position,top,left,width,height,borderRadius,overflow" });

      Flip.from(state, {
        duration: 0.55,
        ease: "power3.out",
        props: "borderRadius",
        onComplete: () => {
          gsap.to(content, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
          emailInputRef.current?.focus();
        },
      });
    },
    { scope: overlayRef }
  );

  const closeAnimated = contextSafe(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onClose();
      return;
    }
    gsap.to(panelRef.current, { autoAlpha: 0, scale: 0.94, y: 10, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.22, ease: "power2.in", onComplete: onClose });
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await loginInline({ email, password, code: code || undefined });
      if (!result.ok) {
        setMfaRequired(Boolean(result.mfaRequired));
        setMessage(result.message ?? "Something went wrong. Please try again.");
        return;
      }
      onAuthenticated();
    });
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center p-5 overflow-y-auto"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeAnimated();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") closeAnimated();
      }}
    >
      <div
        ref={panelRef}
        className="card elev-lg w-full max-w-[420px] my-8 relative"
        style={{ background: "var(--color-bg)", padding: "clamp(24px, 4vw, 32px)" }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={closeAnimated}
          className="absolute grid place-content-center cursor-pointer rounded-full"
          style={{
            top: 14,
            right: 14,
            width: 30,
            height: 30,
            background: "var(--color-surface)",
            color: "var(--color-text)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div ref={contentRef} className="flex flex-col gap-5">
          {!mfaRequired && (
            <>
              <form action={loginWithGoogle}>
                <button type="submit" className="btn btn-secondary btn-block flex items-center justify-center gap-2">
                  <GoogleIcon />
                  Continue with Google
                </button>
              </form>
              <div className="flex items-center gap-3">
                <span className="h-px flex-1" style={{ background: "color-mix(in srgb, var(--color-text) 15%, transparent)" }} />
                <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 67%, transparent)" }}>
                  or
                </span>
                <span className="h-px flex-1" style={{ background: "color-mix(in srgb, var(--color-text) 15%, transparent)" }} />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <h2 className="text-[26px]" style={{ fontFamily: "var(--font-heading)" }}>
                {mfaRequired ? "Verify it's you" : "Welcome back"}
              </h2>
              <p className="text-[14.5px] mt-1.5" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
                {mfaRequired ? "Enter the 6-digit code from your authenticator app." : "Log in to send your request."}
              </p>
            </div>

            {mfaRequired ? (
              <div className="field">
                <label htmlFor="request-login-code">Authentication code</label>
                <div className="field-icon">
                  <LockIcon />
                  <input
                    className="input"
                    id="request-login-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={10}
                    autoFocus
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="request-login-email">Email</label>
                  <div className="field-icon">
                    <MailIcon />
                    <input
                      ref={emailInputRef}
                      className="input"
                      id="request-login-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="request-login-password">Password</label>
                  <div className="field-icon">
                    <LockIcon />
                    <input
                      className="input"
                      id="request-login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-toggle"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOffIcon width={17} height={17} /> : <EyeIcon width={17} height={17} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {message && (
              <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
                {message}
              </p>
            )}

            <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
              {pending ? (
                <>
                  <SpinnerIcon width={16} height={16} /> {mfaRequired ? "Verifying…" : "Logging in…"}
                </>
              ) : (
                <>
                  {mfaRequired ? "Verify" : "Log in"} <ArrowRightIcon width={16} height={16} />
                </>
              )}
            </button>
          </form>

          {!mfaRequired && (
            <p className="text-[13.5px] text-center m-0" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
              Don&rsquo;t have an account? <Link href="/signup" className="underline">Sign up</Link>
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { confirmEmailChange, dismissEmailChangeRequest, type EmailChangeConfirmState } from "@/app/lib/actions/email-change";
import { MailIcon, SpinnerIcon } from "@/components/auth/auth-icons";

gsap.registerPlugin(useGSAP);

export function EmailChangeConfirmForm({ newEmail, expiresAt }: { newEmail: string; expiresAt: string }) {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState<EmailChangeConfirmState, FormData>(confirmEmailChange, undefined);
  const [dismissing, setDismissing] = useState(false);
  const [settled, setSettled] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.fromTo(
        rootRef.current,
        { autoAlpha: 0, y: reduced ? 0 : -10 },
        { autoAlpha: 1, y: 0, duration: reduced ? 0.01 : 0.4, ease: "power2.out" }
      );
    },
    { scope: rootRef }
  );

  const shake = contextSafe(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.fromTo(
      ".ecf-code-input",
      { x: 0 },
      { x: 8, duration: 0.07, ease: "power1.inOut", repeat: 5, yoyo: true, clearProps: "x" }
    );
  });

  useEffect(() => {
    if (state?.status === "error") shake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (state?.status === "success" && !settled) {
      setSettled(true);
      updateSession({ email: state.email });
      const t = setTimeout(() => router.refresh(), 1600);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function handleDismiss() {
    setDismissing(true);
    dismissEmailChangeRequest().then(() => router.refresh());
  }

  const expiresLabel = new Date(expiresAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

  return (
    <div
      ref={rootRef}
      className="flex flex-wrap items-center gap-4 p-[clamp(16px,3vw,22px)]"
      style={{
        borderRadius: "var(--radius-lg)",
        background: "var(--color-accent-100)",
        border: "1px solid var(--color-accent-300)",
      }}
    >
      {state?.status === "success" ? (
        <div className="flex items-center gap-3">
          <div
            className="grid place-content-center flex-none"
            style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--color-verified)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <p className="text-[14.5px] m-0">
            Email updated to <strong>{state.email}</strong>.
          </p>
        </div>
      ) : (
        <>
          <div
            className="grid place-content-center flex-none"
            style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--color-accent-200)", color: "var(--color-accent-800)" }}
          >
            <MailIcon width={17} height={17} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[14.5px] m-0">
              Confirm your new email <strong>{newEmail}</strong>.
            </p>
            <p className="text-[12.5px] mt-0.5 mb-0" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
              Enter the code we emailed to that address to confirm — expires around {expiresLabel}.
            </p>
          </div>

          <form action={formAction} className="flex items-center gap-2 flex-none">
            <input
              className="input ecf-code-input"
              style={{ maxWidth: 130 }}
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={10}
              placeholder="Code"
              required
              disabled={pending || dismissing}
            />
            <button type="submit" className="btn btn-primary text-[13px]" style={{ padding: "8px 16px" }} disabled={pending || dismissing}>
              {pending ? <SpinnerIcon width={15} height={15} /> : "Confirm"}
            </button>
            <button
              type="button"
              className="btn btn-ghost text-[13px]"
              onClick={handleDismiss}
              disabled={pending || dismissing}
            >
              Not me
            </button>
          </form>

          {state?.status === "error" && (
            <p className="text-[13px] m-0 w-full" style={{ color: "#d92d20" }}>
              {state.message}
            </p>
          )}
        </>
      )}
    </div>
  );
}

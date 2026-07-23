"use client";

import { useActionState, useState } from "react";
import { login, loginWithGoogle } from "@/app/lib/actions/auth";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, SpinnerIcon, GoogleIcon } from "@/components/auth/auth-icons";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mfaRequired = state?.mfaRequired ?? false;

  return (
    <div className="flex flex-col gap-5">
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
            <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
              or
            </span>
            <span className="h-px flex-1" style={{ background: "color-mix(in srgb, var(--color-text) 15%, transparent)" }} />
          </div>
        </>
      )}

      <form action={action} className="flex flex-col gap-5">
      <div>
        <h1 className="text-[28px]">{mfaRequired ? "Verify it's you" : "Welcome back"}</h1>
        <p className="text-[14.5px] mt-1.5" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
          {mfaRequired ? "Enter the 6-digit code from your authenticator app." : "Log in to view your matches and messages."}
        </p>
      </div>

      {mfaRequired ? (
        <>
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="password" value={password} />
          <div className="field">
            <label htmlFor="code">Authentication code</label>
            <div className="field-icon">
              <LockIcon />
              <input
                className="input"
                id="code"
                type="text"
                name="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={10}
                autoFocus
                required
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="field-icon">
              <MailIcon />
              <input
                className="input"
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="field-icon">
              <LockIcon />
              <input
                className="input"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
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

      {state?.message && (
        <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
          {state.message}
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
    </div>
  );
}

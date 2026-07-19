"use client";

import { useActionState, useState } from "react";
import { login } from "@/app/lib/actions/auth";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, SpinnerIcon } from "@/components/auth/auth-icons";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <h1 className="text-[28px]">Welcome back</h1>
        <p className="text-[14.5px] mt-1.5" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
          Log in to view your matches and messages.
        </p>
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <div className="field-icon">
          <MailIcon />
          <input className="input" id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
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

      {state?.message && (
        <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
          {state.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? (
          <>
            <SpinnerIcon width={16} height={16} /> Logging in…
          </>
        ) : (
          <>
            Log in <ArrowRightIcon width={16} height={16} />
          </>
        )}
      </button>
    </form>
  );
}

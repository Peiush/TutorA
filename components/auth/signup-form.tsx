"use client";

import { useActionState, useState } from "react";
import { signup, loginWithGoogle } from "@/app/lib/actions/auth";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  SpinnerIcon,
  GoogleIcon,
} from "@/components/auth/auth-icons";
import { PhoneInput } from "@/components/ui/phone-input";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-5">
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

    <form action={action} className="flex flex-col gap-5">
      <div>
        <h1 className="text-[28px]">Create your account</h1>
        <p className="text-[14.5px] mt-1.5" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
          Tell us a little about you to get matched with a tutor.
        </p>
      </div>

      <div className="field">
        <label htmlFor="name">Full name</label>
        <div className="field-icon">
          <UserIcon />
          <input className="input" id="name" name="name" placeholder="Your name" autoComplete="name" required />
        </div>
        {state?.errors?.name && <p className="text-[13px] m-0 mt-1" style={{ color: "#d92d20" }}>{state.errors.name[0]}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <div className="field-icon">
          <MailIcon />
          <input className="input" id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
        </div>
        {state?.errors?.email && <p className="text-[13px] m-0 mt-1" style={{ color: "#d92d20" }}>{state.errors.email[0]}</p>}
      </div>

      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <PhoneInput id="phone" name="phone" required />
        {state?.errors?.phone && <p className="text-[13px] m-0 mt-1" style={{ color: "#d92d20" }}>{state.errors.phone[0]}</p>}
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
            autoComplete="new-password"
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
        <p className="text-[12px] mt-1.5 m-0" style={{ color: "color-mix(in srgb, var(--color-text) 67%, transparent)" }}>
          At least 8 characters, with a letter and a number.
        </p>
        {state?.errors?.password && (
          <ul className="text-[13px] m-0 mt-1 pl-4" style={{ color: "#d92d20" }}>
            {state.errors.password.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>

      {state?.message && (
        <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
          {state.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? (
          <>
            <SpinnerIcon width={16} height={16} /> Creating account…
          </>
        ) : (
          <>
            Sign up <ArrowRightIcon width={16} height={16} />
          </>
        )}
      </button>
    </form>
    </div>
  );
}

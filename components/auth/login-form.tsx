"use client";

import { useActionState } from "react";
import { login } from "@/app/lib/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="card elev-md gap-4 p-[var(--space-6)]" style={{ background: "var(--color-bg)" }}>
      <div className="font-[var(--font-heading)] text-[22px]">Log in</div>

      <div className="field">
        <label>Email</label>
        <input className="input" type="email" name="email" placeholder="you@example.com" required />
      </div>
      <div className="field">
        <label>Password</label>
        <input className="input" type="password" name="password" required />
      </div>

      {state?.message && (
        <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
          {state.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}

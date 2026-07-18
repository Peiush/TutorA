"use client";

import { useActionState, useState } from "react";
import { signup } from "@/app/lib/actions/auth";
import { SegmentedControl } from "@/components/ui/segmented";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [role, setRole] = useState("STUDENT");

  return (
    <form action={action} className="card elev-md gap-4 p-[var(--space-6)]" style={{ background: "var(--color-bg)" }}>
      <div className="font-[var(--font-heading)] text-[22px]">Create your account</div>

      <div className="field">
        <label>I am a</label>
        <SegmentedControl
          name="role-display"
          value={role === "STUDENT" ? "Student" : "Tutor"}
          onChange={(v) => setRole(v === "Student" ? "STUDENT" : "TUTOR")}
          options={[
            { label: "Student", value: "Student" },
            { label: "Tutor", value: "Tutor" },
          ]}
        />
        <input type="hidden" name="role" value={role} />
      </div>

      <div className="field">
        <label>Full name</label>
        <input className="input" name="name" placeholder="Your name" required />
        {state?.errors?.name && <p className="text-[13px] m-0" style={{ color: "#d92d20" }}>{state.errors.name[0]}</p>}
      </div>
      <div className="field">
        <label>Email</label>
        <input className="input" type="email" name="email" placeholder="you@example.com" required />
        {state?.errors?.email && <p className="text-[13px] m-0" style={{ color: "#d92d20" }}>{state.errors.email[0]}</p>}
      </div>
      <div className="field">
        <label>Password</label>
        <input className="input" type="password" name="password" required />
        {state?.errors?.password && (
          <ul className="text-[13px] m-0 pl-4" style={{ color: "#d92d20" }}>
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
        {pending ? "Creating account…" : "Sign up"}
      </button>
    </form>
  );
}

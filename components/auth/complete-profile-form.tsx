"use client";

import { useActionState } from "react";
import { completeProfile } from "@/app/lib/actions/complete-profile";
import { logout } from "@/app/lib/actions/auth";
import { ArrowRightIcon, SpinnerIcon } from "@/components/auth/auth-icons";
import { PhoneInput } from "@/components/ui/phone-input";

export function CompleteProfileForm({ name }: { name: string | null }) {
  const [state, action, pending] = useActionState(completeProfile, undefined);
  const firstName = name?.trim().split(" ")[0];

  return (
    <div className="flex flex-col gap-5">
      <form action={action} className="flex flex-col gap-5">
        <div>
          <h1 className="text-[28px]">{firstName ? `Hi ${firstName}, one last step` : "One last step"}</h1>
          <p className="text-[14.5px] mt-1.5" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            Add your phone number so we can reach you fast about your matches and requests.
          </p>
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <PhoneInput id="phone" name="phone" autoFocus required />
        </div>

        {state?.message && (
          <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
            {state.message}
          </p>
        )}

        <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
          {pending ? (
            <>
              <SpinnerIcon width={16} height={16} /> Saving…
            </>
          ) : (
            <>
              Save and continue <ArrowRightIcon width={16} height={16} />
            </>
          )}
        </button>
      </form>

      <form action={logout} className="text-center">
        <button
          type="submit"
          className="text-[13px] underline cursor-pointer bg-transparent border-0 p-0"
          style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
        >
          Not you? Sign out
        </button>
      </form>
    </div>
  );
}

"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { updateTutorProfileByAdmin } from "@/app/lib/actions/admin";
import type { TutorRaw } from "@/lib/mock-data";

export function TutorAdminEditModal({
  tutor,
  onClose,
  onSaved,
}: {
  tutor: TutorRaw;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [state, action, pending] = useActionState(updateTutorProfileByAdmin, undefined);
  const savedRef = useRef(false);

  useEffect(() => {
    if (state?.message === "success" && !savedRef.current) {
      savedRef.current = true;
      onSaved();
      onClose();
    }
  }, [state, onSaved, onClose]);

  const priceDigits = tutor.price.replace(/[^0-9.]/g, "");

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        action={action}
        className="card elev-lg gap-4 w-full max-w-[440px] max-h-[86vh] overflow-y-auto"
        style={{ background: "var(--color-bg)" }}
      >
        <input type="hidden" name="id" value={tutor.id} />
        <h2 className="text-[19px]">Edit tutor listing</h2>

        <div className="field">
          <label>Name</label>
          <input className="input" name="name" defaultValue={tutor.name} required />
        </div>
        <div className="field">
          <label>Country</label>
          <input className="input" name="country" defaultValue={tutor.city} required />
        </div>
        <div className="field">
          <label>Subjects</label>
          <input className="input" name="subjects" defaultValue={tutor.subjects.join(", ")} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label>Years of experience</label>
            <input className="input" name="yearsExperience" type="number" />
          </div>
          <div className="field">
            <label>Fee (per hour)</label>
            <input className="input" name="hourlyRate" defaultValue={priceDigits ? `$${priceDigits}` : undefined} />
          </div>
        </div>
        <div className="field">
          <label>Short bio</label>
          <textarea className="input" name="bio" rows={3} defaultValue={tutor.bio ?? undefined} />
        </div>

        {state?.message && state.message !== "success" && (
          <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
            {state.message}
          </p>
        )}

        <div className="flex justify-end gap-2.5 mt-1">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={pending}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}

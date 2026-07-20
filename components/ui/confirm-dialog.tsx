"use client";

import { createPortal } from "react-dom";

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Delete",
  pending = false,
  danger = true,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  confirmLabel?: string;
  pending?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="card elev-lg gap-4 w-full max-w-[380px]" style={{ background: "var(--color-bg)" }}>
        <div
          className="w-11 h-11 rounded-full grid place-content-center"
          style={{
            background: danger
              ? "color-mix(in srgb, #d92d20 15%, transparent)"
              : "var(--color-accent-2-100)",
            color: danger ? "#d92d20" : "var(--color-accent-2-700)",
          }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8v5M12 16h.01" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <h2 className="text-[18px]">{title}</h2>
        <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
          {description}
        </p>
        <div className="flex justify-end gap-2.5 mt-1">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={pending}>
            Cancel
          </button>
          <button
            type="button"
            className="btn"
            onClick={onConfirm}
            disabled={pending}
            style={
              danger
                ? { background: "#d92d20", color: "#fff" }
                : undefined
            }
          >
            {pending ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

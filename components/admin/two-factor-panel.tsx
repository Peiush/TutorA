"use client";

import { useState, type SVGProps } from "react";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { startMfaEnrollment, confirmMfaEnrollment, disableMfa } from "@/app/lib/actions/mfa";

type Step = "idle" | "enrolling" | "backup-codes";

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 3.5 19.5 6.5v5.3c0 4.6-3.2 7.9-7.5 9-4.3-1.1-7.5-4.4-7.5-9V6.5L12 3.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function TwoFactorPanel({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [step, setStep] = useState<Step>("idle");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [confirmingDisable, setConfirmingDisable] = useState(false);
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleStartEnrollment() {
    setPending(true);
    setError(null);
    const result = await startMfaEnrollment();
    setPending(false);
    if (!result.ok || !result.qrCodeDataUrl || !result.secret) {
      setError(result.message ?? "Something went wrong. Please try again.");
      return;
    }
    setQrCodeDataUrl(result.qrCodeDataUrl);
    setSecret(result.secret);
    setStep("enrolling");
  }

  async function handleConfirm() {
    setPending(true);
    setError(null);
    const result = await confirmMfaEnrollment(code);
    setPending(false);
    if (!result.ok || !result.backupCodes) {
      setError(result.message ?? "Something went wrong. Please try again.");
      return;
    }
    setBackupCodes(result.backupCodes);
    setStep("backup-codes");
    setEnabled(true);
    setCode("");
  }

  async function handleDisable() {
    setPending(true);
    const result = await disableMfa();
    setPending(false);
    setConfirmingDisable(false);
    if (result.ok) {
      setEnabled(false);
      setStep("idle");
      setToast({ tone: "success", message: "Two-factor authentication turned off." });
    } else {
      setToast({ tone: "error", message: result.message ?? "Something went wrong." });
    }
  }

  function handleDone() {
    setStep("idle");
    setQrCodeDataUrl(null);
    setSecret(null);
    setBackupCodes([]);
    setToast({ tone: "success", message: "Two-factor authentication is now on for your account." });
  }

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldIcon width={18} height={18} />
          <h2 className="text-[17px]">Two-factor authentication</h2>
          <Tag variant={enabled ? "success" : "outline"}>{enabled ? "On" : "Off"}</Tag>
        </div>
        {step === "idle" && !enabled && (
          <button type="button" className="btn btn-primary" onClick={handleStartEnrollment} disabled={pending}>
            Turn on
          </button>
        )}
        {step === "idle" && enabled && (
          <button type="button" className="btn btn-secondary" onClick={() => setConfirmingDisable(true)} disabled={pending}>
            Turn off
          </button>
        )}
      </div>

      <p className="text-[13.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        Require a 6-digit code from an authenticator app in addition to your password when signing in as an admin.
      </p>

      {step === "enrolling" && qrCodeDataUrl && (
        <div className="flex flex-col gap-4 pt-2 border-t" style={{ borderColor: "var(--color-divider)" }}>
          <div className="flex flex-wrap items-start gap-5">
            <div className="p-2 rounded-[var(--radius-md)]" style={{ background: "#fff" }}>
              <Image src={qrCodeDataUrl} alt="Scan this QR code with your authenticator app" width={168} height={168} unoptimized />
            </div>
            <div className="flex-1 min-w-[220px] flex flex-col gap-3">
              <div>
                <p className="text-[13.5px] mb-1">1. Scan with an authenticator app (Google Authenticator, 1Password, Authy).</p>
                <p className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                  Can&rsquo;t scan? Enter this key manually: <code>{secret}</code>
                </p>
              </div>
              <div>
                <label htmlFor="mfa-code" className="text-[13.5px] block mb-1">
                  2. Enter the 6-digit code
                </label>
                <input
                  id="mfa-code"
                  className="input"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              {error && (
                <p className="text-[13px] m-0" style={{ color: "#d92d20" }}>
                  {error}
                </p>
              )}
              <div className="flex gap-2">
                <button type="button" className="btn btn-primary" onClick={handleConfirm} disabled={pending || code.length !== 6}>
                  Verify and turn on
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setStep("idle")} disabled={pending}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "backup-codes" && (
        <div className="flex flex-col gap-3 pt-2 border-t" style={{ borderColor: "var(--color-divider)" }}>
          <p className="text-[13.5px]">
            Save these backup codes somewhere safe. Each one can be used once to sign in if you lose access to your authenticator app.
          </p>
          <div className="grid grid-cols-2 gap-2 max-w-[320px] font-mono text-[13.5px]">
            {backupCodes.map((c) => (
              <div key={c} className="px-2.5 py-1.5 rounded-[var(--radius-sm)]" style={{ background: "var(--color-accent-100)" }}>
                {c}
              </div>
            ))}
          </div>
          <div>
            <button type="button" className="btn btn-primary" onClick={handleDone}>
              I&rsquo;ve saved these codes
            </button>
          </div>
        </div>
      )}

      {error && step === "idle" && (
        <p className="text-[13px] m-0" style={{ color: "#d92d20" }}>
          {error}
        </p>
      )}

      {confirmingDisable && (
        <ConfirmDialog
          title="Turn off two-factor authentication?"
          description="Your account will only require a password to sign in."
          confirmLabel="Turn off"
          onConfirm={handleDisable}
          onCancel={() => setConfirmingDisable(false)}
          pending={pending}
        />
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

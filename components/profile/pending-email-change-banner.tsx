import { getPendingEmailChange } from "@/app/lib/actions/email-change";
import { EmailChangeConfirmForm } from "@/components/profile/email-change-confirm-form";

export async function PendingEmailChangeBanner() {
  const pending = await getPendingEmailChange();
  if (!pending) return null;

  return <EmailChangeConfirmForm newEmail={pending.newEmail} expiresAt={pending.expiresAt.toISOString()} />;
}

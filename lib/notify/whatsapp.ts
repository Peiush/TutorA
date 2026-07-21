const TWILIO_API_BASE = "https://api.twilio.com/2010-04-01/Accounts";

export function contactLine(user: { name: string | null; email: string; phone: string | null }): string {
  const identity = user.name ?? user.email;
  return user.phone ? `${identity} (${user.phone})` : identity;
}

export function formatMode(mode: string | null | undefined): string {
  return mode === "Both" ? "Online and Offline both" : mode || "N/A";
}

export async function sendAdminWhatsApp(message: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.ADMIN_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !from || !to) {
    console.warn("[whatsapp] Skipping notification: Twilio env vars not configured.");
    return;
  }

  const body = new URLSearchParams({
    From: `whatsapp:${from}`,
    To: `whatsapp:${to}`,
    Body: message,
  });

  try {
    const res = await fetch(`${TWILIO_API_BASE}/${accountSid}/Messages.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      },
      body,
    });

    if (!res.ok) {
      console.error("[whatsapp] Twilio request failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[whatsapp] Failed to send notification:", err);
  }
}

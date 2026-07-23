import { rateLimit } from "@/lib/rate-limit";

const GRAPH_API_BASE = "https://graph.facebook.com/v21.0";

// Hard backstop independent of the per-action rate limits upstream: caps
// total outbound messages so a burst of spam (or a bug) can't run up the
// WhatsApp bill or flood recipients.
const SEND_CAP_PER_MINUTE = 20;

// Circuit breaker: if Meta's API itself is failing, stop hammering it and log
// once per open window instead of once per request.
const FAILURE_THRESHOLD = 5;
const BREAKER_COOLDOWN_MS = 5 * 60 * 1000;

let consecutiveFailures = 0;
let breakerOpenUntil = 0;

export function contactLine(user: { name: string | null; email: string; phone: string | null }): string {
  const identity = user.name ?? user.email;
  return user.phone ? `${identity} (${user.phone})` : identity;
}

export function formatMode(mode: string | null | undefined): string {
  return mode === "Both" ? "Online and Offline both" : mode || "N/A";
}

// Meta's webhook payloads give phone numbers without a leading "+" (e.g.
// "917982342365"). Normalize to E.164 so it matches how phones are stored
// everywhere else in the app (User.phone, ADMIN_WHATSAPP_NUMBER).
export function normalizeWhatsAppPhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  return `+${digits}`;
}

type SendResult = { ok: boolean; waMessageId?: string };

export async function sendWhatsAppMessage(to: string, message: string): Promise<SendResult> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    console.warn("[whatsapp] Skipping notification: WhatsApp Cloud API env vars not configured.");
    return { ok: false };
  }

  const now = Date.now();
  if (now < breakerOpenUntil) {
    console.warn(JSON.stringify({ event: "whatsapp.circuit_open", openUntil: new Date(breakerOpenUntil).toISOString() }));
    return { ok: false };
  }

  const capped = rateLimit("whatsapp:send-cap", SEND_CAP_PER_MINUTE, 60 * 1000);
  if (!capped.ok) {
    console.warn(JSON.stringify({ event: "whatsapp.rate_capped", retryAfterMs: capped.retryAfterMs }));
    return { ok: false };
  }

  try {
    const res = await fetch(`${GRAPH_API_BASE}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/^\+/, ""),
        type: "text",
        text: { body: message },
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      recordFailure();
      console.error("[whatsapp] Graph API request failed:", res.status, JSON.stringify(data));
      return { ok: false };
    }

    consecutiveFailures = 0;
    const waMessageId: string | undefined = data?.messages?.[0]?.id;
    return { ok: true, waMessageId };
  } catch (err) {
    recordFailure();
    console.error("[whatsapp] Failed to send notification:", err);
    return { ok: false };
  }
}

export async function sendAdminWhatsApp(message: string): Promise<void> {
  const to = process.env.ADMIN_WHATSAPP_NUMBER;
  if (!to) {
    console.warn("[whatsapp] Skipping notification: ADMIN_WHATSAPP_NUMBER not configured.");
    return;
  }
  await sendWhatsAppMessage(to, message);
}

function recordFailure() {
  consecutiveFailures += 1;
  if (consecutiveFailures >= FAILURE_THRESHOLD) {
    breakerOpenUntil = Date.now() + BREAKER_COOLDOWN_MS;
    consecutiveFailures = 0;
    console.error(
      JSON.stringify({
        event: "whatsapp.circuit_opened",
        reason: `${FAILURE_THRESHOLD} consecutive Graph API failures`,
        cooldownMs: BREAKER_COOLDOWN_MS,
      })
    );
  }
}

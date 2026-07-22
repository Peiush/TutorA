import { rateLimit } from "@/lib/rate-limit";

const TWILIO_API_BASE = "https://api.twilio.com/2010-04-01/Accounts";

// Hard backstop independent of the per-action rate limits upstream: caps
// total outbound messages so a burst of spam (or a bug) can't run up the
// Twilio bill or flood the admin's phone.
const SEND_CAP_PER_MINUTE = 20;

// Circuit breaker: if Twilio itself is failing, stop hammering it and log
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

export async function sendAdminWhatsApp(message: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.ADMIN_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !from || !to) {
    console.warn("[whatsapp] Skipping notification: Twilio env vars not configured.");
    return;
  }

  const now = Date.now();
  if (now < breakerOpenUntil) {
    console.warn(JSON.stringify({ event: "whatsapp.circuit_open", openUntil: new Date(breakerOpenUntil).toISOString() }));
    return;
  }

  const capped = rateLimit("whatsapp:send-cap", SEND_CAP_PER_MINUTE, 60 * 1000);
  if (!capped.ok) {
    console.warn(JSON.stringify({ event: "whatsapp.rate_capped", retryAfterMs: capped.retryAfterMs }));
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
      recordFailure();
      console.error("[whatsapp] Twilio request failed:", res.status, await res.text());
      return;
    }

    consecutiveFailures = 0;
  } catch (err) {
    recordFailure();
    console.error("[whatsapp] Failed to send notification:", err);
  }
}

function recordFailure() {
  consecutiveFailures += 1;
  if (consecutiveFailures >= FAILURE_THRESHOLD) {
    breakerOpenUntil = Date.now() + BREAKER_COOLDOWN_MS;
    consecutiveFailures = 0;
    console.error(
      JSON.stringify({
        event: "whatsapp.circuit_opened",
        reason: `${FAILURE_THRESHOLD} consecutive Twilio failures`,
        cooldownMs: BREAKER_COOLDOWN_MS,
      })
    );
  }
}

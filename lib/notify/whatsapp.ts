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

async function postToGraphApi(to: string, payload: Record<string, unknown>): Promise<SendResult> {
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
      body: JSON.stringify({ messaging_product: "whatsapp", to: to.replace(/^\+/, ""), ...payload }),
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

// Freeform text only delivers within the 24h window opened by the recipient
// messaging first (WhatsApp platform rule) — fine for two-way student
// conversation replies, but NOT for admin notifications the admin never
// initiates. Use sendWhatsAppTemplate for those instead.
export async function sendWhatsAppMessage(to: string, message: string): Promise<SendResult> {
  return postToGraphApi(to, { type: "text", text: { body: message } });
}

// Sends an approved message template, which bypasses the 24h window — the
// only reliable way to reach someone who hasn't messaged the business number
// first, e.g. the admin receiving operational alerts.
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode: string,
  bodyParams: Record<string, string>,
  buttonUrlParam?: string
): Promise<SendResult> {
  const components: Record<string, unknown>[] = [
    {
      type: "body",
      parameters: Object.entries(bodyParams).map(([name, text]) => ({
        type: "text",
        parameter_name: name,
        text,
      })),
    },
  ];

  if (buttonUrlParam !== undefined) {
    components.push({
      type: "button",
      sub_type: "url",
      index: "0",
      parameters: [{ type: "text", text: buttonUrlParam }],
    });
  }

  return postToGraphApi(to, {
    type: "template",
    template: { name: templateName, language: { code: languageCode }, components },
  });
}

// Authentication-category templates are Meta-generated (no custom body text)
// and use positional {{1}} parameters plus a mandatory "copy code" button —
// a different wire format from the named-parameter Utility templates above.
// Unlike freeform text or Utility templates, these can reach a number that
// has never messaged the business first, which is the whole point of an OTP.
export async function sendPhoneOtpWhatsApp(to: string, code: string): Promise<SendResult> {
  return postToGraphApi(to, {
    type: "template",
    template: {
      name: "tutorconnect_phone_otp",
      language: { code: "en" },
      components: [
        { type: "body", parameters: [{ type: "text", text: code }] },
        {
          type: "button",
          sub_type: "copy_code",
          index: "0",
          parameters: [{ type: "coupon_code", coupon_code: code }],
        },
      ],
    },
  });
}

async function sendAdminTemplateAlert(
  templateName: string,
  bodyParams: Record<string, string>,
  buttonUrlParam?: string
): Promise<void> {
  const to = process.env.ADMIN_WHATSAPP_NUMBER;
  if (!to) {
    console.warn("[whatsapp] Skipping notification: ADMIN_WHATSAPP_NUMBER not configured.");
    return;
  }
  await sendWhatsAppTemplate(to, templateName, "en", bodyParams, buttonUrlParam);
}

export async function sendSignupAdminAlert(name: string, email: string, phone: string): Promise<void> {
  await sendAdminTemplateAlert(
    "tutorconnect_newsingup_admin_alert",
    { user_name: name, user_email: email, user_phone: phone },
    "admin"
  );
}

export async function sendCustomTutorRequestAdminAlert(fields: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  level: string;
  mode: string;
  goals: string;
  sessionsPerWeek: string;
  timezone: string;
  budget: string;
  notes: string;
}): Promise<void> {
  await sendAdminTemplateAlert("tutorconnect_custom_tutor_request_alert", {
    student_name: fields.name,
    student_email: fields.email,
    student_phone: fields.phone,
    subject: fields.subject,
    level: fields.level,
    mode: fields.mode,
    goals: fields.goals,
    sessions_per_week: fields.sessionsPerWeek,
    timezone: fields.timezone,
    budget: fields.budget,
    notes: fields.notes,
  });
}

export async function sendListedTutorRequestAdminAlert(fields: {
  name: string;
  email: string;
  phone: string;
  tutorName: string;
  subject: string;
  price: string;
}): Promise<void> {
  await sendAdminTemplateAlert("tutorconnect_listed_tutor_request_alert", {
    student_name: fields.name,
    student_email: fields.email,
    student_phone: fields.phone,
    tutor_name: fields.tutorName,
    subject: fields.subject,
    price: fields.price,
  });
}

export async function sendCourseRequestAdminAlert(fields: {
  name: string;
  email: string;
  phone: string;
  courseTitle: string;
  price: string;
}): Promise<void> {
  await sendAdminTemplateAlert("tutorconnect_course_request_alert", {
    student_name: fields.name,
    student_email: fields.email,
    student_phone: fields.phone,
    course_title: fields.courseTitle,
    price: fields.price,
  });
}

export async function sendSubjectRequestAdminAlert(fields: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  gradeLevel: string;
  price: string;
}): Promise<void> {
  await sendAdminTemplateAlert("tutorconnect_subject_request_alert", {
    student_name: fields.name,
    student_email: fields.email,
    student_phone: fields.phone,
    subject: fields.subject,
    grade_level: fields.gradeLevel,
    price: fields.price,
  });
}

export async function sendSavedTutorAdminAlert(fields: {
  name: string;
  email: string;
  phone: string;
  tutorName: string;
  tutorPhone: string;
  subject: string;
  mode: string;
  price: string;
}): Promise<void> {
  await sendAdminTemplateAlert("tutorconnect_saved_tutor_alert", {
    student_name: fields.name,
    student_email: fields.email,
    student_phone: fields.phone,
    tutor_name: fields.tutorName,
    tutor_phone: fields.tutorPhone,
    subject: fields.subject,
    mode: fields.mode,
    price: fields.price,
  });
}

export async function sendSavedCourseAdminAlert(fields: {
  name: string;
  email: string;
  phone: string;
  courseTitle: string;
}): Promise<void> {
  await sendAdminTemplateAlert("tutorconnect_saved_course_alert", {
    student_name: fields.name,
    student_email: fields.email,
    student_phone: fields.phone,
    course_title: fields.courseTitle,
  });
}

export async function sendSavedSubjectAdminAlert(fields: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  gradeLevel: string;
}): Promise<void> {
  await sendAdminTemplateAlert("tutorconnect_saved_subject_alert", {
    student_name: fields.name,
    student_email: fields.email,
    student_phone: fields.phone,
    subject: fields.subject,
    grade_level: fields.gradeLevel,
  });
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

import crypto from "crypto";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeWhatsAppPhone } from "@/lib/notify/whatsapp";
import { logSecurityEvent } from "@/lib/security-log";

// Meta calls this once when the webhook is subscribed, to prove we control
// the endpoint before it starts sending real events.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200 });
  }

  logSecurityEvent("whatsapp.webhook_verify_failed", { mode, tokenPresent: Boolean(token) });
  return new Response("Forbidden", { status: 403 });
}

interface WhatsAppMessagePayload {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
}

interface WhatsAppStatusPayload {
  id: string;
  status: string;
}

interface WhatsAppWebhookBody {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: WhatsAppMessagePayload[];
        statuses?: WhatsAppStatusPayload[];
      };
    }>;
  }>;
}

const STATUS_MAP: Record<string, "SENT" | "DELIVERED" | "READ" | "FAILED"> = {
  sent: "SENT",
  delivered: "DELIVERED",
  read: "READ",
  failed: "FAILED",
};

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  if (!verifySignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    logSecurityEvent("whatsapp.webhook_signature_invalid", {});
    return new Response("Unauthorized", { status: 401 });
  }

  let body: WhatsAppWebhookBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({}, { status: 200 });
  }

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      for (const message of change.value?.messages ?? []) {
        await handleInboundMessage(message);
      }
      for (const status of change.value?.statuses ?? []) {
        await handleStatusUpdate(status);
      }
    }
  }

  return Response.json({}, { status: 200 });
}

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret || !signatureHeader) return false;

  const expected =
    "sha256=" + crypto.createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function handleInboundMessage(message: WhatsAppMessagePayload) {
  const phone = normalizeWhatsAppPhone(message.from);
  const body = message.text?.body ?? `[unsupported message type: ${message.type}]`;
  const matchedUser = await prisma.user.findFirst({ where: { phone }, select: { id: true } });

  const conversation = await prisma.conversation.upsert({
    where: { phone },
    update: { lastMessageAt: new Date(), userId: matchedUser?.id },
    create: { phone, userId: matchedUser?.id, lastMessageAt: new Date() },
  });

  await prisma.whatsAppMessage.create({
    data: {
      conversationId: conversation.id,
      direction: "IN",
      waMessageId: message.id,
      body,
      status: "DELIVERED",
      payload: message as unknown as object,
    },
  });
}

async function handleStatusUpdate(status: WhatsAppStatusPayload) {
  const mapped = STATUS_MAP[status.status];
  if (!mapped) return;

  await prisma.whatsAppMessage
    .update({ where: { waMessageId: status.id }, data: { status: mapped } })
    .catch(() => {
      // Status update for a message we don't have (e.g. sent before this
      // feature existed) — nothing to update, safe to ignore.
    });
}

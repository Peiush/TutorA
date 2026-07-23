"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/notify/whatsapp";
import { logAdminAction } from "@/lib/audit-log";
import { requireAdmin } from "@/app/lib/actions/admin";

export type ConversationSummary = {
  id: string;
  phone: string;
  studentName: string | null;
  lastMessageAt: Date;
  lastMessageBody: string | null;
  lastMessageDirection: "IN" | "OUT" | null;
};

export async function listConversations(): Promise<ConversationSummary[]> {
  const { error } = await requireAdmin();
  if (error) return [];

  const conversations = await prisma.conversation.findMany({
    orderBy: { lastMessageAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  return conversations.map((c) => ({
    id: c.id,
    phone: c.phone,
    studentName: c.user?.name ?? c.user?.email ?? null,
    lastMessageAt: c.lastMessageAt,
    lastMessageBody: c.messages[0]?.body ?? null,
    lastMessageDirection: c.messages[0]?.direction ?? null,
  }));
}

export type ConversationMessage = {
  id: string;
  direction: "IN" | "OUT";
  body: string;
  status: string;
  createdAt: Date;
};

export async function getConversationMessages(conversationId: string): Promise<ConversationMessage[]> {
  const { error } = await requireAdmin();
  if (error) return [];

  const messages = await prisma.whatsAppMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });

  return messages.map((m) => ({
    id: m.id,
    direction: m.direction,
    body: m.body,
    status: m.status,
    createdAt: m.createdAt,
  }));
}

export type SendReplyState = { ok: boolean; message?: string };

export async function sendWhatsAppReply(conversationId: string, body: string): Promise<SendReplyState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  const trimmed = body.trim();
  if (!trimmed) {
    return { ok: false, message: "Message can't be empty." };
  }

  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!conversation) {
    return { ok: false, message: "Conversation not found." };
  }

  const result = await sendWhatsAppMessage(conversation.phone, trimmed);
  if (!result.ok) {
    return { ok: false, message: "Failed to send — check server logs for the WhatsApp API error." };
  }

  await prisma.$transaction([
    prisma.whatsAppMessage.create({
      data: {
        conversationId,
        direction: "OUT",
        waMessageId: result.waMessageId,
        body: trimmed,
        status: "SENT",
      },
    }),
    prisma.conversation.update({ where: { id: conversationId }, data: { lastMessageAt: new Date() } }),
  ]);

  await logAdminAction(admin!, "whatsapp.reply", "Conversation", conversationId);
  revalidatePath("/admin");
  return { ok: true };
}

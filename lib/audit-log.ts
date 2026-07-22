import "server-only";
import { prisma } from "@/lib/prisma";

export async function logAdminAction(
  actor: { id: string; email: string },
  action: string,
  targetType: string,
  targetId?: string | null,
  metadata?: Record<string, string | number | boolean | null>
) {
  await prisma.auditLog.create({
    data: {
      actorId: actor.id,
      actorEmail: actor.email,
      action,
      targetType,
      targetId: targetId ?? null,
      metadata: metadata ?? undefined,
    },
  });
}

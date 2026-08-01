import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/generated/prisma/client";
import { logSecurityEvent } from "@/lib/security-log";

export const verifySession = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
});

export const getUser = cache(async () => {
  const session = await verifySession();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true },
  });

  // Google sign-ups never provide a phone number, but it's required for
  // WhatsApp notifications — route them to fill it in before anything else.
  if (user?.role === "STUDENT" && !user.phone) {
    redirect("/complete-profile");
  }

  return user;
});

/**
 * Re-checks the caller's role against the database before rendering a
 * role-gated page. The route-level gate in proxy.ts reads the role from the
 * JWT, which is only refreshed at login, so a role change made after
 * sign-in wouldn't otherwise take effect until the session expires.
 */
export async function requireFreshRole(allowedRoles: Role[]) {
  const user = await getUser();
  if (!user || (user.role !== "ADMIN" && !allowedRoles.includes(user.role))) {
    logSecurityEvent("page.role_rejected", {
      userId: user?.id ?? null,
      role: user?.role ?? null,
      allowedRoles: allowedRoles.join(","),
    });
    redirect("/login");
  }
  return user;
}

import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return user;
});

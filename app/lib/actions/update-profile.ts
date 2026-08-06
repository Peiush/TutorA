"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const NameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(80, "That name is too long.");

const PhoneSchema = z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number.")
  .regex(/^[+\d][\d\s-]*$/, "Please enter a valid phone number.");

export type UpdateProfileState =
  | { status: "error"; message: string }
  | { status: "success"; name: string; phone: string }
  | undefined;

export async function getMyProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true },
  });
}

export async function updateProfile(
  _state: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { status: "error", message: "Your session expired. Please log in again." };
  }

  const nameResult = NameSchema.safeParse(formData.get("name"));
  if (!nameResult.success) {
    return { status: "error", message: nameResult.error.issues[0]?.message ?? "Please enter a valid name." };
  }

  const phoneResult = PhoneSchema.safeParse(formData.get("phone"));
  if (!phoneResult.success) {
    return { status: "error", message: phoneResult.error.issues[0]?.message ?? "Please enter a valid phone number." };
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name: nameResult.data, phone: phoneResult.data },
    select: { name: true, phone: true },
  });

  revalidatePath("/dashboard");
  revalidatePath("/tutor");
  revalidatePath("/admin");

  return { status: "success", name: user.name ?? "", phone: user.phone ?? "" };
}

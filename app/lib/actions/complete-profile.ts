"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendSignupAdminAlert } from "@/lib/notify/whatsapp";

const PhoneSchema = z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number.")
  .regex(/^[+\d][\d\s-]*$/, "Please enter a valid phone number.");

export type CompleteProfileState = { message?: string } | undefined;

export async function completeProfile(
  _state: CompleteProfileState,
  formData: FormData
): Promise<CompleteProfileState> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const validated = PhoneSchema.safeParse(formData.get("phone"));
  if (!validated.success) {
    return { message: validated.error.issues[0]?.message ?? "Please enter a valid phone number." };
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { phone: validated.data },
    select: { name: true, email: true, phone: true },
  });

  await sendSignupAdminAlert(user.name ?? "N/A", user.email, user.phone ?? "N/A");

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

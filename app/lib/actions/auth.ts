"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { AuthError, CredentialsSignin } from "next-auth";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { sendAdminWhatsApp } from "@/lib/notify/whatsapp";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const SignupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[+\d][\d\s-]*$/, "Please enter a valid phone number."),
  password: z
    .string()
    .min(8, "Be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Contain at least one letter.")
    .regex(/[0-9]/, "Contain at least one number."),
});

export type SignupState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function signup(_state: SignupState, formData: FormData): Promise<SignupState> {
  const ip = await getClientIp();
  const limited = rateLimit(`signup:ip:${ip}`, 5, 60 * 60 * 1000);
  if (!limited.ok) {
    return { message: "Too many signup attempts. Please try again later." };
  }

  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, phone, password } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { message: "That email can't be used to create a new account. Try logging in instead." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, phone, password: hashedPassword, role: "STUDENT" },
  });

  void sendAdminWhatsApp(
    ["New user signed up:", `Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "N/A"}`].join("\n")
  );

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}

export type LoginState = { message?: string; mfaRequired?: boolean } | undefined;

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  try {
    const email = formData.get("email");
    const user = typeof email === "string" ? await prisma.user.findUnique({ where: { email } }) : null;
    const redirectTo = user?.role === "ADMIN" ? "/admin" : user?.role === "TUTOR" ? "/tutor" : "/dashboard";

    const code = formData.get("code");
    const codeProp = typeof code === "string" && code.length > 0 ? { code } : {};

    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      ...codeProp,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        const code = (error as CredentialsSignin).code;
        if (code === "mfa_required") {
          return { mfaRequired: true, message: "Enter the 6-digit code from your authenticator app." };
        }
        if (code === "invalid_mfa_code") {
          return { mfaRequired: true, message: "That code didn't work. Try again." };
        }
        return { message: "Invalid email or password." };
      }
      return { message: "Something went wrong. Please try again." };
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
  redirect("/");
}

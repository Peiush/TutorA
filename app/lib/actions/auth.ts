"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";

const SignupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long."),
  email: z.string().trim().email("Please enter a valid email."),
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
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function signup(_state: SignupState, formData: FormData): Promise<SignupState> {
  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, password } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { message: "An account with that email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashedPassword, role: "STUDENT" },
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}

export type LoginState = { message?: string } | undefined;

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  try {
    const email = formData.get("email");
    const user = typeof email === "string" ? await prisma.user.findUnique({ where: { email } }) : null;
    const redirectTo = user?.role === "ADMIN" ? "/admin" : user?.role === "TUTOR" ? "/tutor" : "/dashboard";

    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid email or password." };
        default:
          return { message: "Something went wrong. Please try again." };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
  redirect("/");
}

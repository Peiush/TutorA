import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Log in",
  description: "Log in to your TutorA account to manage your tutor matches, courses, and requests.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <AuthShell variant="login">
      <LoginForm />
      <p className="text-[13.5px] text-center mt-6" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        Don&rsquo;t have an account? <Link href="/signup" className="underline">Sign up</Link>
      </p>
    </AuthShell>
  );
}

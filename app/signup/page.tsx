import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Sign up",
  description: "Create a TutorA account to request a tutor, browse courses, and track your matches.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: true },
};

export default function SignupPage() {
  return (
    <AuthShell variant="signup">
      <SignupForm />
      <p className="text-[13.5px] text-center mt-6" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        Already have an account? <Link href="/login" className="underline">Log in</Link>
      </p>
    </AuthShell>
  );
}

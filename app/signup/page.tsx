import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Sign up — TutorConnect",
};

export default function SignupPage() {
  return (
    <div className="max-w-[440px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(44px,8vw,96px)]">
      <SignupForm />
      <p className="text-[13.5px] text-center mt-5" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        Already have an account? <Link href="/login" className="underline">Log in</Link>
      </p>
    </div>
  );
}

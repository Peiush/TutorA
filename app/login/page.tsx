import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Log in — TutorConnect",
};

export default function LoginPage() {
  return (
    <div className="max-w-[440px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(44px,8vw,96px)]">
      <LoginForm />
      <p className="text-[13.5px] text-center mt-5" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
        Don&rsquo;t have an account? <Link href="/signup" className="underline">Sign up</Link>
      </p>
    </div>
  );
}

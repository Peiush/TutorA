import Link from "next/link";
import { ReactNode } from "react";
import { AuthIllustration } from "@/components/auth/auth-illustration";
import { Reveal } from "@/components/ui/reveal";

export function AuthShell({
  variant,
  children,
}: {
  variant: "login" | "signup";
  children: ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)]" style={{ minHeight: "clamp(560px, 88vh, 820px)" }}>
      <div className="hidden lg:block relative">
        <AuthIllustration variant={variant} />
      </div>

      <div className="relative flex flex-col justify-center px-[clamp(20px,6vw,72px)] py-[clamp(40px,6vw,72px)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="hidden lg:block absolute rounded-full"
            style={{
              top: "-10%",
              right: "-8%",
              width: 420,
              height: 420,
              background: "radial-gradient(circle at 35% 35%, var(--color-accent-200), transparent 72%)",
              opacity: 0.5,
              filter: "blur(10px)",
            }}
          />
          <div
            className="hidden lg:block absolute rounded-full"
            style={{
              bottom: "-14%",
              left: "6%",
              width: 320,
              height: 320,
              background: "radial-gradient(circle at 60% 40%, var(--color-accent-2-200), transparent 70%)",
              opacity: 0.4,
              filter: "blur(12px)",
            }}
          />
        </div>

        <div className="relative w-full max-w-[400px] mx-auto">
          <Link
            href="/"
            className="lg:hidden inline-block text-[20px] mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
          >
            TutorConnect
          </Link>
          <Reveal y={20} className="card elev-lg p-[clamp(28px,4vw,40px)]" style={{ background: "var(--color-bg)" }}>
            {children}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

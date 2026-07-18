"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/find-a-tutor", label: "Find a Tutor" },
  { href: "/request-a-tutor", label: "Request a Tutor" },
  { href: "/become-a-tutor", label: "Become a Tutor" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-20 flex flex-wrap items-center gap-[clamp(10px,2.4vw,26px)] px-[clamp(20px,5vw,64px)] py-3.5 border-b"
      style={{
        background: "color-mix(in srgb, var(--color-bg) 90%, transparent)",
        backdropFilter: "blur(8px)",
        borderColor: "var(--color-divider)",
      }}
    >
      <Link
        href="/"
        className="mr-auto text-[22px]"
        style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
      >
        TutorConnect
      </Link>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          className="text-[15px] py-1.5 transition-colors"
          style={{
            color:
              pathname === link.href
                ? "var(--color-accent-700)"
                : "color-mix(in srgb, var(--color-text) 78%, transparent)",
          }}
        >
          {link.label}
        </Link>
      ))}
      <span className="w-px h-5" style={{ background: "var(--color-divider)" }} />
      <Link href="/login" className="btn btn-ghost">
        Sign in
      </Link>
      <Link href="/find-a-tutor" className="btn btn-primary">
        Get started
      </Link>
    </nav>
  );
}

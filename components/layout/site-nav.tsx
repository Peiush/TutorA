"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/app/lib/actions/auth";
import { TutorAvatar } from "@/components/ui/tutor-avatar";

const LINKS = [
  { href: "/find-a-tutor", label: "Find a Tutor" },
  { href: "/request-a-tutor", label: "Request a Tutor" },
  { href: "/about", label: "About" },
];

const ADMIN_LINKS = [{ href: "/become-a-tutor", label: "Add a Teacher" }];

const DASHBOARD_HREF: Record<string, string> = {
  STUDENT: "/dashboard",
  TUTOR: "/tutor",
  ADMIN: "/admin",
};

type NavUser = {
  name?: string | null;
  email?: string | null;
  role?: string;
} | null;

function UserMenu({ user }: { user: NonNullable<NavUser> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dashboardHref = DASHBOARD_HREF[user.role ?? ""] ?? "/dashboard";

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 cursor-pointer rounded-full transition-colors duration-150"
        style={{ padding: "3px 10px 3px 3px", background: open ? "rgba(21, 33, 58, 0.06)" : "transparent" }}
      >
        <TutorAvatar name={user.name || user.email || "You"} size={30} />
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s ease" }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] w-[220px] p-1.5 flex flex-col gap-0.5 z-30"
          style={{
            background: "var(--color-bg)",
            border: "1px solid var(--color-divider)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div className="px-3 py-2 min-w-0">
            <div className="text-[14px] truncate" style={{ fontFamily: "var(--font-heading)" }}>
              {user.name || "Your account"}
            </div>
            <div className="text-[12px] truncate" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
              {user.email}
            </div>
          </div>
          <span className="h-px" style={{ background: "var(--color-divider)" }} />
          <Link
            href={dashboardHref}
            onClick={() => setOpen(false)}
            className="text-[14px] px-3 py-2 rounded-[var(--radius-sm)] transition-colors duration-150 hover:bg-[rgba(21,33,58,0.06)]"
            style={{ color: "var(--color-text)" }}
          >
            Dashboard
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left text-[14px] px-3 py-2 rounded-[var(--radius-sm)] cursor-pointer transition-colors duration-150 hover:bg-[rgba(21,33,58,0.06)]"
              style={{ color: "var(--color-text)" }}
            >
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export function SiteNav({ user = null }: { user?: NavUser }) {
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
      {[...LINKS, ...(user?.role === "ADMIN" ? ADMIN_LINKS : [])].map((link) => (
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
      {user ? (
        <UserMenu user={user} />
      ) : (
        <>
          <Link href="/login" className="btn btn-ghost">
            Sign in
          </Link>
          <Link href="/find-a-tutor" className="btn btn-primary">
            Get started
          </Link>
        </>
      )}
    </nav>
  );
}

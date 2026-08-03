"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RequestLoginModal } from "@/components/auth/request-login-modal";

const DELAY_MS = 3500;
const EXCLUDED_PATHS = ["/login", "/signup"];

export function AutoLoginPrompt() {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const excluded = EXCLUDED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    setOpen(false);
    // Wait for the session check to resolve so this doesn't fire the login prompt
    // at logged-in users during the brief client-side "loading" status on first paint.
    if (status !== "unauthenticated" || excluded) return;

    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, [status, excluded, pathname]);

  if (!open) return null;

  return (
    <RequestLoginModal
      originRect={null}
      onClose={() => setOpen(false)}
      onAuthenticated={() => {
        setOpen(false);
        router.refresh();
      }}
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RequestLoginModal } from "@/components/auth/request-login-modal";

const DELAY_MS = 3500;
const EXCLUDED_PATHS = ["/login", "/signup"];

export function AutoLoginPrompt({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const excluded = EXCLUDED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    setOpen(false);
    if (isAuthenticated || excluded) return;

    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, [isAuthenticated, excluded, pathname]);

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

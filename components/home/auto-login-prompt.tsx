"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RequestLoginModal } from "@/components/auth/request-login-modal";

const DELAY_MS = 3500;

export function AutoLoginPrompt({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    if (isAuthenticated) return;

    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, [isAuthenticated, pathname]);

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

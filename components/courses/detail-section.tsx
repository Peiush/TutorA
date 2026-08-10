import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

export type DetailSectionTint = "accent" | "accent-2" | "verified";

const TINTS: Record<DetailSectionTint, { bg: string; color: string }> = {
  accent: { bg: "var(--color-accent-100)", color: "var(--color-accent-700)" },
  "accent-2": { bg: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" },
  verified: { bg: "color-mix(in srgb, var(--color-verified) 16%, var(--color-surface))", color: "var(--color-verified)" },
};

// Shared "About" / "What this covers" / "Why a TutorA tutor" / "What you'll learn" zone
// for the course and subject detail pages — an icon badge + heading row with the body
// indented underneath it, so a long, content-heavy detail page reads as distinct sections
// instead of one undifferentiated block of text. See
// docs/seo-audit-tutora/findings/content-depth-audit-2026-08-10.md.
export function DetailSection({
  icon,
  tint,
  title,
  children,
}: {
  icon: ReactNode;
  tint: DetailSectionTint;
  title: string;
  children: ReactNode;
}) {
  const { bg, color } = TINTS[tint];
  return (
    <Reveal y={20}>
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="grid place-content-center rounded-full flex-none"
            style={{ width: 36, height: 36, background: bg, color }}
            aria-hidden
          >
            {icon}
          </div>
          <h2 className="text-[16px] font-semibold m-0" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h2>
        </div>
        <div className="pl-[46px]">{children}</div>
      </section>
    </Reveal>
  );
}

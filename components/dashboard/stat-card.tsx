"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tag } from "@/components/ui/tag";

gsap.registerPlugin(useGSAP);

export function StatCard({
  icon,
  label,
  value,
  hint,
  comingSoon = false,
  prefix = "",
  suffix = "",
}: {
  icon: ReactNode;
  label: string;
  value?: number;
  hint?: string;
  comingSoon?: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const numberRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = numberRef.current;
    if (!el || comingSoon || value === undefined) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const counter = { n: 0 };
    gsap.to(counter, {
      n: value,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        if (el) el.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
      },
    });
  }, { dependencies: [value, comingSoon, prefix, suffix] });

  return (
    <div
      className="stat-card card elev-sm gap-2.5 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
      style={comingSoon ? { border: "1.5px dashed var(--color-divider)", background: "transparent" } : undefined}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-full grid place-content-center flex-none"
          style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
        >
          {icon}
        </div>
        {comingSoon && (
          <Tag variant="outline" className="text-[10px]">
            Soon
          </Tag>
        )}
      </div>
      {comingSoon ? (
        <div className="text-[15px] mt-1" style={{ fontFamily: "var(--font-heading)" }}>
          {label}
        </div>
      ) : (
        <div ref={numberRef} className="text-[30px] leading-none" style={{ fontFamily: "var(--font-heading)" }}>
          0
        </div>
      )}
      <div className="text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
        {comingSoon ? hint : label}
      </div>
    </div>
  );
}

"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Stat {
  icon: ReactNode;
  label: string;
  value: number;
}

function StatValue({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        el.textContent = String(value);
        return;
      }

      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          if (el) el.textContent = String(Math.round(counter.n));
        },
      });
    },
    { dependencies: [value] }
  );

  return (
    <div ref={ref} className="text-[22px] leading-none" style={{ fontFamily: "var(--font-heading)" }}>
      0
    </div>
  );
}

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="card elev-sm flex-row flex-wrap gap-0 p-0 overflow-hidden">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="flex items-center gap-3 flex-1 min-w-[170px] px-5 py-4"
          style={i > 0 ? { borderLeft: "1px solid var(--color-divider)" } : undefined}
        >
          <span
            className="w-10 h-10 rounded-full grid place-content-center flex-none"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            {s.icon}
          </span>
          <div className="min-w-0">
            <StatValue value={s.value} />
            <div
              className="text-[12px] mt-0.5 truncate"
              style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
            >
              {s.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

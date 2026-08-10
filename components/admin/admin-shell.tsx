"use client";

import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tag } from "@/components/ui/tag";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { StatsStrip } from "@/components/dashboard/stats-strip";
import { ChevronRightIcon, CheckCircleIcon, GridIcon } from "@/components/dashboard/dashboard-icons";

gsap.registerPlugin(useGSAP);

export type AdminSection = {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number;
  content: ReactNode;
};

export type AdminDigestItem = {
  id: string;
  label: string;
  count: number;
  targetTab: string;
};

export type AdminStat = {
  icon: ReactNode;
  label: string;
  value: number;
};

function OverviewPanel({
  stats,
  digest,
  onNavigate,
}: {
  stats: AdminStat[];
  digest: AdminDigestItem[];
  onNavigate: (id: string) => void;
}) {
  const active = digest.filter((d) => d.count > 0);

  return (
    <div className="flex flex-col gap-5">
      <StatsStrip stats={stats} />

      <div className="card elev-sm gap-3.5 p-[clamp(18px,3vw,26px)]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-[19px]">Needs attention</h2>
          {active.length > 0 && (
            <Tag variant="accent" className="text-[11px]">
              {active.length} {active.length === 1 ? "item" : "items"}
            </Tag>
          )}
        </div>

        {active.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-3 py-9 px-4">
            <div
              className="w-12 h-12 rounded-full grid place-content-center"
              style={{ background: "color-mix(in srgb, var(--color-verified) 16%, transparent)", color: "var(--color-verified)" }}
            >
              <CheckCircleIcon width={20} height={20} />
            </div>
            <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
              All caught up — nothing waiting on you right now.
            </p>
          </div>
        ) : (
          <StaggerReveal className="flex flex-col gap-2" stagger={0.06} y={12}>
            {active.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => onNavigate(d.targetTab)}
                className="flex items-center justify-between gap-3 p-3.5 w-full text-left cursor-pointer transition-colors duration-150 hover:bg-[rgba(21,33,58,0.05)]"
                style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="flex-none min-w-[28px] h-7 px-1.5 rounded-full grid place-content-center text-[12.5px]"
                    style={{ background: "var(--color-accent-100)", color: "var(--color-accent-800)", fontFamily: "var(--font-heading)" }}
                  >
                    {d.count}
                  </span>
                  <span className="text-[14px] truncate">{d.label}</span>
                </div>
                <ChevronRightIcon width={16} height={16} style={{ flex: "none", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }} />
              </button>
            ))}
          </StaggerReveal>
        )}
      </div>
    </div>
  );
}

export function AdminShell({
  stats,
  digest,
  sections,
}: {
  stats: AdminStat[];
  digest: AdminDigestItem[];
  sections: AdminSection[];
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const navRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const tabs = [{ id: "overview", label: "Overview", icon: <GridIcon width={15} height={15} />, badge: undefined }, ...sections];

  useGSAP(
    () => {
      const el = navRef.current;
      if (!el) return;
      const items = el.querySelectorAll(":scope > button");
      if (!items.length) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(items, { autoAlpha: 1, x: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out", stagger: 0.045 }
      );
    },
    { scope: navRef, dependencies: [] }
  );

  useGSAP(
    () => {
      const el = panelRef.current;
      if (!el) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(el, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" });
    },
    { dependencies: [activeTab], scope: panelRef }
  );

  function focusTab(index: number) {
    const el = navRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLButtonElement>(":scope > button");
    items[index]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const index = tabs.findIndex((t) => t.id === activeTab);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % tabs.length;
      setActiveTab(tabs[next].id);
      focusTab(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prev].id);
      focusTab(prev);
    }
  }

  const activeSection = sections.find((s) => s.id === activeTab);

  return (
    <div className="flex flex-col gap-5">
      <div
        className="sticky z-10 -mx-[clamp(20px,5vw,64px)] px-[clamp(20px,5vw,64px)] py-2.5 border-b"
        style={{
          top: 60,
          background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
          backdropFilter: "blur(8px)",
          borderColor: "var(--color-divider)",
        }}
      >
        <div
          ref={navRef}
          role="tablist"
          aria-label="Admin sections"
          onKeyDown={handleKeyDown}
          className="flex items-center gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13.5px] cursor-pointer transition-colors duration-150 flex-none"
                style={
                  isActive
                    ? { background: "var(--color-accent-2-700)", color: "#fff", fontFamily: "var(--font-heading)" }
                    : {
                        background: "transparent",
                        color: "var(--color-text)",
                        border: "1px solid var(--color-divider)",
                      }
                }
              >
                {tab.icon}
                {tab.label}
                {!!tab.badge && (
                  <span
                    className="text-[11px] leading-none px-1.5 py-0.5 rounded-full"
                    style={
                      isActive
                        ? { background: "rgba(255,255,255,0.22)" }
                        : { background: "var(--color-accent-100)", color: "var(--color-accent-800)" }
                    }
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div ref={panelRef} role="tabpanel">
        {activeTab === "overview" ? (
          <OverviewPanel stats={stats} digest={digest} onNavigate={setActiveTab} />
        ) : (
          activeSection?.content
        )}
      </div>
    </div>
  );
}

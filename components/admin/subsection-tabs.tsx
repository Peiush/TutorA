"use client";

import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SegmentedControl } from "@/components/ui/segmented";

gsap.registerPlugin(useGSAP);

export type SubsectionTab = {
  value: string;
  label: string;
  content: ReactNode;
};

export function SubsectionTabs({ name, tabs }: { name: string; tabs: SubsectionTab[] }) {
  const [value, setValue] = useState(tabs[0]?.value ?? "");
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = panelRef.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(el, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" });
    },
    { dependencies: [value], scope: panelRef }
  );

  const active = tabs.find((t) => t.value === value) ?? tabs[0];

  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl name={name} value={value} onChange={setValue} options={tabs.map((t) => ({ label: t.label, value: t.value }))} />
      <div ref={panelRef}>{active?.content}</div>
    </div>
  );
}

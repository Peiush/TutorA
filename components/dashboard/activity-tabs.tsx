"use client";

import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SegmentedControl } from "@/components/ui/segmented";
import { TargetIcon, BookOpenIcon, BookmarkIcon } from "@/components/dashboard/dashboard-icons";

gsap.registerPlugin(useGSAP);

type ItemType = "tutors" | "courses" | "subjects";
type Group = "requests" | "saved";

export interface GroupSlots {
  tutors: ReactNode;
  tutorsCount: number;
  courses: ReactNode;
  coursesCount: number;
  subjects: ReactNode;
  subjectsCount: number;
}

const TYPES: { key: ItemType; label: string; icon: typeof TargetIcon }[] = [
  { key: "tutors", label: "Tutors", icon: TargetIcon },
  { key: "courses", label: "Courses", icon: BookOpenIcon },
  { key: "subjects", label: "Subjects", icon: BookmarkIcon },
];

function nodeFor(slots: GroupSlots, key: ItemType) {
  return key === "tutors" ? slots.tutors : key === "courses" ? slots.courses : slots.subjects;
}

function countFor(slots: GroupSlots, key: ItemType) {
  return key === "tutors" ? slots.tutorsCount : key === "courses" ? slots.coursesCount : slots.subjectsCount;
}

export function ActivityTabs({ requests, saved }: { requests: GroupSlots; saved: GroupSlots }) {
  const [group, setGroup] = useState<Group>("requests");
  const [type, setType] = useState<ItemType>("tutors");
  const contentRef = useRef<HTMLDivElement>(null);

  const slots = group === "requests" ? requests : saved;

  useGSAP(
    () => {
      const el = contentRef.current;
      if (!el) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(el, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" });
    },
    { dependencies: [group, type], scope: contentRef }
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          name="activity-group"
          value={group}
          onChange={(v) => setGroup(v as Group)}
          options={[
            { label: "My Requests", value: "requests" },
            { label: "Saved Items", value: "saved" },
          ]}
        />

        <div className="flex gap-2" role="tablist" aria-label="Filter by type">
          {TYPES.map(({ key, label, icon: Icon }) => {
            const isActive = type === key;
            const count = countFor(slots, key);
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setType(key)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] cursor-pointer transition-colors duration-150"
                style={
                  isActive
                    ? { background: "var(--color-accent-2-700)", color: "#fff" }
                    : {
                        background: "transparent",
                        color: "var(--color-text)",
                        border: "1px solid var(--color-divider)",
                      }
                }
              >
                <Icon width={14} height={14} />
                {label}
                <span
                  className="text-[11px] leading-none px-1.5 py-0.5 rounded-full"
                  style={
                    isActive
                      ? { background: "rgba(255,255,255,0.22)" }
                      : { background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={contentRef} role="tabpanel">
        {nodeFor(slots, type)}
      </div>
    </div>
  );
}

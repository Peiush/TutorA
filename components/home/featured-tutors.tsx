"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Toast, ToastTone } from "@/components/ui/toast";
import { requestSpecificTutor } from "@/app/lib/actions/tutor-request";
import type { tutorsRaw } from "@/lib/mock-data";

type Tutor = (typeof tutorsRaw)[number];

export function FeaturedTutors({ tutors }: { tutors: Tutor[] }) {
  const router = useRouter();
  const [pendingName, setPendingName] = useState<string | null>(null);
  const [requestedNames, setRequestedNames] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [, startTransition] = useTransition();

  function handleRequestTutor(t: Tutor) {
    setPendingName(t.name);
    startTransition(async () => {
      const result = await requestSpecificTutor({
        tutorName: t.name,
        subject: t.subjects[0] ?? t.headline,
        mode: t.mode,
      });
      setPendingName(null);
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/")}`);
        return;
      }
      if (result.ok) {
        setRequestedNames((prev) => new Set(prev).add(t.name));
        setToast({ tone: "success", message: result.message ?? `Your request for ${t.name} has been sent.` });
      } else {
        setToast({ tone: "error", message: result.message ?? "Something went wrong. Please try again." });
      }
    });
  }

  return (
    <>
      <StaggerReveal className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((t, i) => (
          <div key={t.id ?? t.name} className="card elev-sm gap-3">
            <div className="flex gap-3 items-center">
              <TutorAvatar name={t.name} index={i} size={52} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-[var(--font-heading)] text-[17px]">{t.name}</span>
                  <VerifiedBadge />
                  {t.isNew && (
                    <Tag variant="accent-2" className="text-[10px] px-2 py-0.5">
                      New
                    </Tag>
                  )}
                </div>
                <div
                  className="text-[12px] mt-0.5"
                  style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
                >
                  {t.meta.split(" · ").pop()}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {t.subjects.map((s) => (
                <Tag key={s} variant="neutral">
                  {s}
                </Tag>
              ))}
            </div>
            <div className="flex justify-between items-center text-[13px]">
              {t.reviews > 0 ? (
                <span style={{ color: "var(--color-accent-700)" }}>
                  ★ {t.rating.toFixed(1)}{" "}
                  <span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                    ({t.reviews})
                  </span>
                </span>
              ) : (
                <span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                  No reviews yet
                </span>
              )}
              <span className="font-semibold">{t.price}</span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-block mt-1"
              disabled={pendingName === t.name || requestedNames.has(t.name)}
              onClick={() => handleRequestTutor(t)}
            >
              {requestedNames.has(t.name) ? (
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Request sent
                </span>
              ) : pendingName === t.name ? (
                "Sending…"
              ) : (
                "Request This Tutor"
              )}
            </button>
          </div>
        ))}
      </StaggerReveal>
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}

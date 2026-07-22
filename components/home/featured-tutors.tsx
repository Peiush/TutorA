"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { subjectAccent } from "@/components/ui/subject-accent";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Toast, ToastTone } from "@/components/ui/toast";
import { TutorDetailModal } from "@/components/find/tutor-detail-modal";
import { usePlaneLaunch } from "@/components/ui/plane-launch";
import { requestSpecificTutor } from "@/app/lib/actions/tutor-request";
import type { tutorsRaw } from "@/lib/mock-data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Tutor = (typeof tutorsRaw)[number];

export function FeaturedTutors({
  tutors,
  requestedTutorProfileIds = [],
}: {
  tutors: Tutor[];
  requestedTutorProfileIds?: string[];
}) {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [pendingName, setPendingName] = useState<string | null>(null);
  const [requestedNames, setRequestedNames] = useState<Set<string>>(new Set());
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set(requestedTutorProfileIds));
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [detail, setDetail] = useState<{ tutor: Tutor; index: number } | null>(null);
  const [, startTransition] = useTransition();
  const launchPlane = usePlaneLaunch();

  function isAlreadyRequested(t: Tutor) {
    return t.id ? requestedIds.has(t.id) : requestedNames.has(t.name);
  }

  function handleRequestTutor(t: Tutor) {
    if (isAlreadyRequested(t)) return;
    setPendingName(t.name);
    startTransition(async () => {
      const result = await requestSpecificTutor({
        tutorName: t.name,
        subject: t.subjects[0] ?? t.headline,
        mode: t.mode,
        tutorRate: t.price,
        tutorProfileId: t.id,
      });
      setPendingName(null);
      if (result.requiresAuth) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/")}`);
        return;
      }
      if (result.ok) {
        setRequestedNames((prev) => new Set(prev).add(t.name));
        if (t.id) setRequestedIds((prev) => new Set(prev).add(t.id!));
        setToast({ tone: "success", message: result.message ?? `Your request for ${t.name} has been sent.` });
      } else {
        setToast({ tone: "error", message: result.message ?? "Something went wrong. Please try again." });
      }
    });
  }

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = grid.querySelectorAll(".tutor-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: grid, start: "top 88%", once: true },
        });

        tl.from(cards, {
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.08,
        }, 0)
          .from(grid.querySelectorAll(".tutor-card-bar"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.4,
            stagger: 0.08,
          }, 0.08)
          .from(grid.querySelectorAll(".tutor-avatar-wrap"), {
            scale: 0.4,
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(2.6)",
          }, 0.14)
          .from(grid.querySelectorAll(".tutor-tag-chip"), {
            autoAlpha: 0,
            y: 6,
            duration: 0.25,
            stagger: 0.02,
          }, 0.3);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1 });
        gsap.set(grid.querySelectorAll(".tutor-card-bar"), { scaleX: 1 });
        gsap.set(grid.querySelectorAll(".tutor-avatar-wrap"), { autoAlpha: 1, scale: 1 });
        gsap.set(grid.querySelectorAll(".tutor-tag-chip"), { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [tutors.length] }
  );

  return (
    <>
      <div ref={gridRef} className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((t, i) => {
          const accent = subjectAccent(t.subjects, i);
          const already = isAlreadyRequested(t);
          return (
            <div
              key={t.listingId ?? t.id ?? t.name}
              className="tutor-card group relative flex flex-col rounded-[22px] border cursor-pointer transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5"
              style={{
                background: "var(--color-bg)",
                borderColor: "var(--color-divider)",
                boxShadow: "var(--shadow-sm)",
              }}
              onClick={() => setDetail({ tutor: t, index: i })}
            >
              <div
                className="tutor-card-hover-shadow pointer-events-none absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "var(--shadow-lg)" }}
                aria-hidden
              />
              <div className="relative flex flex-col flex-1 rounded-[22px] overflow-hidden">
              <div
                className="tutor-card-bar h-[5px] w-full flex-none relative z-[1]"
                style={{ background: accent.bar }}
                aria-hidden
              />
              <div className="relative z-[1] p-6 flex flex-col gap-4 flex-1">
                <div className="flex gap-3 items-center">
                  <div
                    className="tutor-avatar-wrap rounded-full transition-transform duration-300 group-hover:scale-[1.06]"
                    style={{ boxShadow: `0 0 0 3px color-mix(in srgb, ${accent.bar} 22%, transparent)`, borderRadius: "50%" }}
                  >
                    <TutorAvatar name={t.name} index={i} size={52} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        className="font-[var(--font-heading)] text-[17px] cursor-pointer hover:underline"
                        style={{ color: "var(--color-text)" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetail({ tutor: t, index: i });
                        }}
                      >
                        {t.name}
                      </button>
                      <VerifiedBadge />
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
                    <Tag key={s} variant={accent.tag} className="tutor-tag-chip inline-flex items-center gap-1">
                      <SubjectIcon subject={s} />
                      {s}
                    </Tag>
                  ))}
                </div>
                <div className="flex justify-between items-center text-[13px] mt-auto">
                  {t.reviews > 0 ? (
                    <span className="inline-flex items-center gap-1.5">
                      <StarRating rating={t.rating} size={13} />
                      <span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                        {t.rating.toFixed(1)} ({t.reviews})
                      </span>
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ color: "var(--color-verified)", fontWeight: 600 }}
                    >
                      <VerifiedBadge size={12} />
                      Newly verified
                    </span>
                  )}
                  <span className="font-[var(--font-heading)] font-bold text-[16px]" style={{ color: "var(--color-accent-700)" }}>
                    {t.price}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  disabled={pendingName === t.name || already}
                  onClick={(e) => {
                    e.stopPropagation();
                    launchPlane(e.currentTarget);
                    handleRequestTutor(t);
                  }}
                >
                  {already ? (
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
              </div>
            </div>
          );
        })}
      </div>
      {detail && (
        <TutorDetailModal
          tutor={detail.tutor}
          index={detail.index}
          isTopRated={detail.tutor.rating >= 4.9}
          pending={pendingName === detail.tutor.name}
          requested={isAlreadyRequested(detail.tutor)}
          onClose={() => setDetail(null)}
          onRequest={handleRequestTutor}
        />
      )}
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}

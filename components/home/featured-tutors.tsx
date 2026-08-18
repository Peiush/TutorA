"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Toast, ToastTone } from "@/components/ui/toast";
import { TutorDetailModal } from "@/components/find/tutor-detail-modal";
import { RequestTutorSubjectsModal } from "@/components/home/request-tutor-subjects-modal";
import { RequestLoginModal } from "@/components/auth/request-login-modal";
import { usePlaneLaunch } from "@/components/ui/plane-launch";
import { requestSpecificTutor } from "@/app/lib/actions/tutor-request";
import type { tutorsRaw } from "@/lib/mock-data";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";
import { vibrantAccent } from "@/lib/vibrant-accents";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Tutor = (typeof tutorsRaw)[number];

export function FeaturedTutors({ tutors }: { tutors: Tutor[] }) {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [requestedSubjectKeys, setRequestedSubjectKeys] = useState<Set<string>>(new Set());

  // The homepage no longer calls auth() itself (that forced it to be dynamically
  // re-rendered, uncached, on every request) — pick up which of these featured
  // tutors' subjects the signed-in user already requested right after mount instead.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/me/tutor-state")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setRequestedSubjectKeys(new Set(data.requestedTutorSubjectKeys ?? []));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [detail, setDetail] = useState<{ tutor: Tutor; index: number } | null>(null);
  const [subjectModal, setSubjectModal] = useState<{ tutor: Tutor; index: number } | null>(null);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [loginPrompt, setLoginPrompt] = useState<{ rect: DOMRect | null; retry: () => void } | null>(null);
  const [, startTransition] = useTransition();
  const launchPlane = usePlaneLaunch();

  function subjectKey(t: Tutor, subject: string) {
    return `${t.id ?? t.name}::${subject}`;
  }

  function isSubjectRequested(t: Tutor, subject: string) {
    return requestedSubjectKeys.has(subjectKey(t, subject));
  }

  // A merged homepage card can list several subjects for one tutor — "fully requested"
  // means every one of them has an open/matched request already.
  function allSubjectsRequested(t: Tutor) {
    return t.subjects.length > 0 && t.subjects.every((s) => isSubjectRequested(t, s));
  }

  function handleRequestSubject(t: Tutor, subject: string, origin: HTMLElement | null) {
    if (isSubjectRequested(t, subject)) return;
    const rect = origin?.getBoundingClientRect() ?? null;
    const key = subjectKey(t, subject);
    setPendingKey(key);
    startTransition(async () => {
      const result = await requestSpecificTutor({
        tutorName: t.name,
        subject,
        mode: t.mode,
        tutorRate: t.subjectPrices?.[subject] ?? t.price,
        tutorProfileId: t.id,
      });
      setPendingKey(null);
      if (result.requiresAuth) {
        setLoginPrompt({ rect, retry: () => handleRequestSubject(t, subject, origin) });
        return;
      }
      launchPlane(origin);
      if (result.ok) {
        setRequestedSubjectKeys((prev) => new Set(prev).add(key));
        setToast({ tone: "success", message: result.message ?? `Your request for ${t.name} (${subject}) has been sent.` });
      } else {
        setToast({ tone: "error", message: result.message ?? "Something went wrong. Please try again." });
      }
    });
  }

  // TutorDetailModal (opened when a tutor has no slug to link to) still requests a
  // single subject in one click — use the tutor's first listed subject for that path.
  function handleRequestTutor(t: Tutor, origin: HTMLElement | null) {
    handleRequestSubject(t, t.subjects[0] ?? t.headline, origin);
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
          y: 36,
          scale: 0.92,
          duration: 0.6,
          stagger: 0.09,
          ease: "back.out(1.7)",
        }, 0)
          .from(grid.querySelectorAll(".tutor-card-bar"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.45,
            stagger: 0.09,
          }, 0.1)
          .from(grid.querySelectorAll(".tutor-avatar-wrap"), {
            scale: 0.4,
            autoAlpha: 0,
            rotate: -18,
            duration: 0.45,
            stagger: 0.09,
            ease: "back.out(2.6)",
          }, 0.18)
          .from(grid.querySelectorAll(".tutor-tag-chip"), {
            autoAlpha: 0,
            y: 6,
            duration: 0.25,
            stagger: 0.02,
          }, 0.34);

        return scrollRevealSafetyNet(
          grid,
          () => isGsapHidden(cards[0]),
          () => {
            gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
            gsap.set(grid.querySelectorAll(".tutor-card-bar"), { scaleX: 1 });
            gsap.set(grid.querySelectorAll(".tutor-avatar-wrap"), { autoAlpha: 1, scale: 1, rotate: 0 });
            gsap.set(grid.querySelectorAll(".tutor-tag-chip"), { autoAlpha: 1, y: 0 });
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(grid.querySelectorAll(".tutor-card-bar"), { scaleX: 1 });
        gsap.set(grid.querySelectorAll(".tutor-avatar-wrap"), { autoAlpha: 1, scale: 1, rotate: 0 });
        gsap.set(grid.querySelectorAll(".tutor-tag-chip"), { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [tutors.length] }
  );

  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Cursor-follow spotlight glow per card, matching the Course Categories tiles'
  // treatment so the two "most important" homepage sections feel like one system.
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!fine || reduced) return;

      const cleanups: (() => void)[] = [];
      cardRefs.current.forEach((el) => {
        const handleMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
          el.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
        };
        el.addEventListener("mousemove", handleMove);
        cleanups.push(() => el.removeEventListener("mousemove", handleMove));
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: gridRef, dependencies: [tutors.length] }
  );

  return (
    <>
      <div ref={gridRef} className="grid gap-3.5 sm:gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((t, i) => {
          const vibe = vibrantAccent(i);
          const already = allSubjectsRequested(t);
          return (
            <div
              key={t.listingId ?? t.id ?? t.name}
              ref={(el) => {
                if (el) cardRefs.current.set(i, el);
                else cardRefs.current.delete(i);
              }}
              className="tutor-card group relative flex flex-col rounded-[22px] border cursor-pointer transition-[transform,border-color] duration-300 ease-out hover:-translate-y-2"
              style={{
                background: `linear-gradient(160deg, color-mix(in srgb, ${vibe.light} 55%, var(--color-bg)) 0%, var(--color-bg) 42%)`,
                borderColor: "var(--color-divider)",
                boxShadow: "var(--shadow-sm)",
              }}
              onClick={() => {
                if (t.slug) router.push(`/find-a-tutor/${t.slug}`);
                else setDetail({ tutor: t, index: i });
              }}
            >
              <div
                className="tutor-card-hover-shadow pointer-events-none absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `var(--shadow-lg), 0 0 0 1.5px color-mix(in srgb, ${vibe.solid} 55%, transparent)`,
                }}
                aria-hidden
              />
              <span
                className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(280px circle at var(--spot-x,50%) var(--spot-y,50%), color-mix(in srgb, ${vibe.solid} 20%, transparent), transparent 70%)`,
                }}
                aria-hidden
              />
              <div className="relative flex flex-col flex-1 rounded-[22px] overflow-hidden">
              <div
                className="tutor-card-bar h-[5px] w-full flex-none relative z-[1]"
                style={{ background: `linear-gradient(90deg, ${vibe.solid}, color-mix(in srgb, ${vibe.solid} 55%, white))` }}
                aria-hidden
              />
              <div className="relative z-[1] p-4.5 sm:p-6 flex flex-col gap-3 sm:gap-4 flex-1">
                <div className="flex gap-3 items-center">
                  <div
                    className="tutor-avatar-wrap rounded-full transition-transform duration-300 group-hover:scale-[1.08] group-hover:rotate-3"
                    style={{ boxShadow: `0 0 0 3px color-mix(in srgb, ${vibe.solid} 38%, transparent)`, borderRadius: "50%" }}
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
                          if (t.slug) router.push(`/find-a-tutor/${t.slug}`);
                          else setDetail({ tutor: t, index: i });
                        }}
                      >
                        {t.name}
                      </button>
                      <VerifiedBadge />
                    </div>
                    <div
                      className="text-[12px] mt-0.5"
                      style={{ color: "color-mix(in srgb, var(--color-text) 67%, transparent)" }}
                    >
                      {t.meta.split(" · ").pop()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {t.subjects.map((s) => (
                    <span
                      key={s}
                      className="tutor-tag-chip inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold"
                      style={{ background: `color-mix(in srgb, ${vibe.solid} 15%, transparent)`, color: vibe.text }}
                    >
                      <SubjectIcon subject={s} />
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-[13px] mt-auto">
                  {t.reviews > 0 ? (
                    <span className="inline-flex items-center gap-1.5">
                      <StarRating rating={t.rating} size={13} />
                      <span style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
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
                  <span className="font-[var(--font-heading)] font-bold text-[16px]" style={{ color: vibe.solid }}>
                    {t.price}
                  </span>
                </div>
                <button
                  type="button"
                  className={`btn btn-block ${already ? "" : "hover:brightness-110 active:scale-[0.97]"}`}
                  disabled={already}
                  style={
                    already
                      ? { background: "var(--color-bg)", border: "1px solid var(--color-divider)", color: "var(--color-text)" }
                      : {
                          background: vibe.solid,
                          border: `1px solid ${vibe.solid}`,
                          color: "#FFFFFF",
                          boxShadow: `0 8px 20px -8px color-mix(in srgb, ${vibe.solid} 65%, transparent)`,
                        }
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSubjectModal({ tutor: t, index: i });
                  }}
                >
                  {already ? (
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      All requests sent
                    </span>
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
          pending={pendingKey === subjectKey(detail.tutor, detail.tutor.subjects[0] ?? detail.tutor.headline)}
          requested={isSubjectRequested(detail.tutor, detail.tutor.subjects[0] ?? detail.tutor.headline)}
          onClose={() => setDetail(null)}
          onRequest={handleRequestTutor}
        />
      )}
      {subjectModal && (
        <RequestTutorSubjectsModal
          tutor={subjectModal.tutor}
          index={subjectModal.index}
          vibe={vibrantAccent(subjectModal.index)}
          pendingSubject={
            pendingKey?.startsWith(`${subjectModal.tutor.id ?? subjectModal.tutor.name}::`)
              ? pendingKey.slice(`${subjectModal.tutor.id ?? subjectModal.tutor.name}::`.length)
              : null
          }
          requestedSubjects={
            new Set(subjectModal.tutor.subjects.filter((s) => isSubjectRequested(subjectModal.tutor, s)))
          }
          onRequestSubject={(subject, origin) => handleRequestSubject(subjectModal.tutor, subject, origin)}
          onClose={() => setSubjectModal(null)}
        />
      )}
      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
      {loginPrompt && (
        <RequestLoginModal
          originRect={loginPrompt.rect}
          onClose={() => setLoginPrompt(null)}
          onAuthenticated={() => {
            const retry = loginPrompt.retry;
            setLoginPrompt(null);
            router.refresh();
            retry();
          }}
        />
      )}
    </>
  );
}

"use client";

import { useEffect, useRef, useState, useActionState, startTransition, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getMyProfile, updateProfile, type UpdateProfileState } from "@/app/lib/actions/update-profile";
import { requestSelfEmailChange, type RequestEmailChangeState } from "@/app/lib/actions/email-change";
import { UserIcon, MailIcon, LockIcon, SpinnerIcon } from "@/components/auth/auth-icons";
import { PhoneInput } from "@/components/ui/phone-input";
import { initialsOf } from "@/components/ui/tutor-avatar";
import { ProfileIllustration } from "@/components/profile/profile-illustration";

gsap.registerPlugin(useGSAP, Flip);

function LiveAvatar({ name, wrapRef }: { name: string; wrapRef: React.RefObject<HTMLDivElement | null> }) {
  const label = name.trim() || "You";
  return (
    <div
      ref={wrapRef}
      className="grid place-content-center"
      style={{
        width: 72,
        height: 72,
        borderRadius: "50%",
        background: "var(--color-accent-2-200)",
        color: "var(--color-accent-2-800)",
        border: "4px solid var(--color-bg)",
        boxShadow: "var(--shadow-md)",
        fontFamily: "var(--font-heading)",
        fontWeight: 600,
        fontSize: 24,
      }}
    >
      {initialsOf(label)}
    </div>
  );
}

export function EditProfileModal({
  user,
  originRect,
  onClose,
}: {
  user: { name?: string | null; email?: string | null };
  originRect: DOMRect | null;
  onClose: () => void;
}) {
  const { update: updateSession } = useSession();
  const router = useRouter();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const prevInitials = useRef<string>(initialsOf(user.name || "You"));

  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState("");
  const [phoneLoaded, setPhoneLoaded] = useState(false);
  // Source of truth for the displayed "current" email — user.email is a
  // prop derived from the client session, which can lag the database (it
  // only updates after updateSession() runs), so relying on it risks showing
  // a stale address here even though it's fine for the header avatar/name.
  const [currentEmail, setCurrentEmail] = useState(user.email ?? "");
  const [state, formAction, pending] = useActionState<UpdateProfileState, FormData>(updateProfile, undefined);
  const [settled, setSettled] = useState(false);

  // Google-only accounts (no password) sign in via a fixed Google account ID,
  // not by email — see requestSelfEmailChange for why letting them self-edit
  // email here would be unsafe. Default to true (locked) until we know for
  // sure, so the field can't be edited during the brief loading window.
  const [canChangeEmail, setCanChangeEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email ?? "");
  const [emailState, emailFormAction, emailPending] = useActionState<RequestEmailChangeState, FormData>(
    requestSelfEmailChange,
    undefined
  );

  useEffect(() => {
    let cancelled = false;
    getMyProfile().then((profile) => {
      if (cancelled) return;
      setName(profile?.name ?? user.name ?? "");
      setPhone(profile?.phone ?? "");
      const email = profile?.email ?? user.email ?? "";
      setCurrentEmail(email);
      setNewEmail(email);
      setCanChangeEmail(profile?.hasPassword ?? false);
      setPhoneLoaded(true);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const content = contentRef.current;

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.to(overlay, { autoAlpha: 1, duration: reduced ? 0.01 : 0.28, ease: "power2.out" });

      const startIdleMotion = () => {
        if (reduced) return;
        gsap.to(".pi-orbit", { rotate: 360, duration: 40, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to(".pi-orbit-2", { rotate: -360, duration: 55, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to(".pi-spark", { scale: 1.25, opacity: 0.7, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3, transformOrigin: "50% 50%" });
        gsap.to(".pi-dot", { y: "-=6", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.25 });
        gsap.fromTo(".pi-pencil", { rotate: -8 }, { rotate: 8, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 50%" });
      };

      if (reduced || !originRect || !panel) {
        gsap.set(panel, { autoAlpha: 1 });
        startIdleMotion();
        nameInputRef.current?.focus();
        return;
      }

      gsap.set(content, { autoAlpha: 0, y: 10 });
      gsap.set(panel, {
        position: "fixed",
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: 999,
        overflow: "hidden",
      });
      const flipState = Flip.getState(panel);
      gsap.set(panel, { clearProps: "position,top,left,width,height,borderRadius,overflow" });

      Flip.from(flipState, {
        duration: 0.55,
        ease: "power3.out",
        props: "borderRadius",
        onComplete: () => {
          gsap.to(content, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" });
          gsap.fromTo(
            ".epm-stagger",
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }
          );
          startIdleMotion();
          nameInputRef.current?.focus();
        },
      });
    },
    { scope: overlayRef }
  );

  const closeAnimated = contextSafe(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onClose();
      return;
    }
    gsap.to(panelRef.current, { autoAlpha: 0, scale: 0.94, y: 10, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.22, ease: "power2.in", onComplete: onClose });
  });

  const pulseAvatar = contextSafe(() => {
    gsap.fromTo(avatarWrapRef.current, { scale: 1 }, { scale: 1.1, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 });
  });

  const playSuccess = contextSafe(() => {
    const tl = gsap.timeline();
    tl.to(contentRef.current, { autoAlpha: 0, y: -6, duration: 0.22, ease: "power2.in" })
      .set(successRef.current, { display: "flex" })
      .fromTo(
        successRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.2, ease: "power1.out" }
      )
      .fromTo(
        ".epm-check-circle",
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(2.2)" },
        "<0.05"
      )
      .fromTo(
        ".epm-check-path",
        { strokeDashoffset: 24 },
        { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" },
        "-=0.15"
      )
      .fromTo(
        ".epm-success-text",
        { autoAlpha: 0, y: 6 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.1"
      );
  });

  useEffect(() => {
    if (state?.status === "success" && !settled) {
      setSettled(true);
      pulseAvatar();
      playSuccess();
      updateSession({ name: state.name });
      const t = setTimeout(() => closeAnimated(), 1400);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (emailState?.status === "success") {
      router.refresh();
      const t = setTimeout(() => closeAnimated(), 2200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailState]);

  const sameAsCurrentEmail =
    newEmail.trim().length > 0 && newEmail.trim().toLowerCase() === currentEmail.trim().toLowerCase();

  function sendEmailCode() {
    if (emailPending || !newEmail.trim() || sameAsCurrentEmail) return;
    const fd = new FormData();
    fd.set("newEmail", newEmail);
    startTransition(() => {
      emailFormAction(fd);
    });
  }

  function handleNameChange(e: FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setName(value);
    const next = initialsOf(value.trim() || "You");
    if (next !== prevInitials.current) {
      prevInitials.current = next;
      pulseAvatar();
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center p-5 overflow-y-auto"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeAnimated();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") closeAnimated();
      }}
    >
      <div
        ref={panelRef}
        className="card elev-lg w-full max-w-[440px] my-8 relative p-0 gap-0 overflow-hidden"
        style={{ background: "var(--color-bg)" }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={closeAnimated}
          className="absolute grid place-content-center cursor-pointer rounded-full z-10"
          style={{
            top: 14,
            right: 14,
            width: 30,
            height: 30,
            background: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
            color: "var(--color-text)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div
          className="relative h-[120px]"
          style={{ background: "linear-gradient(135deg, var(--color-accent-2-100), var(--color-surface))" }}
        >
          <ProfileIllustration className="absolute inset-0" />
        </div>

        <div className="relative flex justify-center" style={{ marginTop: -36 }}>
          <LiveAvatar name={name} wrapRef={avatarWrapRef} />
        </div>

        <div ref={contentRef} className="flex flex-col gap-5 px-6 pt-4 pb-6">
          <div className="epm-stagger text-center">
            <h2 className="text-[22px]" style={{ fontFamily: "var(--font-heading)" }}>
              Edit your profile
            </h2>
            <p className="text-[13.5px] mt-1" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
              Keep your details current so tutors and our team can reach you.
            </p>
          </div>

          <form action={formAction} className="flex flex-col gap-4">
            <div className="epm-stagger field">
              <label htmlFor="epm-name">Full name</label>
              <div className="field-icon">
                <UserIcon />
                <input
                  ref={nameInputRef}
                  className="input"
                  id="epm-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div className="epm-stagger field" style={{ opacity: phoneLoaded ? 1 : 0.6 }}>
              <label htmlFor="epm-phone">Phone number</label>
              <PhoneInput
                id="epm-phone"
                name="phone"
                required
                disabled={!phoneLoaded}
                value={phone}
                onChange={setPhone}
              />
            </div>

            <div className="epm-stagger field" style={{ opacity: phoneLoaded ? 1 : 0.6 }}>
              <label htmlFor="epm-email">Email</label>
              <div className="field-icon">
                <MailIcon />
                <input
                  className={`input${phoneLoaded ? "" : " animate-pulse"}`}
                  id="epm-email"
                  name="newEmail"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={!phoneLoaded || !canChangeEmail || emailPending}
                  readOnly={!canChangeEmail}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendEmailCode();
                    }
                  }}
                />
                {phoneLoaded && !canChangeEmail && (
                  <span
                    className="absolute grid place-content-center"
                    style={{ right: 14, top: "50%", transform: "translateY(-50%)", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
                  >
                    <LockIcon width={15} height={15} />
                  </span>
                )}
              </div>

              {!phoneLoaded ? null : !canChangeEmail ? (
                <p className="text-[12px] mt-1.5 mb-0" style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                  Managed by your Google account — sign in with Google to change which account this is linked to.
                </p>
              ) : emailState?.status === "success" && emailState.newEmail === newEmail.trim().toLowerCase() ? (
                <p className="text-[12.5px] mt-1.5 mb-0" style={{ color: "var(--color-verified)" }}>
                  We emailed a code to <strong>{emailState.newEmail}</strong>. Enter it on your dashboard to confirm.
                </p>
              ) : sameAsCurrentEmail ? (
                <p className="text-[12px] mt-1.5 mb-0" style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                  We&apos;ll email a code to confirm any change to this address.
                </p>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary text-[12.5px] mt-1.5"
                    style={{ padding: "6px 12px" }}
                    disabled={emailPending || !newEmail.trim()}
                    onClick={sendEmailCode}
                  >
                    {emailPending ? <SpinnerIcon width={13} height={13} /> : "Send code"}
                  </button>
                  {emailState?.status === "error" && (
                    <p className="text-[12.5px] mt-1.5 mb-0" style={{ color: "#d92d20" }}>
                      {emailState.message}
                    </p>
                  )}
                </>
              )}
            </div>

            {state?.status === "error" && (
              <p className="epm-stagger text-[13.5px] m-0" style={{ color: "#d92d20" }}>
                {state.message}
              </p>
            )}

            <div className="epm-stagger flex gap-2.5 mt-1">
              <button type="button" className="btn btn-secondary flex-1" onClick={closeAnimated}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary flex-1" disabled={pending || !phoneLoaded}>
                {pending ? (
                  <>
                    <SpinnerIcon width={16} height={16} /> Saving…
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </form>
        </div>

        <div
          ref={successRef}
          className="absolute inset-0 flex-col items-center justify-center gap-3 px-6"
          style={{ display: "none", background: "var(--color-bg)" }}
        >
          <div
            className="epm-check-circle grid place-content-center"
            style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--color-verified)" }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path className="epm-check-path" d="M20 6 9 17l-5-5" strokeDasharray="24" strokeDashoffset="24" />
            </svg>
          </div>
          <div className="epm-success-text text-center">
            <div className="text-[17px]" style={{ fontFamily: "var(--font-heading)" }}>
              Profile updated
            </div>
            <div className="text-[13px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
              Your details are saved.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

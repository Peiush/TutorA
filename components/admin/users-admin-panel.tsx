"use client";

import { useMemo, useState, useTransition } from "react";
import { Tag } from "@/components/ui/tag";
import { Toast, ToastTone } from "@/components/ui/toast";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { SegmentedControl } from "@/components/ui/segmented";
import { requestEmailChange, cancelEmailChangeRequest } from "@/app/lib/actions/admin";

export type UserAdminRow = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  pendingEmailChange: { newEmail: string; expiresAt: Date } | null;
};

const ROLE_VARIANT: Record<UserAdminRow["role"], "accent-2" | "accent" | "neutral"> = {
  STUDENT: "accent-2",
  TUTOR: "accent",
  ADMIN: "neutral",
};

function minutesLeft(expiresAt: Date): number {
  return Math.max(0, Math.round((expiresAt.getTime() - Date.now()) / 60000));
}

type RoleTab = "ALL" | "STUDENT" | "TUTOR" | "ADMIN";

export function UsersAdminPanel({ users }: { users: UserAdminRow[] }) {
  const [query, setQuery] = useState("");
  const [roleTab, setRoleTab] = useState<RoleTab>("ALL");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const roleCounts = useMemo(
    () => ({
      ALL: users.length,
      STUDENT: users.filter((u) => u.role === "STUDENT").length,
      TUTOR: users.filter((u) => u.role === "TUTOR").length,
      ADMIN: users.filter((u) => u.role === "ADMIN").length,
    }),
    [users]
  );

  const roleTabs = [
    { label: `All (${roleCounts.ALL})`, value: "ALL" },
    { label: `Students (${roleCounts.STUDENT})`, value: "STUDENT" },
    { label: `Tutors (${roleCounts.TUTOR})`, value: "TUTOR" },
    { label: `Admins (${roleCounts.ADMIN})`, value: "ADMIN" },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (roleTab !== "ALL" && u.role !== roleTab) return false;
      if (!q) return true;
      return (u.name ?? "").toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.phone ?? "").includes(q);
    });
  }, [users, query, roleTab]);

  function openEdit(user: UserAdminRow) {
    setEditingId(user.id);
    setNewEmail("");
  }

  function submitChange(userId: string) {
    setPendingId(userId);
    startTransition(async () => {
      const result = await requestEmailChange(userId, newEmail);
      setPendingId(null);
      setToast({ tone: result.ok ? "success" : "error", message: result.message ?? (result.ok ? "Done." : "Something went wrong.") });
      if (result.ok) {
        setEditingId(null);
        setNewEmail("");
      }
    });
  }

  function cancelPending(userId: string) {
    setPendingId(userId);
    startTransition(async () => {
      const result = await cancelEmailChangeRequest(userId);
      setPendingId(null);
      setToast({
        tone: result.ok ? "success" : "error",
        message: result.ok ? "Pending change canceled." : result.message ?? "Something went wrong.",
      });
    });
  }

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">Users</h2>
        <input
          className="input"
          style={{ maxWidth: 240 }}
          placeholder="Search name, email, phone…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <SegmentedControl name="user-role-tab" value={roleTab} onChange={(v) => setRoleTab(v as RoleTab)} options={roleTabs} />

      <div className="flex flex-col gap-2.5">
        {filtered.map((u) => {
          const rowPending = pending && pendingId === u.id;
          const isEditing = editingId === u.id;
          return (
            <div
              key={u.id}
              className="flex flex-col gap-3 p-3.5"
              style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <TutorAvatar name={u.name || u.email} size={34} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
                      {u.name || "Unnamed"}
                    </span>
                    <Tag variant={ROLE_VARIANT[u.role]} className="text-[10.5px]">
                      {u.role}
                    </Tag>
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                    {u.email} · {u.phone || "No phone"}
                  </div>
                </div>

                {u.pendingEmailChange ? (
                  <div className="flex items-center gap-2 flex-none">
                    <Tag variant="accent" className="text-[10.5px]">
                      Pending → {u.pendingEmailChange.newEmail} · {minutesLeft(u.pendingEmailChange.expiresAt)}m left
                    </Tag>
                    <button
                      type="button"
                      className="btn btn-secondary text-[12.5px]"
                      style={{ padding: "7px 14px" }}
                      disabled={rowPending}
                      onClick={() => cancelPending(u.id)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary text-[12.5px] flex-none"
                    style={{ padding: "7px 14px" }}
                    disabled={rowPending}
                    onClick={() => (isEditing ? setEditingId(null) : openEdit(u))}
                  >
                    {isEditing ? "Close" : "Change email"}
                  </button>
                )}
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    className="input"
                    style={{ maxWidth: 280 }}
                    type="email"
                    placeholder="new-email@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    disabled={rowPending}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="btn btn-primary text-[12.5px]"
                    style={{ padding: "7px 14px" }}
                    disabled={rowPending || !newEmail.trim()}
                    onClick={() => submitChange(u.id)}
                  >
                    {rowPending ? "Sending…" : "Send WhatsApp code"}
                  </button>
                  <span className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                    They&rsquo;ll get a code via WhatsApp and must enter it before the email changes.
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-[14px] text-center py-6 m-0" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
            {query ? `No users match “${query}”.` : "No users in this view."}
          </p>
        )}
      </div>

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

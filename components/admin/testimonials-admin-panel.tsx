"use client";

import { useMemo, useState, useTransition } from "react";
import { Tag } from "@/components/ui/tag";
import { SegmentedControl } from "@/components/ui/segmented";
import { TutorAvatar, StarRating } from "@/components/ui/tutor-avatar";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { setTestimonialApproval, deleteTestimonialByAdmin } from "@/app/lib/actions/testimonial";
import { SparkleIcon } from "@/components/dashboard/dashboard-icons";

const ROLE_LABEL: Record<string, string> = { PARENT: "Parent", STUDENT: "Student", TUTOR: "Tutor" };

export type TestimonialRow = {
  id: string;
  role: "PARENT" | "STUDENT" | "TUTOR";
  quote: string;
  rating: number | null;
  approved: boolean;
  createdAt: Date;
  user: { name: string | null; email: string };
};

const TABS = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "All", value: "ALL" },
];

export function TestimonialsAdminPanel({ testimonials }: { testimonials: TestimonialRow[] }) {
  const [tab, setTab] = useState<string>("PENDING");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TestimonialRow | null>(null);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () =>
      tab === "ALL"
        ? testimonials
        : testimonials.filter((t) => (tab === "PENDING" ? !t.approved : t.approved)),
    [testimonials, tab]
  );

  const pendingCount = testimonials.filter((t) => !t.approved).length;

  function handleSetApproval(id: string, approved: boolean) {
    setPendingId(id);
    startTransition(async () => {
      const result = await setTestimonialApproval(id, approved);
      setPendingId(null);
      setToast(
        result.ok
          ? { tone: "success", message: result.message ?? "Updated." }
          : { tone: "error", message: result.message ?? "Something went wrong." }
      );
    });
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setPendingId(id);
    startTransition(async () => {
      const result = await deleteTestimonialByAdmin(id);
      setPendingId(null);
      setDeleteTarget(null);
      setToast(
        result.ok
          ? { tone: "success", message: "Testimonial deleted." }
          : { tone: "error", message: result.message ?? "Something went wrong." }
      );
    });
  }

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">Testimonials</h2>
        {pendingCount > 0 && (
          <Tag variant="accent" className="text-[11px]">
            {pendingCount} awaiting review
          </Tag>
        )}
      </div>

      <SegmentedControl name="testimonial-tab" value={tab} onChange={setTab} options={TABS} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-9 px-4">
          <div
            className="w-12 h-12 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <SparkleIcon width={20} height={20} />
          </div>
          <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            No testimonials in this view.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((t, i) => {
            const rowPending = pending && pendingId === t.id;
            return (
              <div
                key={t.id}
                className="flex flex-wrap items-start gap-3 p-3.5"
                style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
              >
                <TutorAvatar name={t.user.name ?? t.user.email} index={i} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
                      {t.user.name ?? "Unnamed user"}
                    </span>
                    <Tag variant={t.approved ? "success" : "accent"} className="text-[10.5px]">
                      {t.approved ? "Approved" : "Pending"}
                    </Tag>
                    <Tag variant="outline" className="text-[10.5px]">
                      {ROLE_LABEL[t.role]}
                    </Tag>
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                    {t.user.email}
                  </div>
                  {!!t.rating && <div className="mt-1"><StarRating rating={t.rating} size={13} /></div>}
                  <p className="text-[13.5px] mt-1.5 mb-0">{t.quote}</p>
                </div>

                <div className="flex gap-2 flex-none">
                  {!t.approved && (
                    <button
                      type="button"
                      className="btn btn-primary text-[12.5px]"
                      style={{ padding: "7px 14px" }}
                      disabled={rowPending}
                      onClick={() => handleSetApproval(t.id, true)}
                    >
                      Approve
                    </button>
                  )}
                  {t.approved && (
                    <button
                      type="button"
                      className="btn btn-secondary text-[12.5px]"
                      style={{ padding: "7px 14px" }}
                      disabled={rowPending}
                      onClick={() => handleSetApproval(t.id, false)}
                    >
                      Hide
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-ghost text-[12.5px]"
                    style={{ padding: "7px 14px", color: "var(--color-danger, #c0392b)" }}
                    disabled={rowPending}
                    onClick={() => setDeleteTarget(t)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete this testimonial?"
          description={`${deleteTarget.user.name ?? deleteTarget.user.email}'s testimonial will be permanently removed.`}
          confirmLabel="Delete"
          pending={pending}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

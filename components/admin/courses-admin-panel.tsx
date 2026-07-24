"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { Toast, ToastTone } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CourseFormModal } from "@/components/admin/course-form-modal";
import { deleteCourse } from "@/app/lib/actions/course";
import { priceLabel, type CourseRaw } from "@/lib/mock-courses";
import { PencilIcon, TrashIcon, PlusIcon } from "@/components/dashboard/dashboard-icons";

export function CoursesAdminPanel({
  courses,
  instructorOptions,
}: {
  courses: CourseRaw[];
  instructorOptions: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<CourseRaw | "new" | null>(null);
  const [deleting, setDeleting] = useState<CourseRaw | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);

  function handleSaved(kind: "created" | "updated") {
    setToast({ tone: "success", message: kind === "created" ? "Course added." : "Course updated." });
    router.refresh();
  }

  async function handleDelete() {
    if (!deleting) return;
    setDeletePending(true);
    const result = await deleteCourse(deleting.id);
    setDeletePending(false);
    setDeleting(null);
    if (result.ok) {
      setToast({ tone: "success", message: `"${deleting.title}" removed.` });
      router.refresh();
    } else {
      setToast({ tone: "error", message: result.message ?? "Could not delete this course." });
    }
  }

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">Courses</h2>
        <button type="button" className="btn btn-primary text-[12.5px]" style={{ padding: "7px 14px" }} onClick={() => setEditing("new")}>
          <PlusIcon width={14} height={14} />
          Add course
        </button>
      </div>

      {courses.length === 0 ? (
        <p className="text-[14px] m-0 py-4" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
          No courses yet. Add the first one to populate the Courses page.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {courses.map((c) => (
            <div
              key={c.id}
              className="flex flex-wrap items-center gap-3 p-3.5"
              style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
                    {c.title}
                  </span>
                  {c.bestseller && (
                    <Tag variant="accent" className="text-[10.5px]">
                      Bestseller
                    </Tag>
                  )}
                  {c.premium && (
                    <Tag variant="accent-2" className="text-[10.5px]">
                      Premium
                    </Tag>
                  )}
                  {c.isNew && (
                    <Tag variant="success" className="text-[10.5px]">
                      New
                    </Tag>
                  )}
                </div>
                <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                  {c.instructor ? `${c.instructor} · ` : ""}{c.category} · {c.level}
                </div>
              </div>
              <div className="text-[13px] text-right flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                {c.priceCents != null
                  ? `${priceLabel(c.priceCents)}/hr`
                  : c.originalPriceCents != null
                  ? `${priceLabel(c.originalPriceCents)} full course`
                  : "Price on request"}
                <div>
                  {c.durationHours != null ? `${c.durationHours}h · ` : ""}
                  {c.lectureCount != null ? `${c.lectureCount} lectures` : c.lectureCountLabel ?? ""}
                </div>
              </div>
              <div className="flex gap-2 flex-none">
                <button
                  type="button"
                  aria-label={`Edit ${c.title}`}
                  onClick={() => setEditing(c)}
                  className="grid place-content-center rounded-[var(--radius-sm)] cursor-pointer"
                  style={{ width: 32, height: 32, background: "var(--color-bg)", border: "1px solid color-mix(in srgb, var(--color-text) 15%, transparent)" }}
                >
                  <PencilIcon width={14} height={14} />
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${c.title}`}
                  onClick={() => setDeleting(c)}
                  className="grid place-content-center rounded-[var(--radius-sm)] cursor-pointer"
                  style={{ width: 32, height: 32, background: "color-mix(in srgb, #d92d20 12%, transparent)", color: "#d92d20" }}
                >
                  <TrashIcon width={14} height={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <CourseFormModal
          course={editing === "new" ? null : editing}
          instructorOptions={instructorOptions}
          onClose={() => setEditing(null)}
          onSaved={() => handleSaved(editing === "new" ? "created" : "updated")}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete this course?"
          description={`"${deleting.title}" will be permanently removed from the Courses page.`}
          confirmLabel="Delete"
          pending={deletePending}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { createCourse, updateCourse } from "@/app/lib/actions/course";
import { priceLabel, courseCategories, type CourseRaw } from "@/lib/mock-courses";

const LEVELS = ["Beginner", "Intermediate", "All Levels"] as const;

export function CourseFormModal({
  course,
  instructorOptions,
  onClose,
  onSaved,
}: {
  course: CourseRaw | null;
  instructorOptions: { id: string; name: string }[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [state, action, pending] = useActionState(course ? updateCourse : createCourse, undefined);
  const savedRef = useRef(false);

  useEffect(() => {
    if (state?.message === "success" && !savedRef.current) {
      savedRef.current = true;
      onSaved();
      onClose();
    }
  }, [state, onSaved, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 overflow-y-auto"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 55%, transparent)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        action={action}
        className="card elev-lg gap-4 w-full max-w-[520px] my-8 max-h-[86vh] overflow-y-auto"
        style={{ background: "var(--color-bg)" }}
      >
        {course && <input type="hidden" name="id" value={course.id} />}
        <h2 className="text-[19px]">{course ? "Edit course" : "Add a course"}</h2>

        <div className="field">
          <label>Title</label>
          <input className="input" name="title" defaultValue={course?.title} required />
        </div>
        <div className="field">
          <label>Subtitle</label>
          <input className="input" name="subtitle" defaultValue={course?.subtitle} />
        </div>
        <div className="field">
          <label>Instructor</label>
          <select
            className="input"
            name="instructorId"
            defaultValue={course ? (course.instructorId ?? "not-decided") : ""}
          >
            <option value="" disabled>
              Select a tutor
            </option>
            <option value="not-decided">Not decided</option>
            {instructorOptions.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label>Category</label>
            <select className="input" name="category" defaultValue={course?.category ?? courseCategories[0]} required>
              {courseCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Level</label>
            <select className="input" name="level" defaultValue={course?.level ?? "All Levels"} required>
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label>Price</label>
            <input
              className="input"
              name="price"
              defaultValue={course?.priceCents != null ? priceLabel(course.priceCents) : undefined}
              placeholder="$44.99"
              required
            />
          </div>
          <div className="field">
            <label>Original price</label>
            <input
              className="input"
              name="originalPrice"
              defaultValue={course?.originalPriceCents != null ? priceLabel(course.originalPriceCents) : undefined}
              placeholder="$89.99"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label>Duration (hours)</label>
            <input className="input" name="durationHours" type="number" step="0.5" min="0.5" defaultValue={course?.durationHours ?? undefined} />
          </div>
          <div className="field">
            <label>Lecture count</label>
            <input className="input" name="lectureCount" type="number" min="1" defaultValue={course?.lectureCount ?? undefined} />
          </div>
        </div>

        <div className="field">
          <label>What you&rsquo;ll learn (one per line)</label>
          <textarea
            className="input"
            name="whatYoullLearn"
            rows={4}
            defaultValue={course?.whatYoullLearn.join("\n")}
            required
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-1.5 text-[13.5px] cursor-pointer">
            <input type="checkbox" name="bestseller" defaultChecked={course?.bestseller} />
            Bestseller
          </label>
          <label className="flex items-center gap-1.5 text-[13.5px] cursor-pointer">
            <input type="checkbox" name="premium" defaultChecked={course?.premium} />
            Premium
          </label>
          <label className="flex items-center gap-1.5 text-[13.5px] cursor-pointer">
            <input type="checkbox" name="isNew" defaultChecked={course?.isNew} />
            New
          </label>
        </div>

        {state?.message && state.message !== "success" && (
          <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
            {state.message}
          </p>
        )}
        {state?.errors && (
          <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
            {Object.values(state.errors).flat().join(" ")}
          </p>
        )}

        <div className="flex justify-end gap-2.5 mt-1">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={pending}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Saving…" : "Save course"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}

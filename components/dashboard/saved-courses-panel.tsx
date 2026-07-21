import Link from "next/link";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { BookmarkIcon } from "@/components/dashboard/dashboard-icons";
import { SavedCourseRow, SavedCourseRowData } from "@/components/dashboard/saved-course-row";

export function SavedCoursesPanel({ courses }: { courses: SavedCourseRowData[] }) {
  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[19px]">Saved courses</h2>
        <Link href="/courses" className="btn btn-ghost text-[13px]">
          Browse more
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
          <div
            className="w-14 h-14 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <BookmarkIcon width={24} height={24} />
          </div>
          <h3 className="text-[18px]">No saved courses yet</h3>
          <p className="text-[14px] max-w-[38ch]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            Bookmark courses you like while browsing and they&rsquo;ll show up here.
          </p>
          <Link href="/courses" className="btn btn-primary mt-1">
            Browse Courses
          </Link>
        </div>
      ) : (
        <StaggerReveal className="flex flex-col gap-2.5" stagger={0.06} y={14}>
          {courses.map((c) => (
            <SavedCourseRow key={c.courseId} course={c} />
          ))}
        </StaggerReveal>
      )}
    </div>
  );
}

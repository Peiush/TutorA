import Link from "next/link";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { BookmarkIcon } from "@/components/dashboard/dashboard-icons";
import { SavedTutorRow, SavedTutorRowData } from "@/components/dashboard/saved-tutor-row";

export function SavedTutorsPanel({ tutors }: { tutors: SavedTutorRowData[] }) {
  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[19px]">Saved tutors</h2>
        <Link href="/find-a-tutor" className="btn btn-ghost text-[13px]">
          Browse more
        </Link>
      </div>

      {tutors.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
          <div
            className="w-14 h-14 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <BookmarkIcon width={24} height={24} />
          </div>
          <h3 className="text-[18px]">No saved tutors yet</h3>
          <p className="text-[14px] max-w-[38ch]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            Bookmark tutors you like while browsing and they&rsquo;ll show up here.
          </p>
          <Link href="/find-a-tutor" className="btn btn-primary mt-1">
            Browse verified tutors
          </Link>
        </div>
      ) : (
        <StaggerReveal className="flex flex-col gap-2.5" stagger={0.06} y={14}>
          {tutors.map((t, i) => (
            <SavedTutorRow key={t.tutorProfileId} tutor={t} index={i} />
          ))}
        </StaggerReveal>
      )}
    </div>
  );
}

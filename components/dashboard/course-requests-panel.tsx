import Link from "next/link";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { InboxEmptyIcon } from "@/components/dashboard/dashboard-icons";
import { CourseRequestRow } from "@/components/dashboard/course-request-row";
import { CourseRequestRowData } from "@/components/dashboard/course-request-status";

export function CourseRequestsPanel({ requests }: { requests: CourseRequestRowData[] }) {
  console.log("DEBUG panel requests =", JSON.stringify(requests));
  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[19px]">Your course requests</h2>
        <Link href="/courses" className="btn btn-ghost text-[13px]">
          Browse courses
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
          <div
            className="w-14 h-14 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <InboxEmptyIcon width={24} height={24} />
          </div>
          <h3 className="text-[18px]">No course requests yet</h3>
          <p className="text-[14px] max-w-[38ch]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            Send a request from any course page and our team will follow up with next steps.
          </p>
          <Link href="/courses" className="btn btn-primary mt-1">
            Browse Courses
          </Link>
        </div>
      ) : (
        <StaggerReveal className="flex flex-col gap-2.5" stagger={0.06} y={14}>
          {requests.map((r) => (
            <CourseRequestRow key={r.id} request={r} />
          ))}
        </StaggerReveal>
      )}
    </div>
  );
}

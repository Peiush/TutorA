import Link from "next/link";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { InboxEmptyIcon } from "@/components/dashboard/dashboard-icons";
import { RequestRow } from "@/components/dashboard/request-row";
import { RequestRowData } from "@/components/dashboard/request-status";

export function RequestsPanel({ requests }: { requests: RequestRowData[] }) {
  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[19px]">Your tutor requests</h2>
        <Link href="/request-a-tutor" className="btn btn-ghost text-[13px]">
          New request
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
          <h3 className="text-[18px]">No requests yet</h3>
          <p className="text-[14px] max-w-[38ch]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            Tell us what you&rsquo;re studying and our team will personally match you with a verified tutor.
          </p>
          <Link href="/request-a-tutor" className="btn btn-primary mt-1">
            Request a Tutor
          </Link>
        </div>
      ) : (
        <StaggerReveal className="flex flex-col gap-2.5" stagger={0.06} y={14}>
          {requests.map((r) => (
            <RequestRow key={r.id} request={r} />
          ))}
        </StaggerReveal>
      )}
    </div>
  );
}

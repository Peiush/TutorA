import { Tag } from "@/components/ui/tag";
import { UsersIcon } from "@/components/tutor/tutor-icons";

type MatchedRequestRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  level: string | null;
  mode: string | null;
  status: "OPEN" | "MATCHED" | "CLOSED";
  budgetPerHour: number | null;
  currency: string | null;
  updatedAt: Date;
};

const STATUS_META = {
  MATCHED: { label: "Matched", variant: "success" as const },
  CLOSED: { label: "Closed", variant: "neutral" as const },
  OPEN: { label: "Open", variant: "accent" as const },
};

export function MatchedStudentsPanel({ requests }: { requests: MatchedRequestRow[] }) {
  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <h2 className="text-[19px]">Matched students</h2>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-9 px-4">
          <div
            className="w-12 h-12 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <UsersIcon width={20} height={20} />
          </div>
          <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            No students matched yet. Once our team matches a request to you, their contact details
            will show up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {requests.map((r) => {
            const meta = STATUS_META[r.status];
            return (
              <div
                key={r.id}
                className="flex flex-wrap items-center gap-3 p-3.5"
                style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
                      {r.name}
                    </span>
                    <Tag variant={meta.variant} className="text-[10.5px]">
                      {meta.label}
                    </Tag>
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
                    {r.email} · {r.subject} · {[r.level, r.mode].filter(Boolean).join(" · ") || "No preferences"}
                  </div>
                </div>
                <div className="text-[13px] text-right flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                  {r.budgetPerHour ? `${r.currency ?? "$"}${r.budgetPerHour}/hr` : ""}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

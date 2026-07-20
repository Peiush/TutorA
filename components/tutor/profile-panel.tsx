import { Tag } from "@/components/ui/tag";
import { MapPinIcon, ClipboardCheckIcon } from "@/components/tutor/tutor-icons";

type ProfileData = {
  country: string;
  subjects: string;
  yearsExperience: number | null;
  hourlyRateCents: number | null;
  bio: string | null;
  certificateUrl: string | null;
  updatedAt: Date;
} | null;

export function ProfilePanel({ profile }: { profile: ProfileData }) {
  if (!profile) {
    return (
      <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
        <h2 className="text-[19px]">Your listing</h2>
        <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
          <div
            className="w-14 h-14 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <ClipboardCheckIcon width={24} height={24} />
          </div>
          <h3 className="text-[18px]">You haven&rsquo;t created a listing yet</h3>
          <p className="text-[14px] max-w-[38ch]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            Use the &ldquo;Create listing&rdquo; button above to tell students what you teach —
            our team reviews every listing within 24–48 hours.
          </p>
        </div>
      </div>
    );
  }

  const subjectList = profile.subjects
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[19px]">Your listing</h2>
        <span
          className="text-[12.5px] flex items-center gap-1.5"
          style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}
        >
          <MapPinIcon width={14} height={14} />
          {profile.country}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {subjectList.map((s) => (
          <Tag key={s} variant="neutral">
            {s}
          </Tag>
        ))}
      </div>

      {profile.bio && (
        <p className="text-[14px] leading-[1.6] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>
          {profile.bio}
        </p>
      )}

      <div
        className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] pt-2"
        style={{ borderTop: "1px solid var(--color-divider)", color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
      >
        <span>{profile.yearsExperience ?? 0} yrs experience</span>
        <span>{profile.hourlyRateCents ? `$${(profile.hourlyRateCents / 100).toFixed(0)}/hr` : "Rate not set"}</span>
        <span>{profile.certificateUrl ? "Certificate on file" : "No certificate uploaded"}</span>
        <span>
          Updated{" "}
          {profile.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>
    </div>
  );
}

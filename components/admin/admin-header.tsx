import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar } from "@/components/ui/tutor-avatar";

function ShieldWatermark() {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{
        position: "absolute",
        right: -24,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--color-accent)",
        opacity: 0.08,
        pointerEvents: "none",
      }}
    >
      <path d="M12 3.5 19.5 6.5v5.3c0 4.6-3.2 7.9-7.5 9-4.3-1.1-7.5-4.4-7.5-9V6.5L12 3.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function AdminHeader({ name, email }: { name: string; email: string }) {
  return (
    <Reveal>
      <div
        className="relative overflow-hidden flex flex-wrap items-center gap-6 p-[clamp(20px,4vw,32px)]"
        style={{
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(135deg, var(--color-accent-100), var(--color-surface))",
        }}
      >
        <ShieldWatermark />
        <TutorAvatar name={name || "Admin"} size={64} index={1} />
        <div className="min-w-0 flex-1 relative">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-[clamp(22px,2.6vw,30px)]">Welcome back, {name?.split(" ")[0] || "there"}</h1>
            <Tag variant="accent">Admin</Tag>
          </div>
          <p className="text-[14px] mt-1" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            {email} · Platform overview
          </p>
        </div>
      </div>
    </Reveal>
  );
}

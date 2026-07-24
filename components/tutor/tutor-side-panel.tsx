import Link from "next/link";
import { logout } from "@/app/lib/actions/auth";
import { EyeIcon } from "@/components/tutor/tutor-icons";
import { ChatDotsIcon, ArrowUpRightIcon } from "@/components/dashboard/dashboard-icons";

const LINKS = [
  { href: "/find-a-tutor", label: "See how students browse tutors", icon: EyeIcon },
  { href: "/about", label: "Contact support", icon: ChatDotsIcon },
];

export function TutorSidePanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="card elev-sm gap-1 p-[clamp(18px,3vw,24px)]">
        <h2 className="text-[17px] mb-1.5">Quick actions</h2>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2.5 py-2.5 text-[14px] transition-colors duration-150 rounded-[var(--radius-sm)] -mx-2 px-2 group"
            style={{ color: "var(--color-text)" }}
          >
            <span
              className="w-8 h-8 rounded-full grid place-content-center flex-none"
              style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
            >
              <link.icon width={15} height={15} />
            </span>
            <span className="flex-1">{link.label}</span>
            <ArrowUpRightIcon
              width={14}
              height={14}
              className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}
            />
          </Link>
        ))}
        <form action={logout} className="mt-1 -mx-2">
          <button type="submit" className="btn btn-ghost text-[13.5px] w-full justify-start px-2">
            Log out
          </button>
        </form>
      </div>

      <div
        className="p-[clamp(18px,3vw,24px)]"
        style={{ borderRadius: "var(--radius-lg)", background: "var(--color-accent-100)" }}
      >
        <h3 className="text-[16px]">Get matched faster</h3>
        <p className="text-[13.5px] mt-2" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
          Listings with a detailed bio and an uploaded certificate get reviewed and matched with
          students noticeably faster.
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--color-neutral-900)", color: "var(--color-neutral-200)" }}>
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(40px,5vw,64px)] grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
        <div>
          <div className="text-[22px]" style={{ fontFamily: "var(--font-heading)", color: "var(--color-bg)" }}>
            TutorConnect
          </div>
          <p className="text-[13px] leading-[1.6] mt-3 max-w-[24ch]" style={{ color: "var(--color-neutral-400)" }}>
            Admin-mediated tutoring, matched with care across borders.
          </p>
        </div>
        <div className="text-[14px] leading-[2]">
          <div className="mb-1.5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-bg)" }}>
            Explore
          </div>
          <Link href="/find-a-tutor" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Find a Tutor
          </Link>
          <Link href="/request-a-tutor" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Request a Tutor
          </Link>
          <Link href="/become-a-tutor" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Become a Tutor
          </Link>
        </div>
        <div className="text-[14px] leading-[2]">
          <div className="mb-1.5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-bg)" }}>
            Dashboards
          </div>
          <Link href="/dashboard/student" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Student
          </Link>
          <Link href="/dashboard/tutor" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Tutor
          </Link>
          <Link href="/dashboard/admin" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Admin
          </Link>
        </div>
        <div className="text-[14px] leading-[2]">
          <div className="mb-1.5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-bg)" }}>
            Legal
          </div>
          <a href="#" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Terms
          </a>
          <a href="#" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Privacy
          </a>
          <a href="#" className="block" style={{ color: "var(--color-neutral-300)" }}>
            Commission policy
          </a>
        </div>
      </div>
    </footer>
  );
}

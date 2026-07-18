import { Tag } from "@/components/ui/tag";
import { tutorPerks, tutorTestimonials } from "@/lib/mock-data";
import { BecomeForm } from "@/components/become/become-form";
import { BecomeIllustration } from "@/components/become/become-illustration";

export const metadata = {
  title: "Become a Tutor — TutorConnect",
};

const PERK_ICON_PATHS = [
  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  "M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z M9 12l2 2 4-4",
  "M8 2v4 M16 2v4 M3.5 9h17 M4 4.5h16A1.5 1.5 0 0 1 21.5 6v14a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 20V6A1.5 1.5 0 0 1 4 4.5Z",
  "M19 5 5 19 M7.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z M16.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
];

export default function BecomeATutorPage() {
  return (
    <div>
      <section style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(44px,5vw,80px)] grid gap-10 items-center [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div>
            <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
              Become a Tutor
            </Tag>
            <h1 className="text-[clamp(32px,4.4vw,54px)] leading-[1.05] mt-4">
              Teach more. Chase leads less.
            </h1>
            <p
              className="text-[17px] leading-[1.6] mt-5 max-w-[46ch]"
              style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
            >
              We bring you matched, ready students and handle the vetting and introductions. You
              focus on teaching.
            </p>
            <div className="grid gap-4 mt-7 max-w-[44ch]">
              {tutorPerks.map((p, i) => (
                <div key={p} className="flex gap-3 items-start">
                  <div
                    className="w-6.5 h-6.5 rounded-full grid place-content-center flex-none mt-0.5"
                    style={{ background: "color-mix(in srgb, var(--color-verified) 18%, transparent)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-verified)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <path d={PERK_ICON_PATHS[i]} />
                    </svg>
                  </div>
                  <span className="text-[15px] leading-[1.5]">{p}</span>
                </div>
              ))}
            </div>

            <div className="hidden xl:flex mt-8 pl-2">
              <BecomeIllustration />
            </div>
          </div>

          <BecomeForm />
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(44px,5vw,72px)]">
        <h2 className="text-[clamp(24px,3vw,34px)] mb-6.5">From tutors already on the platform</h2>
        <div className="grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {tutorTestimonials.map((q) => (
            <figure
              key={q.name}
              className="card m-0 gap-3 transition-transform duration-200 ease-out hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <p className="font-[var(--font-heading)] text-[18px] leading-[1.4] m-0">“{q.quote}”</p>
              <figcaption
                className="text-[13px]"
                style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
              >
                {q.name} · {q.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

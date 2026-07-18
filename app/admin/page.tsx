import { getUser } from "@/app/lib/dal";
import { prisma } from "@/lib/prisma";
import { logout } from "@/app/lib/actions/auth";

export const metadata = {
  title: "Admin — TutorConnect",
};

export default async function AdminPage() {
  const user = await getUser();
  const pendingTutors = await prisma.tutorProfile.count({ where: { status: "PENDING" } });
  const openRequests = await prisma.tutorRequest.count({ where: { status: "OPEN" } });

  return (
    <div className="max-w-[720px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(44px,8vw,96px)]">
      <h1 className="text-[clamp(26px,3vw,36px)]">Admin — {user?.name}</h1>
      <div className="grid gap-3 mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div className="card p-5">
          <div className="text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            Pending tutor listings
          </div>
          <div className="text-[28px] font-[var(--font-heading)]">{pendingTutors}</div>
        </div>
        <div className="card p-5">
          <div className="text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            Open tutor requests
          </div>
          <div className="text-[28px] font-[var(--font-heading)]">{openRequests}</div>
        </div>
      </div>
      <form action={logout} className="mt-6">
        <button type="submit" className="btn btn-secondary">Log out</button>
      </form>
    </div>
  );
}

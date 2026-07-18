import { getUser } from "@/app/lib/dal";
import { logout } from "@/app/lib/actions/auth";

export const metadata = {
  title: "Dashboard — TutorConnect",
};

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="max-w-[720px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(44px,8vw,96px)]">
      <h1 className="text-[clamp(26px,3vw,36px)]">Welcome, {user?.name}</h1>
      <p style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>
        Signed in as {user?.email} ({user?.role})
      </p>
      <form action={logout} className="mt-6">
        <button type="submit" className="btn btn-secondary">Log out</button>
      </form>
    </div>
  );
}

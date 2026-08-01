import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthShell } from "@/components/auth/auth-shell";
import { CompleteProfileForm } from "@/components/auth/complete-profile-form";

export const metadata = {
  title: "Complete your profile",
  robots: { index: false, follow: true },
};

export default async function CompleteProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, phone: true },
  });
  if (!user) {
    redirect("/login");
  }
  if (user.phone) {
    redirect("/dashboard");
  }

  return (
    <AuthShell variant="complete-profile">
      <CompleteProfileForm name={user.name} />
    </AuthShell>
  );
}

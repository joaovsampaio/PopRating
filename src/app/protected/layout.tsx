import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  return (
    <main>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </main>
  );
}

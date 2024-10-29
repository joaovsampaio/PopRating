import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Hero from "@/components/Hero";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import SidePosts from "@/components/SidePosts";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="home-bg flex-1 flex items-center">
      <MaxWidthWrapper className="w-full py-5">
        {!session ? <Hero /> : <SidePosts />}
      </MaxWidthWrapper>
    </main>
  );
}

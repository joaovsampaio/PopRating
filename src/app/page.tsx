import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="home-bg flex-1 flex items-center">
      <MaxWidthWrapper className="w-full py-5">
        <Hero />
      </MaxWidthWrapper>
    </main>
  );
}

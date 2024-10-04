"use client";

import ErrorToFetch from "@/components/ErrorToFetch";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Card from "@/components/ui/Card";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { cache } from "react";

const getAllPosts = cache(async () => {
  let data = await fetch("/api/posts/allPosts");
  let posts = await data.json();

  return posts;
});

const Page = () => {
  const {
    data: allPosts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryFn: async () => await getAllPosts(),
    queryKey: ["allPosts"],
    retry: 5,
  });

  if (isError) return <ErrorToFetch />;

  return (
    <main>
      <MaxWidthWrapper className="flex flex-col items-center my-5">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full gap-5">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            allPosts?.map((item) => (
              <Card
                key={item.id}
                link={item.id}
                cover={item.cover}
                title={item.title}
                date={item.date}
                category={item.category}
              />
            ))
          )}
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;

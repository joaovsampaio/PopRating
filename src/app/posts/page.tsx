"use client";

import { cache } from "react";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Card from "@/components/ui/Card";
import CardSkeleton from "@/components/ui/CardSkeleton";
import EmptyList from "@/components/ui/EmptyList";

const getAllPosts = cache(async () => {
  let data = await fetch("/api/posts");
  let posts = await data.json();

  return posts;
});

const Page = () => {
  const {
    data: allPosts,
    isLoading,
    isError,
    refetch,
  } = useQuery<Post[]>({
    queryFn: async () => await getAllPosts(),
    queryKey: ["allPosts"],
    retry: 5,
  });

  if (isError) return <EmptyList onClick={() => refetch()} />;

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

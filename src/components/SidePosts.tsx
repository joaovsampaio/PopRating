"use client";

import { cache } from "react";
import { Post } from "prisma/prisma-client";
import { useQuery } from "@tanstack/react-query";
import Card from "./ui/Card";
import CardSkeleton from "./ui/CardSkeleton";
import ErrorToFetch from "./ErrorToFetch";

const getTrendingPosts = cache(async () => {
  let data = await fetch("/api/posts/trendingPosts");
  let posts = await data.json();

  return posts;
});

const getLatestPosts = cache(async () => {
  let data = await fetch("/api/posts/latestPosts");
  let posts = await data.json();

  return posts;
});

const SidePosts = () => {
  const {
    data: trendingPosts,
    isLoading: isLoadingTrendingPosts,
    isError,
  } = useQuery<Post[]>({
    queryFn: async () => await getTrendingPosts(),
    queryKey: ["trendingPosts"],
    retry: 5,
  });

  const { data: latestPosts, isLoading: isLoadinglatestPosts } = useQuery<
    Post[]
  >({
    queryFn: async () => await getLatestPosts(),
    queryKey: ["latestPosts"],
    retry: 5,
  });

  if (isError) return <ErrorToFetch />;

  return (
    <div className="flex lg:flex-row lg:justify-between lg:gap-0 lg:items-start items-center flex-col gap-4">
      <div className="flex flex-col lg:w-2/5 w-full h-full p-4 gap-4 rounded-lg bg-gradient-to-b from-secondary-700 to-primary-500">
        <div className="flex gap-2 bg-neutral-100/10 rounded-lg overflow-hidden">
          <div className="w-2 h-auto bg-accent-500" />
          <h2 className="font-medium uppercase text-lg py-1">
            Principais Críticas
          </h2>
        </div>

        {isLoadingTrendingPosts ? (
          <CardSkeleton />
        ) : (
          trendingPosts?.map((item) => (
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

      <div className="flex flex-col lg:w-2/5 w-full h-full p-4 gap-4 rounded-lg bg-gradient-to-b from-secondary-700 to-primary-500">
        <div className="flex gap-2 bg-neutral-100/10 rounded-lg overflow-hidden">
          <div className="w-2 h-auto bg-primary-500" />
          <h2 className="font-medium uppercase text-lg py-1">
            Últimas Críticas
          </h2>
        </div>

        {isLoadinglatestPosts ? (
          <CardSkeleton />
        ) : (
          latestPosts?.map((item) => (
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
    </div>
  );
};

export default SidePosts;

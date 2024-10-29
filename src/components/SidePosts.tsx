"use client";

import { cache } from "react";
import { Post } from "prisma/prisma-client";
import { useQuery } from "@tanstack/react-query";
import Card from "./ui/Card";
import CardSkeleton from "./ui/CardSkeleton";
import { motion } from "framer-motion";
import EmptyList from "./ui/EmptyList";

type queryPosts = {
  trendingPosts: Post[];
  latestPosts: Post[];
};

const fetchPosts = cache(async () => {
  const [trendingPosts, latestPosts] = await Promise.all([
    fetch("/api/posts/trendingPosts").then((res) => res.json()),
    fetch("/api/posts/latestPosts").then((res) => res.json()),
  ]);

  return { trendingPosts, latestPosts };
});

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const SidePosts = () => {
  const { data, isLoading, isError, refetch } = useQuery<queryPosts>({
    queryFn: fetchPosts,
    queryKey: ["sidePosts"],
    retry: 5,
  });

  if (isError) return <EmptyList onClick={() => refetch()} />;

  const { trendingPosts, latestPosts } = data || {};

  return (
    <div className="flex lg:flex-row lg:justify-between lg:gap-0 lg:items-start items-center flex-col gap-4">
      <div className="flex flex-col lg:w-2/5 w-full h-full p-4 gap-4 rounded-lg bg-gradient-to-b from-secondary-700 to-primary-500">
        <div className="flex gap-2 bg-neutral-100/10 rounded-lg overflow-hidden">
          <div className="w-2 h-auto bg-accent-500" />
          <h2 className="font-medium uppercase text-lg py-1">
            Principais Críticas
          </h2>
        </div>

        {isLoading ? (
          <CardSkeleton />
        ) : (
          trendingPosts?.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", duration: 0.8 }}
            >
              <Card
                link={item.id}
                cover={item.cover}
                title={item.title}
                date={item.date}
                category={item.category}
              />
            </motion.div>
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

        {isLoading ? (
          <CardSkeleton />
        ) : (
          latestPosts?.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", duration: 0.8 }}
            >
              <Card
                link={item.id}
                cover={item.cover}
                title={item.title}
                date={item.date}
                category={item.category}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SidePosts;

"use client";

import { Post } from "prisma/prisma-client";
import Card from "./ui/Card";
import { cache, useEffect, useState } from "react";

const getLatestPosts = cache(async () =>
  fetch("/api/posts/latestPosts").then((res) => res.json())
);

const getTrendingPosts = cache(async () =>
  fetch("/api/posts/trendingPosts").then((res) => res.json())
);

const SidePosts = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);

  const handleLatestPosts = async () => {
    const data = await getLatestPosts();
    return setLatestPosts(data);
  };

  const handleTrendingPosts = async () => {
    const data = await getTrendingPosts();
    return setTrendingPosts(data);
  };

  useEffect(() => {
    handleLatestPosts();
    handleTrendingPosts();
  }, []);

  return (
    <div className="flex justify-between max-sm:items-center max-sm:flex-col gap-4 w-full">
      <div className="flex flex-col w-2/5 h-full max-sm:w-full p-4 gap-4 rounded-lg bg-accent">
        <div className="flex w-fit self-center py-3 px-2 justify-center items-center bg-primary rounded-bl-2xl rounded-tr-2xl">
          <h2 className="font-medium uppercase text-2xl">Últimas Críticas</h2>
        </div>

        {latestPosts.map((item) => (
          <Card
            key={item.id}
            link={item.id}
            cover={item.cover}
            title={item.title}
            date={item.date}
            category={item.category}
          />
        ))}
      </div>

      <div className="flex flex-col w-2/5 h-full max-sm:w-full p-4 gap-4 rounded-lg bg-secondary">
        <div className="flex w-fit self-center py-3 px-2 justify-center items-center bg-darkPurple rounded-bl-2xl rounded-tr-2xl">
          <h2 className="font-medium uppercase text-2xl">
            Principais Críticas
          </h2>
        </div>

        {trendingPosts.map((item) => (
          <Card
            key={item.id}
            link={item.id}
            cover={item.cover}
            title={item.title}
            date={item.date}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default SidePosts;

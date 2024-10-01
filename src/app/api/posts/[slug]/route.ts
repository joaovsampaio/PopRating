import { NextResponse } from "next/server";
import { prisma } from "@/db/index";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug: any = params.slug;

  if (slug === "trendingPosts") {
    const trendingPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { views: "desc" },
      take: 5,
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(trendingPosts);
  }

  const latestPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    take: 5,
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return NextResponse.json(latestPosts);
}

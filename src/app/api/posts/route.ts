import { NextResponse } from "next/server";
import { prisma } from "@/db/index";

export async function GET() {
  const allPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: { date: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
    take: 18,
  });

  return NextResponse.json(allPosts);
}

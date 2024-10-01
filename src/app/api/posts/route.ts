import { NextResponse } from "next/server";
import { prisma } from "@/db/index";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: { date: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return NextResponse.json(posts);
}

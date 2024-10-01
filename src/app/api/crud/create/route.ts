import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/db/index";

export async function POST(request: Request) {
  const json = await request.json();
  const session = await getServerSession(authOptions);

  try {
    const posts = await prisma.post.create({
      data: {
        author: { connect: { email: session?.user?.email } },
        ...json,
      },
    });

    return new NextResponse(JSON.stringify(posts), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}

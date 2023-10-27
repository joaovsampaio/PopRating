import { prisma } from "@/db/index";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.post.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let json = await request.json();

  const updatePost = await prisma.post.update({
    where: { id },
    data: {
      ...json,
    },
  });

  return NextResponse.json(updatePost);
}

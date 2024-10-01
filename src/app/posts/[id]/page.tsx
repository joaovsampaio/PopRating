import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import { StarPost } from "@/components/ui/StarRating";
import { prisma } from "@/db";
import DOMPurify from "isomorphic-dompurify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserOptions from "@/components/ui/UserOptions";
import { Suspense } from "react";
import PostLoadingSkeleton from "@/components/ui/PostLoadingSkeleton";
import ErrorToFetch from "@/components/ErrorToFetch";

async function getPost(param: string) {
  let post;
  let isError = null;

  try {
    post = await prisma.post.findUnique({
      where: {
        id: String(param),
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }
  } catch (err: any) {
    isError = err.message;
  }

  return { post, isError };
}

const PostContent = async ({ id }: { id: string }) => {
  const { post, isError } = await getPost(id);

  const session = await getServerSession(authOptions);
  const postBelongsToUser = session?.user?.email === post?.author?.email;

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(post?.content || ""),
  });

  if (isError) return <ErrorToFetch />;

  return (
    <main className="flex-1 flex justify-center my-8">
      <MaxWidthWrapper className="flex flex-col items-center w-[49rem] gap-8">
        <div className="flex flex-col items-center w-fit">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {post?.title}
          </h1>
          <div className="h-[3px] bg-primary-500 w-full rounded-full"></div>
        </div>
        <section className="flex flex-col w-full mt-11 gap-4">
          <div className="flex justify-between">
            <div className="px-4 rounded-sm border border-neutral-100 bg-secondary-500">
              <span className="text-sm lg:text-lg uppercase font-semibold">
                {post?.category}
              </span>
            </div>
            <div className="px-4 rounded-sm border border-neutral-100 bg-primary-500">
              <span className="text-sm lg:text-lg uppercase font-semibold">
                Views: {post?.views}
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-0  justify-between">
            <p className="text-sm lg:text-lg uppercase">
              Escrito por:{" "}
              <span className="font-semibold">{post?.author?.name}</span>
            </p>

            <data className="text-sm lg:text-lg uppercase">{post?.date}</data>
          </div>

          <div className="flex justify-end">
            {postBelongsToUser && <UserOptions id={id} />}
          </div>
        </section>

        <div className="w-full flex flex-col items-center gap-4">
          <div className="aspect-video relative w-4/5">
            <Image alt="" src={post?.cover || ""} fill />
          </div>
          <div className="w-4/5">
            <span className="self-start">
              Fonte:{" "}
              <Link
                href={post?.cover || ""}
                className="text-secondary-500 hover:underline"
              >
                Imagem
              </Link>
            </span>
          </div>
        </div>

        <article
          className="flex flex-col gap-8 items-center font-light leading-relaxed tracking-wider"
          dangerouslySetInnerHTML={sanitizedData()}
        ></article>

        <div className="flex gap-2 self-start">
          <span className="font-semibold">Avaliação:</span>
          <StarPost getRating={post?.rating || 0} />
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<PostLoadingSkeleton />}>
      <PostContent id={params.id} />
    </Suspense>
  );
};

export default Page;

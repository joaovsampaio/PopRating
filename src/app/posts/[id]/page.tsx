import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import { StarPost } from "@/components/ui/StarRating";
import { prisma } from "@/db";
import DOMPurify from "isomorphic-dompurify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserOptions from "@/components/ui/UserOptions";

async function getPost(param: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: String(param),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return post;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);

  const session = await getServerSession(authOptions);
  const postBelongsToUser = session?.user?.email === post?.author?.email;

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(post?.content || ""),
  });

  return (
    <main
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #000 0%, #10002b 100%)",
      }}
      className="flex-1 flex justify-center my-8"
    >
      <MaxWidthWrapper className="flex flex-col items-center w-[49rem] gap-8">
        <div className="flex flex-col items-center w-fit">
          <h1 className="max-sm:text-2xl text-4xl font-bold">{post?.title}</h1>
          <div className="h-[6px] bg-primary w-full rounded-full"></div>
        </div>
        <section className="flex flex-col w-full mt-11 gap-4">
          <div className="flex justify-between">
            <div className="px-4 rounded-sm border border-light bg-secondary">
              <span className="uppercase font-semibold text-lg max-sm:text-sm">
                {post?.category}
              </span>
            </div>
            <div className="px-4 rounded-sm border border-light bg-primary">
              <span className="uppercase font-semibold text-lg max-sm:text-sm">
                Views: {post?.views}
              </span>
            </div>
          </div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <p className="uppercase text-lg max-sm:text-sm">
              Escrito por:{" "}
              <span className="font-semibold">{post?.author?.name}</span>
            </p>

            <data className="uppercase text-lg max-sm:text-sm">
              {post?.date}
            </data>
          </div>

          <div className="flex justify-end">
            {postBelongsToUser && <UserOptions id={params.id} />}
          </div>
        </section>

        <div className="w-full flex flex-col items-center gap-4">
          <div className="aspect-video relative w-4/5">
            <Image alt="" src={post?.cover || ""} fill />
          </div>
          <div className="w-4/5">
            <span className=" self-start">
              Fonte:{" "}
              <Link
                href={post?.cover || ""}
                className="text-accent hover:underline"
              >
                Imagem
              </Link>
            </span>
          </div>
        </div>

        <article
          className="flex flex-col gap-8 items-center"
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

export default Page;

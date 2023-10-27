import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BtnLogin from "@/components/ui/BtnLogin";
import Card from "@/components/ui/Card";
import UserOptions from "@/components/ui/UserOptions";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

async function getPosts(email: string) {
  const posts = await prisma.post.findMany({
    where: {
      author: { email },
    },
    orderBy: { date: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return posts;
}

async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center items-center gap-10 h-screen">
          <p className="text-light/90 text-lg text-center font-medium">
            É necessário uma conta
          </p>
          <BtnLogin />
        </div>
      </MaxWidthWrapper>
    );
  }

  const posts = await getPosts(session.user.email);
  const user = await getUser(session.user.email);

  return (
    <main>
      <MaxWidthWrapper className="flex flex-col my-5 gap-5">
        <div className="flex justify-between items-center gap-3 max-sm:flex-col">
          <div className="flex items-center gap-2">
            <Image
              alt={user?.name || ""}
              src={user?.image || ""}
              height={50}
              width={50}
              className="rounded-full"
            />

            <p className="text-lg">{user?.name}</p>
          </div>
          <BtnLogin />
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-darkPurple via-light to-darkPurple"></div>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 w-full gap-5">
          {posts.map((item) => (
            <div className="flex flex-col gap-2" key={item.id}>
              <Card
                link={item.id}
                cover={item.cover}
                title={item.title}
                date={item.date}
                category={item.category}
                className={!item.published ? "backdrop-brightness-[20%]" : ""}
              />
              <UserOptions id={item.id} />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;

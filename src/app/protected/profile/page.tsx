import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BtnLogout from "@/components/ui/BtnLogout";
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

  if (!session?.user?.email) return;

  const posts = await getPosts(session.user.email);
  const user = await getUser(session.user.email);

  return (
    <div className="flex flex-col my-5 gap-5">
      <div className="flex justify-between items-center gap-5 flex-col lg:flex-row">
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
        <BtnLogout />
      </div>
      <div className="h-[1px] w-full bg-accent-500 my-3" />
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-5">
        {posts.map((item) => (
          <div className="flex flex-col gap-2" key={item.id}>
            <Card
              link={item.id}
              cover={item.cover}
              title={item.title}
              date={item.date}
              category={item.category}
              disabled={!item.published}
            />
            <UserOptions id={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

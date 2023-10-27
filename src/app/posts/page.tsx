import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Card from "@/components/ui/Card";
import { prisma } from "@/db";

async function getPosts() {
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

  return posts;
}

const Page = async () => {
  const posts = await getPosts();

  return (
    <main>
      <MaxWidthWrapper className="flex flex-col items-center my-5">
        <div className="grid grid-cols-3 max-sm:grid-cols-1 w-full gap-5">
          {posts.map((item) => (
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
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;

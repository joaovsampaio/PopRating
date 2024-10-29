"use client";

import { cache } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import BtnLogout from "@/components/ui/BtnLogout";
import Card from "@/components/ui/Card";
import UserOptions from "@/components/ui/UserOptions";
import Loading from "@/components/ui/Loading";
import { PlusIcon, UserIcon } from "lucide-react";
import ActorSpeechBalloons from "../../../../public/actor_speech_balloons.webp";
import EmptyList from "@/components/ui/EmptyList";
import { useRouter } from "next/navigation";

const getUserPosts = cache(async () => {
  let data = await fetch("/api/posts/userPosts");
  let posts = await data.json();

  return posts;
});

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    data: userPosts,
    isLoading,
    isError,
    refetch,
  } = useQuery<Post[]>({
    queryFn: async () => await getUserPosts(),
    queryKey: ["userPosts"],
    retry: 5,
  });

  if (isError) return <EmptyList onClick={() => refetch()} />;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col my-5 gap-5">
      <div className="flex justify-between items-center gap-5 flex-col lg:flex-row">
        <div className="flex items-center gap-2">
          {!session?.user.image ? (
            <UserIcon height={50} width={50} className="rounded-full" />
          ) : (
            <Image
              alt={session.user.name || "User"}
              src={session.user.image}
              height={50}
              width={50}
              className="rounded-full"
            />
          )}

          <p className="text-lg">{session?.user?.name}</p>
        </div>
        <BtnLogout />
      </div>
      <div className="h-[1px] w-full bg-accent-500 my-3" />
      {userPosts?.length === 0 && (
        <EmptyList
          errorText="Você Ainda Não Postou"
          srcImage={ActorSpeechBalloons}
          onClick={() => router.push("/protected/form")}
          btnText="Crie Uma Review"
          btnIcon={<PlusIcon />}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-5">
        {userPosts?.map((item) => (
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

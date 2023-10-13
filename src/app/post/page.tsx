import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import PostImg from "../../../public/post-img.jpg";
import Link from "next/link";

const Post = () => {
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
          <h1 className="max-sm:text-2xl text-4xl font-bold">
            Lorem Ipsummmmm
          </h1>
          <div className="h-[6px] bg-primary w-full rounded-full"></div>
        </div>
        <section className="flex flex-col w-full mt-11 gap-4">
          <div className="flex justify-between">
            <div className="px-4 rounded-sm border border-light bg-secondary">
              <span className="uppercase font-semibold text-lg max-sm:text-sm">
                Filme
              </span>
            </div>
            <div className="px-4 rounded-sm border border-light bg-primary">
              <span className="uppercase font-semibold text-lg max-sm:text-sm">
                Views: 72
              </span>
            </div>
          </div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <p className="uppercase text-lg max-sm:text-sm">
              Escrito por: <span className="font-semibold">Lorem Ipsum</span>
            </p>

            <data className="uppercase text-lg max-sm:text-sm">
              04/04/2023, 18:15
            </data>
          </div>
        </section>

        <div className="w-full flex flex-col items-center gap-4">
          <div className="aspect-video relative w-4/5">
            <Image alt="" src={PostImg} fill />
          </div>
          <div className="w-4/5">
            <span className=" self-start">
              Fonte:{" "}
              <Link href="/" className="text-accent hover:underline">
                Imagem
              </Link>
            </span>
          </div>
        </div>

        <article className="flex flex-col gap-8 items-center">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            dignissimos sed distinctio nam illum animi cum omnis commodi!
            Possimus deserunt nam molestias, ut in veniam facilis libero sed
            distinctio laboriosam?
          </p>

          <Image alt="" src={PostImg} width={400} height={400} />

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            dignissimos sed distinctio nam illum animi cum omnis commodi!
            Possimus deserunt nam molestias, ut in veniam facilis libero sed
            distinctio laboriosam?
          </p>
        </article>
      </MaxWidthWrapper>
    </main>
  );
};

export default Post;

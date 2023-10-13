import Link from "next/link";

const Card = () => {
  return (
    <Link href="/post" className="text-current no-underline">
      <article
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1592685530107-f2227c2c6bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)",
        }}
        className="card-animation aspect-video overflow-hidden gap-[1.375rem] shrink-0 cursor-pointer shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl"
      >
        <div className="flex flex-col justify-end items-start backdrop-brightness-[60%] bg-[rgba(0,0,0,0.3)] w-full h-full px-5 py-[1.1875rem]">
          <h3 className="text-8xl max-[2500px]:text-4xl max-lg:text-lg font-black leading-[4.965rem] uppercase whitespace-nowrap w-full overflow-hidden text-ellipsis">
            Lorem Ipsum
          </h3>
          <div className="flex justify-between items-center self-stretch">
            <time className="text-white text-center text-xs not-italic font-light leading-[165.5%]">
              00/00/0000, ás 00:00
            </time>
            <div className="flex w-20 h-[1.5625rem] justify-center items-center gap-2.5 px-[2.5625rem] py-1 rounded-[0.875rem] bg-darkPurple">
              <span className="text-light text-center text-sm not-italic font-medium leading-[normal] uppercase">
                Filme
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Card;

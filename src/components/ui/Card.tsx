import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  link: string;
  title: string;
  cover: string;
  category: string;
  date: string;
  className?: string;
};

const Card = ({ ...props }: Props) => {
  return (
    <Link href={`posts/${props.link}`} className={"text-current no-underline"}>
      <article
        style={{
          backgroundImage: `url(${props.cover})`,
        }}
        className="card-animation aspect-video overflow-hidden gap-[1.375rem] shrink-0 cursor-pointer shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl"
      >
        <div
          className={cn(
            "flex flex-col justify-end items-start backdrop-brightness-[60%] bg-[rgba(0,0,0,0.3)] w-full h-full px-5 py-[1.1875rem]",
            props.className
          )}
        >
          <h3 className="text-8xl max-[2500px]:text-4xl max-lg:text-lg font-black leading-[4.965rem] uppercase whitespace-nowrap w-full overflow-hidden text-ellipsis">
            {props.title}
          </h3>
          <div className="flex justify-between items-center self-stretch">
            <time className="text-light text-center text-xs not-italic font-light leading-[165.5%]">
              {props.date}
            </time>
            <div className="flex w-20 h-[1.5625rem] justify-center items-center gap-2.5 px-[2.5625rem] py-1 rounded-[0.875rem] bg-darkPurple">
              <span className="text-light text-center text-sm not-italic font-medium leading-[normal] uppercase">
                {props.category}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Card;

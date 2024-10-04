import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  link: string;
  title: string;
  cover: string;
  category: string;
  date: string;
  className?: string;
  disabled?: boolean;
};

const Card = ({ ...props }: Props) => {
  return (
    <Link
      href={`/posts/${props.link}`}
      className={"flex justify-center w-full text-current no-underline"}
    >
      <article
        style={{
          backgroundImage: `url(${props.cover})`,
        }}
        className={cn(
          "card-animation aspect-video w-full max-w-[800px] overflow-hidden gap-5 shrink-0 cursor-pointer shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl",
          props.disabled && "opacity-30"
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-end items-start backdrop-brightness-[60%] bg-[rgba(0,0,0,0.3)] w-full h-full px-5 py-4",
            props.className
          )}
        >
          <h3 className="text-base font-extrabold md:text-3xl xl:text-4xl xl:font-black xl:leading-[5rem] uppercase whitespace-nowrap w-full overflow-hidden text-ellipsis">
            {props.title}
          </h3>
          <div className="flex justify-between items-center self-stretch">
            <time className="text-light text-center text-xs xl:text-base not-italic font-light leading-5">
              {props.date}
            </time>
            <div className="flex w-20 h-6 justify-center items-center gap-2.5 px-10 py-1 rounded-2xl bg-darkPurple">
              <span className="text-light text-center text-xs xl:text-base not-italic font-medium uppercase">
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

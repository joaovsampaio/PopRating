import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const PostLoadingSkeleton = () => {
  return (
    <main className="flex-1 flex justify-center my-8">
      <MaxWidthWrapper className="flex flex-col items-center w-[49rem] gap-8">
        <div className="flex flex-col items-center w-fit">
          <div className="animate-pulse w-24 h-5 lg:w-44 lg:h-7 rounded-full bg-neutral-600" />
        </div>
        <div className="flex flex-col w-full mt-11 gap-4">
          <div className="flex justify-between">
            <div className="animate-pulse w-24 h-5 lg:w-44 lg:h-7 rounded-full bg-neutral-600" />
            <div className="animate-pulse w-24 h-5 lg:w-44 lg:h-7 rounded-full bg-neutral-600" />
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-0  justify-between">
            <div className="animate-pulse w-24 h-5 lg:w-44 lg:h-7 rounded-full bg-neutral-600" />
            <div className="animate-pulse w-24 h-5 lg:w-44 lg:h-7 rounded-full bg-neutral-600" />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <div className="animate-pulse bg-neutral-600 aspect-video relative w-4/5" />
        </div>

        <div className="grid grid-cols-8 gap-2 items-center w-full">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((id) => (
            <div className="animate-pulse w-full h-4 rounded-full bg-neutral-600" />
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default PostLoadingSkeleton;

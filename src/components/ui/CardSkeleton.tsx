const CardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((id) => (
        <div
          key={id}
          className="animate-pulse bg-neutral-800 aspect-video overflow-hidden shrink-0 cursor-pointer shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl"
        >
          <div className="flex flex-col justify-end items-start w-full h-full px-5 py-[1.1875rem]">
            <div className="w-44 h-7 rounded-full bg-neutral-600" />
            <div className="flex justify-between items-center self-stretch">
              <div className="w-32 h-5 rounded-full bg-neutral-600" />
              <div className="flex w-20 h-[1.5625rem] justify-center items-center gap-2.5 px-[2.5625rem] py-1 rounded-[0.875rem] bg-neutral-600" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;

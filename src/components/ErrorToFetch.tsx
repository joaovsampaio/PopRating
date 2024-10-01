"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import Scared from "../../public/scared_actress.png";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

const ErrorToFetch = () => {
  const router = useRouter();

  return (
    <MaxWidthWrapper className="h-screen">
      <div className="flex flex-col h-full items-center justify-center p-5">
        <div className="flex flex-col items-center justify-center  lg:w-1/3 h-44 bg-primary-100 rounded-md">
          <h2 className="bg-secondary-900 text-neutral-100 py-2 px-4 rounded-sm uppercase">
            Ocorreu Um Erro!
          </h2>
          <Image
            className="w-[300px] h-[300px]"
            alt="Scared"
            aria-hidden={true}
            src={Scared}
            quality={100}
          />
          <button
            onClick={() => router.refresh()}
            className="flex gap-2 items-center focus:outline-none bg-secondary-700 hover:bg-secondary-900 focus:ring-4 focus:ring-secondary-200 rounded-md text-sm px-5 py-2.5"
          >
            Tentar Novamente
            <RefreshCcw />
          </button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ErrorToFetch;

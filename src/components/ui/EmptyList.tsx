"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { RefreshCcwIcon } from "lucide-react";
import ScaredAcctress from "../../../public/scared_actress.webp";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

type Props = {
  errorText?: string;
  btnText?: string;
  btnIcon?: ReactNode;
  btnHidden?: boolean;
  srcImage?: string | StaticImport;
  onClick?: () => void;
};

const EmptyList = ({ ...props }: Props) => {
  const router = useRouter();

  const navigateHome = () => {
    return router.replace("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-[500px]">
      <div className="flex flex-col items-center justify-center lg:w-1/3 h-44 bg-primary-100 rounded-md">
        <h2 className="bg-secondary-900 text-neutral-100 py-2 px-4 rounded-sm uppercase">
          {props.errorText || "Ocorreu Um Erro!"}
        </h2>
        <Image
          className="w-[300px] h-[300px]"
          alt=""
          aria-hidden={true}
          src={props.srcImage || ScaredAcctress}
          quality={100}
        />
        <Button
          onClick={props.onClick || navigateHome}
          hidden={props.btnHidden}
          variant={"secondary"}
          className="gap-1"
        >
          {props.btnText || "Tente Novameente"}
          {props.btnIcon || <RefreshCcwIcon width={14} height={14} />}
        </Button>
      </div>
    </div>
  );
};

export default EmptyList;

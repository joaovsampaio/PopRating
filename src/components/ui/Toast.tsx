"use client";

import { Dispatch, SetStateAction } from "react";
import * as Toast from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

type Props = {
  title: string;
  description: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  error: boolean;
};

function CustomToast({ title, description, open, setOpen, error }: Props) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={cn(
          "bg-primary rounded-md shadow-md shadow-slate-800 p-2",
          error && "bg-red-500"
        )}
        open={open}
        onOpenChange={setOpen}
        onClick={() => setOpen(false)}
      >
        <Toast.Title
          className={cn(
            "text-light text-2xl font-medium",
            error && "text-light"
          )}
        >
          {!error ? (
            title
          ) : (
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-light" />
              Algo Deu Errado
            </span>
          )}
        </Toast.Title>
        <Toast.Description className={cn("text-light/90", error && "hidden")}>
          {description}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}
export default CustomToast;

import React, { ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  action: () => any;
  actionText: string;
  actionButtonStyle?: string;
  cancelTextStyle?: string;
  title: string;
  description: string;
};

const Dialog = ({ ...props }: Props) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{props.children}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-[#0000006b] fixed inset-0" />
      <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-100 p-[25px] shadow-black focus:outline-none">
        <AlertDialog.Title className="text-neutral-900 m-0 text-[17px] font-medium">
          {props.title}
        </AlertDialog.Title>
        <AlertDialog.Description className="text-neutral-800 mt-4 mb-5 text-[15px] leading-normal">
          {props.description}
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button
              className={cn(
                "text-neutral-800 bg-neutral-200 hover:bg-neutral-400 focus:shadow-black inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none",
                props.cancelTextStyle
              )}
            >
              Cancelar
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={props.action}
              className={cn(
                "text-neutral-900 bg-error-500 hover:bg-error-600 focus:shadow-red-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none",
                props.actionButtonStyle
              )}
            >
              {props.actionText}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default Dialog;

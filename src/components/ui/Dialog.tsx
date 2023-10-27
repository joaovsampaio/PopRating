import React, { ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

type Props = {
  children: ReactNode;
  action: () => any;
  actionText: string;
  title: string;
  description: string;
};

const Dialog = ({ ...props }: Props) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{props.children}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-[#0000002f] fixed inset-0" />
      <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-100 p-[25px] shadow-black focus:outline-none">
        <AlertDialog.Title className="text-slate-800 m-0 text-[17px] font-medium">
          {props.title}
        </AlertDialog.Title>
        <AlertDialog.Description className="text-slate-600 mt-4 mb-5 text-[15px] leading-normal">
          {props.description}
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-slate-600 bg-slate-300 hover:bg-slate-400 focus:shadow-black inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none">
              Cancelar
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={props.action}
              className="text-red-700 bg-red-200 hover:bg-red-300 focus:shadow-red-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none"
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

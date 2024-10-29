import React, { ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "./Button";

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
      <AlertDialog.Overlay className="bg-[#0000006b] fixed inset-0" />
      <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-100 p-[25px] shadow-black focus:outline-none">
        <AlertDialog.Title className="text-neutral-900 m-0 text-[17px] font-medium">
          {props.title}
        </AlertDialog.Title>
        <AlertDialog.Description className="text-neutral-800 mt-4 mb-5 text-[15px] leading-normal">
          {props.description}
        </AlertDialog.Description>
        <div className="flex flex-col md:flex-row justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <Button className="bg-neutral-200 hover:bg-neutral-400 text-neutral-800 hover:text-neutral-900">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button variant={"destructive"} onClick={props.action}>
              {props.actionText}
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default Dialog;

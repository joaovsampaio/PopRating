"use client";

import { signOut } from "next-auth/react";
import { LogOut as LogOutIcon } from "lucide-react";
import Dialog from "./Dialog";

const BtnLogout = () => {
  const disconnect = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div>
      <Dialog
        title="Sair da Conta?"
        description="Não será possível postar um novo conteúdo."
        action={() => disconnect()}
        actionText="Sim, sair da conta."
      >
        <button className="flex px-5 py-2.5 text-xs lg:text-sm gap-2 items-center focus:outline-none bg-error-600 hover:bg-error-500 focus:ring-4 focus:ring-red-300 rounded-md">
          <LogOutIcon className="w-5 h-5" />
          Sair da Conta
        </button>
      </Dialog>
    </div>
  );
};

export default BtnLogout;

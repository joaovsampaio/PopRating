"use client";

import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import Dialog from "./Dialog";
import { Button } from "./Button";

const BtnLogout = () => {
  const disconnect = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <Dialog
      title="Sair da Conta?"
      description="Não será possível postar um novo conteúdo."
      action={() => disconnect()}
      actionText="Sim, sair da conta."
    >
      <Button variant="destructive">
        <LogOutIcon className="w-5 h-5 mr-2" />
        Sair da Conta
      </Button>
    </Dialog>
  );
};

export default BtnLogout;

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import Dialog from "./Dialog";

const BtnLogin = () => {
  const { data: session } = useSession();

  const disconnect = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div>
      {session ? (
        <Dialog
          title="Sair da Conta?"
          description="Não será possível postar um novo conteúdo."
          action={() => disconnect()}
          actionText="Sim, sair da conta."
        >
          <button className="flex gap-2 items-center focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-md text-sm px-5 py-2.5">
            <LogOut />
            Sair da Conta
          </button>
        </Dialog>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="flex gap-2 items-center focus:outline-none bg-secondary hover:bg-secondary/80 focus:ring-4 focus:ring-secondary/50 rounded-md text-sm px-5 py-2.5"
        >
          <User />
          Login
        </button>
      )}
    </div>
  );
};

export default BtnLogin;

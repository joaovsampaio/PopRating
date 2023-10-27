"use client";

import { Pencil, Trash } from "lucide-react";
import Dialog from "./Dialog";

type Props = {
  id: string;
};

const UserOptions = ({ id }: Props) => {
  const deletePost = async () => {
    await fetch(`/api/crud/${id}`, { method: "DELETE" });
    window.location.href = "/";
  };

  const editPost = async (): Promise<void> => {
    window.location.href = `/form/${id}`;
  };

  return (
    <div className="flex gap-2">
      <Dialog
        title="Excluir Crítica?"
        description="Esta ação não pode ser desfeita. Isto irá deletar permanentemente esta
          crítica."
        action={() => deletePost()}
        actionText="Sim, deletar crítica."
      >
        <button title="Exluir">
          <Trash
            aria-hidden={true}
            className="text-red-600 hover:bg-red-300 rounded-full"
          />
        </button>
      </Dialog>

      <button title="Editar" onClick={() => editPost()}>
        <Pencil
          aria-hidden={true}
          className="text-accent hover:bg-accent/50 rounded-full"
        />
      </button>
    </div>
  );
};

export default UserOptions;

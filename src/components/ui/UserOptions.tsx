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
        <button
          title="Exluir"
          className="text-error-600 hover:bg-error-500/20 p-2 rounded-full"
        >
          <Trash aria-hidden={true} />
        </button>
      </Dialog>

      <button
        title="Editar"
        onClick={() => editPost()}
        className="text-accent-500 hover:bg-accent-500/20 p-2 rounded-full"
      >
        <Pencil aria-hidden={true} />
      </button>
    </div>
  );
};

export default UserOptions;

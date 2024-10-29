"use client";

import { PencilIcon, TrashIcon } from "lucide-react";
import Dialog from "./Dialog";
import { Button } from "./Button";

type Props = {
  id: string;
};

const UserOptions = ({ id }: Props) => {
  const deletePost = async () => {
    await fetch(`/api/crud/${id}`, { method: "DELETE" });
    window.location.href = "/protected/profile";
  };

  const editPost = async (): Promise<void> => {
    window.location.href = `/protected/form/${id}`;
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
        <Button
          title="Exluir"
          variant={"ghost"}
          size={"icon"}
          className="text-error-600 hover:bg-error-500/20 hover:text-error-600 p-2 rounded-full"
        >
          <TrashIcon aria-hidden={true} />
        </Button>
      </Dialog>

      <Button
        variant={"ghost"}
        size={"icon"}
        title="Editar"
        onClick={() => editPost()}
        className="text-accent-500 hover:bg-accent-500/20 hover:text-accent-500 p-2 rounded-full"
      >
        <PencilIcon aria-hidden={true} />
      </Button>
    </div>
  );
};

export default UserOptions;

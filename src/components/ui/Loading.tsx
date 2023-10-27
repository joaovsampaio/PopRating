"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
};

const Loading = ({ className }: Props) => {
  return (
    <div className="flex justify-center">
      <Loader2
        className={cn(
          "w-8 h-8 mr-2 text-light animate-spin fill-transparent",
          className
        )}
      />
    </div>
  );
};

export default Loading;

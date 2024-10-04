import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("mx-2 lg:mx-20", className)}>{children}</div>;
};

export default MaxWidthWrapper;

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("mx-20 max-lg:mx-2 ", className)}>{children}</div>;
};

export default MaxWidthWrapper;

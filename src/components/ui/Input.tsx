import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {};
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-primary-500 ring-offset-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm border p-1 mt-2 text-2xl text-neutral-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "min-h-[400px] border-primary-500 ring-offset-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm border p-1 mt-2 text-2xl text-neutral-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
TextArea.displayName = "TextArea";

export { Input, TextArea };

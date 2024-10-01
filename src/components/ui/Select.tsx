"use client";

import { forwardRef, useRef } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  setSelectCategory: (category: any) => void;
};

const SelectCategory = ({ setSelectCategory }: Props) => {
  const categories = ["Filme", "Série", "Livro", "Música"];

  const valueRef = useRef<HTMLSpanElement>(null);

  return (
    <Select.Root
      onValueChange={() => setSelectCategory(valueRef.current?.innerHTML)}
    >
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] leading-none h-[35px] gap-[5px] bg-neutral-100 text-neutral-900 shadow-[0_2px_10px] shadow-neutral-900/10 hover:bg-neutral-200 focus:shadow-[0_0_0_2px] focus:shadow-neutral-900 data-[placeholder]:text-neutral-900 outline-none"
        aria-label="Categoria"
      >
        <Select.Value placeholder="Categoria" ref={valueRef} />
        <Select.Icon className="text-neutral-900">
          <ChevronDown className="w-5 h-5" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-neutral-100 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-neutral-200 text-neutral-900 cursor-default">
            <ChevronUp className="w-5 h-5" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group className="flex flex-col">
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-neutral-100 text-neutral-900 cursor-default">
            <ChevronDown className="w-5 h-5" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = forwardRef(({ children, ...props }: any, forwardedRef) => {
  return (
    <Select.Item
      className="text-[13px] leading-none text-neutral-900 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-neutral-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-primary-100 data-[highlighted]:text-neutral-900"
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <Check />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectCategory.displayName = "SelectCategory";
SelectItem.displayName = "SelectItem";

export default SelectCategory;

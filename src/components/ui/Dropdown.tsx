import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "lucide-react";
import Nav from "../Nav";
import { Button } from "./Button";

function DropDown() {
  //Função necessária para o Dialog ser acionado dentro do Dropdown --> https://github.com/radix-ui/primitives/issues/1836
  //Function required for Dialog to be triggered within Dropdown --> https://github.com/radix-ui/primitives/issues/1836
  const showDialog = (e: Event) => {
    e.preventDefault();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button size={"icon"} variant={"ghost"} aria-label="Menu">
          <MenuIcon className="h-6 w-6 text-primary-500" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-secondary-900 border rounded-md border-darkPurple p-3 lg:hidden">
          <DropdownMenu.Item onSelect={(e) => showDialog(e)}>
            <Nav />
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-darkPurple" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default DropDown;

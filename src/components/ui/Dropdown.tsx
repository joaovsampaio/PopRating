import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import Nav from "../Nav";

function DropDown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Menu">
          <Menu className="h-6 w-6 text-primary" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-secondary border rounded-md border-purple-800 p-3 lg:hidden">
          <DropdownMenu.Item>
            <Nav />
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-purple-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default DropDown;

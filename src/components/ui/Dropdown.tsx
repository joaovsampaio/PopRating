import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import Nav from "../Nav";

function DropDown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Menu">
          <Menu className="h-6 w-6 text-primary-500" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-secondary-900 border rounded-md border-darkPurple p-3 lg:hidden">
          <DropdownMenu.Item>
            <Nav />
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-darkPurple" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default DropDown;

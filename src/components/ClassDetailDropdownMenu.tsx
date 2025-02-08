import { LifeBuoy, MoreVerticalIcon, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function ClassDetailDropdownMenu({
  triggerClassname,
}: {
  triggerClassname?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVerticalIcon className={cn("cursor-pointer", triggerClassname)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40"
        side="bottom"
        align="end"
        // sideOffset={4}
      >
        <DropdownMenuLabel>My Class</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ClassDetailDropdownMenu;

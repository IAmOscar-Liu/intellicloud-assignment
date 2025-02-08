import { cn } from "@/lib/utils";
import { BoxesIcon, UserCircle2Icon } from "lucide-react";

function Header({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[60px] justify-between pe-6 ps-8 shadow-md",
        className,
      )}
    >
      <div className="flex h-full items-center">
        <BoxesIcon />
        <h1 className="ms-2 text-xl">
          Class<b className="text-primary">Swift</b>
        </h1>
      </div>

      <div className="my-2 flex cursor-pointer items-center rounded-sm px-2 transition-colors hover:bg-secondary">
        <UserCircle2Icon />
        <p className="ms-2">Kevin</p>
      </div>
    </div>
  );
}

export default Header;

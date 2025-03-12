import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function TrackerOptionButton() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-2 right-2"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="not-sm:absolute not-sm:right-2">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

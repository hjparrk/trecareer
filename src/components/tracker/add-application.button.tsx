import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AddApplicationButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side="right" className="min-w-[375px]">
        <div className="max-w-2xl mx-auto">
          <SheetHeader className="p-4">
            <SheetTitle>New Application</SheetTitle>
            <SheetDescription>
              Fill details of your new application. Click add when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 p-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input id="company" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input id="position" className="col-span-3" />
            </div>
          </div>
          <SheetFooter className="p-4">
            <SheetClose asChild>
              <Button type="submit">Add application</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

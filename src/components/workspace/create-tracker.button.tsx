"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createTracker } from "@/actions/workspace.action";
import { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";

export default function CreateTrackerButton() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleTitleInput(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleDescriptionInput(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function handleClick() {
    startTransition(async () => {
      const { success, error } = await createTracker({ title, description });

      setTitle("");
      setDescription("");
      setIsDialogOpen(false);

      if (success) {
        toast("Tracker has been created", {
          description: new Date().toISOString(),
        });
      } else {
        toast(error, {
          description: new Date().toISOString(),
        });
      }
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Tracker</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Tracker</DialogTitle>
          <DialogDescription>
            Please enter a title and a brief description for the task you want
            to track.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="My tracker"
              className="col-span-3"
              value={title}
              onChange={handleTitleInput}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="This is my ..."
              className="col-span-3"
              value={description}
              onChange={handleDescriptionInput}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick} disabled={isPending || !title}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

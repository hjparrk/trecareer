"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const trackers = [
  {
    id: "1",
    title: "tracker 1",
    description: "this is tracker 1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    title: "tracker 2",
    description: "this is tracker 2",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    title: "tracker 3",
    description: "this is tracker 3",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "4",
    title: "tracker 4",
    description: "this is tracker 4",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "5",
    title: "tracker 5",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "6",
    title: "tracker 6",
    description: "this is tracker 6",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

function DropdownMenuDemo() {
  return (
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
  );
}

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-fit max-w-6xl mx-auto p-8 sm:p-12 md:p-16 lg:p-20">
      <div className="flex space-x-5 items-baseline justify-between">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          My Workspace
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">New Tracker</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Tracker</DialogTitle>
              <DialogDescription>
                Please enter a title and a brief description for the task you
                want to track.
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
        {trackers?.map((tracker) => (
          <Card
            key={`tracker-${tracker.id}`}
            onClick={() => router.push(`tracker/${tracker.id}`)}
            className="relative min-w-2xs max-w-sm hover:cursor-pointer hover:shadow-lg  transition-all duration-300"
          >
            <div
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="absolute top-2 right-2"
            >
              <DropdownMenuDemo />
            </div>
            <CardHeader>
              <CardTitle>{tracker.title}</CardTitle>
              <CardDescription>
                {tracker.description ? tracker.description : <p>&nbsp;</p>}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs">
              <p>
                {tracker.created_at.toLocaleString("en-AU", {
                  timeZone: "Australia/Sydney",
                })}
              </p>
              <p>
                {tracker.updated_at.toLocaleString("en-AU", {
                  timeZone: "Australia/Sydney",
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

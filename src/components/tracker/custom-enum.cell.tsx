import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { updateApplication } from "@/actions/tracker.action";
import {
  ApplicationStatus,
  ApplicationStatusColor,
  ApplicationStatusKey,
  Remote,
} from "@/types/application.types";
import { useEffect, useState } from "react";

export function EditableRemoteCell({
  rowId,
  trackerId,
  columnId,
  initialValue,
  rowIndex,
  updateData,
}: {
  rowId: string;
  trackerId: string;
  columnId: string;
  initialValue: Remote | null;
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
}) {
  // State management
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Remote | null>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<Remote | null>(
    initialValue
  );

  // Sync initial value
  useEffect(() => {
    setValue(initialValue);
    setDebouncedValue(initialValue);
  }, [initialValue]);

  // Update data on debounce
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (debouncedValue !== initialValue) {
        const { success, error } = await updateApplication({
          trackerId,
          rowId,
          columnId,
          value: debouncedValue,
        });

        if (!success) {
          toast(error, {
            description: new Date(Date.now()).toLocaleString(),
          });
        } else {
          updateData(rowIndex, columnId, debouncedValue);

          toast(`${columnId} has been updated`, {
            description: new Date(Date.now()).toLocaleString(),
          });
        }
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [debouncedValue, initialValue, trackerId, rowId, columnId, updateData]);

  // Options for Remote values
  const options = [
    { value: "none", label: "No Selection" },
    { value: Remote.OnSite, label: Remote.OnSite },
    { value: Remote.Hybrid, label: Remote.Hybrid },
    { value: Remote.Remote, label: Remote.Remote },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" bg-white group-hover:bg-muted shadow-none hover:cursor-pointer font-normal w-28 justify-between ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          {value ? (
            <h1>{value}</h1>
          ) : (
            <h1
              className={cn(
                "text-xs text-white",
                open ? "text-muted-foreground" : "group-hover:text-muted"
              )}
            >
              Work type
            </h1>
          )}
          <ChevronsUpDown className="opacity-30" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue =
                      currentValue === "none" ? null : (currentValue as Remote);
                    setValue(newValue);
                    setDebouncedValue(newValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      (value === null && option.value === "none") ||
                        value === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function EditableStatusCell({
  rowId,
  trackerId,
  columnId,
  initialValue,
  rowIndex,
  updateData,
}: {
  rowId: string;
  trackerId: string;
  columnId: string;
  initialValue: ApplicationStatusKey;
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
}) {
  // State management
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ApplicationStatusKey>(initialValue);
  const [debouncedValue, setDebouncedValue] =
    useState<ApplicationStatusKey>(initialValue);

  // Sync initial value
  useEffect(() => {
    setValue(initialValue);
    setDebouncedValue(initialValue);
  }, [initialValue]);

  // Update data on debounce
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (debouncedValue !== initialValue) {
        const { success, error } = await updateApplication({
          trackerId,
          rowId,
          columnId,
          value: debouncedValue,
        });

        if (!success) {
          toast(error, {
            description: new Date(Date.now()).toLocaleString(),
          });
        } else {
          updateData(rowIndex, columnId, debouncedValue);

          toast(`${columnId} has been updated`, {
            description: new Date(Date.now()).toLocaleString(),
          });
        }
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [debouncedValue, initialValue, trackerId, rowId, columnId, updateData]);

  // Options for Application Status
  const options = Object.keys(ApplicationStatus).map((statusKey) => ({
    value: statusKey as ApplicationStatusKey,
    label: ApplicationStatus[statusKey as ApplicationStatusKey],
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-52 bg-white group-hover:bg-muted shadow-none hover:cursor-pointer font-normal justify-between ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <h1
            className={`rounded-2xl w-fit px-2 py-1 ${ApplicationStatusColor[value]}`}
          >
            {ApplicationStatus[value]}
          </h1>
          <ChevronsUpDown className="opacity-30" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue as ApplicationStatusKey;
                    setValue(newValue);
                    setDebouncedValue(newValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

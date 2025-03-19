import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Calendar } from "../ui/calendar";
import { updateApplication } from "@/actions/tracker.action";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function EditableDatePickerCell({
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
  initialValue: string | null; // Expected format: YYYY-MM-DD or null
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(
    initialValue ? parseISO(initialValue) : undefined
  );
  const [debouncedValue, setDebouncedValue] = useState<string | null>(
    initialValue
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Sync initial value
  useEffect(() => {
    setDebouncedValue(initialValue);
    setDate(initialValue ? parseISO(initialValue) : undefined);
  }, [initialValue]);

  // Update data after debounce
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
    }, 1500); // Debounce API call by 1 seconds

    return () => clearTimeout(handler);
  }, [debouncedValue, initialValue, trackerId, rowId, columnId, updateData]);

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    setDebouncedValue(formattedDate); // Trigger debounce
  };

  // Render
  return (
    <Popover onOpenChange={(open) => setIsPopoverOpen(open)}>
      <PopoverTrigger asChild>
        <Button
          variant={null}
          className={cn(
            "w-44 justify-start text-left font-normal hover:cursor-pointer hover:bg-gray-100", // Hover effect added directly to the cell
            !date &&
              "text-muted-foreground hover:bg-white hover:border hover:border-border"
          )}
        >
          {date ? (
            <CalendarIcon className="h-4 w-4" />
          ) : (
            <CalendarIcon
              className={cn("h-4 w-4 hidden", isPopoverOpen && "block")}
            />
          )}
          {date ? (
            format(date, "dd MMM yyyy")
          ) : (
            <span className={cn("hidden", isPopoverOpen && "block")}>
              Pick a date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function EditableDateTimePickerCell({
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
  initialValue: string | null; // Expected format: YYYY-MM-DDTHH:mm or null
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(
    initialValue ? parseISO(initialValue) : undefined
  );
  const [debouncedValue, setDebouncedValue] = useState<string | null>(
    initialValue
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Time ranges for selection
  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 0, 5, 10...

  // Sync initial value with state
  useEffect(() => {
    setDebouncedValue(initialValue);
    setDate(initialValue ? parseISO(initialValue) : undefined);
  }, [initialValue]);

  // Debounced update to the backend
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
    }, 300); // 3-second debounce

    return () => clearTimeout(handler);
  }, [debouncedValue, initialValue, trackerId, rowId, columnId, updateData]);

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    setDebouncedValue(format(selectedDate, "yyyy-MM-dd'T'HH:mm")); // Update formatted value
  };

  // Handle time changes
  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    if (!date) return;
    const newDate = new Date(date);

    if (type === "hour") {
      const isPM = newDate.getHours() >= 12;
      newDate.setHours(
        (parseInt(value) % 12) + (isPM ? 12 : 0) // Adjust for 12-hour clock
      );
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value));
    } else if (type === "ampm") {
      const currentHours = newDate.getHours();
      newDate.setHours(
        value === "PM" ? (currentHours % 12) + 12 : currentHours % 12
      );
    }

    setDate(newDate);
    setDebouncedValue(format(newDate, "yyyy-MM-dd'T'HH:mm")); // Update formatted value
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={null}
          className={cn(
            "w-56 justify-start text-left font-normal hover:cursor-pointer",
            !date &&
              "text-muted-foreground hover:bg-white hover:border hover:border-border"
          )}
        >
          {date ? (
            <CalendarIcon className="h-4 w-4" />
          ) : (
            <CalendarIcon
              className={cn("h-4 w-4 hidden", isPopoverOpen && "block")}
            />
          )}
          {date ? (
            format(date, "dd MMM yyyy '|' hh:mm aa")
          ) : (
            <span className={cn("hidden", isPopoverOpen && "block")}>
              Pick a date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          {/* Calendar for date selection */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />

          {/* Time selection */}
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            {/* Hour selection */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      date && date.getHours() % 12 === hour % 12
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square hover:bg-gray-100" // 개별 버튼에 hover 효과 추가
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* Minute selection */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      date && date.getMinutes() === minute ? "default" : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square hover:bg-gray-100"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* AM/PM selection */}
            <ScrollArea>
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      date &&
                      ((ampm === "AM" && date.getHours() < 12) ||
                        (ampm === "PM" && date.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square hover:bg-gray-100" // 개별 버튼에 hover 효과 추가
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

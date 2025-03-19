import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { updateApplication } from "@/actions/tracker.action";
import { Button } from "@/components/ui/button";

export function EditableOptionalNumberCell({
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
  initialValue: number | null; // Allow null as initial value
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
}) {
  // State Management
  const [value, setValue] = useState<number | null>(initialValue); // Allow null
  const [debouncedValue, setDebouncedValue] = useState<number | null>(
    initialValue
  );
  const [editing, setEditing] = useState(false); // Manage edit mode

  // Sync Initial Value
  useEffect(() => {
    setValue(initialValue); // Directly sync null or number
    setDebouncedValue(initialValue);
  }, [initialValue, rowId, columnId]);

  // Update data on debounce
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (debouncedValue !== initialValue) {
        // Update DB
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
    }, 2000); // Debouncing time (2s)

    return () => clearTimeout(handler);
  }, [debouncedValue, initialValue, trackerId, rowId, columnId, updateData]);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setValue(null); // Set to null if empty
      setDebouncedValue(null);
    } else if (!isNaN(Number(newValue))) {
      setValue(Number(newValue)); // Set valid number
      setDebouncedValue(Number(newValue));
    }
  };

  // Handle blur (exit editing mode)
  const handleBlur = () => setEditing(false);

  // Handle Enter key to stop editing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setEditing(false);
    }
  };

  return editing ? (
    <Input
      type="number"
      min={0}
      max={2147483647}
      step={500}
      value={value === null ? "" : value}
      onChange={handleChange}
      onBlur={handleBlur} // Exit editing mode on blur
      onKeyDown={handleKeyDown} // Exit editing mode on Enter key
      autoFocus
      className="min-w-32 not-hover:truncate border-transparent bg-transparent shadow-none hover:border-gray-300 hover:bg-white"
    />
  ) : (
    <Button
      variant={null}
      onClick={() => setEditing(true)} // Enter editing mode on click
      className="px-3 not-hover:truncate min-w-32 cursor-text hover:bg-white hover:border hover:border-border"
    >
      {value === null ? (
        <span>&nbsp;</span>
      ) : (
        new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
          maximumFractionDigits: 0,
        }).format(value)
      )}
    </Button>
  );
}

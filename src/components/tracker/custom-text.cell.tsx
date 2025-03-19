import { updateApplication } from "@/actions/tracker.action";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export function EditableOptionalTextCell({
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
  initialValue: string;
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
}) {
  // State Management
  const [value, setValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

  // Sync Initial Value
  useEffect(() => {
    setValue(initialValue);
    setDebouncedValue(initialValue);
  }, [initialValue, rowId, columnId]);

  // Update data on debounce
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (debouncedValue.trim() !== initialValue.trim()) {
        const sanitizedValue =
          debouncedValue.trim() === "" ? null : debouncedValue.trim();

        // Update DB
        const { success, error } = await updateApplication({
          trackerId,
          rowId,
          columnId,
          value: sanitizedValue,
        });

        if (!success) {
          // Error toast
          toast(error, {
            description: new Date(Date.now()).toLocaleString(),
          });
        } else {
          // Update table data state on success
          updateData(rowIndex, columnId, sanitizedValue);

          toast(`${columnId} has been updated`, {
            description: new Date(Date.now()).toLocaleString(),
          });
        }
      }
    }, 2000); // Debouncing time (2s)

    return () => clearTimeout(handler); // Eliminate timer
  }, [debouncedValue, initialValue, trackerId, rowId, columnId, updateData]);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue); // Update input data
    setDebouncedValue(newValue); // Update debounced input data
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      className="min-w-48 not-hover:truncate border-transparent bg-transparent shadow-none hover:border-gray-300 hover:bg-white"
    />
  );
}

export function EditableTextCell({
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
  initialValue: string;
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
}) {
  // State Management
  const [value, setValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Sync Initial Value
  useEffect(() => {
    setValue(initialValue);
    setDebouncedValue(initialValue);
  }, [initialValue, rowId, columnId]);

  // Update data on debounce
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (debouncedValue.trim() === "") {
        setErrorMessage("Can't be empty"); // Show error if value is empty
        return;
      }

      setErrorMessage(""); // Clear error if value is not empty

      if (debouncedValue.trim() !== initialValue.trim()) {
        const sanitizedValue = debouncedValue.trim();
        // Update DB
        const { success, error } = await updateApplication({
          trackerId,
          rowId,
          columnId,
          value: sanitizedValue,
        });

        if (!success) {
          // Error toast
          toast(error, { description: new Date(Date.now()).toLocaleString() });
        } else {
          // Update table data state on success
          updateData(rowIndex, columnId, sanitizedValue);
          toast(`${columnId} has been updated`, {
            description: new Date(Date.now()).toLocaleString(),
          });
        }
      }
    }, 2000); // Debouncing time (2s)
    return () => clearTimeout(handler); // Eliminate timer
  }, [debouncedValue, initialValue, trackerId, rowId, columnId, updateData]);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue); // Update input data
    setDebouncedValue(newValue); // Update debounced input data
  };

  return (
    <div className="pr-2.5">
      <Input
        value={value}
        onChange={handleChange}
        className="min-w-40 placeholder:text-red-700 placeholder:font-semibold placeholder:capitalize not-hover:truncate  border-transparent bg-transparent shadow-none hover:border-gray-300 hover:bg-white"
        placeholder={errorMessage ?? errorMessage}
      />
    </div>
  );
}

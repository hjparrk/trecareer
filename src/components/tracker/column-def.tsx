import {
  Application,
  ApplicationStatus,
  ApplicationStatusColor,
  ApplicationStatusKey,
} from "@/types/application.types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { formatDateFull, formatDateShort } from "@/utils/format-date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { updateApplication } from "@/actions/tracker.action";
import { toast } from "sonner";
function EditableOptionalTextCell({
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
  updateData: (rowIndex: number, columnId: string, value: unknown) => void; // 상위 상태 업데이트 메소드
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
      className="min-w-48 truncate border-transparent bg-transparent shadow-none hover:border-gray-300 hover:bg-white"
    />
  );
}

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "company",
    header: ({ column }) => {
      let newSortDirection;
      switch (column.getIsSorted()) {
        case "asc":
          newSortDirection = true;
          break;
        case "desc":
          newSortDirection = undefined;
          break;
        default:
          newSortDirection = false;
      }

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(newSortDirection)}
        >
          Company
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-3">{row.getValue("company")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("position")}</div>
    ),
  },
  {
    accessorKey: "remote",
    header: "Remote",
    cell: ({ row }) => {
      return <div>{row.getValue("remote")}</div>;
    },
  },
  {
    accessorKey: "location",
    header: () => <h1 className="px-3">Location</h1>,
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta?.updateData!,
      };

      return <EditableOptionalTextCell {...props} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusKey: ApplicationStatusKey = row.getValue("status");
      const status = ApplicationStatus[statusKey];
      const color = ApplicationStatusColor[statusKey];

      return (
        <div className="">
          <div className={`rounded-2xl w-fit px-2 py-1 ${color}`}>{status}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "applied_at",
    header: ({ column }) => {
      let newSortDirection;
      switch (column.getIsSorted()) {
        case "asc":
          newSortDirection = true;
          break;
        case "desc":
          newSortDirection = undefined;
          break;
        default:
          newSortDirection = false;
      }

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(newSortDirection)}
        >
          Application Date
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const appliedAt: string | null = row.getValue("applied_at");

      if (appliedAt) {
        const formatted = formatDateShort(appliedAt);
        return <div className="px-3">{formatted}</div>;
      }

      return <div className="px-3"></div>;
    },
  },
  {
    accessorKey: "interview_at",
    header: ({ column }) => {
      let newSortDirection;
      switch (column.getIsSorted()) {
        case "asc":
          newSortDirection = true;
          break;
        case "desc":
          newSortDirection = undefined;
          break;
        default:
          newSortDirection = false;
      }

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(newSortDirection)}
        >
          Interview Date
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const appliedAt: string | null = row.getValue("interview_at");

      if (appliedAt) {
        const formatted = formatDateFull(appliedAt);
        return <div className="px-3">{formatted}</div>;
      }

      return <div className="px-3"></div>;
    },
  },

  {
    accessorKey: "expected_salary",
    header: "Exp. Salary",
    cell: ({ row }) => {
      const amount = parseInt(row.getValue("expected_salary"));
      if (amount) {
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
          maximumFractionDigits: 0,
        }).format(amount);

        return <div>{formatted}</div>;
      }

      return <div></div>;
    },
  },
  {
    accessorKey: "resume_version",
    header: () => <h1 className="px-3">Resume Version</h1>,
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta?.updateData!,
      };

      return <EditableOptionalTextCell {...props} />;
    },
  },
  {
    accessorKey: "hiring_manager",
    header: () => <h1 className="px-3">Hiring Manager</h1>,
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta?.updateData!,
      };

      return <EditableOptionalTextCell {...props} />;
    },
  },
  {
    accessorKey: "contact",
    header: () => <h1 className="px-3">Contact</h1>,
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta?.updateData!,
      };

      return <EditableOptionalTextCell {...props} />;
    },
  },
  {
    accessorKey: "link",
    header: () => <h1 className="px-3">Link</h1>,
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta?.updateData!,
      };

      return <EditableOptionalTextCell {...props} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                application.contact &&
                navigator.clipboard.writeText(application.contact)
              }
            >
              Copy contact
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                application.contact &&
                navigator.clipboard.writeText(application.contact)
              }
            >
              Copy contact
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                application.link &&
                navigator.clipboard.writeText(application.link)
              }
            >
              Copy link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

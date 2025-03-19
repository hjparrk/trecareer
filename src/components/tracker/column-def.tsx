import {
  Application,
  ApplicationStatusKey,
  Remote,
} from "@/types/application.types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditableOptionalTextCell, EditableTextCell } from "./custom-text.cell";
import { EditableOptionalNumberCell } from "./custom-number.cell";
import {
  EditableDatePickerCell,
  EditableDateTimePickerCell,
} from "./custom-date.cell";
import { EditableRemoteCell, EditableStatusCell } from "./custom-enum.cell";

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
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta!.updateData!,
      };

      return <EditableTextCell {...props} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "position",
    header: () => <h1 className="px-3">Position</h1>,
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta!.updateData!,
      };

      return <EditableTextCell {...props} />;
    },
  },
  {
    accessorKey: "remote",
    header: () => <h1 className="px-3">Remote</h1>,
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) as Remote,
        rowIndex: row.index,
        updateData: table.options.meta!.updateData!,
      };

      return <EditableRemoteCell {...props} />;
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
        updateData: table.options.meta!.updateData!,
      };

      return <EditableOptionalTextCell {...props} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<ApplicationStatusKey>(column.id),
        rowIndex: row.index,
        updateData: table.options.meta!.updateData!,
      };

      return <EditableStatusCell {...props} />;
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
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta!.updateData!,
      };

      return <EditableDatePickerCell {...props} />;
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
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id) ?? "",
        rowIndex: row.index,
        updateData: table.options.meta!.updateData!,
      };

      return <EditableDateTimePickerCell {...props} />;
    },
  },

  {
    accessorKey: "expected_salary",
    header: () => <h1 className="px-3">Exp. Salary</h1>,
    cell: ({ row, column, table }) => {
      const props = {
        rowId: row.original.id,
        trackerId: row.original.tracker_id,
        columnId: column.id,
        initialValue: row.getValue<string>(column.id)
          ? Number(row.getValue<string>(column.id))
          : null,
        rowIndex: row.index,
        updateData: table.options.meta!.updateData!,
      };

      return <EditableOptionalNumberCell {...props} />;
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
        updateData: table.options.meta!.updateData!,
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
        updateData: table.options.meta!.updateData!,
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
        updateData: table.options.meta!.updateData!,
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
        updateData: table.options.meta!.updateData!,
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

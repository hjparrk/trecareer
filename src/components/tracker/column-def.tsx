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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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
    header: "Location",
    cell: ({ row, column, table }) => {
      "use client";

      const initialValue = row.getValue(column.id) as string;
      const [value, setValue] = useState<string>(initialValue);

      const handleBlur = () => {
        // meta에서 updateData 호출
        table.options.meta?.updateData(row.index, column.id, value);
      };

      return (
        <Input
          className="min-w-48 truncate capitalize border-transparent bg-transparent shadow-none hover:border-gray-300 hover:bg-white"
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
        />
      );
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
    header: "Resume Version",
    cell: ({ row }) => <div>{row.getValue("resume_version")}</div>,
  },
  {
    accessorKey: "hiring_manager",
    header: "Hiring Manager",
    cell: ({ row }) => <div>{row.getValue("hiring_manager")}</div>,
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() =>
                  application.contact &&
                  navigator.clipboard.writeText(application.contact)
                }
                className="max-w-3xs truncate hover:cursor-pointer"
              >
                {row.getValue("contact")}
              </div>
            </TooltipTrigger>
            <TooltipContent>Click to copy</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() =>
                  application.link &&
                  navigator.clipboard.writeText(application.link)
                }
                className="max-w-3xs truncate hover:cursor-pointer"
              >
                {row.getValue("link")}
              </div>
            </TooltipTrigger>
            <TooltipContent>Click to copy</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
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
                application.link &&
                navigator.clipboard.writeText(application.link)
              }
            >
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                application.contact &&
                navigator.clipboard.writeText(application.contact)
              }
            >
              Copy contact method
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

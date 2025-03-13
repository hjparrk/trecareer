"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { formatDateFull, formatDateShort } from "@/utils/format-date";

enum Remote {
  OnSite = "On Site",
  Hybrid = "Hybrid",
  Remote = "Remote",
}

enum ApplicationStatus {
  NotStarted = "Not Started", // 아직 지원 준비를 시작하지 않은 상태
  InProgress = "In Progress", // 지원 준비가 진행 중인 상태
  Withdrawed = "Withdrawed", // 지원 철회 상태

  Applied = "Applied", // 지원서를 제출한 상태
  Screening = "Screening", // 서류 심사 중인 상태

  AwaitingInterview = "Awaiting Interview", // 면접 대기 중인 상태
  InterviewScheduled = "InterviewS cheduled", // 면접 일정이 확정된 상태
  InterviewCompleted = "Interview Completed", // 면접이 완료된 상태

  Offered = "Offered", // 회사에서 제안을 받은 상태
  Accepted = "Accepted", // 제안을 수락한 상태
  Rejected = "Rejected", // 불합격 상태
  OnHold = "OnHold", // 보류 중인 상태
}

const ApplicationStatusColor: Record<ApplicationStatusKey, string> = {
  NotStarted: "bg-status-gray/70", // 아직 지원 준비를 시작하지 않은 상태
  InProgress: "bg-status-gray/70", // 지원 준비가 진행 중인 상태
  Withdrawed: "bg-status-gray/70", // 지원 철회 상태

  Applied: "bg-status-blue/70", // 지원서를 제출한 상태
  Screening: "bg-status-yellow/70", // 서류 심사 중인 상태

  AwaitingInterview: "bg-status-yellow/70", // 면접 대기 중인 상태
  InterviewScheduled: "bg-status-yellow/70", // 면접 일정이 확정된 상태
  InterviewCompleted: "bg-status-yellow/70", // 면접이 완료된 상태

  Rejected: "bg-status-rose/70", // 불합격 상태

  OnHold: "bg-status-orange/70", // 보류 중인 상태

  Offered: "bg-status-green/70", // 회사에서 제안을 받은 상태
  Accepted: "bg-status-darkgreen/70", // 제안을 수락한 상태
};

type ApplicationStatusKey = keyof typeof ApplicationStatus;

type Application = {
  id: string;
  company: string;
  location?: string;
  position: string;
  remote: Remote;
  status: ApplicationStatusKey;
  applied_at?: string;
  interview_at?: string;
  expected_salary: number;
  resume_version?: string;
  hiring_manager?: string;
  contact?: string;
  link?: string;
};

const data: Application[] = [
  {
    id: "1",
    company: "Meta",
    position: "SWE",
    remote: Remote.Hybrid,
    location: "Sydney, NSW",
    status: "Accepted",
    interview_at: "2025-02-28 08:20:17.830843+00",
    expected_salary: 100_000,
  },
  {
    id: "2",
    company: "Google",
    position: "SWE II",
    remote: Remote.OnSite,
    location: "Melbourne, VIC",
    status: "Applied",
    expected_salary: 80_000,
    link: "https://www.google.comasdfasfasfdasdfasdfasd",
  },
  {
    id: "3",
    company: "Tiktok",
    remote: Remote.Remote,
    position: "Data Engineer",
    status: "AwaitingInterview",
    expected_salary: 10_000,
  },
  {
    id: "4",
    company: "Amazon AWS",
    position: "Cloud Engineer",
    remote: Remote.Hybrid,
    location: "Geelong, VIC",
    status: "Offered",
    applied_at: "2025-03-12 14:20:17.830843+00",
    expected_salary: 90_000,
  },
  {
    id: "5",
    company: "Atlassian",
    position: "Cloud Engineer II",
    remote: Remote.Hybrid,
    location: "Sydney, NSW",
    status: "InProgress",
    expected_salary: 130_000,
    hiring_manager: "Luke Sam",
    contact: "support@atlassian.com.au",
  },
];

const columns: ColumnDef<Application>[] = [
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
    cell: ({ row }) => <div>{row.getValue("remote")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("location")}</div>
    ),
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
      const amount = parseFloat(row.getValue("expected_salary"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div>{formatted}</div>;
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
            <DropdownMenuItem>Update application</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TrackingTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* Search Filter */}
        <Input
          placeholder="Filter company..."
          value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("company")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Column Visibility Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="group">
                {headerGroup.headers.map((header, headerIndex) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative first:sticky first:left-0 first:z-1 last:sticky last:right-0 last:z-1 bg-muted"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {headerIndex === 0 && (
                        <div className="absolute top-0 right-0 h-full border-r mr-2"></div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="group">
                  {row.getVisibleCells().map((cell, columnIndex) => (
                    <TableCell
                      key={cell.id}
                      className="relative first:sticky first:left-0 first:z-1 last:sticky last:right-0 last:z-1 bg-white group-hover:bg-muted"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {columnIndex === 0 && (
                        <div className="absolute top-0 right-0 h-full border-r mr-2"></div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 ml-2 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} application(s) in display.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

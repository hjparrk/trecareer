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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
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
import { formatDateShort } from "@/utils/format-date";

enum ApplicationStatus {
  NotStarted = "Not Started", // 아직 지원 준비를 시작하지 않은 상태
  InProgress = "In Progress", // 지원 준비가 진행 중인 상태
  Applied = "Applied", // 지원서를 제출한 상태
  Screening = "Screening", // 서류 심사 중인 상태
  AwaitingInterview = "Awaiting Interview", // 면접 대기 중인 상태
  InterviewScheduled = "InterviewS cheduled", // 면접 일정이 확정된 상태
  InterviewCompleted = "Interview Completed", // 면접이 완료된 상태
  Offered = "Offered", // 회사에서 제안을 받은 상태
  Accepted = "Accepted", // 제안을 수락한 상태
  Rejected = "Rejected", // 불합격 상태
  Withdrawed = "Withdrawed", // 지원 철회 상태
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
  position: string;
  status: ApplicationStatusKey; // label 값을 사용
  expected_salary: number;
  applied_at?: string;
  link?: string;
  hiring_manager?: string;
  contact?: string;
};

const data: Application[] = [
  {
    id: "1",
    company: "Meta",
    position: "SWE",
    status: "Accepted",
    expected_salary: 100_000,
  },
  {
    id: "2",
    company: "Google",
    position: "SWE II",
    link: "https://www.google.comasdfasfasfdasdfasdfasd",
    status: "Applied",
    expected_salary: 80_000,
  },
  {
    id: "3",
    company: "Tiktok",
    position: "Data Engineer",
    status: "AwaitingInterview",
    expected_salary: 10_000,
  },
  {
    id: "4",
    company: "Amazon AWS",
    position: "Cloud Engineer",
    status: "Offered",
    applied_at: "2025-03-12 14:20:17.830843+00",
    expected_salary: 90_000,
  },
  {
    id: "5",
    company: "Atlassian",
    position: "Cloud Engineer II",
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
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase px-3">{row.getValue("company")}</div>
    ),
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusKey: ApplicationStatusKey = row.getValue("status");
      const status = ApplicationStatus[statusKey];
      const color = ApplicationStatusColor[statusKey];

      return (
        <div className={`capitalize rounded-2xl w-fit px-2 py-1 ${color}`}>
          {status}
        </div>
      );
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
    accessorKey: "applied_at",
    header: "Application date",
    cell: ({ row }) => {
      const appliedAt: string | null = row.getValue("applied_at");

      if (appliedAt) {
        const formatted = formatDateShort(appliedAt);
        return <div>{formatted}</div>;
      }

      return <div></div>;
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
                className="max-w-3xs truncate"
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
                className="max-w-3xs truncate"
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

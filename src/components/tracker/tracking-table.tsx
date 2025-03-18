"use client";

import { useEffect, useState } from "react";
import { columns } from "@/components/tracker/column-def";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
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
import { Application } from "@/types/application.types";
import { AddApplicationButton } from "./add-application.button";
import { getAllApplications } from "@/actions/tracker.action";

declare module "@tanstack/react-table" {
  // @typescript-eslint/no-unused-vars
  interface TableMeta<TData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export default function TrackingTable({
  trackerId,
  initialData,
  initalTotalRows,
}: {
  trackerId: string;
  initialData: Application[];
  initalTotalRows: number;
}) {
  const [data, setData] = useState<Application[]>(initialData);
  const [totalRows, setTotalRows] = useState<number>(initalTotalRows);
  const [cache, setCache] = useState<Record<number, Application[]>>({});

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    rowCount: totalRows,
    pageCount: Math.ceil(totalRows / pagination.pageSize),
    meta: {
      updateData, // meta를 통해 전달
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  useEffect(() => {
    fetchData(pagination.pageIndex);
  }, [pagination.pageIndex]);

  const fetchData = async (pageIndex: number) => {
    if (cache[pageIndex]) {
      setData(cache[pageIndex]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getAllApplications(trackerId, pageIndex);
      const { data, totalRows } = response;

      setCache((prevCache) => ({
        ...prevCache,
        [pageIndex]: data,
      }));
      setData(data);
      setTotalRows(totalRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onAddApplication = async (newApplications: Application[]) => {
    setData((prevApplications) => {
      const updatedApplications = [...newApplications, ...prevApplications];

      // 캐시 업데이트
      setCache((prevCache) => {
        const updatedCache = { ...prevCache };
        const lastPageIndex = Math.ceil(updatedApplications.length / 10) - 1;

        if (updatedCache[lastPageIndex]) {
          updatedCache[lastPageIndex] = [
            ...updatedCache[lastPageIndex],
            ...newApplications,
          ];
        }
        return updatedCache;
      });

      return updatedApplications; // 상태 반영
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
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
        <div className="flex sm:space-x-2">
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
          <AddApplicationButton
            trackerId={trackerId}
            onAddApplication={onAddApplication}
          />
        </div>
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
        <div className="hidden sm:block flex-1 ml-2 text-sm text-muted-foreground">
          total {totalRows} application(s).
        </div>
        <div className="flex items-center space-x-2 lg:space-x-8">
          {/* Pagination Info */}
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setPagination({ ...pagination, pageIndex: 0 })}
              disabled={isLoading || pagination.pageIndex === 0}
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: Math.max(0, pagination.pageIndex - 1),
                })
              }
              disabled={isLoading || pagination.pageIndex === 0}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: Math.min(
                    table.getPageCount() - 1,
                    pagination.pageIndex + 1
                  ),
                })
              }
              disabled={
                isLoading || pagination.pageIndex >= table.getPageCount() - 1
              }
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: table.getPageCount() - 1,
                })
              }
              disabled={
                isLoading || pagination.pageIndex >= table.getPageCount() - 1
              }
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

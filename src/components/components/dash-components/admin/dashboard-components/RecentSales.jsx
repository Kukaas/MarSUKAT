import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import TableLoading from "./loading-components/TableLoading";
import axios from "axios";

const RecentSales = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchRencentOrders = async () => {
    try {
      const res = await axios.get(
        "https://garments.kukaas.tech/api/v1/order/recent"
      );

      const data = res.data.orders;
      if (res.status === 200) {
        setRecentOrders(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    fetchRencentOrders();
  }, []);

  const columns = [
    {
      accessorKey: "studentName",
      header: "Name",
    },
    {
      accessorKey: "receipt",
      header: "Receipt",
      cell: ({ row }) => (
        <a target="_blank" rel="noopener noreferrer">
          <img
            src={row.getValue("receipt")}
            alt="Receipt"
            style={{ width: "50px", height: "50px" }}
          />
        </a>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  const table = useReactTable({
    data: recentOrders,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const rowsPerPage = 3;

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.floor(table.getRowModel().rows.length / rowsPerPage)
      )
    );
  };

  const displayedRows = table
    .getRowModel()
    .rows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        {loading ? (
          <div className="space-y-3 p-2">
            <TableLoading />
            <TableLoading />
            <TableLoading />
            <TableLoading />
            <TableLoading />
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {displayedRows.length ? (
                displayedRows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={
              (currentPage + 1) * rowsPerPage >= table.getRowModel().rows.length
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;
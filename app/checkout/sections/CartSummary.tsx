"use client";

import { useShallow } from "zustand/shallow";
import { useCartStore } from "../../_providers/StoreProvider";
import { ProductDef } from "@/lib/definitions";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns: ColumnDef<ProductDef>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Unit Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total (NGN)",
  },
];

const CartSummary = () => {
  const { cart, getSummary } = useCartStore(
    useShallow(({ cart, getSummary }) => ({ cart, getSummary }))
  );

  const products = cart.map(({ product, count }) => ({
    ...product,
    quantity: count,
    total: count * product.price,
  }));

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // if cart is empty
  if (!(cart.length > 0)) {
    return (
      <p className="text-center font-semibold text-2xl md:text-4xl">
        {" "}
        No item in cart
      </p>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell>Grand Total</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell> (NGN){getSummary().price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div></div>
    </div>
  );
};

export default CartSummary;

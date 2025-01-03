"use client";

import { useShallow } from "zustand/shallow";
import { useAppStore } from "../../_providers/StoreProvider";
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
import { useEffect, useState } from "react";
import { createAppStore } from "@/app/_stores/cart-store";

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
  const { cart, } = useAppStore(
    useShallow(({ cart, getSummary }) => ({ cart, getSummary }))
  );

  const [products, setProducts] = useState<ProductDef[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unSu = createAppStore().subscribe(
      (state) => state.cart,
      (cart) => {
        setTotal(
          cart.reduce((acc, item) => acc + item.product.price * item.count, 0)
        );
        setProducts(
          cart.map(({ product, count }) => ({
            ...product,
            quantity: count,
            total: count * product.price,
          }))
        );
      },
      {
        fireImmediately: true,
      }
    );

    return unSu;
    //   const p = cart.map(({ product, count }) => ({
    //   ...product,
    //   quantity: count,
    //   total: count * product.price,
    // }))
    // setProducts(p);
  }, [cart]);

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
            <TableCell> (NGN){total.toFixed(2)}</TableCell>
            {/* <TableCell> (NGN){getSummary().price.toFixed(2)}</TableCell> */}
          </TableRow>
        </TableBody>
      </Table>

      <div></div>
    </div>
  );
};

export default CartSummary;

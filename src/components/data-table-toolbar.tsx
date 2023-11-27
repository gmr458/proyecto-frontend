"use client";

import { Table } from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export type Column = {
    key: string;
    placeholder: string;
};

interface DataTableToolbarProps<TData> {
    table?: Table<TData>;
    columnsToFilter: Column[];
}

export function DataTableToolbar<TData>({ table, columnsToFilter }: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center">
            <div className="flex flex-1 items-center justify-between gap-5">
                <div className="flex flex-1 items-center space-x-2">
                    <FilterIcon className="h-4 w-4 text-muted-foreground" />
                    {columnsToFilter.map((column) => (
                        <Input
                            key={column.key}
                            placeholder={column.placeholder}
                            value={(table?.getColumn(column.key)?.getFilterValue() as string) ?? ""}
                            onChange={(event) => table?.getColumn(column.key)?.setFilterValue(event.target.value)}
                            className="h-8 w-[120px] lg:w-[220px]"
                        />
                    ))}
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table?.previousPage()}
                        disabled={!table?.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table?.nextPage()}
                        disabled={!table?.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
}

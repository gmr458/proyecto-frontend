"use client";

import { DataTable } from "@/components/data-table";
import { Column, DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiGetMyAssignedTasks } from "@/lib/fetch/tasks";
import { Task } from "@/lib/schemas/task";
import { MoreHorizontalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { columns } from "@/app/tasks/columns";

export default function AssignedTasksPage() {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            if (session?.user.token) {
                const {
                    data: { tasks },
                } = await apiGetMyAssignedTasks(session?.user.token);

                setLoadingData(false);
                setTasks(tasks);
            } else {
                setLoadingData(true);
            }
        }

        fetchData();
    }, [session?.user.token]);

    const memoizedColumns = useMemo(() => {
        return [
            ...columns,
            {
                id: "actions",
                cell: ({ row }) => {
                    const task = row.original;

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menú</span>
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.titulo.toString())}>
                                    Copiar titulo
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(task.empleado_email.toString())}
                                >
                                    Copiar empleado email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(task.creador_email.toString())}
                                >
                                    Copiar creador email
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ];
    }, []);

    const columnsToFilter: Column[] = [
        { key: "titulo", placeholder: "Filtrar titulos..." },
        { key: "creador_email", placeholder: "Filtrar email creadores..." },
    ];

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 px-8 md:flex">
            <DataTable
                columns={memoizedColumns.filter((col) => col.accessorKey !== "empleado_email")}
                data={tasks}
                loadingData={loadingData}
            >
                <DataTableToolbar columnsToFilter={columnsToFilter} />
            </DataTable>
        </div>
    );
}

"use client";

import { columns } from "@/app/tasks/columns";
import { DataTable } from "@/components/data-table";
import { Column, DataTableToolbar } from "@/components/data-table-toolbar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { apiDeleteTaskById, apiGetAllTasks } from "@/lib/fetch/tasks";
import { Task } from "@/lib/schemas/task";
import { MoreHorizontalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function AllTasksPage() {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loadingDataTable, setLoadingDataTable] = useState<boolean>(true);
    const [errorDataTable, setErrorDataTable] = useState<string | null>(null);
    const { toast } = useToast();

    const deleteRow = useCallback(
        async (id: number) => {
            try {
                const response = await apiDeleteTaskById(id, session?.user.token);
                const updatedTasks = tasks.filter((row) => row.id !== id);
                setTasks(updatedTasks);
                toast({ description: response.msg });
            } catch (err: any) {
                console.error(err);
                const message = "Error al intentar eliminar la tarea, intenta más tarde.";
                toast({ variant: "destructive", description: message });
            }
        },
        [tasks, toast, session?.user.token],
    );

    useEffect(() => {
        async function fetchData() {
            if (session?.user.token) {
                try {
                    const {
                        data: { tasks },
                    } = await apiGetAllTasks(session?.user.token);

                    setLoadingDataTable(false);
                    setTasks(tasks);
                } catch (err: any) {
                    console.error(err);
                    const message = "Error intentando obtener las tareas, intenta más tarde.";
                    setLoadingDataTable(false);
                    setErrorDataTable(message);
                    toast({ variant: "destructive", description: message });
                }
            } else {
                setLoadingDataTable(true);
            }
        }

        fetchData();
    }, [session?.user.token, toast]);

    const memoizedColumns = useMemo(() => {
        return [
            ...columns,
            {
                id: "actions",
                cell: ({ row }) => {
                    const task = row.original;

                    return (
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Abrir menú</span>
                                        <MoreHorizontalIcon className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => navigator.clipboard.writeText(task.titulo.toString())}
                                    >
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
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <Button asChild variant="destructive">
                                        <AlertDialogAction onClick={() => deleteRow(task.id)}>
                                            Eliminar
                                        </AlertDialogAction>
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    );
                },
            },
        ];
    }, [deleteRow]);

    const columnsToFilter: Column[] = [
        { key: "titulo", placeholder: "Filtrar titulos..." },
        { key: "empleado_email", placeholder: "Filtrar email empleados..." },
        { key: "creador_email", placeholder: "Filtrar email creadores..." },
    ];

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 px-8 md:flex">
            <DataTable columns={memoizedColumns} data={tasks} loadingData={loadingDataTable} error={errorDataTable}>
                <DataTableToolbar columnsToFilter={columnsToFilter} />
            </DataTable>
        </div>
    );
}

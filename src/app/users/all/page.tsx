"use client";

import { columns } from "@/app/users/columns";
import { DataTable } from "@/components/data-table";
import { Column, DataTableToolbar } from "@/components/data-table-toolbar";
import { ToastErrorMessage, ToastSuccessMessage } from "@/components/toast-message";
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
import { HttpError, apiDeleteUserById, apiGetAllUsers } from "@/lib/fetch";
import { User } from "@/lib/schemas/user";
import { CopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function AllUsersPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [loadingDataTable, setLoadingDataTable] = useState<boolean>(true);
    const [errorDataTable, setErrorDataTable] = useState<string | null>(null);
    const { toast } = useToast();

    const deleteRow = useCallback(
        async (id: number) => {
            try {
                const response = await apiDeleteUserById(id, session?.user.token);
                const updatedUsers = users.filter((row) => row.id !== id);
                setUsers(updatedUsers);
                toast({ description: <ToastSuccessMessage message={response.msg} /> });
            } catch (err: any) {
                console.error(err);
                let message = "Error al intentar eliminar la tarea, intenta más tarde.";

                if (err instanceof HttpError && err.body?.detail.msg) {
                    message = err.body.detail.msg;
                }

                toast({ variant: "destructive", description: <ToastErrorMessage message={message} /> });
            }
        },
        [users, toast, session?.user.token],
    );

    useEffect(() => {
        async function fetchData() {
            if (session?.user.token) {
                try {
                    const {
                        data: { users },
                    } = await apiGetAllUsers(session.user.token);

                    setLoadingDataTable(false);
                    setUsers(users);
                } catch (err: any) {
                    console.error(err);
                    const message = "Error intentando obtener los usuarios, intenta más tarde.";
                    setLoadingDataTable(false);
                    setErrorDataTable(message);
                    toast({ variant: "destructive", description: <ToastErrorMessage message={message} /> });
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menú</span>
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigator.clipboard.writeText(task.email.toString());
                                        toast({
                                            description: <ToastSuccessMessage message="Email copiado" />,
                                        });
                                    }}
                                    className="flex flex-row items-center"
                                >
                                    <CopyIcon className="mr-2 h-4 w-4" />
                                    <span>Copiar email</span>
                                </DropdownMenuItem>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                            className="flex flex-row items-center"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <TrashIcon className="mr-2 h-4 w-4" />
                                            <span>Eliminar</span>
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
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
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ];
    }, [deleteRow, toast]);

    const columnsToFilter: Column[] = [
        { key: "nombre", placeholder: "Filtrar nombres..." },
        { key: "apellido", placeholder: "Filtrar apellidos..." },
        { key: "email", placeholder: "Filtrar emails..." },
        { key: "phone_number", placeholder: "Filtrar teléfonos..." },
    ];

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 px-8 md:flex">
            <DataTable columns={memoizedColumns} data={users} loadingData={loadingDataTable} error={errorDataTable}>
                <DataTableToolbar columnsToFilter={columnsToFilter} />
            </DataTable>
        </div>
    );
}

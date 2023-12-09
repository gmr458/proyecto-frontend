"use client";

import { columns } from "@/app/tasks/columns";
import { DataTable } from "@/components/data-table";
import { Column, DataTableToolbar } from "@/components/data-table-toolbar";
import { Observations } from "@/components/observations";
import TaskForm from "@/components/task-form";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { apiChangeTaskStatusById, apiDeleteTaskById, apiGetAllTasks } from "@/lib/fetch/tasks";
import { Task } from "@/lib/schemas/task";
import {
    CheckCircleIcon,
    CircleIcon,
    CopyIcon,
    MoreHorizontalIcon,
    PencilIcon,
    RotateCwIcon,
    TrashIcon,
    EyeIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function AllTasksPage() {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loadingDataTable, setLoadingDataTable] = useState<boolean>(true);
    const [errorDataTable, setErrorDataTable] = useState<string | null>(null);
    const { toast } = useToast();

    const changeStatus = useCallback(
        async (id: number, status: "sin_iniciar" | "en_proceso" | "ejecutada") => {
            try {
                const response = await apiChangeTaskStatusById(id, status, session?.user.token);
                const updatedTasks = tasks.map((task) => (task.id === response.tarea.id ? response.tarea : task));
                setTasks(updatedTasks);
                toast({ description: <ToastSuccessMessage message={response.msg} /> });
            } catch (err: any) {
                console.error(err);
                const message = "Error al intentar cambiar el estado de la tarea, intenta más tarde.";
                toast({ variant: "destructive", description: <ToastErrorMessage message={message} /> });
            }
        },
        [tasks, toast, session?.user.token],
    );

    const deleteRow = useCallback(
        async (id: number) => {
            try {
                const response = await apiDeleteTaskById(id, session?.user.token);
                const updatedTasks = tasks.filter((row) => row.id !== id);
                setTasks(updatedTasks);
                toast({ description: <ToastSuccessMessage message={response.msg} /> });
            } catch (err: any) {
                console.error(err);
                const message = "Error al intentar eliminar la tarea, intenta más tarde.";
                toast({ variant: "destructive", description: <ToastErrorMessage message={message} /> });
            }
        },
        [tasks, toast, session?.user.token],
    );

    const updateTasksState = useCallback(
        (updatedTask: Task) => {
            const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
            setTasks(updatedTasks);
        },
        [tasks],
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
                                        navigator.clipboard.writeText(task.titulo.toString());
                                        toast({
                                            description: <ToastSuccessMessage message="Titulo copiado" />,
                                        });
                                    }}
                                >
                                    <CopyIcon className="mr-2 h-4 w-4" />
                                    <span>Copiar titulo</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigator.clipboard.writeText(task.empleado_email.toString());
                                        toast({
                                            description: <ToastSuccessMessage message="Email del empleado copiado" />,
                                        });
                                    }}
                                >
                                    <CopyIcon className="mr-2 h-4 w-4" />
                                    <span>Copiar empleado email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigator.clipboard.writeText(task.creador_email.toString());
                                        toast({
                                            description: <ToastSuccessMessage message="Email del creador copiado" />,
                                        });
                                    }}
                                >
                                    <CopyIcon className="mr-2 h-4 w-4" />
                                    <span>Copiar creador email</span>
                                </DropdownMenuItem>
                                {task.estado !== "sin_iniciar" && (
                                    <>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                changeStatus(task.id, "sin_iniciar");
                                            }}
                                        >
                                            <CircleIcon className="mr-2 h-4 w-4 text-red-600" />
                                            <span>Establecer como sin iniciar</span>
                                        </DropdownMenuItem>
                                    </>
                                )}
                                {task.estado !== "en_proceso" && (
                                    <>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                changeStatus(task.id, "en_proceso");
                                            }}
                                        >
                                            <RotateCwIcon className="mr-2 h-4 w-4 text-yellow-600" />
                                            <span>Establecer como en proceso</span>
                                        </DropdownMenuItem>
                                    </>
                                )}
                                {task.estado !== "ejecutada" && (
                                    <>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                changeStatus(task.id, "ejecutada");
                                            }}
                                        >
                                            <CheckCircleIcon className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Establecer como ejecutada</span>
                                        </DropdownMenuItem>
                                    </>
                                )}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                            <PencilIcon className="mr-2 h-4 w-4" />
                                            <span>Editar</span>
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text2xl text-center">Editar tarea</DialogTitle>
                                        </DialogHeader>
                                        <TaskForm action="edit" taskValues={task} updateTasksState={updateTasksState} />
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                            <EyeIcon className="mr-2 h-4 w-4" />
                                            <span>Observaciones</span>
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="mx-auto flex flex-row items-center gap-2">
                                                <EyeIcon className="h-6 w-6" />
                                                <span className="text-2xl">Observaciones</span>
                                            </DialogTitle>
                                        </DialogHeader>
                                        <Observations taskId={task.id} />
                                    </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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
    }, [changeStatus, deleteRow, updateTasksState, toast]);

    const columnsToFilter: Column[] = [
        { key: "titulo", placeholder: "Filtrar titulos..." },
        { key: "empleado_email", placeholder: "Filtrar email empleados..." },
        { key: "creador_email", placeholder: "Filtrar email creadores..." },
    ];

    const columnLabels = [
        "Titulo",
        "Prioridad",
        "Tipo",
        "Empleado",
        "Creador",
        "Fecha de creación",
        "Fecha limite",
        "Estado",
    ];

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 px-8 md:flex">
            <DataTable columns={memoizedColumns} data={tasks} loadingData={loadingDataTable} error={errorDataTable}>
                <DataTableToolbar
                    columnsToFilter={columnsToFilter}
                    columnLabels={columnLabels}
                    data={tasks.map((task) => {
                        const {
                            id,
                            tipo_tarea_id,
                            tipo_tarea_descripcion,
                            empleado_id,
                            empleado_nombre,
                            empleado_apellido,
                            creador_id,
                            creador_nombre,
                            creador_apellido,
                            evidencia,
                            ...newTask
                        } = task;
                        return newTask;
                    })}
                    fileNamePdf="tareas.pdf"
                />
            </DataTable>
        </div>
    );
}

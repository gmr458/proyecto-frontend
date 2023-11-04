"use client";

import { Task } from "@/lib/schemas/task";
import { ColumnDef } from "@tanstack/react-table";
import { priorities, statuses, types } from "@/app/tasks/data";
import colors from "tailwindcss/colors";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuTrigger,
//     DropdownMenuItem,
//     DropdownMenuLabel,
// } from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "titulo",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Titulo
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const maxLength = 20;
            const titulo: string = row.getValue("titulo");
            const truncatedTitulo = `${titulo.slice(0, maxLength)}...`;
            return <div>{titulo.length > maxLength ? truncatedTitulo : titulo}</div>;
        },
    },
    {
        accessorKey: "prioridad",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Prioridad
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const priority = priorities.find((priority) => priority.value === row.getValue("prioridad"));

            if (!priority) {
                return null;
            }

            let color = "";
            const intensity = 600;
            if (priority.value === "alta") {
                color = colors.red[intensity];
            } else if (priority.value === "media") {
                color = colors.yellow[intensity];
            } else {
                color = colors.green[intensity];
            }

            return (
                <div className="flex items-center">
                    {priority.icon && <priority.icon className="mr-2 h-4 w-4" color={color} />}
                    <span>{priority.label}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "tipo",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Tipo
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const typeTask = types.find((typeTask) => typeTask.value === row.getValue("tipo"));

            if (!typeTask) {
                return null;
            }

            return (
                <div className="flex items-center">
                    {typeTask.icon && <typeTask.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{typeTask.label}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "creador_email",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Creador email
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    // {
    //     accessorKey: "fecha_creacion",
    //     header: ({ column }) => {
    //         return (
    //             <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
    //                 Fecha de creación
    //                 <ArrowUpDownIcon className="ml-2 h-4 w-4" />
    //             </Button>
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const date = new Date(row.getValue("fecha_creacion"));
    //         return <div>{date.toLocaleDateString()}</div>;
    //     },
    // },
    {
        accessorKey: "fecha_limite",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Fecha limite
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("fecha_limite"));
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDay()).padStart(2, "0");
            const formattedDate = `${day}/${month}/${year}`;
            return <div className="text-center">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "estado",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Estado
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue("estado"));

            if (!status) {
                return null;
            }

            let color = "";
            const intensity = 600;
            if (status.value === "sin_iniciar") {
                color = colors.red[intensity];
            } else if (status.value === "en_proceso") {
                color = colors.yellow[intensity];
            } else {
                color = colors.green[intensity];
            }

            return (
                <div className="flex items-center">
                    {status.icon && <status.icon className="mr-2 h-4 w-4" color={color} />}
                    <span>{status.label}</span>
                </div>
            );
        },
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const task = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontalIcon className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Acciones</DropdownMenuLabel>
    //                     <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id.toString())}>
    //                         Desactivar
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];

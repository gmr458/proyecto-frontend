"use client";

import { Task } from "@/lib/schemas/task";
import { ColumnDef } from "@tanstack/react-table";
import { priorities, statuses, types } from "./data";
import colors from "tailwindcss/colors";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "titulo",
        header: "Titulo",
    },
    {
        accessorKey: "prioridad",
        header: "Prioridad",
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
        header: "Tipo",
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
        accessorKey: "fecha_creacion",
        header: "Fecha de creación",
    },
    {
        accessorKey: "fecha_limite",
        header: "Fecha limite",
    },
    {
        accessorKey: "estado",
        header: "Estado",
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
];

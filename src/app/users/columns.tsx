import { Button } from "@/components/ui/button";
import { User } from "@/lib/schemas/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    className="text-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const nombre: string = row.getValue("nombre");
            return <div className="text-center">{nombre}</div>;
        },
    },
    {
        accessorKey: "apellido",
        header: ({ column }) => {
            return (
                <Button
                    className="text-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Apellido
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const apellido: string = row.getValue("apellido");
            return <div className="text-center">{apellido}</div>;
        },
    },
    {
        accessorKey: "email",
        header: ({}) => {
            return <div className="text-center">Email</div>;
        },
        cell: ({ row }) => {
            const email: string = row.getValue("email");
            return <div className="text-center">{email}</div>;
        },
    },
    {
        accessorKey: "numero_documento",
        header: ({}) => {
            return <div className="text-center">Número de documento</div>;
        },
        cell: ({ row }) => {
            const numeroDocumento: string = row.getValue("numero_documento");
            return <div className="text-center">{numeroDocumento}</div>;
        },
    },
    {
        accessorKey: "phone_number",
        header: ({}) => {
            return <div className="text-center">Número de teléfono</div>;
        },
        cell: ({ row }) => {
            const phoneNumber: string = row.getValue("phone_number");
            return <div className="text-center">{phoneNumber}</div>;
        },
    },
    {
        accessorKey: "fecha_creacion",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Fecha de creación
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("fecha_creacion"));
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDay()).padStart(2, "0");
            const formattedDate = `${day}/${month}/${year}`;
            return <div className="text-center">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "activado",
        header: ({}) => {
            return <div className="text-center">Estado</div>;
        },
        cell: ({ row }) => {
            const activated: boolean = row.getValue("activado");
            return <div className="text-center">{activated ? "Activado" : "Desactivado"}</div>;
        },
    },
    {
        accessorKey: "roles",
        header: ({}) => {
            return <div className="text-center">Rol</div>;
        },
        cell: ({ row }) => {
            const roles: string = row.getValue("roles");
            return <div className="text-center">{`${roles.at(0)?.toUpperCase()}${roles.slice(1)}`}</div>;
        },
    },
];

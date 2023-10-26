import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircleIcon,
    CircleIcon,
    DropletsIcon,
    FlaskConicalIcon,
    RecycleIcon,
    RotateCwIcon,
    WindIcon,
} from "lucide-react";

export const priorities = [
    {
        label: "Baja",
        value: "baja",
        icon: ArrowDownIcon,
        color: "green",
    },
    {
        label: "Media",
        value: "media",
        icon: ArrowRightIcon,
        color: "yellow",
    },
    {
        label: "Alta",
        value: "alta",
        icon: ArrowUpIcon,
        color: "red",
    },
];

export const types = [
    {
        label: "Quimico",
        value: "quimico",
        icon: FlaskConicalIcon,
    },
    {
        label: "Agua",
        value: "agua",
        icon: DropletsIcon,
    },
    {
        label: "Aire",
        value: "aire",
        icon: WindIcon,
    },
    {
        label: "Reciclaje",
        value: "reciclaje",
        icon: RecycleIcon,
    },
];

export const statuses = [
    {
        label: "Sin Iniciar",
        value: "sin_iniciar",
        icon: CircleIcon,
        color: "red",
    },
    {
        label: "En Proceso",
        value: "en_proceso",
        icon: RotateCwIcon,
        color: "yellow",
    },
    {
        label: "Ejecutada",
        value: "ejecutada",
        icon: CheckCircleIcon,
        color: "green",
    },
];

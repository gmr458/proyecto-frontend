import { z } from "zod";

export const taskSchema = z.object({
    id: z.number(),
    titulo: z.string(),
    prioridad: z.enum(["baja", "media", "alta"]),
    tipo: z.enum(["quimico", "agua", "aire", "reciclaje"]),
    empleado_id: z.number(),
    empleado_email: z.string(),
    empleado_nombre: z.string(),
    empleado_apellido: z.string(),
    creador_id: z.number(),
    creador_email: z.string(),
    creador_nombre: z.string(),
    creador_apellido: z.string(),
    fecha_creacion: z.string(),
    fecha_limite: z.string(),
    evidencia: z.string().optional(),
    estado: z.enum(["sin_iniciar", "en_proceso", "ejecutada"]),
});

export type Task = z.infer<typeof taskSchema>;

export const responseTaskCountSchema = z.object({
    msg: z.string(),
    data: z.object({
        total_tasks: z.number().optional(),
        tareas_sin_iniciar: z.number().optional(),
        tareas_en_proceso: z.number().optional(),
        tareas_ejecutadas: z.number().optional(),
    }),
});

export type ResponseTaskCount = z.infer<typeof responseTaskCountSchema>;

export type ReqCountTaskKind = "all" | "sin_iniciar" | "en_proceso" | "ejecutadas";

export const allTasksSchema = z.object({
    msg: z.string(),
    data: z.object({
        tasks: z.array(taskSchema),
    }),
});

export type AllTasks = z.infer<typeof allTasksSchema>;

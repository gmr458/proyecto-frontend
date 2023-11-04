import { z } from "zod";

export const taskSchema = z.object({
    id: z.number(),
    titulo: z.string(),
    prioridad: z.enum(["baja", "media", "alta"]),
    tipo: z.enum(["quimico", "agua", "aire", "reciclaje"]),
    empleado_id: z.number(),
    creador_id: z.number(),
    fecha_creacion: z.string(),
    fecha_limite: z.string(),
    evidencia: z.string(),
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

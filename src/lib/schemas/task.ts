import { z } from "zod";

export const createTaskSchema = z.object({
    titulo: z.string({ required_error: "El titulo es requerido" }).min(1, "El titulo es requerido"),
    prioridad: z.enum(["baja", "media", "alta"]),
    tipo_id: z.string(),
    empleado_id: z.number(),
    creador_id: z.number().nullable(),
    fecha_limite: z.date({ required_error: "La fecha limite es requerida" }),
    evidencia: z.string().optional(),
});

export type CreateTask = z.infer<typeof createTaskSchema>;

export const taskSchema = z.object({
    id: z.number(),
    titulo: z.string(),
    prioridad: z.enum(["baja", "media", "alta"]),
    tipo_tarea_id: z.number(),
    tipo_tarea: z.enum(["quimico", "agua", "aire", "reciclaje"]),
    tipo_tarea_descripcion: z.string().nullable(),
    empleado_id: z.number(),
    empleado_email: z.string(),
    empleado_nombre: z.string(),
    empleado_apellido: z.string(),
    creador_id: z.number(),
    creador_email: z.string(),
    creador_nombre: z.string(),
    creador_apellido: z.string(),
    fecha_creacion: z.string(),
    fecha_limite: z.date().or(z.string()),
    evidencia: z.string().optional(),
    estado: z.enum(["sin_iniciar", "en_proceso", "ejecutada"]),
});

export type Task = z.infer<typeof taskSchema>;

export const responseTaskSchema = z.object({
    msg: z.string(),
    tarea: taskSchema,
});

export type ResponseTask = z.infer<typeof responseTaskSchema>;

export const taskCountSchema = z.object({
    msg: z.string(),
    data: z.object({
        total_tasks: z.number(),
    }),
});

export type TaskCount = z.infer<typeof taskCountSchema>;

export const taskCountWithoutStartSchema = z.object({
    msg: z.string(),
    data: z.object({
        tareas_sin_iniciar: z.number(),
    }),
});

export type TaskCountWithoutStart = z.infer<typeof taskCountWithoutStartSchema>;

export const taskCountInProgressSchema = z.object({
    msg: z.string(),
    data: z.object({
        tareas_en_proceso: z.number(),
    }),
});

export type TaskCountInProgress = z.infer<typeof taskCountInProgressSchema>;

export const taskCountExecutedSchema = z.object({
    msg: z.string(),
    data: z.object({
        tareas_ejecutadas: z.number(),
    }),
});

export type TaskCountExecuted = z.infer<typeof taskCountExecutedSchema>;

export const tasksDataDashboardSchema = z.object({
    msg: z.string(),
    data: z.object({
        count_tareas: z.number(),
        count_tareas_tipo_agua: z.number(),
        count_tareas_tipo_aire: z.number(),
        count_tareas_tipo_quimico: z.number(),
        count_tareas_tipo_reciclaje: z.number(),
        count_tareas_prioridad_alta: z.number(),
        count_tareas_prioridad_media: z.number(),
        count_tareas_prioridad_baja: z.number(),
        count_tareas_estado_sin_iniciar: z.number(),
        count_tareas_estado_en_proceso: z.number(),
        count_tareas_estado_ejecutadas: z.number(),
    }),
});

export type TasksDataDashboard = z.infer<typeof tasksDataDashboardSchema>;

export const allTasksSchema = z.object({
    msg: z.string(),
    data: z.object({
        tasks: z.array(taskSchema),
    }),
});

export type AllTasks = z.infer<typeof allTasksSchema>;

export const responseDeleteTask = z.object({
    msg: z.string(),
});

export type ResponseDeleteTask = z.infer<typeof responseDeleteTask>;

import { NEXT_PUBLIC_API_URL, safeFetch } from "@/lib/fetch";
import {
    AllTasks,
    CreateTask,
    ReqCountTaskKind,
    ResponseCreateTask,
    ResponseDeleteTask,
    ResponseTaskCount,
    allTasksSchema,
    responseCreateTaskSchema,
    responseDeleteTask,
    responseTaskCountSchema,
} from "@/lib/schemas/task";

export async function apiCreateTask(task: CreateTask, token?: string): Promise<ResponseCreateTask> {
    const taskCreated = await safeFetch(responseCreateTaskSchema, `${NEXT_PUBLIC_API_URL}/api/tareas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            titulo: task.titulo,
            prioridad: task.prioridad,
            tipo_id: parseInt(task.tipo_id),
            empleado_id: task.empleado_id,
            creador_id: null,
            fecha_limite: task.fecha_limite,
            evidencia: "",
        }),
    });

    return taskCreated;
}

export async function apiGetCountTask(kind: ReqCountTaskKind, token?: string): Promise<ResponseTaskCount> {
    const response = await safeFetch(responseTaskCountSchema, `${NEXT_PUBLIC_API_URL}/api/tareas/count/${kind}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

export async function apiGetAllTasks(token?: string): Promise<AllTasks> {
    const response = await safeFetch(allTasksSchema, `${NEXT_PUBLIC_API_URL}/api/tareas`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

export async function apiGetMyAssignedTasks(token?: string): Promise<AllTasks> {
    const response = await safeFetch(allTasksSchema, `${NEXT_PUBLIC_API_URL}/api/tareas/mis`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

export async function apiDeleteTaskById(id: number, token?: string): Promise<ResponseDeleteTask> {
    const response = await safeFetch(responseDeleteTask, `${NEXT_PUBLIC_API_URL}/api/tareas/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

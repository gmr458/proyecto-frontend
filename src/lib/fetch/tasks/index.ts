import { NEXT_PUBLIC_API_URL, safeFetch } from "@/lib/fetch";
import {
    AllTasks,
    CreateTask,
    ResponseTask,
    ResponseDeleteTask,
    TaskCount,
    TaskCountExecuted,
    TaskCountInProgress,
    TaskCountWithoutStart,
    TasksDataDashboard,
    allTasksSchema,
    responseTaskSchema,
    responseDeleteTask,
    taskCountExecutedSchema,
    taskCountInProgressSchema,
    taskCountSchema,
    taskCountWithoutStartSchema,
    tasksDataDashboardSchema,
} from "@/lib/schemas/task";

export async function apiCreateTask(task: CreateTask, token?: string): Promise<ResponseTask> {
    const taskCreated = await safeFetch(responseTaskSchema, `${NEXT_PUBLIC_API_URL}/api/tareas`, {
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

export async function apiUpdateTaskById(task: CreateTask, id?: number, token?: string): Promise<ResponseTask> {
    const taskCreated = await safeFetch(responseTaskSchema, `${NEXT_PUBLIC_API_URL}/api/tareas/${id}`, {
        method: "PUT",
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

export async function apiGetCountTasks(token?: string): Promise<TaskCount> {
    const response = await safeFetch(taskCountSchema, `${NEXT_PUBLIC_API_URL}/api/tareas/count/all`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

export async function apiGetCountWithoutStartTasks(token?: string): Promise<TaskCountWithoutStart> {
    const response = await safeFetch(
        taskCountWithoutStartSchema,
        `${NEXT_PUBLIC_API_URL}/api/tareas/count/estado/sin_iniciar`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response;
}

export async function apiGetCountInProgressTasks(token?: string): Promise<TaskCountInProgress> {
    const response = await safeFetch(
        taskCountInProgressSchema,
        `${NEXT_PUBLIC_API_URL}/api/tareas/count/estado/en_proceso`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response;
}

export async function apiGetCountExecutedTasks(token?: string): Promise<TaskCountExecuted> {
    const response = await safeFetch(
        taskCountExecutedSchema,
        `${NEXT_PUBLIC_API_URL}/api/tareas/count/estado/ejecutadas`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response;
}

export async function apiGetTasksDataDashboard(token?: string): Promise<TasksDataDashboard> {
    const response = await safeFetch(tasksDataDashboardSchema, `${NEXT_PUBLIC_API_URL}/api/tareas/data/dashboard`, {
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

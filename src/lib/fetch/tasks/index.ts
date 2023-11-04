import { NEXT_PUBLIC_API_URL, safeFetch } from "@/lib/fetch";
import {
    AllTasks,
    ReqCountTaskKind,
    ResponseTaskCount,
    allTasksSchema,
    responseTaskCountSchema,
} from "@/lib/schemas/task";

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

import { NEXT_PUBLIC_API_URL, safeFetch } from "@/lib/fetch";
import {
    CreateObservation,
    observationsTask,
    ObservationsTask,
    responseCreateObservation,
    ResponseCreateObservation,
} from "@/lib/schemas/observation";

export async function apiGetAllObservationsByTaskId(taskId: number, token?: string): Promise<ObservationsTask> {
    const response = await safeFetch(observationsTask, `${NEXT_PUBLIC_API_URL}/api/observaciones/tarea/${taskId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

export async function apiCreateObservation(
    observation: CreateObservation,
    taskId: number,
    token?: string,
): Promise<ResponseCreateObservation> {
    const response = await safeFetch(
        responseCreateObservation,
        `${NEXT_PUBLIC_API_URL}/api/observaciones/tarea/${taskId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(observation),
        },
    );

    return response;
}

import { NEXT_PUBLIC_API_URL, safeFetch } from "@/lib/fetch";
import { ReqCountTaskKind, ResponseTaskCount, responseTaskCountSchema } from "@/lib/schemas/task";

export async function apiGetCountTask(kind: ReqCountTaskKind, token?: string): Promise<ResponseTaskCount> {
    const response = await safeFetch(responseTaskCountSchema, `${NEXT_PUBLIC_API_URL}/api/tareas/count/${kind}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

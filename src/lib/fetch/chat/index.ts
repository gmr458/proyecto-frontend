import { NEXT_PUBLIC_API_URL, safeFetch } from "@/lib/fetch";
import { Message, ResponseChat, responseChatSchema } from "@/lib/schemas/chat";

export async function apiSendMessageChat(message: Message, token?: string): Promise<ResponseChat> {
    const response = await safeFetch(responseChatSchema, `${NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
    });

    return response;
}

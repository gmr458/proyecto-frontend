import { z } from "zod";

export const messageSchema = z.object({
    content: z.string(),
    role: z.enum(["user", "bot", "error"]).optional(),
});

export type Message = z.infer<typeof messageSchema>;

export const responseChatSchema = z.object({
    msg: z.string(),
    data: z.object({
        message: messageSchema,
    }),
});

export type ResponseChat = z.infer<typeof responseChatSchema>;

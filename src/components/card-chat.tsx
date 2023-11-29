"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiSendMessageChat } from "@/lib/fetch/chat";
import { Message } from "@/lib/schemas/chat";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export function CardChat() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const inputLength = input.trim().length;

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (inputLength === 0) return;

        const message: Message = {
            role: "user",
            content: input,
        };

        try {
            const response = await apiSendMessageChat(message, session?.user.token);
            setMessages([...messages, message, response.data.message]);
            setInput("");
        } catch (err) {
            const errMessage: Message = {
                role: "error",
                content: "Error, intenta mas tarde.",
            };
            setMessages([...messages, errMessage]);
        }
    }

    return (
        <Card className="my-10 flex h-[78vh] w-[90%] flex-col justify-between">
            <CardHeader>
                <CardTitle className="text-center">Chatbot</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[52vh] px-3" ref={scrollAreaRef}>
                    <div className="flex flex-col gap-2 space-y-4 p-1">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex flex-row items-center gap-2",
                                    message.role === "user" ? "justify-end" : "justify-start",
                                )}
                            >
                                {message.role === "bot" && <p>Bot:</p>}
                                <div
                                    className={cn(
                                        "rounded-lg border p-2",
                                        message.role === "user" && "bg-primary text-primary-foreground",
                                        message.role === "bot" && "bg-muted",
                                        message.role === "error" && "bg-red-600 text-primary-foreground",
                                    )}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        id="message"
                        placeholder="Escribe un mensaje..."
                        className="flex-1"
                        autoComplete="off"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <Button type="submit" size="icon" disabled={inputLength === 0}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}

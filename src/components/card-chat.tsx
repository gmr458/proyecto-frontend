"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiSendMessageChat } from "@/lib/fetch/chat";
import { Message } from "@/lib/schemas/chat";
import { cn } from "@/lib/utils";
import { Loader2Icon, MessageCircle, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEventHandler, useEffect, useRef, useState } from "react";

export function CardChat() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loadingResponse, setLoadingResponse] = useState(false);
    const inputLength = input.trim().length;

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }

        async function sendMessage(message: Message) {
            try {
                const response = await apiSendMessageChat(message, session?.user.token);
                setMessages([...messages, response.data.message]);
                setLoadingResponse(false);
            } catch (err) {
                const errMessage: Message = {
                    role: "error",
                    content: "Error, intenta mas tarde.",
                };
                setMessages([...messages, errMessage]);
                setLoadingResponse(false);
            }
        }

        const [message] = messages.slice(-1);
        if (message && message.role === "user") {
            sendMessage(message);
        }
    }, [messages, session?.user.token]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        if (inputLength === 0) return;

        setMessages([...messages, { role: "user", content: input }]);

        setInput("");
        setLoadingResponse(true);
    };

    return (
        <Card className="my-10 flex h-[78vh] w-[90%] flex-col justify-between">
            <CardHeader>
                <CardTitle className="mx-auto text-2xl">
                    <div className="flex flex-row items-center gap-2">
                        <MessageCircle className="h-6 w-6" />
                        <span className="tex">Chatbot</span>
                    </div>
                </CardTitle>
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
                    <Button type="submit" size="icon" disabled={inputLength === 0 || loadingResponse}>
                        {(loadingResponse && <Loader2Icon className="h-4 w-4 animate-spin" />) || (
                            <Send className="h-4 w-4" />
                        )}
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}

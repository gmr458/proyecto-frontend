import { CardChat } from "@/components/card-chat";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chatbot",
};

export default function ChatPage() {
    return (
        <div className="flex min-h-min items-center justify-center">
            <CardChat />
        </div>
    );
}

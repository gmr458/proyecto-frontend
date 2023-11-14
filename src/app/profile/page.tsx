"use client";

import Profile from "@/components/profile";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    return (
        <div className="min-h-min flex items-center justify-center gap-5">
            <Profile />
        </div>
    );
}

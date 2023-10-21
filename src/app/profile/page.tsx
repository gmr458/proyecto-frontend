"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    return (
        <div>
            <h1>Profile page</h1>
            <pre>{JSON.stringify({ session, status })}</pre>
        </div>
    );
}

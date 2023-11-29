import Profile from "@/components/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perfil",
};

export default function ProfilePage() {
    return (
        <div className="flex min-h-min items-center justify-center gap-5">
            <Profile />
        </div>
    );
}

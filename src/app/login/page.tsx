import LoginForm from "@/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Iniciar Sesión",
};

export default function LoginPage() {
    return (
        <div className="flex min-h-min items-center justify-center">
            <LoginForm />
        </div>
    );
}

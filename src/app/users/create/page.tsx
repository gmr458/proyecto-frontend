import CreateUserForm from "@/components/create-user-form";
import CreateUserFromExcelForm from "@/components/create-user-from-excel-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crear usuario",
};

export default function CreateUserPage() {
    return (
        <div className="flex min-h-min items-center justify-center gap-5">
            <CreateUserForm />
            <CreateUserFromExcelForm />
        </div>
    );
}

"use client";

import CreateUserForm from "@/components/create-user-form";
import CreateUserFromExcelForm from "@/components/create-user-from-excel-form";

export default function CreateUserPage() {
    return (
        <div className="min-h-min flex items-center justify-center gap-5">
            <CreateUserForm />
            <CreateUserFromExcelForm />
        </div>
    );
}

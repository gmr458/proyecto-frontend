"use client";

import CreateTaskForm from "@/components/create-task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateTaskPage() {
    return (
        <div className="min-h-min flex items-center justify-center gap-5">
            <Card className="my-10">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Crear tarea</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateTaskForm action="create" />
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import TaskForm from "@/components/task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateTaskPage() {
    return (
        <div className="flex min-h-min items-center justify-center gap-5">
            <Card className="my-10">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl">Crear tarea</CardTitle>
                </CardHeader>
                <CardContent>
                    <TaskForm action="create" />
                </CardContent>
            </Card>
        </div>
    );
}

import { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";
import { TopEmployees } from "@/components/top-employees";
import { CheckCircleIcon, CircleIcon, ClipboardListIcon, RotateCwIcon } from "lucide-react";
import { apiGetCountTask } from "@/lib/fetch/tasks";
import { auth } from "@/lib/auth";
import { apiGetTopUsersTasksExecuted } from "@/lib/fetch";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
    const session = await auth();

    const {
        data: { total_tasks },
    } = await apiGetCountTask("all", session?.user.token);
    const {
        data: { tareas_sin_iniciar },
    } = await apiGetCountTask("sin_iniciar", session?.user.token);
    const {
        data: { tareas_en_proceso },
    } = await apiGetCountTask("en_proceso", session?.user.token);
    const {
        data: { tareas_ejecutadas },
    } = await apiGetCountTask("ejecutadas", session?.user.token);

    const {
        data: { users },
    } = await apiGetTopUsersTasksExecuted(session?.user.token);

    return (
        <>
            <div className="flex-1 pt-4 px-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-3">
                    <Card className="p-0">
                        <CardHeader className="p-3 ps-5">
                            <CardTitle className="text-sm font-medium">Tareas totales</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row items-center justify-between space-y-0">
                            <div className="text-2xl font-bold">{total_tasks}</div>
                            <ClipboardListIcon className="h-8 w-8" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-3 ps-5">
                            <CardTitle className="text-sm font-medium">Tareas ejecutadas</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row items-center justify-between space-y-0">
                            <div className="text-2xl font-bold">{tareas_ejecutadas}</div>
                            <CheckCircleIcon className="h-8 w-8 text-green-600" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-3 ps-5">
                            <CardTitle className="text-sm font-medium">Tareas en proceso</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row items-center justify-between space-y-0">
                            <div className="text-2xl font-bold">{tareas_en_proceso}</div>
                            <RotateCwIcon className="h-8 w-8 text-yellow-600" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-3 ps-5">
                            <CardTitle className="text-sm font-medium">Tareas sin iniciar</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row items-center justify-between space-y-0">
                            <div className="text-2xl font-bold">{tareas_sin_iniciar}</div>
                            <CircleIcon className="h-8 w-8 text-red-600" />
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Porcentajes ejecutadas, en progreso y sin iniciar</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview
                                sinIniciar={tareas_sin_iniciar}
                                enProceso={tareas_en_proceso}
                                ejecutadas={tareas_ejecutadas}
                            />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3 flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle>Top 5 usuarios con más tareas ejecutadas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TopEmployees users={users} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

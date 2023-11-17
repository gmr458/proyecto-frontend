import { BarChartWrapper } from "@/components/bar-chart-wrapper";
import MetricIndicatorProgressBar from "@/components/metric-indicator-progress-bar";
import { PieChartWrapper } from "@/components/pie-chart-wrapper";
import { TopEmployees } from "@/components/top-employees";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { apiGetTopUsersTasksExecuted } from "@/lib/fetch";
import { apiGetTasksDataDashboard } from "@/lib/fetch/tasks";
import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircleIcon,
    CircleIcon,
    DropletsIcon,
    FlaskConicalIcon,
    RecycleIcon,
    RotateCwIcon,
    WindIcon,
} from "lucide-react";
import { Metadata } from "next";
import colors from "tailwindcss/colors";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
    const session = await auth();

    const {
        data: {
            count_tareas,
            count_tareas_tipo_agua,
            count_tareas_tipo_aire,
            count_tareas_tipo_quimico,
            count_tareas_tipo_reciclaje,
            count_tareas_prioridad_alta,
            count_tareas_prioridad_media,
            count_tareas_prioridad_baja,
            count_tareas_estado_sin_iniciar,
            count_tareas_estado_en_proceso,
            count_tareas_estado_ejecutadas,
        },
    } = await apiGetTasksDataDashboard(session?.user.token);

    const trafficLightColors = [colors.green[600], colors.yellow[600], colors.red[600]];
    const typeTasksColors = [colors.yellow[600], colors.blue[600], colors.sky[400], colors.green[600]];

    const {
        data: { users },
    } = await apiGetTopUsersTasksExecuted(session?.user.token);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5 p-5">
                <div className="flex flex-col gap-5">
                    <Card className="flex flex-col gap-3">
                        <CardTitle className="px-3 pt-3">Indicadores tareas según su estado</CardTitle>
                        <div className="grid grid-cols-3 gap-3 px-3 pb-3">
                            <MetricIndicatorProgressBar
                                title="Ejecutadas"
                                data={count_tareas_estado_ejecutadas}
                                totalData={count_tareas}
                                icon={<CheckCircleIcon className="h-8 w-8 text-green-600" />}
                            />
                            <MetricIndicatorProgressBar
                                title="En proceso"
                                data={count_tareas_estado_en_proceso}
                                totalData={count_tareas}
                                icon={<RotateCwIcon className="h-8 w-8 text-yellow-600" />}
                            />
                            <MetricIndicatorProgressBar
                                title="Sin iniciar"
                                data={count_tareas_estado_sin_iniciar}
                                totalData={count_tareas}
                                icon={<CircleIcon className="h-8 w-8 text-red-600" />}
                            />
                        </div>
                    </Card>
                    <Card>
                        <CardTitle className="text-center p-4">Porcentajes segun estado</CardTitle>
                        <CardContent>
                            <PieChartWrapper
                                colors={trafficLightColors}
                                data={[
                                    {
                                        name: "Ejecutadas",
                                        value: count_tareas_estado_ejecutadas,
                                    },
                                    {
                                        name: "En Proceso",
                                        value: count_tareas_estado_en_proceso,
                                    },
                                    {
                                        name: "Sin Iniciar",
                                        value: count_tareas_estado_sin_iniciar,
                                    },
                                ]}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardTitle className="text-center p-4">Empleados con más tareas ejecutadas</CardTitle>
                        <TopEmployees users={users} />
                    </Card>
                </div>
                <div className="flex flex-col gap-5">
                    <Card className="flex flex-col gap-3 items-stretch">
                        <CardTitle className="px-3 pt-3">Indicadores tareas según su prioridad</CardTitle>
                        <div className="grid grid-cols-3 gap-3 px-3 pb-3">
                            <MetricIndicatorProgressBar
                                title="Alta"
                                data={count_tareas_prioridad_alta}
                                totalData={count_tareas}
                                icon={<ArrowUpIcon className="h-8 w-8 text-red-600" />}
                            />
                            <MetricIndicatorProgressBar
                                title="Media"
                                data={count_tareas_prioridad_media}
                                totalData={count_tareas}
                                icon={<ArrowRightIcon className="h-8 w-8 text-yellow-600" />}
                            />
                            <MetricIndicatorProgressBar
                                title="Baja"
                                data={count_tareas_prioridad_baja}
                                totalData={count_tareas}
                                icon={<ArrowDownIcon className="h-8 w-8 text-green-600" />}
                            />
                        </div>
                    </Card>
                    <Card>
                        <CardTitle className="text-center p-4">Cantidades segun tipo</CardTitle>
                        <CardContent>
                            <BarChartWrapper
                                colors={typeTasksColors}
                                data={[
                                    { name: "Quimico", value: count_tareas_tipo_quimico },
                                    { name: "Agua", value: count_tareas_tipo_agua },
                                    { name: "Aire", value: count_tareas_tipo_aire },
                                    { name: "Reciclaje", value: count_tareas_tipo_reciclaje },
                                ]}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardTitle className="text-center p-4">Porcentajes segun tipo</CardTitle>
                        <CardContent>
                            <PieChartWrapper
                                colors={typeTasksColors}
                                data={[
                                    {
                                        name: "Quimico",
                                        value: count_tareas_tipo_quimico,
                                    },
                                    {
                                        name: "Agua",
                                        value: count_tareas_tipo_agua,
                                    },
                                    {
                                        name: "Aire",
                                        value: count_tareas_tipo_aire,
                                    },
                                    {
                                        name: "Reciclaje",
                                        value: count_tareas_tipo_reciclaje,
                                    },
                                ]}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-5">
                    <Card className="flex flex-col gap-3">
                        <CardTitle className="px-3 pt-3">Indicadores tareas según su tipo</CardTitle>
                        <div className="grid grid-cols-4 gap-3 px-3 pb-3">
                            <MetricIndicatorProgressBar
                                title="Agua"
                                data={count_tareas_tipo_agua}
                                totalData={count_tareas}
                                icon={<DropletsIcon className="h-5 w-5 text-muted-foreground" />}
                            />
                            <MetricIndicatorProgressBar
                                title="Aire"
                                data={count_tareas_tipo_aire}
                                totalData={count_tareas}
                                icon={<WindIcon className="h-5 w-5 text-muted-foreground" />}
                            />
                            <MetricIndicatorProgressBar
                                title="Reciclaje"
                                data={count_tareas_tipo_reciclaje}
                                totalData={count_tareas}
                                icon={<RecycleIcon className="h-5 w-5 text-muted-foreground" />}
                            />
                            <MetricIndicatorProgressBar
                                title="Quimico"
                                data={count_tareas_tipo_quimico}
                                totalData={count_tareas}
                                icon={<FlaskConicalIcon className="h-5 w-5 text-muted-foreground" />}
                            />
                        </div>
                    </Card>
                    <Card>
                        <CardTitle className="text-center p-4">Porcentajes segun prioridad</CardTitle>
                        <CardContent>
                            <PieChartWrapper
                                colors={trafficLightColors}
                                data={[
                                    {
                                        name: "Baja",
                                        value: count_tareas_prioridad_baja,
                                    },
                                    {
                                        name: "Media",
                                        value: count_tareas_prioridad_media,
                                    },
                                    {
                                        name: "Alta",
                                        value: count_tareas_prioridad_alta,
                                    },
                                ]}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardTitle className="text-center p-4">Empleados con más tareas ejecutadas</CardTitle>
                        <TopEmployees users={users} />
                    </Card>
                </div>
            </div>
        </>
    );
}

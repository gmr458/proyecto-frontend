import { BarChartWrapper } from "@/components/bar-chart-wrapper";
import MetricIndicator from "@/components/metric-indicator";
import MetricIndicatorProgressBar from "@/components/metric-indicator-progress-bar";
import { PieChartWrapper } from "@/components/pie-chart-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { apiGetTasksDataDashboard } from "@/lib/fetch/tasks";
import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    BarChart3Icon,
    CheckCircleIcon,
    CircleIcon,
    LayoutListIcon,
    PieChartIcon,
    RotateCwIcon,
} from "lucide-react";
import type { Metadata } from "next";
import colors from "tailwindcss/colors";

export const metadata: Metadata = {
    title: "Dashboard",
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

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 p-3">
                    <Tabs defaultValue="tasks">
                        <div className="flex flex-row justify-between">
                            <TabsList className="mb-1">
                                <TabsTrigger value="tasks">Tareas</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="tasks" className="flex flex-col gap-3">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-4">
                                <MetricIndicatorProgressBar
                                    title="Ejecutadas"
                                    data={count_tareas_estado_ejecutadas}
                                    totalData={count_tareas}
                                    icon={<CheckCircleIcon className="h-5 w-5 text-green-600" />}
                                />
                                <MetricIndicatorProgressBar
                                    title="En proceso"
                                    data={count_tareas_estado_en_proceso}
                                    totalData={count_tareas}
                                    icon={<RotateCwIcon className="h-5 w-5 text-yellow-600" />}
                                />
                                <MetricIndicatorProgressBar
                                    title="Sin iniciar"
                                    data={count_tareas_estado_sin_iniciar}
                                    totalData={count_tareas}
                                    icon={<CircleIcon className="h-5 w-5 text-red-600" />}
                                />
                                <MetricIndicator
                                    title="Totales"
                                    data={count_tareas}
                                    icon={<LayoutListIcon className="h-5 w-5 text-muted-foreground" />}
                                />
                                <MetricIndicatorProgressBar
                                    title="Alta"
                                    data={count_tareas_prioridad_alta}
                                    totalData={count_tareas}
                                    icon={<ArrowUpIcon className="h-5 w-5 text-red-600" />}
                                />
                                <MetricIndicatorProgressBar
                                    title="Media"
                                    data={count_tareas_prioridad_media}
                                    totalData={count_tareas}
                                    icon={<ArrowRightIcon className="h-5 w-5 text-yellow-600" />}
                                />
                                <MetricIndicatorProgressBar
                                    title="Baja"
                                    data={count_tareas_prioridad_baja}
                                    totalData={count_tareas}
                                    icon={<ArrowDownIcon className="h-5 w-5 text-green-600" />}
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-9">
                                <Card className="col-span-3 h-[64vh] p-0">
                                    <CardHeader>
                                        <CardTitle className="flex flex-row items-center gap-2">
                                            <PieChartIcon className="h-6 w-6 text-muted-foreground" />
                                            <span>Estados</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="mx-auto h-[82%] w-[96%]">
                                        <PieChartWrapper
                                            colors={[colors.green[600], colors.yellow[600], colors.red[600]]}
                                            icons={[
                                                <CheckCircleIcon className="mr-1 h-4 w-4 text-green-600" key={0} />,
                                                <RotateCwIcon className="mr-1 h-4 w-4 text-yellow-600" key={1} />,
                                                <CircleIcon className="mr-1 h-4 w-4 text-red-600" key={2} />,
                                            ]}
                                            height="100%"
                                            outerRadius="80%"
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
                                <Card className="col-span-3 h-[64vh] p-0">
                                    <CardHeader>
                                        <CardTitle className="flex flex-row items-center gap-2">
                                            <BarChart3Icon className="h-6 w-6 text-muted-foreground" />
                                            <span>Tipos</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="mx-auto h-[82%] w-[95%] pl-2">
                                        <BarChartWrapper
                                            colors={[
                                                colors.yellow[600],
                                                colors.blue[600],
                                                colors.sky[400],
                                                colors.green[600],
                                            ]}
                                            data={[
                                                { name: "Quimico", value: count_tareas_tipo_quimico },
                                                { name: "Agua", value: count_tareas_tipo_agua },
                                                { name: "Aire", value: count_tareas_tipo_aire },
                                                { name: "Reciclaje", value: count_tareas_tipo_reciclaje },
                                            ]}
                                        />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-3 h-[64vh] p-0">
                                    <CardHeader>
                                        <CardTitle className="flex flex-row items-center gap-2">
                                            <PieChartIcon className="h-6 w-6 text-muted-foreground" />
                                            <span>Prioridad</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="mx-auto h-[82%] w-[95%]">
                                        <PieChartWrapper
                                            colors={[colors.red[600], colors.yellow[600], colors.green[600]]}
                                            icons={[
                                                <ArrowUpIcon className="mr-1 h-4 w-4 text-red-600" key={0} />,
                                                <ArrowRightIcon className="mr-1 h-4 w-4 text-yellow-600" key={1} />,
                                                <ArrowDownIcon className="mr-1 h-4 w-4 text-green-600" key={2} />,
                                            ]}
                                            height="100%"
                                            outerRadius="80%"
                                            data={[
                                                {
                                                    name: "Alta",
                                                    value: count_tareas_prioridad_alta,
                                                },
                                                {
                                                    name: "Media",
                                                    value: count_tareas_prioridad_media,
                                                },
                                                {
                                                    name: "Baja",
                                                    value: count_tareas_prioridad_baja,
                                                },
                                            ]}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="users" className="space-y-4">
                            <h1>Usuarios</h1>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

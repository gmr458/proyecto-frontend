"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

const COLORS = [colors.green[600], colors.yellow[600], colors.red[600]];

const RADIAN = Math.PI / 180;

type CustomizedLabelOptions = {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
};

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: CustomizedLabelOptions) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

type OverviewProps = {
    sinIniciar?: number;
    enProceso?: number;
    ejecutadas?: number;
};

export function Overview({ sinIniciar, enProceso, ejecutadas }: OverviewProps) {
    const data = [
        { name: "Ejecutadas", value: ejecutadas },
        { name: "En Proceso", value: enProceso },
        { name: "Sin Iniciar", value: sinIniciar },
    ];

    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={170}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

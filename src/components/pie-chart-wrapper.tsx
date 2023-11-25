"use client";

import { Card } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

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

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomizedLabelOptions) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

interface CustomLegendProps {
    payload?: Payload[];
    colors: string[];
    icons: React.JSX.Element[];
}

const CustomLegend = (props: CustomLegendProps) => {
    const { payload, icons } = props;

    return (
        <ul className="flex flex-row place-content-center gap-6 p-0">
            {payload?.map((entry, index) => {
                return (
                    <li key={`item-${index}`} className="flex flex-row items-center">
                        {icons[index]}
                        <span className="text-sm text-accent-foreground">{entry.value}</span>
                    </li>
                );
            })}
        </ul>
    );
};

const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
    if (props.active && props.payload && props.payload.length) {
        return (
            <Card className="px-2 py-1 text-sm">
                <p>
                    {props.payload[0].name}: {props.payload[0].value}
                </p>
            </Card>
        );
    }

    return null;
};

interface PieChartWrapperProps {
    data: { name: string; value: number }[];
    colors: string[];
    icons: React.JSX.Element[];
    height?: string | number;
    outerRadius?: string | number;
}

export function PieChartWrapper({ data, colors, height, outerRadius, icons }: PieChartWrapperProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend colors={colors} icons={icons} />} />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={outerRadius}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((_entry, index) => (
                        <Cell key={`cell-${index}`} style={{ outline: "none" }} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

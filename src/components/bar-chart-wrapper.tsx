"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface BarChartWrapperProps {
    data: { name: string; value: number }[];
    colors: string[];
}

export function BarChartWrapper({ data, colors }: BarChartWrapperProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="hsl(var(--accent-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis stroke="hsl(var(--accent-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {data.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

interface BarChartWrapperProps {
    data: { name: string; value: number }[];
    colors: string[];
}

export function BarChartWrapper({ data, colors }: BarChartWrapperProps) {
    const biggerValue = data.reduce((maxData, currentData) =>
        currentData.value > maxData.value ? currentData : maxData,
    );

    return (
        <BarChart
            width={550}
            height={500}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="0" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, `dataMax + ${(biggerValue.value / 5).toFixed(0)}`]} />
            <Bar dataKey="value" barSize={60} radius={[8, 8, 0, 0]} label={{ position: "top" }}>
                {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
            </Bar>
        </BarChart>
    );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";

interface MetricIndicatorProgressBarProps {
    title: string;
    data: number;
    totalData: number;
    icon?: React.JSX.Element;
}

export default function MetricIndicatorProgressBar({ title, data, totalData, icon }: MetricIndicatorProgressBarProps) {
    const progress = (data / totalData) * 100;

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center p-3">
                {icon && icon}
                <CardTitle className="text-lg font-medium ml-2">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 p-3">
                <div className="text-2xl font-bold">{data}</div>
                <Label className="text-muted-foreground">{progress.toFixed(0)}%</Label>
                <Progress value={progress} />
            </CardContent>
        </Card>
    );
}

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
            <CardContent className="flex flex-col gap-1 p-3">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        {icon && icon}
                        <h3 className="text-sm font-medium">{title}</h3>
                    </div>
                    <div className="text-sm font-bold">{data}</div>
                </div>
                <div>
                    <Label className="text-muted-foreground">{progress.toFixed(0)}%</Label>
                    <Progress value={progress} />
                </div>
            </CardContent>
        </Card>
    );
}

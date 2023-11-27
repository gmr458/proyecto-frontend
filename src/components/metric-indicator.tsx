import { Card, CardContent } from "./ui/card";

interface MetricIndicatorProps {
    title: string;
    data: number | string;
    icon?: React.JSX.Element;
}

export default function MetricIndicator({ title, data, icon }: MetricIndicatorProps) {
    return (
        <Card className="flex flex-col justify-between">
            <CardContent className="flex h-full flex-row justify-between gap-1 p-3">
                <div className="flex flex-row items-start gap-2">
                    {icon && icon}
                    <h3 className="text-base font-medium">{title}</h3>
                </div>
                <div className="flex flex-row items-end gap-1">
                    <div className="text-3xl font-bold">{data}</div>
                </div>
            </CardContent>
        </Card>
    );
}

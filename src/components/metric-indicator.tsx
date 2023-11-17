import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface MetricIndicatorProps {
    title: string;
    data: number | string;
}

export default function MetricIndicator({ title, data }: MetricIndicatorProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{data}</div>
            </CardContent>
        </Card>
    );
}

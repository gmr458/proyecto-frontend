import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <Card className="my-10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl">Perfil</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-5">
                        <div className="grid gap-2">
                            <Label>Nombre</Label>
                            <Skeleton className="h-[40px] w-[243px]" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Apellido</Label>
                            <Skeleton className="h-[40px] w-[243px]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Teléfono móvil</Label>
                            <div className="flex flex-row gap-2">
                                <Skeleton className="h-[40px] w-[58px]" />
                                <Skeleton className="h-[40px] w-[177px]" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Correo electronico</Label>
                            <Skeleton className="h-[40px] w-[243px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="grid gap-2">
                            <Label>Número de documento</Label>
                            <Skeleton className="h-[40px] w-[243px]" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Rol</Label>
                            <Skeleton className="h-[40px] w-[243px]" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

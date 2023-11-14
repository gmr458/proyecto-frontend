"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { User } from "@/lib/schemas/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { apiGetProfile } from "@/lib/fetch";
import { useToast } from "./ui/use-toast";
import ProfileSkeleton from "./profile-skeleton";

export default function Profile() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>();
    const { toast } = useToast();

    useEffect(() => {
        async function fetchProfile() {
            if (session?.user.token) {
                try {
                    const {
                        data: { user },
                    } = await apiGetProfile(session.user.token);

                    setUser(user);
                } catch (err: any) {
                    console.error(err);
                    const message = "Error intentando obtener el perfil, intenta más tarde.";
                    toast({ variant: "destructive", description: message });
                }
            }
        }

        fetchProfile();
    }, [session?.user.token, toast]);

    if (!user || status === "loading") {
        return <ProfileSkeleton />;
    }

    return (
        <Card className="my-10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Perfil</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-5">
                        <div className="grid gap-2">
                            <Label>Nombre</Label>
                            <Input type="text" value={user.nombre} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label>Apellido</Label>
                            <Input type="text" value={user.apellido} disabled />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Teléfono móvil</Label>
                            <div className="flex flex-row gap-2">
                                <Input type="text" className="w-[58px]" value={`+${user.code_country}`} disabled />
                                <Input type="text" size={3} value={user.phone_number} disabled />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Correo electronico</Label>
                            <Input type="email" value={user.email} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="grid gap-2">
                            <Label>Número de documento</Label>
                            <Input type="number" value={user.numero_documento} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label>Rol</Label>
                            <Input
                                type="text"
                                value={`${user.roles?.at(0)?.toUpperCase()}${user.roles?.slice(1)}`}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

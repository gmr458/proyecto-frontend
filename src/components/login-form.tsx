"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoginUserInput, loginUserSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
    const router = useRouter();

    const { toast } = useToast();

    const form = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { setFocus, reset, handleSubmit, control } = form;

    const onSubmit: SubmitHandler<LoginUserInput> = async (values) => {
        const response = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        if (response?.error) {
            console.log({ response });
            if (response.status === 401) {
                reset();
                setFocus("email");
                toast({
                    variant: "destructive",
                    description: "Email o contraseña incorrectos",
                });
            } else {
                toast({
                    variant: "destructive",
                    description: "Error inesperado, intenta más tarde",
                });
            }
        }

        if (response?.ok) {
            toast({ description: "Has iniciado sesión" });
            return router.push("/profile");
        }
    };

    return (
        <Card className="my-10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Inicia sesión</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Correo electronico
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Iniciar sesión</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

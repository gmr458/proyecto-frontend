"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoginUserInput, loginUserSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
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

    const {
        setFocus,
        resetField,
        handleSubmit,
        control,
        formState: { isLoading, isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<LoginUserInput> = async (values) => {
        const response = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        if (response?.error) {
            let toastMessage = "Error inesperado, intenta más tarde";

            if (response.status === 401) {
                toastMessage = "Email o contraseña incorrectos";
            }

            toast({
                variant: "destructive",
                description: toastMessage,
            });
            setFocus("email");
            resetField("password");
        }

        if (response?.ok) {
            toast({ description: "Has iniciado sesión" });
            return router.push("/");
        }
    };

    return (
        <Card className="my-10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Inicia sesión</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electronico</FormLabel>
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
                        <div className="flex flex-col">
                            <Button type="submit" disabled={isLoading || isSubmitting}>
                                {(isLoading || isSubmitting) && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                                Iniciar sesión
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

"use client";

import { useToast } from "./ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserInput, createUserSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { HttpError, apiCreateUser } from "@/lib/fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect } from "react";

export default function CreateUserForm() {
    const { toast } = useToast();
    const { data: session } = useSession();

    const form = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            code_country: "57",
            number: "",
            email: "",
            numero_documento: "",
            contrasena: "",
            contrasenaConfirm: "",
        },
    });

    const {
        setFocus,
        reset,
        handleSubmit,
        control,
        formState: { isSubmitSuccessful, errors, isLoading, isSubmitting },
    } = form;

    useEffect(() => {
        if (!isSubmitSuccessful) {
            if (errors.nombre && errors.nombre.message) {
                toast({
                    variant: "destructive",
                    description: errors.nombre.message,
                });
                return;
            }

            if (errors.apellido && errors.apellido.message) {
                toast({
                    variant: "destructive",
                    description: errors.apellido.message,
                });
                return;
            }

            if (errors.number && errors.number.message) {
                toast({
                    variant: "destructive",
                    description: errors.number.message,
                });
                return;
            }

            if (errors.email && errors.email.message) {
                toast({
                    variant: "destructive",
                    description: errors.email.message,
                });
                return;
            }

            if (errors.numero_documento && errors.numero_documento.message) {
                toast({
                    variant: "destructive",
                    description: errors.numero_documento.message,
                });
                return;
            }

            if (errors.contrasena && errors.contrasena.message) {
                toast({
                    variant: "destructive",
                    description: errors.contrasena.message,
                });
                return;
            }

            if (errors.contrasenaConfirm && errors.contrasenaConfirm.message) {
                toast({
                    variant: "destructive",
                    description: errors.contrasenaConfirm.message,
                });
                return;
            }

            if (errors.rol_id && errors.rol_id.message) {
                toast({
                    variant: "destructive",
                    description: errors.rol_id.message,
                });
                return;
            }
        }
    }, [isSubmitSuccessful, errors, toast]);

    async function createUser(user: CreateUserInput) {
        try {
            const response = await apiCreateUser(user, session?.user.token);
            toast({ description: response.msg });
            reset();
        } catch (err: any) {
            let toastMessage = "Error interno, intenta más tarde";

            if (err instanceof HttpError) {
                if (err.body?.detail) {
                    toastMessage = err.body.detail.msg;
                }

                const cause = err.body?.detail.cause;
                if (cause) {
                    setFocus(
                        cause as
                            | "number"
                            | "nombre"
                            | "apellido"
                            | "code_country"
                            | "email"
                            | "numero_documento"
                            | "contrasena"
                            | "contrasenaConfirm"
                            | "rol_id",
                    );
                }
            }

            toast({ variant: "destructive", description: toastMessage });
        }
    }

    const onSubmit: SubmitHandler<CreateUserInput> = (values) => {
        createUser(values);
    };

    return (
        <Card className="my-10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Crear usuario</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                        <div className="flex flex-row gap-5">
                            <div className="flex flex-col gap-5">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="nombre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="apellido"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apellido</FormLabel>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <FormLabel>Teléfono móvil</FormLabel>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <FormField
                                            control={control}
                                            name="code_country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecciona pais"></SelectValue>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="57">+57</SelectItem>
                                                            <SelectItem value="34">+34</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="text" {...field} size={11} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo electronico</FormLabel>
                                                <FormControl>
                                                    <Input type="email" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="numero_documento"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Número de documento</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={control}
                                        name="contrasena"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contraseña</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={control}
                                        name="contrasenaConfirm"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirma la contraseña</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={control}
                                        name="rol_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Rol</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecciona un rol"></SelectValue>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Administrador</SelectItem>
                                                        <SelectItem value="2">Empleado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading || isSubmitting}>
                            Crear
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

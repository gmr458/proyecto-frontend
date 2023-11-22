"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HttpError, apiCreateUserFromExcel } from "@/lib/fetch";
import { CreateUsersExcel, createUsersExcelSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";

export default function CreateUserFromExcelForm() {
    const { toast } = useToast();
    const { data: session } = useSession();

    const form = useForm<CreateUsersExcel>({
        mode: "onChange",
        resolver: zodResolver(createUsersExcelSchema),
        defaultValues: {
            files: undefined,
        },
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful, errors, isLoading, isSubmitting, isValidating, isSubmitted },
    } = form;

    useEffect(() => {
        if (!isSubmitSuccessful) {
            if (errors.files && errors.files.message) {
                toast({
                    variant: "destructive",
                    description: errors.files.message,
                });
            }
        }

        if (isSubmitted) {
            reset();
            (document.getElementById("fileExcel") as HTMLInputElement).value = "";
        }
    }, [isSubmitSuccessful, isSubmitted, errors, toast, reset]);

    async function createUsers(file: File) {
        try {
            const response = await apiCreateUserFromExcel(file, session?.user.token);
            toast({ description: response.msg });
        } catch (err: any) {
            let toastMessage = "Error interno, intenta más tarde";

            if (err instanceof HttpError) {
                if (err.body?.detail) {
                    toastMessage = err.body.detail.msg;
                }
            }

            toast({
                variant: "destructive",
                description: toastMessage,
            });
        }
    }

    const onSubmit: SubmitHandler<CreateUsersExcel> = async (values) => {
        const file = Array.from(values.files)[0];
        await createUsers(file);
    };

    return (
        <Card className="my-10">
            <CardHeader className="space-y-3">
                <CardTitle className="text-2xl text-center">Desde un archivo Excel</CardTitle>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-5">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="files"
                                        render={({ field: { onChange }, ...field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                                        <Label htmlFor="fileExcel">Archivo Excel</Label>
                                                        <Input
                                                            type="file"
                                                            id="fileExcel"
                                                            multiple={false}
                                                            disabled={form.formState.isSubmitting}
                                                            {...field}
                                                            onChange={(event) => {
                                                                const dataTransfer = new DataTransfer();
                                                                Array.from(event.target.files!).forEach((file) =>
                                                                    dataTransfer.items.add(file),
                                                                );
                                                                const newFiles = dataTransfer.files;
                                                                onChange(newFiles);
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>
                                <Button type="submit" disabled={isLoading || isSubmitting || isValidating}>
                                    {(isLoading || isSubmitting || isValidating) && (
                                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Crear
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </CardHeader>
        </Card>
    );
}

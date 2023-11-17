"use client";

import { HttpError, apiGetAllEmployees } from "@/lib/fetch";
import { apiCreateTask } from "@/lib/fetch/tasks";
import { CreateTask, createTaskSchema } from "@/lib/schemas/task";
import { User } from "@/lib/schemas/user";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CalendarIcon,
    Check,
    ChevronsUpDown,
    DropletsIcon,
    FlaskConicalIcon,
    Loader2Icon,
    RecycleIcon,
    WindIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "./ui/use-toast";

export default function CreateTaskForm() {
    const { toast } = useToast();
    const { data: session } = useSession();
    const [empleados, setEmpleados] = useState<User[]>([]);
    const [popoverEmployeesOpen, setPopoverEmployeesOpen] = useState<boolean>(false);

    const form = useForm<CreateTask>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            titulo: "",
            prioridad: undefined,
            tipo_id: undefined,
            empleado_id: undefined,
            creador_id: null,
            fecha_limite: undefined,
            evidencia: "",
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
        async function fetchEmployees() {
            if (session?.user.token) {
                const {
                    data: { users },
                } = await apiGetAllEmployees(session?.user.token);
                setEmpleados(users);
            }
        }

        fetchEmployees();

        if (!isSubmitSuccessful) {
            if (errors.titulo && errors.titulo.message) {
                toast({
                    variant: "destructive",
                    description: errors.titulo.message,
                });
                return;
            }

            if (errors.prioridad && errors.prioridad.message) {
                toast({
                    variant: "destructive",
                    description: errors.prioridad.message,
                });
                return;
            }

            if (errors.empleado_id && errors.empleado_id.message) {
                toast({
                    variant: "destructive",
                    description: errors.empleado_id.message,
                });
                return;
            }

            if (errors.fecha_limite && errors.fecha_limite.message) {
                toast({
                    variant: "destructive",
                    description: errors.fecha_limite.message,
                });
                return;
            }
        }
    }, [isSubmitSuccessful, errors, toast, session?.user.token]);

    async function createTask(task: CreateTask) {
        try {
            const response = await apiCreateTask(task, session?.user.token);
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
                    setFocus(cause as "titulo" | "prioridad" | "empleado_id" | "tipo_id" | "fecha_limite");
                }
            }

            toast({ variant: "destructive", description: toastMessage });
        }
    }

    const onSubmit: SubmitHandler<CreateTask> = (values) => {
        createTask(values);
    };

    return (
        <Card className="my-10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Crear tarea</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-1">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="titulo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Titulo</FormLabel>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1">
                                    <FormField
                                        control={control}
                                        name="prioridad"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prioridad</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecciona la prioridad"></SelectValue>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="baja">
                                                            <div className="flex items-center">
                                                                <ArrowDownIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                                                <span>Baja</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="media">
                                                            <div className="flex items-center">
                                                                <ArrowRightIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                                                <span>Media</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="alta">
                                                            <div className="flex items-center">
                                                                <ArrowUpIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                                                <span>Alta</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={control}
                                        name="tipo_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tipo</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecciona el tipo"></SelectValue>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">
                                                            <div className="flex items-center">
                                                                <FlaskConicalIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                                                <span>Quimico</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="2">
                                                            <div className="flex items-center">
                                                                <DropletsIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                                                <span>Agua</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="3">
                                                            <div className="flex items-center">
                                                                <WindIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                                                <span>Aire</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="4">
                                                            <div className="flex items-center">
                                                                <RecycleIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                                                <span>Reciclaje</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1 mt-1">
                                    <FormField
                                        control={control}
                                        name="empleado_id"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="">Empleado</FormLabel>
                                                <Popover
                                                    open={popoverEmployeesOpen}
                                                    onOpenChange={setPopoverEmployeesOpen}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "flex justify-between w-[230px] px-3 py-2",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? empleados.find(
                                                                          (language) => language.id === field.value,
                                                                      )?.email
                                                                    : "Selecciona un empleado"}
                                                                <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Busca un empleado..." />
                                                            <ScrollArea className="h-[220px]">
                                                                <CommandEmpty>Empleado no encontrado.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {empleados.map((employee) => (
                                                                        <CommandItem
                                                                            value={employee.email}
                                                                            key={employee.id}
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    "empleado_id",
                                                                                    employee.id,
                                                                                );
                                                                                setPopoverEmployeesOpen(false);
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    employee.id === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0",
                                                                                )}
                                                                            />
                                                                            {employee.email}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </ScrollArea>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1 mt-1">
                                    <FormField
                                        control={form.control}
                                        name="fecha_limite"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Fecha limite</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "text-left font-normal px-3 py-2",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Selecciona una fecha</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => date < new Date()}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading || isSubmitting}>
                            {(isLoading || isSubmitting) && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                            Crear
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

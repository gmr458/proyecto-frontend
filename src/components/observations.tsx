"use client";

import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState, useRef } from "react";
import { SendIcon, Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { CreateObservation, Observation, createObservationSchema } from "@/lib/schemas/observation";
import { useSession } from "next-auth/react";
import { apiCreateObservation, apiGetAllObservationsByTaskId } from "@/lib/fetch/observations";
import { HttpError } from "@/lib/fetch";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { getRelativeTime, formatDate } from "@/lib/utils";
import { ToastErrorMessage, ToastSuccessMessage } from "./toast-message";
import { useToast } from "./ui/use-toast";

interface ObservationsProps {
    taskId: number;
}

export function Observations({ taskId }: ObservationsProps) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [observations, setObservations] = useState<Observation[]>([]);
    const [loadingObservations, setLoadingObservations] = useState(true);
    const [observationsFirstFetch, setObservationsFirstFetch] = useState(false);

    const form = useForm<CreateObservation>({
        resolver: zodResolver(createObservationSchema),
        defaultValues: {
            contenido: "",
            creador_id: null,
        },
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful, errors, isLoading, isSubmitting, isValid },
    } = form;

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchObservations() {
            if (session?.user.token) {
                try {
                    const response = await apiGetAllObservationsByTaskId(taskId, session.user.token);
                    setLoadingObservations(false);
                    setObservations(response.observaciones);
                    setObservationsFirstFetch(true);
                } catch (err: any) {
                    console.error(err);
                    setLoadingObservations(false);
                }
            } else {
                setLoadingObservations(true);
            }
        }

        if (observationsFirstFetch === false) {
            fetchObservations();
        }

        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }

        if (!isSubmitSuccessful) {
            if (errors.contenido && errors.contenido.message) {
                toast({
                    variant: "destructive",
                    description: <ToastErrorMessage message={errors.contenido.message} />,
                });
                return;
            }
        }
    }, [
        session?.user.token,
        taskId,
        observations,
        observationsFirstFetch,
        errors.contenido,
        isSubmitSuccessful,
        toast,
    ]);

    async function createObservation(observation: CreateObservation) {
        try {
            const response = await apiCreateObservation(observation, taskId, session?.user.token);
            setObservations([...observations, response.observacion]);
            toast({ description: <ToastSuccessMessage message={response.msg} /> });
            reset();
        } catch (err: any) {
            let toastMessage = "Error interno, intenta más tarde";

            if (err instanceof HttpError) {
                if (err.body?.detail) {
                    toastMessage = err.body.detail.msg;
                }
            }

            toast({ variant: "destructive", description: <ToastErrorMessage message={toastMessage} /> });
        }
    }

    const onSubmit: SubmitHandler<CreateObservation> = async (values) => {
        await createObservation(values);
    };

    return (
        <div>
            <ScrollArea className="h-[58vh] p-3" ref={scrollAreaRef}>
                <div className="flex flex-col gap-2 space-y-4 p-1">
                    {observations.map((message, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="w-full break-all rounded-md border p-3">
                                <div className="flex flex-row justify-between">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <p className="text-xs text-muted-foreground">
                                                    {session?.user.email === message.creador_email
                                                        ? "Tú"
                                                        : message.creador_email}
                                                </p>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    {session?.user.email === message.creador_email
                                                        ? message.creador_email
                                                        : `${message.creador_nombre} ${message.creador_apellido}`}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <p className="text-xs text-muted-foreground">
                                                    {getRelativeTime(message.fecha_creacion, "es")}
                                                </p>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{formatDate(message.fecha_creacion)}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <p className="pt-3">{message.contenido}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-end gap-2 pt-3">
                        <FormField
                            control={form.control}
                            name="contenido"
                            render={({ field }) => (
                                <FormItem className="flex w-full">
                                    <FormControl>
                                        <Input type="text" placeholder="Escribe una observación..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            className="m-0"
                            type="submit"
                            size="icon"
                            disabled={isLoading || isSubmitting || isValid === false}
                        >
                            {((isLoading || isSubmitting) && <Loader2Icon className="h-4 w-4 animate-spin" />) || (
                                <SendIcon className="h-4 w-4" />
                            )}
                            <span className="sr-only">Enviar</span>
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

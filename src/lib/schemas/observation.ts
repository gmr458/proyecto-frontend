import { z } from "zod";

// CREATE TABLE `observacion` (
//   `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
//   `tarea_id` integer NOT NULL,
//   `creador_id` integer NOT NULL,
//   `contenido` varchar(255) NOT NULL,
//   `fecha_creacion` timestamp NOT NULL DEFAULT (now()),
//   `eliminado` boolean NOT NULL DEFAULT false
// );

export const observationSchema = z.object({
    id: z.number(),
    tarea_id: z.number(),
    creador_id: z.number(),
    creador_nombre: z.string(),
    creador_apellido: z.string(),
    creador_email: z.string(),
    contenido: z.string(),
    fecha_creacion: z.string(),
});

export type Observation = z.infer<typeof observationSchema>;

export const createObservationSchema = z.object({
    creador_id: z.number().nullish(),
    contenido: z
        .string({ required_error: "El contenido de la observación es requerido" })
        .min(1, "El contenido de la observación es requerido"),
});

export type CreateObservation = z.infer<typeof createObservationSchema>;

export const responseCreateObservation = z.object({
    msg: z.string(),
    observacion: observationSchema,
});

export type ResponseCreateObservation = z.infer<typeof responseCreateObservation>;

export const observationsTask = z.object({
    observaciones: z.array(observationSchema),
    tarea_id: z.number(),
});

export type ObservationsTask = z.infer<typeof observationsTask>;

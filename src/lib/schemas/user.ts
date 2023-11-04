import { z } from "zod";

export const createUserSchema = z
    .object({
        nombre: z
            .string({
                required_error: "El nombre es requerido",
            })
            .min(1, "El nombre es requerido")
            .min(2, "El nombre debe tener minimo 2 caracteres")
            .max(15, "El nombre debe tener maximo 15 caracteres"),
        apellido: z
            .string({
                required_error: "El apellido es requerido",
            })
            .min(1, "El apellido es requerido")
            .min(2, "El apellido debe tener minimo 2 caracteres")
            .max(15, "El apellido debe tener maximo 15 caracteres"),
        code_country: z.string({
            required_error: "El codigo del pais del telefono es requerido",
        }),
        number: z
            .string({ required_error: "El telefono es requerido" })
            .min(1, "El telefono es requerido")
            .length(10, "El número de telefono movil debe tener 10 caracteres numericos"),
        email: z
            .string({
                required_error: "El email es requerido",
            })
            .min(1, "El email es requerido")
            .email("Email invalido"),
        numero_documento: z
            .string({
                required_error: "El número de documento de identidad es requerido",
            })
            .min(1, "El número de documento de identidad es requerido")
            .min(7, "El numero de documento de identidad debe tener minimo 7 caracteres numericos")
            .max(10, "El numero de documento de identidad debe tener maximo 10 caracteres numericos"),
        contrasena: z
            .string({
                required_error: "La contraseña es requirida",
            })
            .min(1, "La contraseña es requirida")
            .min(8, "La contraseña debe tener minimo 8 caracteres")
            .max(32, "La contraseña debe tener maximo 32 caracteres"),
        contrasenaConfirm: z
            .string({
                required_error: "Confirme la contraseña",
            })
            .min(1, "Confirme la contraseña"),
        rol_id: z.string({ required_error: "Selecciona un rol" }),
    })
    .refine((data) => data.contrasena === data.contrasenaConfirm, {
        path: ["contrasenaConfirm"],
        message: "Las contraseñas no coinciden",
    });

export type CreateUserInput = z.infer<typeof createUserSchema>;

const MAX_SIZE_EXCEL_FILE = 5242880;
const ALLOWED_FILETYPES = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
];

export const createUserFromExcelSchema = z.object({
    files: z
        .custom<FileList>((value) => value instanceof FileList, "Selecciona un archivo Excel")
        .refine((files) => files.length > 0, "Selecciona un archivo Excel")
        .refine((files) => files.length < 2, "Maximo un solo archivo")
        .refine(
            (files) => Array.from(files).every((file) => file.size <= MAX_SIZE_EXCEL_FILE),
            "El archivo debe ser menor o igual a 5MB",
        )
        .refine(
            (files) => Array.from(files).every((file) => ALLOWED_FILETYPES.includes(file.type)),
            "Solo se permiten archivos Excel",
        ),
});

export type CreateUserFromExcelInput = z.infer<typeof createUserFromExcelSchema>;

export const loginUserSchema = z.object({
    email: z
        .string({
            required_error: "El correo electronico es requerido",
        })
        .min(1, "El correo electronico es requerido")
        .email("El correo electronico es invalido"),
    password: z
        .string({
            required_error: "La contraseña es requerida",
        })
        .min(1, "La contraseña es requerida"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;

const responseUserSchema = z.object({
    id: z.number().positive(),
    nombre: z.string(),
    apellido: z.string(),
    code_country: z.string(),
    number: z.string(),
    email: z.string().email(),
    numero_documento: z.string(),
    fecha_creacion: z.string(),
    activado: z.boolean().or(z.number()),
});

export type ResponseUser = z.infer<typeof responseUserSchema>;

export const responseCreateUserSchema = z.object({
    msg: z.string(),
    data: z.object({
        user: responseUserSchema,
    }),
});

export type ResponseCreateUser = z.infer<typeof responseCreateUserSchema>;

export const responseCreateUsersFromExcelSchema = z.object({
    msg: z.string(),
    data: z.object({
        users_created: z.array(responseUserSchema),
    }),
});

export type ResponseCreateUsersFromExcel = z.infer<typeof responseCreateUsersFromExcelSchema>;

export const resUserTopSchema = responseUserSchema.extend({ tareas_ejecutadas: z.number() });

export type ResUserTop = z.infer<typeof resUserTopSchema>;

export const resTopUsersTasksExecutedSchema = z.object({
    msg: z.string(),
    data: z.object({
        users: z.array(resUserTopSchema),
    }),
});

export type ResTopUsersTasksExecuted = z.infer<typeof resTopUsersTasksExecutedSchema>;

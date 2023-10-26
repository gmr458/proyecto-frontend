import { z } from "zod";

export const registerUserSchema = z
    .object({
        name: z
            .string({
                required_error: "Name is required",
            })
            .min(1, "Full name is required"),
        email: z
            .string({
                required_error: "Email is required",
            })
            .min(1, "Email is required")
            .email("Email is invalid"),
        photo: z.string().optional(),
        password: z
            .string({
                required_error: "Password is required",
            })
            .min(1, "Password is required")
            .min(8, "Password must be more than 8 characters")
            .max(32, "Password must be less than 32 characters"),
        passwordConfirm: z
            .string({
                required_error: "Confirm your password",
            })
            .min(1, "Confirm your password"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "Passwords do not match",
    });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

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

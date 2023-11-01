import {
    CreateUserInput,
    ResponseCreateUser,
    responseCreateUserSchema,
} from "../schemas/user";
import { z } from "zod";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export class HttpError extends Error {
    constructor(
        public status: number,
        message: string,
        public body?: {
            detail: {
                msg: string;
                cause: string;
            };
        },
    ) {
        super(message);
        this.status = status;
    }
}

function newHttpError(
    reason: string,
    response: Response,
    method?: string,
    body?: any,
) {
    const text = response.text().catch(() => null);
    const message = `Error fetching ${method} ${response.url} ${response.status}. ${reason}`;
    console.error(`${message}. Response body: ${text}`);
    return new HttpError(response.status, message, body);
}

export async function safeFetch<T>(
    schema: z.Schema<T>,
    input: RequestInfo,
    init?: RequestInit,
): Promise<T> {
    const response = await fetch(input, init);

    const json = await response.json().catch(() => {
        throw newHttpError("Not a JSON body", response, init?.method);
    });

    if (!response.ok) {
        throw newHttpError(
            "Unsuccessful response",
            response,
            init?.method,
            json,
        );
    }

    const result = schema.safeParse(json);
    if (!result.success) {
        throw newHttpError(
            "Unexpected response schema",
            response,
            init?.method,
        );
    }

    return result.data;
}

export async function apiCreateUser(
    user: CreateUserInput,
    token?: string,
): Promise<ResponseCreateUser> {
    const userCreated = await safeFetch(
        responseCreateUserSchema,
        `${NEXT_PUBLIC_API_URL}/api/usuarios`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: user.nombre,
                apellido: user.apellido,
                code_country: user.code_country,
                phone_number: user.number,
                email: user.email,
                numero_documento: user.numero_documento,
                contrasena: user.contrasena,
                rol_id: parseInt(user.rol_id),
            }),
        },
    );

    return userCreated;
}

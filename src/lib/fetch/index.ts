import { User, UserLoginResponse } from "@/lib/types";

const SERVER_URL = process.env.SERVER_URL || "http://127.0.0.1:8000/api";

async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        if (isJson && data.detail !== null) {
            throw new Error(JSON.stringify(data.detail));
        }

        throw new Error(response.statusText);
    }

    return data as T;
}

export async function apiRegisterUser(credentials: string): Promise<User> {
    const response = await fetch(`${SERVER_URL}/usuarios`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: credentials,
    });

    return handleResponse<User>(response).then((user) => user);
}

export async function apiLoginUser(credentials: string): Promise<string> {
    const response = await fetch(`${SERVER_URL}/usuarios/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: credentials,
    });

    return handleResponse<UserLoginResponse>(response).then(
        (data) => data.access_token,
    );
}

// export async function apiLogoutUser(): Promise<void> {
//     const response = await fetch(`${SERVER_URL}/usuarios/logout`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     return handleResponse<void>(response);
// }

export async function apiGetAuthUser(token: string | null): Promise<User> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${SERVER_URL}/usuarios/perfil`, {
        method: "GET",
        credentials: "include",
        headers,
    });

    console.log(response);

    return handleResponse<User>(response).then((user) => user);
}

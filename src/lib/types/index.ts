export interface User {
    id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    numero_documento: string;
    activado: boolean;
    fecha_creacion: string;
}

export interface UserLoginResponse {
    access_token: string;
    token_type: string;
}

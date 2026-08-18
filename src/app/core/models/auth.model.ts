export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface CurrentUser {
    id: string;
    nama: string;
    email: string;
    nip: string;
    jabatan: string;
    roles: string[];
}

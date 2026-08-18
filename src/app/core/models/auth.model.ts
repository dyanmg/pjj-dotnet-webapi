export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  nama: string;
  nip: string;
  jabatan: string;
  tanggalMasuk: string;
  roles: string[];
}
import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';

@Service()
export class AuthApiService {
    private readonly _baseUrl = 'http://localhost:5000';
    private readonly _httpClient = inject(HttpClient);

    register(data: any): Observable<any> {
        return this._httpClient.post(`${this._baseUrl}/api/Account/register-pegawai`, data)
            .pipe(
                map((response: any) => response.data)
            );
    }

    login(request: LoginRequest) {
        return this._httpClient.post<LoginResponse>(`${this._baseUrl}/login`, request);
    }
}

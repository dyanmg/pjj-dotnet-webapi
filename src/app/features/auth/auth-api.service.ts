import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CurrentUser } from '@core/models/session.model';
import { map, Observable } from 'rxjs';

@Service()
export class AuthApiService {
    private readonly _baseUrl = 'http://localhost:8080';
    private readonly _httpClient = inject(HttpClient);

    register(data: any): Observable<any> {
        return this._httpClient.post(`${this._baseUrl}/api/Account/register-pegawai`, data)
            .pipe(
                map((response: any) => response.data)
            );
    }

    login(data: any): Observable<any> {
        return this._httpClient.post(`${this._baseUrl}/login`, data);
    }

    getUserInfo(): Observable<CurrentUser> {
        return this._httpClient.get(`${this._baseUrl}/api/Account/manage/info-pegawai`)
            .pipe(
                map((response: any) => response.data as CurrentUser)
            );
    }
}

import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';

@Service()
export class AuthApiService {
    private readonly _baseUrl = 'http://localhost:5000/api/Account';
    private readonly _httpClient = inject(HttpClient);

    register(data: any): Observable<any> {
        return this._httpClient.post(`${this._baseUrl}/register-pegawai`, data)
            .pipe(
                map((response: any) => response.data)
            );
    }
}

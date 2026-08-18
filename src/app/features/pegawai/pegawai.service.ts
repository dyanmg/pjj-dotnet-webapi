import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map } from 'rxjs';
import { Pegawai } from './pegawai.model';

@Service()
export class PegawaiService {
    private readonly _baseUrl = 'http://localhost:5000/api/Pegawai';
    private readonly _httpClient = inject(HttpClient);

    getAll() {
        return this._httpClient.get(`${this._baseUrl}`)
            .pipe(
                map((response: any) => {
                    return response.data?.items as Pegawai[];
                })
            );
    }

    create(payload: Pegawai) {
        return this._httpClient.post(`${this._baseUrl}`, payload)
            .pipe(
                map((response: any) => {
                    return response.data as Pegawai;
                })
            );
    }

    delete(id: string) {
        return this._httpClient.delete(`${this._baseUrl}/${id}`)
            .pipe(
                map((response: any) => {
                    return response.data as Pegawai;
                })
            );
    }
}

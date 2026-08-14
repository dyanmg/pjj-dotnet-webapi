import { inject, Service } from '@angular/core';
import { Kategori } from './kategori.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Service()
export class KategoriService {
    private readonly _baseUrl: string = 'http://localhost:5198/api'
    private readonly _httpClient: HttpClient = inject(HttpClient);
    
    public getKategoriList(): Observable<Kategori[]> {
        return this._httpClient.get<Kategori[]>(`${this._baseUrl}/kategori`)
            .pipe(
                map((response: any) => response.data as Kategori[])
            );
    }

    public addKategori(data: any): Observable<Kategori> {
        return this._httpClient.post<Kategori>(`${this._baseUrl}/kategori`, data)
            .pipe(
                map((response: any) => response.data as Kategori)
            );
    }
}

import { Component, inject, signal } from '@angular/core';
import { KategoriService } from '../../kategori.service';
import { Kategori } from '../../kategori.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-kategori-list',
  imports: [MatTableModule],
  templateUrl: './kategori-list.page.html',
  styleUrl: './kategori-list.page.css',
})
export class KategoriListPage {
  private readonly _kategoriService: KategoriService = inject(KategoriService);

  data = signal<Kategori[]>([]);
  displayedColumns = signal<string[]>(['id', 'nama']);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this._kategoriService.getKategoriList()
      .subscribe((result: Kategori[]) => {
        this.data.set(result);
      });
  }
}

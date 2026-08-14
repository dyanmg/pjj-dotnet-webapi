import { Component, inject, outputBinding, signal } from '@angular/core';
import { KategoriService } from '../../kategori.service';
import { Kategori } from '../../kategori.model';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { KategoriFormDialogComponent } from '../../componens/kategori-form-dialog/kategori-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-kategori-list',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './kategori-list.page.html',
  styleUrl: './kategori-list.page.css',
})
export class KategoriListPage {
  private readonly _kategoriService: KategoriService = inject(KategoriService);
  private readonly _dialog: MatDialog = inject(MatDialog);

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

  openFormDialog(): void {
    this._dialog.open(KategoriFormDialogComponent, {
      bindings: [
        outputBinding('formData', (data: any) => {
          this.handleFormSubmit(data);
        })
      ]
    });
  }

  private handleFormSubmit(data: any): void {
    const payload: any = {
      // id: data.id != null || data.id !== '' ? data.id : null,
      nama: data.nama
    }

    if (data.id != null && data.id !== '') {
      payload['id'] = data.id;
    }
    this._kategoriService.addKategori(payload)
      .subscribe((result: Kategori) => {
        alert(`Kategori ${result.nama} berhasil ditambahkan!`);
        this.loadData();
      })
  }
}

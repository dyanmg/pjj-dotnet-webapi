import { Component, inject, inputBinding, outputBinding, signal } from '@angular/core';
import { KategoriService } from '../../kategori.service';
import { Kategori } from '../../kategori.model';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { KategoriFormDialogComponent } from '../../componens/kategori-form-dialog/kategori-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kategori-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './kategori-list.page.html',
  styleUrl: './kategori-list.page.css',
})
export class KategoriListPage {
  private readonly _kategoriService: KategoriService = inject(KategoriService);
  private readonly _dialog: MatDialog = inject(MatDialog);

  data = signal<Kategori[]>([]);
  displayedColumns = signal<string[]>(['id', 'nama', 'actions']);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this._kategoriService.getKategoriList()
      .subscribe((result: Kategori[]) => {
        this.data.set(result);
      });
  }

  openFormDialog(item?: Kategori): void {
    this._dialog.open(KategoriFormDialogComponent, {
      bindings: [
        inputBinding('data', () => item || { id: '', nama: ''}),
        outputBinding('formData', (data: any) => {
          this.handleFormSubmit(data, item?.id != null && item?.id !== '', item?.nama);
        })
      ]
    });
  }

  private handleFormSubmit(data: any, isEdit: boolean, namaLama?: string): void {
    const payload: any = {
      // id: data.id != null || data.id !== '' ? data.id : null,
      nama: data.nama
    }

    if (data.id != null && data.id !== '') {
      payload['id'] = data.id;
    }

    if (isEdit) {
      this._kategoriService.updateKategori(data.id, payload)
        .subscribe((result: Kategori) => {
          alert(`Kategori ${namaLama} berhasil diperbaharui!`);
          this.loadData();
        });
    } else {
      this._kategoriService.addKategori(payload)
      .subscribe((result: Kategori) => {
        alert(`Kategori ${result.nama} berhasil ditambahkan!`);
        this.loadData();
      });
    }
  }
}

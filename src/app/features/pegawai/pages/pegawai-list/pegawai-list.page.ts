import { Component, inject, inputBinding, outputBinding, signal } from '@angular/core';
import { PegawaiService } from '../../pegawai.service';
import { Pegawai } from '../../pegawai.model';
import { MatTableModule } from '@angular/material/table';
import { PegawaiFormDialog } from '../../components/pegawai-form/pegawai-form.dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { TokenStorageService } from '@core/services/token-storage.service';
import { AuthorizedOnlyComponent } from '@shared/components/authorized-only/authorized-only.component';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-pegawai-list',
  imports: [MatTableModule, MatButtonModule, MatSnackBarModule, AuthorizedOnlyComponent, MatIcon],
  templateUrl: './pegawai-list.page.html',
  styleUrl: './pegawai-list.page.css',
})
export class PegawaiListPage {
  private readonly _pegawaiService = inject(PegawaiService);
  private readonly _dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  data = signal<Pegawai[]>([]);
  displayedColumns = signal<string[]>(['id', 'nip', 'nama', 'jabatan', 'actions']);

  constructor() {
    this.loadData();
  }

  loadData() {
    this._pegawaiService.getAll()
      .subscribe((result: Pegawai[]) => {
        this.data.set(result);
      });
  }

  openFormDialog(item?: Pegawai): void {
    const dialogRef = this._dialog.open(PegawaiFormDialog, {
      bindings: [
        inputBinding('data', () => item),
        outputBinding('formData', (data: Pegawai) => {
          this.handleFormSubmit(data, dialogRef);
        })
      ]
    });
  }

  private handleFormSubmit(data: Pegawai, dialogRef: MatDialogRef<PegawaiFormDialog>): void {
    if (data.id == null || data.id === '') {
      data.id = crypto.randomUUID();
    }

    this._pegawaiService.create(data)
      .subscribe({
        next: (_) => {
          dialogRef.close();
          this._snackBar.open('Berhasil menambahkan pegawai baru', 'Tutup', { duration: 3000 });
          this.loadData();
        },
        error: (_) => {
          this._snackBar.open('Gagal menambahkan pegawai baru', 'Tutup', { duration: 3000 });
        }
      });
  }

  onDelete(item: Pegawai) {
    if (!confirm(`Apakah Anda yakin ingin menghapus pegawai ${item.nama}?`)) {
      return;
    }
    
    this._pegawaiService.delete(item.id)
      .subscribe({
        next: (_) => {
          this._snackBar.open('Berhasil menghapus pegawai', 'Tutup', { duration: 3000 });
          this.loadData();
        },
        error: (_) => {
          this._snackBar.open('Gagal menghapus pegawai', 'Tutup', { duration: 3000 });
        }
      });
  }
}

import { Component, computed, effect, inject, input, output, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogActions, MatDialogRef, MatDialogClose, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { Pegawai } from '../../pegawai.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatDatepicker, MatDatepickerToggle, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pegawai-form',
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
    MatInput,
    MatDialogTitle,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatSuffix,
    MatDatepickerModule
],
  templateUrl: './pegawai-form.dialog.html',
  styleUrl: './pegawai-form.dialog.css',
  providers: [DatePipe]
})
export class PegawaiFormDialog {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _dialogRef: MatDialogRef<PegawaiFormDialog> = inject(MatDialogRef<PegawaiFormDialog>);
  private readonly _datePipe: DatePipe = inject(DatePipe);

  readonly data = input<Pegawai>();
  readonly formData = output<Pegawai>();
  readonly isEdit = computed(() => this.data()?.id !== '');
  readonly isView = input<boolean>(false);

  readonly form = this._formBuilder.group({
    id: [''],
    nama: [''],
    nip: [''],
    jabatan: [''],
    gaji: [null],
    tanggalMasuk: [''],
  })

  constructor() {
    effect(() => {
      untracked(() => {
        const data = this.data();
        if (data != null) {
          this.form.patchValue(data as any);
        }
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data = {
        ...this.form.value,
        tanggalMasuk: this._datePipe.transform(this.form.value.tanggalMasuk, 'yyyy-MM-dd')
      }
      this.formData.emit(data as any);
    }
  }
}

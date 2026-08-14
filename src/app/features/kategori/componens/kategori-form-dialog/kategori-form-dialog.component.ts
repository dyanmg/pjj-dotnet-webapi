import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-kategori-form-dialog',
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './kategori-form-dialog.component.html',
  styleUrl: './kategori-form-dialog.component.css',
})
export class KategoriFormDialogComponent {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _dialogRef: MatDialogRef<KategoriFormDialogComponent> =
    inject(MatDialogRef<KategoriFormDialogComponent>);

  data = input<any>();
  formData = output<any>();
  isEdit = computed(() => this.data()?.id != null && this.data()?.id !== '');

  form = this._formBuilder.group({
    id: [''],
    nama: [''],
  })

  constructor() {
    effect(() => {
      const data = this.data();
      if (this.data != null) {
        this.form.patchValue(data);
      }
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.formData.emit(this.form.value);
      this._dialogRef.close();
    }
  }
}

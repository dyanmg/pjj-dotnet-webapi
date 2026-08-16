import { Component, computed, effect, inject, input, output, untracked } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    MatButtonModule,
],
  templateUrl: './kategori-form-dialog.component.html',
  styleUrl: './kategori-form-dialog.component.css',
})
export class KategoriFormDialogComponent {
  private readonly _formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly _dialogRef: MatDialogRef<KategoriFormDialogComponent> =
    inject(MatDialogRef<KategoriFormDialogComponent>);

  readonly data = input<any>({ id: '', nama: ''});
  readonly isView = input<boolean>(false);
  readonly formData = output<any>();
  readonly isEdit = computed(() => this.data().id !== '');

  readonly form = this._formBuilder.group({
    id: [{ value: '' }],
    nama: [{ value: ''}],
  })

  constructor() {
    effect(() => {  
      untracked(() => {
        const data = this.data();
        if (this.data != null) {
          this.form.patchValue(data);
        }
      });
    })
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.formData.emit(this.form.value);
      this._dialogRef.close();
    }
  }
}

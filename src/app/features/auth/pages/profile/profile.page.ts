import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInput],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css',
})
export class ProfilePage {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);

  form = this._formBuilder.group({
    id: ['-'],
    nama: ['-'],
    email: ['-'],
    nip: ['-'],
    jabatan: ['-'],
    gaji: ['-'],
    password: ['-'],
  });

  constructor() {
    effect(() => {
      const currentUser = this._authService.currentUser();
      if (currentUser) {
        this.form.patchValue({
          id: currentUser.id,
          nama: currentUser.nama,
          email: currentUser.email,
          nip: currentUser.nip,
          jabatan: currentUser.jabatan,
        });
      }
    });
  }
}

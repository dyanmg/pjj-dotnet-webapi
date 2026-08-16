import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SessionStore } from '@core/services/session.store';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInput],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css',
})
export class ProfilePage {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _sessionStore: SessionStore = inject(SessionStore);

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
      const currentUser = this._sessionStore.currentUser();
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

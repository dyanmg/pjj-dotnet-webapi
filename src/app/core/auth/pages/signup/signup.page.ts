import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.css',
})
export class SignupPage {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);

  form = this._formBuilder.group({
    id: [crypto.randomUUID()],
    nama: [''],
    email: [''],
    nip: [''],
    jabatan: [''],
    gaji: [null],
    password: [''],
  });

  onSubmit(): void {
    this._authService.register(this.form.value)
      .subscribe((result: any) => {
        alert('Registrasi berhasil!');
      });
  }
}

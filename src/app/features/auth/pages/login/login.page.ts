import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInput, MatButton, RouterLink, MatProgressSpinner],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);

  readonly errorMessage = signal<string | null>(null);
  readonly submitting = signal(false);

  form = this._formBuilder.group({
    email: [''],
    password: [''],
  });

  onSubmit(): void {
    this.submitting.set(true);
    this._authService.login(this.form.value as LoginRequest)
      .subscribe({
        next: (response) => {
              this.submitting.set(false);
              if (response != null) {
                  this._snackBar.open('Login berhasil', 'Tutup', { duration: 3000 });
                  this._router.navigateByUrl('/');
              } else {
                  this.errorMessage.set('Username atau password salah');
              }
            },
        error: () => {
          this.submitting.set(false);
          this.errorMessage.set('Login gagal. Silakan coba lagi.');
        }
      });
  }
}

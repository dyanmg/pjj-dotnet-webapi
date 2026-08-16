import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from '../../auth-api.service';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { SessionStore } from '@core/services/session.store';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest } from '../../auth.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInput, MatButton, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _sessionStore: SessionStore = inject(SessionStore);
  private readonly _router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);

  form = this._formBuilder.group({
    email: [''],
    password: [''],
  });

  onSubmit(): void {
    this._authService.login(this.form.value as LoginRequest)
      .subscribe({
        next: (_) => {
              this._snackBar.open('Login berhasil', 'Close', { duration: 3000 });
              this._router.navigate(['/profile']);
            },
        error: () => {
          alert('Login gagal');
        }
      });
  }
}

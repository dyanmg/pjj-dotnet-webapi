import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from '../../../../core/services/auth-api.service';
import { LoginRequest } from '../../../../core/models/auth.model';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButtonModule
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router = inject(Router);

  form = this._formBuilder.group({
    email: [''],
    password: [''],
  });

  onSubmit(): void {
    this._authService.login(this.form.value as LoginRequest)
      .subscribe((result: any) => {
        if (result != null) {
          this._router.navigateByUrl('/kategori');
        } else {
          alert('Login gagal!');
        }
      });
  }
}

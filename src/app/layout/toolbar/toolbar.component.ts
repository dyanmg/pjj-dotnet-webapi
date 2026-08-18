import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TokenStorageService } from '@core/services/token-storage.service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  private readonly _authService = inject(AuthService);

  nama = signal<string>('')

  constructor() {
    effect(() => {
      const currentUser = this._authService.currentUser();
      if (currentUser) {
        this.nama.set(currentUser.nama);
      }
    });
  }
  
  onLogout() {
    this._authService.logout();
  }
}

import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { SessionStore } from '@core/services/session.store';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  private readonly _authService = inject(AuthService);
  private readonly _sessionStore = inject(SessionStore);

  nama = signal<string>('')

  constructor() {
    effect(() => {
      const currentUser = this._sessionStore.currentUser();
      if (currentUser) {
        this.nama.set(currentUser.nama);
      }
    });
  }
  
  onLogout() {
    this._authService.logout();
  }
}

import { Component, inject, input } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-authorized-only',
  imports: [],
  templateUrl: './authorized-only.component.html',
  styleUrl: './authorized-only.component.css',
})
export class AuthorizedOnlyComponent {
  private readonly _authService = inject(AuthService);

  role = input<string>();
  jabatan = input<string>();

  hasRole(): boolean {
    const role = this.role();

    if (this.role() == null) {
      return true;
    }

    const currentUser = this._authService.currentUser();
    return currentUser?.roles?.includes(role as string) || false;
  }

  hasJabatan(): boolean {
    const jabatan = this.jabatan();

    if (this.jabatan() == null) {
      return true;
    }

    const currentUser = this._authService.currentUser();
    return currentUser?.jabatan?.toLowerCase() === jabatan?.toLowerCase() || false;
  }
}

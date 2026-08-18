import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

function createAuthGuard(requireAuth: boolean, redirectUrl: string): CanActivateFn {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated() != requireAuth) {
      router.navigateByUrl(redirectUrl);
      return false;
    }

    return true;
  };
}

export const requireAuthGuard: CanActivateFn = createAuthGuard(true, '/login'); 
export const requireNoAuthGuard: CanActivateFn = createAuthGuard(false, '/');
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '@core/services/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionStore = inject(TokenStorageService);
  const token = sessionStore.accessToken();

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};

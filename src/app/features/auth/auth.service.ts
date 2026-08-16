import { inject, Service } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { LoginRequest } from './auth.model';
import { SessionStore } from '@core/services/session.store';
import { concatMap, map, mergeMap, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Service()
export class AuthService {
    private readonly _authApiService: AuthApiService = inject(AuthApiService);
    private readonly _sessionStore = inject(SessionStore);
    private readonly _router = inject(Router);

    login(request: LoginRequest) {
        return this._authApiService.login(request)
            .pipe(
                concatMap((response) => {
                    this._sessionStore.setToken(response.accessToken);
                    return this._authApiService.getUserInfo();
                }),
                map((userInfo) => {
                    this._sessionStore.setCurrentUser(userInfo);
                    return userInfo;
                })
            );
    }

    logout() {
        this._sessionStore.clearSession();
        this._router.navigate(['/login']);
    }

    initializeSession() {
        const token = this._sessionStore.loadToken();
        
        if (token) {
            this._authApiService.getUserInfo()
                .subscribe({
                    next: (userInfo) => {
                        this._sessionStore.setCurrentUser(userInfo);
                    },
                    error: (error) => {
                        this._sessionStore.clearSession();
                        console.error('Failed to fetch user info during session initialization');
                    }
                });
        }
    }
}

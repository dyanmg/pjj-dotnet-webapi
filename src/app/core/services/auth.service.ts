import { computed, inject, Service, signal } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { TokenStorageService } from '@core/services/token-storage.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { CurrentUser, LoginRequest } from '@core/models/auth.model';

@Service()
export class AuthService {
    private readonly _authApiService: AuthApiService = inject(AuthApiService);
    private readonly _sessionStore = inject(TokenStorageService);
    private readonly _router = inject(Router);
    private readonly _currentUser = signal<CurrentUser | null>(null);
    
    readonly currentUser = this._currentUser.asReadonly();
    readonly isAuthenticated = computed(() => this._currentUser() != null);

    login(request: LoginRequest) {
        return this._authApiService.login(request)
            .pipe(
                switchMap((response) => {
                    this._sessionStore.setToken(response.accessToken);
                    return this._authApiService.getUserInfo();
                }),
                map((userInfo) => {
                    this._currentUser.set(userInfo);
                    return userInfo;
                }),
                catchError((error) => this.catchUnauthorizedError(error))
            )
    }

    logout() {
        this._currentUser.set(null);
        this._sessionStore.clearToken();
        this._router.navigateByUrl('/login');
    }

    initializeSession() {
        const token = this._sessionStore.loadToken();

        if (token == null) {
            return of(null);
        }
        
        return this._authApiService.getUserInfo()
            .pipe(
                map((userInfo) => {
                    this._currentUser.set(userInfo);
                    return userInfo;
                }),
                catchError((error) => this.catchUnauthorizedError(error))
            );
    }

    private catchUnauthorizedError(error: any) {
        if (error.status === 401) {
            this._sessionStore.clearToken();
            return of(null);
        }

        throw error;
    }
}

import { computed, inject, Service, signal } from '@angular/core';
import { CurrentUser, LoginRequest } from '../models/auth.model';
import { AuthApiService } from './auth-api.service';
import { TokenStorageService } from './token-storage.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Service()
export class AuthService {
    private readonly _authApiService = inject(AuthApiService);
    private readonly _tokenStorageService = inject(TokenStorageService);
    private readonly _router = inject(Router);

    private readonly _currentUser = signal<CurrentUser | null>(null);

    readonly currentUser = this._currentUser.asReadonly();
    readonly isAuthenticated = computed(() => this._currentUser() != null);

    login(request: LoginRequest) {
        return this._authApiService.login(request)
            .pipe(
                switchMap((response) => {
                    this._tokenStorageService.saveToken(response.accessToken);
                    return this._authApiService.getInfoPegawai();
                }),
                map((currentUser) => {
                    this._currentUser.set(currentUser);
                    return currentUser;
                })
            );
    }

    initializeSession() {
        const token = this._tokenStorageService.loadToken();

        if (token != null) {
            return this._authApiService.getInfoPegawai()
                .pipe(
                    map((currentUser) => {
                        this._currentUser.set(currentUser);
                        return currentUser;
                    }),
                    catchError((error) => {
                        if (error.status === 401) {
                            this._tokenStorageService.clearToken();
                            return of<void>(undefined);
                        }

                        throw error;
                    })
                )
        }

        return of<void>(undefined);
    }

    logout() {
        this._tokenStorageService.clearToken();
        this._currentUser.set(null);
        this._router.navigateByUrl('/login');
    }
}

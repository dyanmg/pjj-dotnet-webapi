import { computed, Service, signal } from '@angular/core';
import { CurrentUser } from '@core/models/auth.model';

@Service()
export class TokenStorageService {
    private readonly TOKEN_KEY = 'accessToken';

    private readonly _accessToken = signal<string | null>(null);

    readonly accessToken = this._accessToken.asReadonly();

    setToken(token: string | null): void {
        this._accessToken.set(token);
        localStorage.setItem(this.TOKEN_KEY, token || '');
    }

    loadToken(): string | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        this._accessToken.set(token);
        return token;
    }

    clearToken(): void {
        this._accessToken.set(null);
        localStorage.removeItem(this.TOKEN_KEY);
    }
}

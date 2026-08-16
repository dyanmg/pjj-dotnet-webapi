import { Service, signal } from '@angular/core';
import { CurrentUser } from '@core/models/session.model';

@Service()
export class SessionStore {
    private readonly _accessToken = signal<string | null>(null);
    private readonly _currentUser = signal<CurrentUser | null>(null);

    readonly accessToken = this._accessToken.asReadonly();
    readonly currentUser = this._currentUser.asReadonly();

    setToken(token: string | null): void {
        this._accessToken.set(token);
        localStorage.setItem('accessToken', token || '');
    }

    setCurrentUser(user: CurrentUser | null): void {
        this._currentUser.set(user);
    }

    loadToken(): string | null {
        const token = localStorage.getItem('accessToken');
        this._accessToken.set(token);
        return token;
    }

    clearSession(): void {
        this._accessToken.set(null);
        this._currentUser.set(null);
        localStorage.removeItem('accessToken');
    }
}

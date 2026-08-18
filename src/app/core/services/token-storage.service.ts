import { Service, signal } from '@angular/core';

@Service()
export class TokenStorageService {
    private readonly ACCESS_TOKEN_KEY = 'accessToken';

    private readonly _accessToken = signal<string | null>(null);

    readonly accessToken = this._accessToken.asReadonly();

    public saveToken(token: string) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
        this._accessToken.set(token);
    }

    public loadToken() {
        const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
        this._accessToken.set(token);
        return token;
    }
}

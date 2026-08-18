import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'kategori',
        loadChildren: () => import('./features/kategori/kategori.routes')
            .then(r => r.kategoriRoutes)
    },
    {
        path: 'signup',
        loadComponent: () => import('./features/auth/pages/signup/signup.page')
            .then(c => c.SignupPage)
    }
    ,
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.page')
            .then(c => c.LoginPage)
    }
];

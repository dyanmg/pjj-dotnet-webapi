import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'kategori',
        loadChildren: () => import('./features/kategori/kategori.routes')
            .then(r => r.kategoriRoutes)
    },
    {
        path: 'signup',
        loadComponent: () => import('./core/auth/pages/signup/signup.page')
            .then(c => c.SignupPage)
    }
];

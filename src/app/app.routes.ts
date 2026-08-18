import { Routes } from '@angular/router';
import { requireAuthGuard } from './core/guards/require-auth-guard';

export const routes: Routes = [
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
    },
    {
        path: '',
        canActivate: [requireAuthGuard],
        children: [
            {
                path: 'kategori',
                loadChildren: () => import('./features/kategori/kategori.routes')
                    .then(r => r.kategoriRoutes)
            },
        ]
    }
];

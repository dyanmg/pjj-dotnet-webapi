import { Routes } from '@angular/router';
import { requireAuthGuard, requireNoAuthGuard } from '@core/guards/auth-guard';
import { pegawaiRoutes } from './features/pegawai/pegawai.routes';

export const routes: Routes = [
    {
        path: 'signup',
        loadComponent: () => import('./features/auth/pages/signup/signup.page')
            .then(c => c.SignupPage),
        canActivate: [requireNoAuthGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.page')
            .then(c => c.LoginPage),
        canActivate: [requireNoAuthGuard]
    },
    {
        path: '',
        loadComponent: () => import('./layout/app-layout.component')
            .then(c => c.AppLayoutComponent),
        canActivate: [requireAuthGuard],
        children: [
            {
                path: 'profile',
                loadComponent: () => import('./features/auth/pages/profile/profile.page')
                    .then(c => c.ProfilePage)
            },
            {
                path: 'kategori',
                loadChildren: () => import('./features/kategori/kategori.routes')
                    .then(r => r.kategoriRoutes)
            },
            {
                path: 'pegawai',
                loadChildren: () => import('./features/kategori/kategori.routes')
                    .then(r => pegawaiRoutes)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'profile'
            }
        ]
    }
];

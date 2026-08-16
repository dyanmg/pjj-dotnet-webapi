import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'signup',
        loadComponent: () => import('./features/auth/pages/signup/signup.page')
            .then(c => c.SignupPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.page')
            .then(c => c.LoginPage)
    },
    {
        path: '',
        loadComponent: () => import('./layout/app-layout.component')
            .then(c => c.AppLayoutComponent),
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
        ]
    }
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'kategori',
        loadChildren: () => import('./features/kategori/kategori.routes')
            .then(r => r.kategoriRoutes)
    }
];

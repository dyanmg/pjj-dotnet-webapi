import { Route } from "@angular/router";

export const kategoriRoutes: Route[] = [
    {
        path: 'list',
        loadComponent: () => import('./pages/kategori-list/kategori-list.page')
            .then(p => p.KategoriListPage)
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
]
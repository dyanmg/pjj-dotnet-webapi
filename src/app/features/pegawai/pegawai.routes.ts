import { Route } from "@angular/router";

export const pegawaiRoutes: Route[] = [
    {
        path: 'list',
        loadComponent: () => import('./pages/pegawai-list/pegawai-list.page')
            .then(c => c.PegawaiListPage)
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
]
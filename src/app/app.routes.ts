import { Routes } from '@angular/router';

import { LayoutContentComponent } from './layout';

export const routes: Routes = [
    { path: '', redirectTo: 'apps', pathMatch: 'full' },
    {
        path: 'apps',
        component: LayoutContentComponent,
        loadChildren: () => import('./modules/modules.routes').then((m) => m.routes),
    },
    {
        path: 'not-found',
        loadComponent: () => import('./modules/static-module/error-404-page/error-404-page.component').then((m) => m.Error404PageComponent),
    },
    { path: '**', redirectTo: 'not-found' },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'superheroes', pathMatch: 'full' },
    {
        path: 'superheroes',
        loadChildren: () => import('./superheroes-module/superheroes-module.routes').then((m) => m.routes),
    },
];

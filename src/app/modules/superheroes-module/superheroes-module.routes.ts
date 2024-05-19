import { Routes } from '@angular/router';
import {
    superHeroeProvider,
    getSuperheroesUseCaseProvider,
    getSuperheroeUseCaseProvider,
    createSuperheroeUseCaseProvider,
    updateSuperheroeUseCaseProvider,
    deleteSuperheroeUseCaseProvider,
} from '@modules/superheroes-module/data';

export const routes: Routes = [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
    {
        path: 'listar',
        title: 'Superheroes Test List',
        providers: [superHeroeProvider, getSuperheroesUseCaseProvider, getSuperheroeUseCaseProvider, deleteSuperheroeUseCaseProvider],
        loadComponent: () =>
            import('./presentation/pages/superheroes-principal-page/superheroes-principal-page.component').then(
                (m) => m.SuperheroesPrincipalPageComponent
            ),
    },
    {
        path: 'crear',
        title: 'Superheroes Test Create',
        providers: [superHeroeProvider, createSuperheroeUseCaseProvider],
        loadComponent: () =>
            import('./presentation/pages/superheroes-create-page/superheroes-create-page.component').then(
                (m) => m.SuperheroesCreatePageComponent
            ),
    },
    {
        path: 'editar',
        title: 'Superheroes Test Update',
        providers: [superHeroeProvider, updateSuperheroeUseCaseProvider],
        loadComponent: () =>
            import('./presentation/pages/superheroes-update-page/superheroes-update-page.component').then(
                (m) => m.SuperheroesUpdatePageComponent
            ),
    },
];

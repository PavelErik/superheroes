import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';

import { SuperheroesListarComponent } from '@modules/superheroes-module/presentation/components';
import { SuperheroeUtilService } from '@modules/superheroes-module/presentation/services';

@Component({
    selector: 'app-superheroes-principal-page',
    standalone: true,
    imports: [CommonModule, ButtonModule, MenuModule, TooltipModule, SuperheroesListarComponent],
    templateUrl: './superheroes-principal-page.component.html',
    styleUrl: './superheroes-principal-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroesPrincipalPageComponent {
    public readonly menus = signal<MenuItem[]>([]);
    public readonly loadingTable = signal<boolean>(false);
    private readonly _router = inject(Router);
    private readonly _activedRoute = inject(ActivatedRoute);
    private readonly _superheroeUtilService = inject(SuperheroeUtilService);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this.menus.set([
            {
                label: 'NUEVO SUPERHEROE',
                icon: 'pi pi-plus text-blue-500',
                command: () => this.onNuevoSuperheroe(),
            },
        ]);
        this._superheroeUtilService.loadingTable$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((x) => this.loadingTable.set(x ?? false));
    }

    private onNuevoSuperheroe(): void {
        this._router.navigate(['../crear'], { relativeTo: this._activedRoute });
    }
}

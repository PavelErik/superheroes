import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SuperheroesUpdateComponent } from '@modules/superheroes-module/presentation/components';

@Component({
    selector: 'app-superheroes-update-page',
    standalone: true,
    imports: [CommonModule, SuperheroesUpdateComponent],
    templateUrl: './superheroes-update-page.component.html',
    styleUrl: './superheroes-update-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroesUpdatePageComponent {}

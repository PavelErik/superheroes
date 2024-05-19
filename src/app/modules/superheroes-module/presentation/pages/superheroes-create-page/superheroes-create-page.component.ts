import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SuperheroesCreateComponent } from '@modules/superheroes-module/presentation/components';

@Component({
    selector: 'app-superheroes-create-page',
    standalone: true,
    imports: [CommonModule, SuperheroesCreateComponent],
    templateUrl: './superheroes-create-page.component.html',
    styleUrl: './superheroes-create-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroesCreatePageComponent {}

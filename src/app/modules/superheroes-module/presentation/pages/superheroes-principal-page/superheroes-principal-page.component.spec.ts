import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { By } from '@angular/platform-browser';

import { ApiService } from '@core/api';
import { DeleteSuperheroeUseCase, GetSuperheroeUseCase, GetSuperheroesUseCase } from '@modules/superheroes-module/domain';
import { SuperheroesListarComponent } from '@modules/superheroes-module/presentation/components';
import { SuperheroesPrincipalPageComponent } from './superheroes-principal-page.component';

describe('SuperheroesPrincipalPageComponent', () => {
    let component: SuperheroesPrincipalPageComponent;
    let fixture: ComponentFixture<SuperheroesPrincipalPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SuperheroesPrincipalPageComponent, SuperheroesListarComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
                {
                    provide: GetSuperheroeUseCase,
                    useValue: {},
                },
                {
                    provide: GetSuperheroesUseCase,
                    useValue: { execute: () => of([]) },
                },
                {
                    provide: DeleteSuperheroeUseCase,
                    useValue: {},
                },
                {
                    provide: ApiService,
                    useValue: {},
                },
                ConfirmationService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroesPrincipalPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the SuperheroesListarComponent', () => {
        const superheroCreateDebugElement = fixture.debugElement.query(By.directive(SuperheroesListarComponent));
        expect(superheroCreateDebugElement).not.toBeNull();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ApiService } from '@core/api';
import { UpdateSuperheroeUseCase } from '@modules/superheroes-module/domain';
import { SuperheroesUpdateComponent } from '@modules/superheroes-module/presentation/components';
import { SuperheroesUpdatePageComponent } from './superheroes-update-page.component';

describe('SuperheroesUpdatePageComponent', () => {
    let component: SuperheroesUpdatePageComponent;
    let fixture: ComponentFixture<SuperheroesUpdatePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SuperheroesUpdatePageComponent, SuperheroesUpdateComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
                {
                    provide: UpdateSuperheroeUseCase,
                    useValue: {},
                },
                {
                    provide: ApiService,
                    useValue: {},
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroesUpdatePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the SuperheroesUpdateComponent', () => {
        const superheroCreateDebugElement = fixture.debugElement.query(By.directive(SuperheroesUpdateComponent));
        expect(superheroCreateDebugElement).not.toBeNull();
    });
});

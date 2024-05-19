import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ApiService } from '@core/api';
import { CreateSuperheroeUseCase } from '@modules/superheroes-module/domain';
import { SuperheroesCreateComponent } from '@modules/superheroes-module/presentation/components';
import { SuperheroesCreatePageComponent } from './superheroes-create-page.component';

describe('SuperheroesCreatePageComponent', () => {
    let component: SuperheroesCreatePageComponent;
    let fixture: ComponentFixture<SuperheroesCreatePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SuperheroesCreatePageComponent, SuperheroesCreateComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
                {
                    provide: CreateSuperheroeUseCase,
                    useValue: {},
                },
                {
                    provide: ApiService,
                    useValue: {},
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroesCreatePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the SuperheroesCreateComponent', () => {
        const superheroCreateDebugElement = fixture.debugElement.query(By.directive(SuperheroesCreateComponent));
        expect(superheroCreateDebugElement).not.toBeNull();
    });
});

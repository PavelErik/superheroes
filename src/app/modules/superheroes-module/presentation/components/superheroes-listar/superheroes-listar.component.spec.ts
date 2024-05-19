import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

import { ApiService } from '@core/api';
import { GetSuperheroeUseCase, GetSuperheroesUseCase, DeleteSuperheroeUseCase } from '@modules/superheroes-module/domain';
import { SuperheroesListarComponent } from './superheroes-listar.component';

describe('SuperheroesListarComponent', () => {
    let component: SuperheroesListarComponent;
    let fixture: ComponentFixture<SuperheroesListarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SuperheroesListarComponent],
            providers: [
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
                { provide: ActivatedRoute, useValue: {} },
                ConfirmationService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroesListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset filters', () => {
        const table = jasmine.createSpyObj('Table', ['reset']);
        component.onResetFiltersEvent(table);
        expect(table.reset).toHaveBeenCalled();
    });

    it('should search superheroes', () => {
        const table = jasmine.createSpyObj('Table', ['filterGlobal']);
        const event = { target: { value: 'test' } };
        component.onSearchEvent(event, table);
        expect(table.filterGlobal).toHaveBeenCalledWith('test', 'contains');
    });

    it('should handle lazy load event', () => {
        spyOn(component as any, 'getAllSuperheroes');
        const event = { first: 0, rows: 10, sortField: null, sortOrder: null, globalFilter: null };
        component.onLazyLoadEvent(event);
        expect((component as any).getAllSuperheroes).toHaveBeenCalled();
    });
});

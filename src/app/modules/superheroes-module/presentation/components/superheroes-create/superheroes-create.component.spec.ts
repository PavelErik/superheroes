import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ApiService } from '@core/api';
import { CreateSuperheroeUseCase } from '@modules/superheroes-module/domain';
import { GlobalFormFunctions } from '@shared/utils';
import { SuperheroesCreateComponent } from './superheroes-create.component';

const mockOdMessageService = jasmine.createSpyObj('OdMessageService', ['error', 'success']);
const mockOdSpinnerService = jasmine.createSpyObj('OdSpinnerService', ['show', 'hide']);
const mockApiService = {
    message: () => mockOdMessageService,
    spinner: () => mockOdSpinnerService,
};

describe('SuperheroesCreateComponent', () => {
    let component: SuperheroesCreateComponent;
    let fixture: ComponentFixture<SuperheroesCreateComponent>;
    let mockCreateSuperheroeUseCase: jasmine.SpyObj<CreateSuperheroeUseCase>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockActivatedRoute: ActivatedRoute;

    beforeEach(async () => {
        mockCreateSuperheroeUseCase = jasmine.createSpyObj('CreateSuperheroeUseCase', ['execute']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockActivatedRoute = { params: of({ id: '123' }), snapshot: { paramMap: { get: () => '123' } } } as any;

        await TestBed.configureTestingModule({
            imports: [SuperheroesCreateComponent],
            providers: [
                { provide: CreateSuperheroeUseCase, useValue: mockCreateSuperheroeUseCase },
                {
                    provide: ApiService,
                    useValue: mockApiService,
                },
                {
                    provide: ActivatedRoute,
                    useValue: mockActivatedRoute,
                },
                { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroesCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with the correct controls and validators', () => {
        expect(component.form).toBeDefined();
        expect(component.form.controls['nombre']).toBeDefined();
        expect(component.form.controls['nombre'].validator).toBeTruthy();
    });

    it('should update nombre control value to uppercase', () => {
        const nombreControl = component.form.controls['nombre'];
        nombreControl.setValue('superman');
        expect(nombreControl.value).toBe('SUPERMAN');
    });

    it('should call onClickGuardarEvent and handle invalid form', () => {
        spyOn(GlobalFormFunctions, 'showErrorsForm');
        component.form.controls['nombre'].setValue(null);
        component.onClickGuardarEvent();
        expect(GlobalFormFunctions.showErrorsForm).toHaveBeenCalled();
        expect(mockApiService.message().error).toHaveBeenCalledWith(
            'Por favor, complete los campos requeridos y/o corrija los errores en estos.'
        );
    });

    it('should call onClickGuardarEvent and handle valid form', () => {
        component.form.controls['nombre'].setValue('SUPERMAN');
        component.form.controls['nombreReal'].setValue('Clark Kent');
        component.form.controls['afiliacion'].setValue('Justice League');
        component.form.controls['edad'].setValue(30);
        component.form.controls['biografia'].setValue('Hero from Krypton');
        component.form.controls['nivelPoder'].setValue(50);
        component.form.controls['origen'].setValue('Krypton');
        component.form.controls['superPoderes'].setValue([]);
        component.form.controls['habilidades'].setValue([]);
        const mockResponse = {
            status: 200,
            type: 'success',
            title: 'Superhéroe creado',
            success: true,
            messages: [],
            result: 16,
        };
        mockCreateSuperheroeUseCase.execute.and.returnValue(of(mockResponse));

        component.onClickGuardarEvent();
        expect(mockApiService.spinner().show).toHaveBeenCalled();
        expect(mockCreateSuperheroeUseCase.execute).toHaveBeenCalled();
        expect(mockApiService.spinner().hide).toHaveBeenCalled();
        expect(mockApiService.message().success).toHaveBeenCalledWith('Superhéroe creado correctamente');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: mockActivatedRoute });
    });

    it('should navigate on onClickCancelarEvent', () => {
        component.onClickCancelarEvent();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: mockActivatedRoute });
    });
});

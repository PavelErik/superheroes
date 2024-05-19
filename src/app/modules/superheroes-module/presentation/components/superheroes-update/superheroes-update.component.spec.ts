import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of } from 'rxjs';

import { ApiService } from '@core/api';
import { GlobalFormFunctions } from '@shared/utils';
import { GetSuperheroeModel, UpdateSuperheroeUseCase } from '@modules/superheroes-module/domain';
import { SuperheroeUtilService } from '@modules/superheroes-module/presentation/services';
import { SuperheroesUpdateComponent } from './superheroes-update.component';

const mockOdMessageService = jasmine.createSpyObj('OdMessageService', ['error', 'success']);
const mockOdSpinnerService = jasmine.createSpyObj('OdSpinnerService', ['show', 'hide']);
const mockApiService = {
    message: () => mockOdMessageService,
    spinner: () => mockOdSpinnerService,
};

describe('SuperheroesUpdateComponent', () => {
    let component: SuperheroesUpdateComponent;
    let fixture: ComponentFixture<SuperheroesUpdateComponent>;
    let mockUpdateSuperheroeUseCase: jasmine.SpyObj<UpdateSuperheroeUseCase>;
    let mockSuperheroeUtilService: jasmine.SpyObj<SuperheroeUtilService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockActivatedRoute: ActivatedRoute;
    let superheroeSubject: Subject<GetSuperheroeModel | null>;

    beforeEach(async () => {
        mockUpdateSuperheroeUseCase = jasmine.createSpyObj('UpdateSuperheroeUseCase', ['execute']);
        mockSuperheroeUtilService = jasmine.createSpyObj('SuperheroeUtilService', ['clearSuperheroe']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockActivatedRoute = { params: of({ id: '123' }), snapshot: { paramMap: { get: () => '123' } } } as any;
        superheroeSubject = new Subject<GetSuperheroeModel | null>();
        Object.defineProperty(mockSuperheroeUtilService, 'superheroe$', { get: () => superheroeSubject.asObservable() });

        await TestBed.configureTestingModule({
            imports: [SuperheroesUpdateComponent],
            providers: [
                { provide: UpdateSuperheroeUseCase, useValue: mockUpdateSuperheroeUseCase },
                { provide: SuperheroeUtilService, useValue: mockSuperheroeUtilService },
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

        fixture = TestBed.createComponent(SuperheroesUpdateComponent);
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
        fixture.detectChanges();
        expect(nombreControl.value).toBe('SUPERMAN');
    });

    it('should set form values when superheroe is emitted', () => {
        const superheroe: GetSuperheroeModel = {
            id: 1,
            nombre: 'SUPERMAN',
            nombreReal: 'Clark Kent',
            afiliacion: 'Justice League',
            edad: 30,
            biografia: 'Hero from Krypton',
            nivelPoder: 100,
            origen: 'Krypton',
            superPoderes: ['Volar'],
            habilidades: ['Super fuerza'],
        };
        superheroeSubject.next(superheroe);
        fixture.detectChanges();
        expect(component.form.controls['id'].value).toBe(superheroe.id);
        expect(component.form.controls['nombre'].value).toBe(superheroe.nombre);
        expect(component.form.controls['nombreReal'].value).toBe(superheroe.nombreReal);
        expect(component.form.controls['afiliacion'].value).toBe(superheroe.afiliacion);
        expect(component.form.controls['edad'].value).toBe(superheroe.edad);
        expect(component.form.controls['biografia'].value).toBe(superheroe.biografia);
        expect(component.form.controls['nivelPoder'].value).toBe(superheroe.nivelPoder);
        expect(component.form.controls['origen'].value).toBe(superheroe.origen);
        expect(component.form.controls['superPoderes'].value).toBe(superheroe.superPoderes);
        expect(component.form.controls['habilidades'].value).toBe(superheroe.habilidades);
    });

    it('should handle non-existing superheroe', () => {
        superheroeSubject.next(null);
        fixture.detectChanges();
        expect(mockApiService.message().error).toHaveBeenCalledWith('No se ha encontrado el superhéroe');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: mockActivatedRoute });
    });

    it('should call onClickGuardarEvent and handle invalid form', () => {
        spyOn(GlobalFormFunctions, 'showErrorsForm');
        component.form.controls['nombre'].setValue(null); // make form invalid
        component.onClickGuardarEvent();
        expect(GlobalFormFunctions.showErrorsForm).toHaveBeenCalled();
        expect(mockApiService.message().error).toHaveBeenCalledWith(
            'Por favor, complete los campos requeridos y/o corrija los errores en estos.'
        );
    });

    it('should call onClickGuardarEvent and handle valid form', () => {
        component.form.controls['id'].setValue(1);
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
            title: 'Superhéroe actualizado',
            success: true,
            messages: ['Superhéroe actualizado correctamente'],
            result: 16,
        };
        mockUpdateSuperheroeUseCase.execute.and.returnValue(of(mockResponse));

        component.onClickGuardarEvent();
        expect(mockApiService.spinner().show).toHaveBeenCalled();
        expect(mockUpdateSuperheroeUseCase.execute).toHaveBeenCalled();
        expect(mockApiService.spinner().hide).toHaveBeenCalled();
        expect(mockApiService.message().success).toHaveBeenCalledWith('Superhéroe editado correctamente');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: mockActivatedRoute });
    });

    it('should navigate on onClickCancelarEvent', () => {
        component.onClickCancelarEvent();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: mockActivatedRoute });
    });

    it('should clear superheroe on destroy', () => {
        component.ngOnDestroy();
        expect(mockSuperheroeUtilService.clearSuperheroe).toHaveBeenCalled();
    });
});

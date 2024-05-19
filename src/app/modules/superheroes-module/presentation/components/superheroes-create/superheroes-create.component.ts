import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, distinctUntilChanged, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';

import { ApiService } from '@core/api';
import {
    ICreateSuperheroeForm,
    ICreateSuperheroeFormValue,
    CreateSuperheroeModel,
    CreateSuperheroeUseCase,
} from '@modules/superheroes-module/domain';
import { RequiredDirective } from '@shared/directives';
import { GlobalFormFunctions } from '@shared/utils';
import { OdValidationComponent } from '@shared/widgets';

@Component({
    selector: 'app-superheroes-create',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        ChipsModule,
        InputTextModule,
        InputNumberModule,
        InputTextareaModule,
        TooltipModule,
        RippleModule,
        RequiredDirective,
        OdValidationComponent,
    ],
    templateUrl: './superheroes-create.component.html',
    styleUrl: './superheroes-create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroesCreateComponent implements OnInit {
    public form!: FormGroup<ICreateSuperheroeForm>;
    public readonly loading = signal<boolean>(false);
    private readonly _createSuperheroeUseCase = inject(CreateSuperheroeUseCase);
    private readonly _apiService = inject(ApiService);
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _activedRoute = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this.buildForm();
        this.form.controls.nombre.valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
            this.form.controls.nombre.setValue(value?.toUpperCase() ?? null);
        });
    }

    ngOnInit(): void {}

    private buildForm(): void {
        this.form = this._formBuilder.group({
            nombre: [null as string | null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
            nombreReal: [null as string | null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
            afiliacion: [null as string | null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            edad: [0 as number | null, [Validators.required, Validators.min(0), Validators.max(150)]],
            biografia: [null as string | null, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
            nivelPoder: [0 as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
            origen: [null as string | null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            superPoderes: [[] as string[]],
            habilidades: [[] as string[]],
        });
    }

    onClickGuardarEvent(): void {
        if (this.form.invalid) {
            GlobalFormFunctions.showErrorsForm(this.form);
            this._apiService.message().error('Por favor, complete los campos requeridos y/o corrija los errores en estos.');
            return;
        }

        this.loading.set(true);
        this.form.disable();
        this._apiService.spinner().show();
        this._createSuperheroeUseCase
            .execute(CreateSuperheroeModel.create(this.form.value as ICreateSuperheroeFormValue))
            .pipe(
                finalize(() => {
                    this.loading.set(false);
                    this.form.enable();
                    this._apiService.spinner().hide();
                }),
                catchError(() => {
                    this._apiService.message().error('Ha ocurrido un error al crear el superhéroe');
                    throw new Error('SUPERHEROE NO CREADO');
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this._apiService.message().success('Superhéroe creado correctamente');
                this._router.navigate(['../'], { relativeTo: this._activedRoute });
            });
    }

    onClickCancelarEvent(): void {
        this._router.navigate(['../'], { relativeTo: this._activedRoute });
    }
}

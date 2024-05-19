import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, inject, signal } from '@angular/core';
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
    IUpdateSuperheroeForm,
    IUpdateSuperheroeFormValue,
    UpdateSuperheroeModel,
    UpdateSuperheroeUseCase,
    GetSuperheroeModel,
} from '@modules/superheroes-module/domain';
import { SuperheroeUtilService } from '@modules/superheroes-module/presentation/services';
import { RequiredDirective } from '@shared/directives';
import { GlobalFormFunctions } from '@shared/utils';
import { OdValidationComponent } from '@shared/widgets';

@Component({
    selector: 'app-superheroes-update',
    standalone: true,
    imports: [
        CommonModule,
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
    templateUrl: './superheroes-update.component.html',
    styleUrl: './superheroes-update.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroesUpdateComponent implements OnDestroy {
    public form!: FormGroup<IUpdateSuperheroeForm>;
    public readonly loading = signal<boolean>(false);
    private readonly _updateSuperheroeUseCase = inject(UpdateSuperheroeUseCase);
    private readonly _superheroeUtilService = inject(SuperheroeUtilService);
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
        this._superheroeUtilService.superheroe$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((superheroe) => {
            if (superheroe) this.setFormValues(superheroe);
            else {
                this._apiService.message().error('No se ha encontrado el superhéroe');
                this._router.navigate(['../'], { relativeTo: this._activedRoute });
            }
        });
    }

    ngOnDestroy(): void {
        this._superheroeUtilService.clearSuperheroe();
    }

    private buildForm(): void {
        this.form = this._formBuilder.group({
            id: [null as number | null, [Validators.required]],
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

    private setFormValues(superheroe: GetSuperheroeModel): void {
        this.form.controls.id.setValue(superheroe.id);
        this.form.controls.nombre.setValue(superheroe.nombre);
        this.form.controls.nombreReal.setValue(superheroe.nombreReal);
        this.form.controls.afiliacion.setValue(superheroe.afiliacion);
        this.form.controls.edad.setValue(superheroe.edad);
        this.form.controls.biografia.setValue(superheroe.biografia);
        this.form.controls.nivelPoder.setValue(superheroe.nivelPoder);
        this.form.controls.origen.setValue(superheroe.origen);
        this.form.controls.superPoderes.setValue(superheroe.superPoderes);
        this.form.controls.habilidades.setValue(superheroe.habilidades);
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
        this._updateSuperheroeUseCase
            .execute(UpdateSuperheroeModel.create(this.form.value as IUpdateSuperheroeFormValue))
            .pipe(
                finalize(() => {
                    this.loading.set(false);
                    this.form.enable();
                    this._apiService.spinner().hide();
                }),
                catchError(() => {
                    this._apiService.message().error('Ha ocurrido un error al editar el superhéroe');
                    throw new Error('SUPERHEROE NO EDITADO');
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this._apiService.message().success('Superhéroe editado correctamente');
                this._router.navigate(['../'], { relativeTo: this._activedRoute });
            });
    }

    onClickCancelarEvent(): void {
        this._router.navigate(['../'], { relativeTo: this._activedRoute });
    }
}

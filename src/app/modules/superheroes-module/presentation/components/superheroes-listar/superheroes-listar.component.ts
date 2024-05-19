import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';

import { ApiService } from '@core/api';
import { PaginationBasicQueryModel } from '@core/models';
import {
    GetSuperheroesModel,
    GetSuperheroeUseCase,
    GetSuperheroesUseCase,
    DeleteSuperheroeUseCase,
} from '@modules/superheroes-module/domain';
import { SuperheroeUtilService } from '@modules/superheroes-module/presentation/services';
import { CapitalizePipe } from '@shared/pipes';
import { GlobalConfigConstants, GlobalTableFunctions } from '@shared/utils';
import { OdSelectComponent } from '@shared/widgets';

@Component({
    selector: 'app-superheroes-listar',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        ProgressBarModule,
        TableModule,
        TooltipModule,
        OdSelectComponent,
        CapitalizePipe,
    ],
    templateUrl: './superheroes-listar.component.html',
    styleUrl: './superheroes-listar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroesListarComponent {
    public selectedSuperheroes: GetSuperheroesModel[] = [];
    public readonly superheroes = signal<GetSuperheroesModel[]>([]);
    public readonly loading = signal<boolean>(false);
    public readonly frozenAction = signal<boolean>(true);
    public readonly total = signal<number>(0);
    public readonly FIELDS_TABLE = GetSuperheroesModel.getKeys();
    public readonly CONFIG = GlobalConfigConstants.TABLE_CONFIG;
    public readonly pagination = signal<PaginationBasicQueryModel>({
        search: null,
        sortField: null,
        sortOrder: null,
        pageIndex: GlobalConfigConstants.TABLE_CONFIG.PAGE_INDEX,
        pageSize: GlobalConfigConstants.TABLE_CONFIG.PAGE_SIZE,
    });
    private readonly _getSuperheroeUseCase = inject(GetSuperheroeUseCase);
    private readonly _getSuperheroesUseCase = inject(GetSuperheroesUseCase);
    private readonly _deleteSuperheroeUseCase = inject(DeleteSuperheroeUseCase);
    private readonly _superheroeUtilService = inject(SuperheroeUtilService);
    private readonly _apiService = inject(ApiService);
    private readonly _confirmationService = inject(ConfirmationService);
    private readonly _activedRoute = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this.getAllSuperheroes();
    }

    trackByFn = (item: GetSuperheroesModel): number => item.id;

    onResetFiltersEvent(table: Table): void {
        table.reset();
    }

    onSearchEvent($event: any, table: Table): void {
        const searchTerm = $event.target?.value as string | null | undefined;
        table.filterGlobal(searchTerm?.trim(), 'contains');
    }

    onLazyLoadEvent($event: TableLazyLoadEvent): void {
        const pageIndex = ($event.first ?? 0) / this.pagination().pageSize + 1;
        const pageSize = $event.rows ? $event.rows : this.pagination().pageSize;
        const sort = GlobalTableFunctions.adaptSort($event.sortField, $event.sortOrder);
        const newPagination: PaginationBasicQueryModel = {
            search: GlobalTableFunctions.adaptSearch($event.globalFilter),
            sortField: sort.sortField,
            sortOrder: sort.sortOrder,
            pageIndex: pageIndex,
            pageSize: pageSize,
        };
        this.pagination.set(newPagination);
        this.getAllSuperheroes();
    }

    onEditarSuperheroeEvent($event: GetSuperheroesModel): void {
        this.editSuperheroe($event);
    }

    onEliminarSuperheroeEvent($event: GetSuperheroesModel): void {
        this._confirmationService.confirm({
            key: GlobalConfigConstants.CONFIRM_DIALOG_CONFIG.KEY,
            message: 'Estás seguro de que deseas eliminar este superhéroe?',
            accept: () => {
                this.deleteSuperheroe($event);
            },
        });
    }

    private getAllSuperheroes(): void {
        this.selectedSuperheroes = [];
        this.superheroes.set([]);
        this.loading.set(true);
        this._superheroeUtilService.setLoadingTable(true);
        this._getSuperheroesUseCase
            .execute(this.pagination())
            .pipe(
                finalize(() => {
                    this.loading.set(false);
                    this._superheroeUtilService.setLoadingTable(false);
                }),
                catchError(() => {
                    this._apiService.message().error('Ha ocurrido un error al cargar la lista de superhéroes');
                    throw new Error('DATA NO CARGADA');
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((response) => {
                if (response.data.length === 0) this._apiService.message().info('No se ha encontrado ningún superhéroe');
                this.superheroes.set(response.data);
                this.total.set(response.totalCount);
            });
    }

    private deleteSuperheroe(superheroe: GetSuperheroesModel): void {
        this._apiService.spinner().show();
        this._deleteSuperheroeUseCase
            .execute(superheroe.id)
            .pipe(
                finalize(() => {
                    this._apiService.spinner().hide();
                }),
                catchError(() => {
                    this._apiService.message().error('Ha ocurrido un error al eliminar el superhéroe');
                    throw new Error('SUPERHÉROE NO ELIMINADO');
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this._apiService.message().success('Superhéroe eliminado correctamente');
                this.getAllSuperheroes();
            });
    }

    private editSuperheroe(superheroe: GetSuperheroesModel): void {
        this._apiService.spinner().show();
        this._getSuperheroeUseCase
            .execute(superheroe.id)
            .pipe(
                finalize(() => {
                    this._apiService.spinner().hide();
                }),
                catchError(() => {
                    this._apiService.message().error('Ha ocurrido un error al cargar el superhéroe');
                    throw new Error('SUPERHÉROE NO CARGADO');
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((response) => {
                this._superheroeUtilService.setSuperheroe(response);
                this._router.navigate(['../editar'], { relativeTo: this._activedRoute });
            });
    }
}

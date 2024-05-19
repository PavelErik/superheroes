import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { PaginationBasicQueryAdapter, ResponseAdapter } from '@core/adapters';
import { PaginationBasicQueryModel, PaginationVmModel, ResponseModel } from '@core/models';
import {
    GetSuperheroeAdapter,
    GetSuperheroesAdapter,
    CreateSuperheroeAdapter,
    UpdateSuperheroeAdapter,
} from '@modules/superheroes-module/data';
import {
    CreateSuperheroeModel,
    GetSuperheroeModel,
    GetSuperheroesModel,
    SuperheroeRepository,
    UpdateSuperheroeModel,
} from '@modules/superheroes-module/domain';
import { getSuperHeroesApi, getByIdSuperHeroeApi, createSuperHeroeApi, updateSuperHeroeApi, deleteSuperHeroeApi } from './mock';

@Injectable()
export class SuperheroeService extends SuperheroeRepository {
    private readonly _adapters = {
        response: new ResponseAdapter(),
        pagination: new PaginationBasicQueryAdapter(),
        getSuperheroe: new GetSuperheroeAdapter(),
        getSuperheroes: new GetSuperheroesAdapter(),
        createSuperheroe: new CreateSuperheroeAdapter(),
        updateSuperheroe: new UpdateSuperheroeAdapter(),
    };

    getAllSP(dto: PaginationBasicQueryModel): Observable<PaginationVmModel<GetSuperheroesModel>> {
        const request = this._adapters.pagination.adapt(dto);
        return of(getSuperHeroesApi(request)).pipe(delay(3000), map(this._adapters.getSuperheroes.adapt));
    }

    getById(superHeroeId: number): Observable<GetSuperheroeModel> {
        return of(getByIdSuperHeroeApi(superHeroeId)).pipe(delay(3000), map(this._adapters.getSuperheroe.adapt));
    }

    create(dto: CreateSuperheroeModel): Observable<ResponseModel<number>> {
        const request = this._adapters.createSuperheroe.adapt(dto);
        return of(createSuperHeroeApi(request)).pipe(delay(3000), map(this._adapters.response.adapt));
    }

    update(dto: UpdateSuperheroeModel): Observable<ResponseModel<number>> {
        const request = this._adapters.updateSuperheroe.adapt(dto);
        return of(updateSuperHeroeApi(request)).pipe(delay(3000), map(this._adapters.response.adapt));
    }

    delete(superHeroeId: number): Observable<ResponseModel<boolean>> {
        return of(deleteSuperHeroeApi(superHeroeId)).pipe(delay(3000), map(this._adapters.response.adapt));
    }
}

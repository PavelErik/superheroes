import { Observable } from 'rxjs';

import { PaginationBasicQueryModel, PaginationVmModel, ResponseModel } from '@core/models';
import { GetSuperheroeModel, GetSuperheroesModel, CreateSuperheroeModel, UpdateSuperheroeModel } from '@modules/superheroes-module/domain';

export abstract class SuperheroeRepository {
    abstract getAllSP(dto: PaginationBasicQueryModel): Observable<PaginationVmModel<GetSuperheroesModel>>;
    abstract getById(superHeroeId: number): Observable<GetSuperheroeModel>;
    abstract create(dto: CreateSuperheroeModel): Observable<ResponseModel<number>>;
    abstract update(dto: UpdateSuperheroeModel): Observable<ResponseModel<number>>;
    abstract delete(superHeroeId: number): Observable<ResponseModel<boolean>>;
}

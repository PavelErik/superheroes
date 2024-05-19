import { Observable } from 'rxjs';

import { UseCase } from '@core/base';
import { PaginationBasicQueryModel, PaginationVmModel } from '@core/models';
import { GetSuperheroesModel } from '@modules/superheroes-module/domain';
import { SuperheroeRepository } from '@modules/superheroes-module/domain';

type Input = PaginationBasicQueryModel;
type Output = PaginationVmModel<GetSuperheroesModel>;

export class GetSuperheroesUseCase implements UseCase<Input, Output> {
    constructor(private readonly _repository: SuperheroeRepository) {}

    execute(dto: Input): Observable<Output> {
        return this._repository.getAllSP(dto);
    }
}

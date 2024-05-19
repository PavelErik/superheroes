import { Observable } from 'rxjs';

import { UseCase } from '@core/base';
import { ResponseModel } from '@core/models';
import { UpdateSuperheroeModel } from '@modules/superheroes-module/domain';
import { SuperheroeRepository } from '@modules/superheroes-module/domain';

type Input = UpdateSuperheroeModel;
type Output = ResponseModel<number>;

export class UpdateSuperheroeUseCase implements UseCase<Input, Output> {
    constructor(private readonly _repository: SuperheroeRepository) {}

    execute(dto: Input): Observable<Output> {
        return this._repository.update(dto);
    }
}

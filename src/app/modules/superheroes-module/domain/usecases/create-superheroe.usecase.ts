import { Observable } from 'rxjs';

import { UseCase } from '@core/base';
import { ResponseModel } from '@core/models';
import { CreateSuperheroeModel } from '@modules/superheroes-module/domain';
import { SuperheroeRepository } from '@modules/superheroes-module/domain';

type Input = CreateSuperheroeModel;
type Output = ResponseModel<number>;

export class CreateSuperheroeUseCase implements UseCase<Input, Output> {
    constructor(private readonly _repository: SuperheroeRepository) {}

    execute(dto: Input): Observable<Output> {
        return this._repository.create(dto);
    }
}

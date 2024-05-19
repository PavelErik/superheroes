import { Observable } from 'rxjs';

import { UseCase } from '@core/base';
import { ResponseModel } from '@core/models';
import { SuperheroeRepository } from '@modules/superheroes-module/domain';

type Input = number;
type Output = ResponseModel<boolean>;

export class DeleteSuperheroeUseCase implements UseCase<Input, Output> {
    constructor(private readonly _repository: SuperheroeRepository) {}

    execute(superHeroeId: Input): Observable<Output> {
        return this._repository.delete(superHeroeId);
    }
}

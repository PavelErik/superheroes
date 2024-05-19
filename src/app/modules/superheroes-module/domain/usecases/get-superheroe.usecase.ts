import { Observable } from 'rxjs';

import { UseCase } from '@core/base';
import { GetSuperheroeModel } from '@modules/superheroes-module/domain';
import { SuperheroeRepository } from '@modules/superheroes-module/domain';

type Input = number;
type Output = GetSuperheroeModel;

export class GetSuperheroeUseCase implements UseCase<Input, Output> {
    constructor(private readonly _repository: SuperheroeRepository) {}

    execute(superHeroeId: Input): Observable<Output> {
        return this._repository.getById(superHeroeId);
    }
}

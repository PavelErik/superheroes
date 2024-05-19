import { SuperheroeService } from '@modules/superheroes-module/data';
import {
    GetSuperheroesUseCase,
    GetSuperheroeUseCase,
    CreateSuperheroeUseCase,
    UpdateSuperheroeUseCase,
    DeleteSuperheroeUseCase,
    SuperheroeRepository,
} from '@modules/superheroes-module/domain';

const getSuperheroesFactory = (repository: SuperheroeRepository) => new GetSuperheroesUseCase(repository);
const getSuperheroeFactory = (repository: SuperheroeRepository) => new GetSuperheroeUseCase(repository);
const createSuperheroeFactory = (repository: SuperheroeRepository) => new CreateSuperheroeUseCase(repository);
const updateSuperheroeFactory = (repository: SuperheroeRepository) => new UpdateSuperheroeUseCase(repository);
const deleteSuperheroeFactory = (repository: SuperheroeRepository) => new DeleteSuperheroeUseCase(repository);

export const superHeroeProvider = {
    provide: SuperheroeRepository,
    useClass: SuperheroeService,
};
export const getSuperheroesUseCaseProvider = {
    provide: GetSuperheroesUseCase,
    useFactory: getSuperheroesFactory,
    deps: [SuperheroeRepository],
};
export const getSuperheroeUseCaseProvider = {
    provide: GetSuperheroeUseCase,
    useFactory: getSuperheroeFactory,
    deps: [SuperheroeRepository],
};
export const createSuperheroeUseCaseProvider = {
    provide: CreateSuperheroeUseCase,
    useFactory: createSuperheroeFactory,
    deps: [SuperheroeRepository],
};
export const updateSuperheroeUseCaseProvider = {
    provide: UpdateSuperheroeUseCase,
    useFactory: updateSuperheroeFactory,
    deps: [SuperheroeRepository],
};
export const deleteSuperheroeUseCaseProvider = {
    provide: DeleteSuperheroeUseCase,
    useFactory: deleteSuperheroeFactory,
    deps: [SuperheroeRepository],
};

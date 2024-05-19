import { Adapter } from '@core/base/common/adapter';
import { ICreateSuperheroeDTO } from '@modules/superheroes-module/data';
import { CreateSuperheroeModel } from '@modules/superheroes-module/domain';

type Input = CreateSuperheroeModel;
type Output = ICreateSuperheroeDTO;

export class CreateSuperheroeAdapter implements Adapter<Input, Output> {
    public adapt(input: Input): Output {
        return CreateSuperheroeAdapter.GetICreateSuperheroeDTO(input);
    }

    private static GetICreateSuperheroeDTO(model: Input): Output {
        return {
            nombre: model.nombre,
            nombreReal: model.nombreReal,
            afiliacion: model.afiliacion,
            edad: model.edad,
            biografia: model.biografia,
            nivelPoder: model.nivelPoder,
            origen: model.origen,
            superPoderes: model.superPoderes,
            habilidades: model.habilidades,
        };
    }
}

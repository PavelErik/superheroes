import { Adapter } from '@core/base/common/adapter';
import { IUpdateSuperheroeDTO } from '@modules/superheroes-module/data';
import { UpdateSuperheroeModel } from '@modules/superheroes-module/domain';

type Input = UpdateSuperheroeModel;
type Output = IUpdateSuperheroeDTO;

export class UpdateSuperheroeAdapter implements Adapter<Input, Output> {
    public adapt(input: Input): Output {
        return UpdateSuperheroeAdapter.GetIUpdateSuperheroeDTO(input);
    }

    private static GetIUpdateSuperheroeDTO(model: Input): Output {
        return {
            id: model.id,
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

import { Adapter } from '@core/base/common/adapter';
import { IResponseDTO } from '@core/dtos';
import { IGetSuperheroeDTO } from '@modules/superheroes-module/data';
import { GetSuperheroeModel } from '@modules/superheroes-module/domain';

type Input = IResponseDTO<IGetSuperheroeDTO>;
type Output = GetSuperheroeModel;

export class GetSuperheroeAdapter implements Adapter<Input, Output> {
    public adapt(input: Input): Output {
        return GetSuperheroeAdapter.GetSuperheroeModel(input.result);
    }

    private static GetSuperheroeModel(entity: IGetSuperheroeDTO): Output {
        return new GetSuperheroeModel({
            id: entity.id,
            nombre: entity.nombre,
            nombreReal: entity.nombreReal,
            afiliacion: entity.afiliacion,
            edad: entity.edad,
            biografia: entity.biografia,
            nivelPoder: entity.nivelPoder,
            origen: entity.origen,
            superPoderes: entity.superPoderes,
            habilidades: entity.habilidades,
        });
    }
}

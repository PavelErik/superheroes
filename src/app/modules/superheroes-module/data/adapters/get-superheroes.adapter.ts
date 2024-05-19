import { Adapter } from '@core/base/common/adapter';
import { IPaginationVmDTO, IResponseDTO } from '@core/dtos';
import { PaginationVmModel } from '@core/models';
import { IGetSuperheroesDTO } from '@modules/superheroes-module/data';
import { GetSuperheroesModel } from '@modules/superheroes-module/domain';

type Input = IResponseDTO<IPaginationVmDTO<IGetSuperheroesDTO>>;
type Output = PaginationVmModel<GetSuperheroesModel>;

export class GetSuperheroesAdapter implements Adapter<Input, Output> {
    public adapt(input: Input): Output {
        return GetSuperheroesAdapter.GetPaginationVmModel(input.result);
    }

    private static GetPaginationVmModel(result: IPaginationVmDTO<IGetSuperheroesDTO>): Output {
        return new PaginationVmModel<GetSuperheroesModel>({
            totalCount: result.totalCount,
            pageCount: result.pageCount,
            pageIndex: result.pageIndex,
            pageSize: result.pageSize,
            data: result.data.map((x) => GetSuperheroesAdapter.GetSuperheroesModel(x)),
        });
    }

    private static GetSuperheroesModel(entity: IGetSuperheroesDTO): GetSuperheroesModel {
        return new GetSuperheroesModel({
            id: entity.id,
            nombre: entity.nombre,
            nombreReal: entity.nombreReal,
            biografia: entity.biografia,
            afiliacion: entity.afiliacion,
            origen: entity.origen,
            imagen: entity.imagen,
            edad: entity.edad,
            nivelPoder: entity.nivelPoder,
        });
    }
}

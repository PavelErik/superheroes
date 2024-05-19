import { Adapter } from '@core/base/common/adapter';
import { IPaginationBasicQueryDTO } from '@core/dtos';
import { PaginationBasicQueryModel } from '@core/models';

type Input = PaginationBasicQueryModel;
type Output = IPaginationBasicQueryDTO;

export class PaginationBasicQueryAdapter implements Adapter<Input, Output> {
    public adapt(input: Input): Output {
        return {
            search: input.search,
            sortField: input.sortField,
            sortOrder: input.sortOrder,
            pageIndex: input.pageIndex,
            pageSize: input.pageSize,
        };
    }
}

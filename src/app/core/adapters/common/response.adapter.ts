import { Adapter } from '@core/base';
import { IResponseDTO } from '@core/dtos';
import { ResponseModel } from '@core/models';

type Input = IResponseDTO<any>;
type Output = ResponseModel<any>;

export class ResponseAdapter extends Adapter<Input, Output> {
    adapt(input: Input): Output {
        return new ResponseModel<any>({
            status: input.status,
            type: input.type,
            title: input.title,
            success: input.success,
            messages: input.messages,
            result: input.result,
        });
    }
}

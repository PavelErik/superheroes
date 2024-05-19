interface IResponseModel<T> {
    status: number;
    type: string;
    title: string;
    success: boolean;
    messages: string[];
    result: T;
}

export class ResponseModel<T> {
    public readonly status: number;
    public readonly type: string;
    public readonly title: string;
    public readonly success: boolean;
    public readonly messages: string[];
    public readonly result: T;

    constructor(properties: IResponseModel<T>) {
        this.status = properties.status;
        this.type = properties.type;
        this.title = properties.title;
        this.success = properties.success;
        this.messages = properties.messages;
        this.result = properties.result;
    }
}

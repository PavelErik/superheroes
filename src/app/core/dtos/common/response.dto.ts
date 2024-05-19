export interface IResponseDTO<T> {
    status: number;
    type: string;
    title: string;
    success: boolean;
    messages: string[];
    result: T;
}

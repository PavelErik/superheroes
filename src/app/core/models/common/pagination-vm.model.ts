interface IPaginationVmModel<T> {
    totalCount: number;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    data: T[];
}

export class PaginationVmModel<T> {
    public readonly totalCount: number;
    public readonly pageCount: number;
    public readonly pageIndex: number;
    public readonly pageSize: number;
    public readonly data: T[];

    constructor(properties: IPaginationVmModel<T>) {
        this.totalCount = properties.totalCount;
        this.pageCount = properties.pageCount;
        this.pageIndex = properties.pageIndex;
        this.pageSize = properties.pageSize;
        this.data = properties.data;
    }
}

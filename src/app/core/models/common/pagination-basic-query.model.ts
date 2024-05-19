export interface IPaginationBasicQueryModel {
    search: string | null;
    sortField: string | null;
    sortOrder: 1 | -1 | null;
    pageIndex: number;
    pageSize: number;
}

export class PaginationBasicQueryModel {
    public readonly search: string | null;
    public readonly sortField: string | null;
    public readonly sortOrder: 1 | -1 | null;
    public readonly pageIndex: number;
    public readonly pageSize: number;

    constructor(properties: IPaginationBasicQueryModel) {
        this.search = properties.search;
        this.sortField = properties.sortField;
        this.sortOrder = properties.sortOrder;
        this.pageIndex = properties.pageIndex;
        this.pageSize = properties.pageSize;
    }
}

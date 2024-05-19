export interface IPaginationBasicQueryDTO {
    search: string | null;
    sortField: string | null;
    sortOrder: 1 | -1 | null;
    pageIndex: number;
    pageSize: number;
}

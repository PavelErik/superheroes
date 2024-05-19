export interface IPaginationVmDTO<T> {
    totalCount: number;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    data: T[];
}

interface IPaginationSort {
    sortField: string | null;
    sortOrder: 1 | -1 | null;
}

export class GlobalTableFunctions {
    public static adaptSort(sortField?: string[] | string | null, sortOrder?: number | null): IPaginationSort {
        const newSortField = GlobalTableFunctions.configSortField(sortField);
        const newSortOrder = GlobalTableFunctions.configSortOrder(sortOrder);
        if (!sortField || !newSortOrder) return { sortField: null, sortOrder: null };
        else return { sortField: newSortField, sortOrder: newSortOrder };
    }

    public static adaptSearch(search?: string[] | string | null): string | null {
        const newSearch = Array.isArray(search) ? search[0] : search;
        if (!newSearch) return null;
        else if (newSearch.trim() === '') return null;
        else return newSearch.trim();
    }

    private static configSortField(sortField?: string[] | string | null): string | null {
        const newSortField = Array.isArray(sortField) ? sortField[0] : sortField;
        if (!newSortField) return null;
        else return `${newSortField}`;
    }

    private static configSortOrder(sortOrder?: number | null): -1 | 1 | null {
        if (sortOrder === 1) return 1;
        else if (sortOrder === -1) return -1;
        else return null;
    }
}

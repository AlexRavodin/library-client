export interface PaginatedData<T> {
    data: T | null;
    total: number;
}
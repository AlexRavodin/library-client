export interface ApiPaginatedResponse<T> {
    message: string;
    responseCode: number;
    data?: T;
    errorMessage?: string;
}
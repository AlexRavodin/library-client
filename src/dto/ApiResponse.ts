export interface ApiResponse<T> {
    message: string;
    responseCode: number;
    data?: T;
    errorMessage?: string;
}
export interface ApiResponse<T> {
    message: string;
    data?: T;
    statusCode: number;
    errorMessage: string | null;
    errors: string[] | null;
}
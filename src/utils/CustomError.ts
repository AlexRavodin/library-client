export default interface CustomError {
    statusCode: number;
    errorMessage: string | null;
    errors: string[] | null;
}
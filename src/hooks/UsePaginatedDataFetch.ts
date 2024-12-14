import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import CustomError from "@/utils/CustomError.ts";
import {ApiPaginatedResponse} from "@/dto/common/ApiPaginatedResponse.ts";

export const UsePaginatedDataFetch = <T>(fetchingFunction: () =>
    Promise<ApiPaginatedResponse<T>>): {
    data: T | null;
    loading: boolean;
    error: CustomError | null
} => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<CustomError | null>(null);

    useEffect(() => {
        const getter = async () => {
            try {
                setLoading(true);
                const result = await fetchingFunction();
                if (result.errorMessage !== null) {
                    setError({message: result.errorMessage} as CustomError);
                } else {
                    setData(result.data ?? null);
                }
            } catch (error) {
                setError(error as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        getter();
    }, [fetchingFunction]);
    return {data, loading, error};
};
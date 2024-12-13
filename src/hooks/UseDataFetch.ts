import {useEffect, useState} from "react";
import {AxiosError} from "axios";

export const UseDataFetch = <T>(fetchingFunction: () => Promise<T | AxiosError>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const getter = async () => {
            try {
                setLoading(true);
                const result = await fetchingFunction();
                
                if (res as T == null){
                    setError(null);
                }
                setData(res as T);
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
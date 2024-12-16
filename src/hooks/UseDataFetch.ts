import {useEffect, useState} from "react";
import CustomError from "@/utils/CustomError.ts";
import {baseAxios} from "@/utils/constants.ts";

export const UseDataFetch = <T>
(url: string, params?: { [key: string]: unknown }): {
    data: T | null;
    loading: boolean;
    error: CustomError | null
} => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<CustomError | null>(null);

    useEffect(() => {
        const apiCall = async () => {
            if (params) {
                console.log("Params: " + JSON.stringify(params));
            }

            setLoading(true);
            try {
                const response =
                    await baseAxios.get(url, {
                    params: params
                });

                if (response.status == 200) {
                    console.log("Check:" + JSON.stringify(response.data?.data as T));
                    setData(response.data?.data as T);
                } else {
                    setError(response.data as CustomError);
                }
            } catch (error) {
                if (error as CustomError) {
                    setError(error as CustomError);
                }
                setError({statusCode: 404, errorMessage:
                        "Unknown error", errors: null});
            } finally {
                setLoading(false);
            }
        };

        apiCall();
    }, [JSON.stringify(params), url]);

    return {data, loading, error};
};
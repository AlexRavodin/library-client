import {useEffect, useState} from "react";
import CustomError from "@/utils/CustomError.ts";
import {baseAxios} from "@/utils/constants.ts";

export const UseMultipleDataFetch = (urls: string[]): {
    data: unknown[] | null;
    loading: boolean;
    error: CustomError | null
} => {
    const [data, setData] = useState<unknown[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<CustomError | null>(null);

    useEffect(() => {
        const apiCall = async () => {
            setLoading(true);
            try {
                const requests = [];
                for (const url of urls) {
                    console.log("Request: " + url);
                    requests.push(baseAxios.get(url));
                }

                const responses = await Promise.all(requests);

                for (const response of responses) {
                    if (response.status == 200) {
                        console.log("Success response for: " + response.data);
                        const currentData = response.data?.data;
                        setData(data => [...data, currentData]);
                    } else {
                        console.log("Bad response for: " + response.data);
                        setError(response.data as CustomError);
                        setData([]);
                        return;
                    }
                }
            } catch (error) {
                if (error as CustomError) {
                    setError(error as CustomError);
                }
                setError({statusCode: 404, errorMessage: "Unknown error", errors: null});
            } finally {
                setLoading(false);
            }
        };

        apiCall();
    }, [urls.join(',')]);

    return {data, loading, error};
};
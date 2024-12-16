import {ApiResponse} from "@/dto/common/ApiResponse.ts";
import Author from "@/dto/author/Author.ts";
import {AxiosResponse} from "axios";
import {baseAxios} from "@/utils/constants.ts";

export async function getAuthors(): Promise<ApiResponse<Author[]>> {
    const response: AxiosResponse<ApiResponse<Author[]>> = await baseAxios.get('/authors', {
        withCredentials: true
    });
    return response.data;
}
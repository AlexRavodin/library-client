import {ApiResponse} from "@/dto/common/ApiResponse.ts";

export interface ApiPaginatedResponse<T> extends ApiResponse<T> {
    metadata: {
        total: number,
        currentPage: number,
        totalPages: number,
    };
}
import Genre from "@/dto/genre/Genre.ts";

export interface BookFilters {
    title?: string;
    author?: string;
    genres?: Genre[];
}
import Genre from "@/dto/Genre/Genre.ts";
import Author from "@/dto/Author/Author.ts";

export interface Book {
    id: number;
    title: string;
    full_amount: number;
    description: string;
    image_url: string;
    author: Author;
    genres: Genre[];
}
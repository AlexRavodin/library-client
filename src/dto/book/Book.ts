import Genre from "@/dto/genre/Genre.ts";
import Author from "@/dto/author/Author.ts";

export interface Book {
    id: number;
    title: string;
    amount: number;
    description: string;
    image_url: string | null;
    author: Author;
    genres: Genre[];
}
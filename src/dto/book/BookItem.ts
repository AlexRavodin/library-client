import Author from "@/dto/author/Author.ts";
import Genre from "@/dto/genre/Genre.ts";

export default interface BookItem {
    id: number;
    title: string;
    amount: number;
    image_url: string;
    author: Author;
    genres: Genre[];
}
import Author from "@/dto/Author/Author.ts";
import Genre from "@/dto/Genre/Genre.ts";

export default interface BookItem {
    id: number;
    title: string;
    full_amount: number;
    description: string;
    image_url: string;
    author: Author;
    genres: Genre[];
}
import {Book} from "@/dto/book/Book.ts";
import {AxiosResponse} from "axios";
import {baseAxios} from "@/utils/constants.ts";
import {ApiResponse} from "@/dto/common/ApiResponse.ts";


export async function getBookById(id: number): Promise<ApiResponse<Book>> {
    const response: AxiosResponse<ApiResponse<Book>> = await baseAxios.get(`/books/${id}`);
    return response.data;
}

export async function updateBook(book: Book): Promise<Book> {
    console.log('Updating book:', book);
    return book;
}
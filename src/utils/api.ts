import {Book} from '@/dto/book/Book.ts';
import Genre from '@/dto/genre/Genre.ts';
import {BookFilters} from "@/dto/book/BookFilters.ts";
import Author from "@/dto/author/Author.ts";
import {API_BASE_URL} from "@/utils/constants.ts";
import axios, {AxiosResponse} from 'axios';
import {ApiPaginatedResponse} from "@/dto/common/ApiPaginatedResponse.ts";
import {ApiResponse} from "@/dto/common/ApiResponse.ts";
import {PaginationParams} from "@/dto/common/PaginationParams.ts";

const Axios = axios.create({
    baseURL: `${API_BASE_URL}/auth`
});

export async function getBooks(pagination: PaginationParams, filters: BookFilters): Promise<ApiPaginatedResponse<Book[]>> {
    const response: AxiosResponse<ApiPaginatedResponse<Book[]>> = await Axios.get('/books', {
        params: [pagination, filters],
        withCredentials: true
    });
    return response.data;
}

export async function getGenres(): Promise<ApiResponse<Genre[]>> {
    const response: AxiosResponse<ApiResponse<Genre[]>> = await Axios.get('/genres', {
        withCredentials: true
    });
    return response.data;
}

export async function getAuthors(): Promise<ApiResponse<Author[]>> {
    const response: AxiosResponse<ApiResponse<Author[]>> = await Axios.get('/authors', {
        withCredentials: true
    });
    return response.data;
}

export async function getBookById(id: number): Promise<ApiResponse<Book>> {
    const response: AxiosResponse<ApiResponse<Book>> = await Axios.get(`/books/${id}`);
    return response.data;
}

export async function updateBook(book: Book): Promise<Book> {
    console.log('Updating book:', book);
    return book;
}
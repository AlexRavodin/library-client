import {Book} from '../dto/Book/Book.ts';
import Genre from '../dto/Genre/Genre.ts';
import {BookFilters} from "@/dto/Book/BookFilters.ts";
import Author from "@/dto/Author/Author.ts";
import {API_BASE_URL} from "@/constants.ts";
import axios, {AxiosResponse} from 'axios';
import {ApiResponse} from "@/dto/ApiResponse.ts";
import {ApiPaginatedResponse} from "@/dto/ApiPaginatedResponse.ts";

const Axios = axios.create({
    baseURL: `${API_BASE_URL}/auth`
});

export async function getBooks(page: number, filters: BookFilters): Promise<ApiPaginatedResponse<Book[]>> {
    const response: AxiosResponse<ApiPaginatedResponse<Book[]>> = await Axios.get('/books', {
        params: filters,
        withCredentials: true
    });

    console.log('Response: ' + response.data);

    

    const books: Book[] = Array.from({length: 10}, (_, i) => ({
        id: `book-${page}-${i}`,
        title: `Book Title ${page * 10 + i + 1}`,
        author: `Author ${page * 10 + i + 1}`,
        genre: ['Fiction', 'Mystery'],
        coverUrl: `/placeholder.svg?height=200&width=150&text=Book+${page * 10 + i + 1}`
    }));

    return response;
}

export async function getGenres(): Promise<Genre[]> {
    return [
        {id: '1', name: 'Fiction'},
        {id: '2', name: 'Non-fiction'},
        {id: '3', name: 'Mystery'},
        {id: '4', name: 'Science Fiction'},
        {id: '5', name: 'Fantasy'},
    ];
}

export async function getAuthors(): Promise<Author[]> {
    return [
        {id: '1', name: 'Jane Austen'},
        {id: '2', name: 'Charles Dickens'},
        {id: '3', name: 'Mark Twain'},
        {id: '4', name: 'Virginia Woolf'},
        {id: '5', name: 'F. Scott Fitzgerald'},
    ];
}

export async function getBookById(id: string): Promise<Book> {
    return {
        id,
        title: 'Sample Book',
        author: 'Jane Austen',
        genre: ['Fiction', 'Romance'],
        coverUrl: '/placeholder.svg?height=200&width=150&text=Sample+Book'
    };
}

export async function updateBook(book: Book): Promise<Book> {
    console.log('Updating book:', book);
    return book;
}
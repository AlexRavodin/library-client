import { useState, useEffect } from 'react'
import { BookCard } from '@/components/layout/Book/BookCard'
import { Filters } from '@/components/layout/Book/Filters'
import { Pagination } from '@/components/layout/Book/Paginration'
import { getBooks } from '@/utils/api'
import { Book } from '@/dto/Book/Book.ts'
import {BookFilters} from "@/dto/Book/BookFilters.ts";

export default function BookCatalogPage() {
    const [books, setBooks] = useState<Book[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState({})

    useEffect(() => {
        const fetchBooks = async () => {
            const { books, total } = await getBooks(currentPage, filters)
            setBooks(books)
            setTotalPages(Math.ceil(total / 10))
        }

        fetchBooks()
    }, [currentPage, filters])

    const handleFilterChange = (newFilters: BookFilters) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Book Catalog</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <Filters onFilterChange={handleFilterChange} />
                </aside>
                <main className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}


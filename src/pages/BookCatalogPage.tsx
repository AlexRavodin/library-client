import {useEffect, useState} from 'react'
import {BookCard} from '@/components/layout/Book/BookCard'
import {Filters} from '@/components/layout/Book/Filters'
import {Pagination} from '@/components/layout/Book/Paginration'
import {BookFilters} from "@/dto/book/BookFilters.ts";
import {AdminRole, UserRole} from "@/utils/constants.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/utils/AuthProvider.tsx";
import {UseDataFetch} from "@/hooks/UseDataFetch.ts";
import {PaginatedData} from "@/dto/common/PaginatedData.ts";
import {Book} from "@/dto/book/Book.ts";
import {loading as Loading} from "@/components/ui/loading.tsx"


export default function BookCatalogPage() {
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User:" + JSON.stringify(authContext.user));

        if (authContext.user?.role !== UserRole && authContext.user?.role !== AdminRole) {
            navigate("/unauthorized");
        }
    }, [authContext.user, navigate]);

    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState<BookFilters>({})

    const {data: paginatedBooks, loading, error} = UseDataFetch<PaginatedData<Book[]>>("books", {
        page: currentPage,
        pageSize: 10,
        author: filters.author,
        genres: filters.genreIds,
        title: filters.title,
    });

    if (loading) {
        return <Loading></Loading>;
    }
    if (error) {
        return <div>Error occurred: {error.errorMessage}.</div>;
    }
    if (!paginatedBooks) {
        return <div>Data is not available.</div>;
    }

    const handleFilterChange = (newFilters: BookFilters) => {
        const newFiltersString = JSON.stringify(newFilters);
        console.log(newFiltersString);

        const currentFiltersString = JSON.stringify(filters);
        console.log(currentFiltersString);

        if (newFiltersString !== currentFiltersString) {
            setFilters(newFilters);
            setCurrentPage(1);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Book Catalog</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <Filters onFilterChange={handleFilterChange}/>
                </aside>
                <main className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedBooks.data?.map((book) => (
                            <BookCard key={book.id} book={book}/>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={paginatedBooks.total}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}


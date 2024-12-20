import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "../components/ui/button"
import {UseDataFetch} from "@/hooks/UseDataFetch.ts";
import {Book} from "@/dto/book/Book.ts";
import {loading as Loading} from "@/components/ui/loading.tsx";

const LandingPage: React.FC = () => {

    const {data: featuredBooks, loading, error} = UseDataFetch<Book[]>('books/random', {
        count: 4,
    });

    if (loading) {
        return <Loading></Loading>;
    }
    if (error) {
        return <div>Error occurred: {error.errorMessage}.</div>;
    }
    if (!featuredBooks) {
        return <div>Data is not available.</div>;
    }

    console.log(featuredBooks);

    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Discover Your Next Great Read
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Explore our vast collection of books and embark on countless adventures through the
                                power of reading.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button asChild>
                                <Link to="/books">Browse Catalog</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link to="/about">Learn More</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                        Featured Books
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredBooks.map((book) => (
                            <div key={book.id} className="flex flex-col items-center">
                                <img
                                    src={book.image_url ?? "/placeholder.svg?height=300&width=200"}
                                    alt={book.title}
                                    className="w-[200px] h-[300px] rounded-lg shadow-lg mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-2">{book.author.last_name}</p>
                                <Button variant="outline" asChild>
                                    <Link to={`/book/${book.id}`}>View Details</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Join Our Book Club
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                Get exclusive access to new releases, author interviews, and special discounts.
                            </p>
                        </div>
                        <Button size="lg" asChild>
                            <Link to="/signup">Sign Up Now</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;


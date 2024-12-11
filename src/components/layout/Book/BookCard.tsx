import {Link} from 'react-router-dom'
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Book} from '@/dto/Book/Book.ts'

interface BookCardProps {
    book: Book;
}

export function BookCard({book}: BookCardProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardContent className="p-4">
                <div className="aspect-[3/4] relative mb-4">
                    <img
                        src={book.image_url}
                        alt={`Cover of ${book.title}`}
                        className="object-cover rounded-md w-full h-full"
                    />
                </div>
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">by {book.author.first_name + " " + book.author.last_name}</p>
                <div className="flex flex-wrap gap-2">
                    {book.genres.map((genre, index) => (
                        <span key={index} className="text-xs bg-gray-200 rounded-full px-2 py-1">
                            {genre.name}
                        </span>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 p-4">
                <Link to={`/books/${book.id}`} className="w-full">
                    <Button variant="default" size="lg" className="w-full">
                        View Details
                    </Button>
                </Link>
                <form className="w-full">
                    <input type="hidden" name="bookId" value={book.id}/>
                    <Button type="submit" variant="outline" className="w-full">
                        Borrow
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}



import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Select} from "@/components/ui/select";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Book} from '@/dto/book/Book.ts';
import Author from '@/dto/author/Author.ts';
import Genre from '@/dto/genre/Genre.ts';
import {UseMultipleDataFetch} from "@/hooks/UseMultipleDataFetch.ts";
import {loading as Loading} from "@/components/ui/loading.tsx"

export function EditBookPage() {
    const {stringId} = useParams<{ stringId: string }>();
    const id = parseInt(stringId!, 10);

    const navigate = useNavigate()
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])
    const [genreSearch, setGenreSearch] = useState('')
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [newBook, setNewBook] = useState<Book | null>(null)

    const {data, loading, error} = UseMultipleDataFetch([`books/${id}`, "authors", "genres"]);

    const genres = data?.at(2) as Genre[] ?? [];
    const authors = data?.at(1) as Author[] ?? [];
    const book = data?.at(0) as Book ?? null;

    useEffect(() => {
        if (book) {
            setNewBook(book);
            setSelectedGenres(book.genres);
        }
    }, [book])

    if (loading) {
        return <Loading></Loading>;
    }
    if (error) {
        return <div>Error occurred: {error.errorMessage}.</div>;
    }
    if (!data || !book) {
        return <div>Data is not available.</div>;
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newBook) {
            const updatedBook = {...newBook, genres: selectedGenres};
            if (coverFile) {
                updatedBook.image_url = URL.createObjectURL(coverFile);
            }
            console.log(updatedBook);

            //await updateBook(updatedBook)

            navigate(`/books/${book.id}`);
        }
    }

    const filteredGenres = genres.filter(genre =>
        genre.name.toLowerCase().includes(genreSearch.toLowerCase())
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setNewBook((prevBook) => ({...prevBook!, [id]: value,}));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Edit Book: {book!.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={newBook?.title ?? book?.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="author">Author</Label>
                            <Select
                                className="main-content"
                                id="author"
                                value={newBook?.author.id ?? book?.author.id}
                                onChange={(e) => setNewBook(
                                    {...book!, author: authors.find(a => a.id === parseInt(e.target.value))!}
                                )}
                                required
                            >
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {`${author.last_name} - ${author.first_name}`}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="genres">Genres</Label>
                            <Input
                                id="genre-search"
                                placeholder="Search genres..."
                                value={genreSearch}
                                onChange={(e) => setGenreSearch(e.target.value)}
                                className="mb-2"
                            />
                            <div className="max-h-40 overflow-y-auto border rounded p-2">
                                {filteredGenres.map((genre) => (
                                    <label key={genre.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedGenres.some(g => g.id === genre.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    console.log("Genre added: " + genre.name);
                                                    setSelectedGenres([...selectedGenres, ...genres.filter(g => g.id === genre.id)]);
                                                } else {
                                                    console.log("Genre removed: " + genre.name);
                                                    setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id))
                                                }
                                            }}
                                        />
                                        <span>{genre.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="cover">Cover Image</Label>
                            <Input
                                id="cover"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        {(book?.image_url || coverFile) && (
                            <div>
                                <Label>Current Cover</Label>
                                <img
                                    src={coverFile ? URL.createObjectURL(coverFile) : (book?.image_url ?? "/placeholder.svg?height=300&width=200")}
                                    alt="Book cover"
                                    className="w-32 h-48 object-cover"
                                />
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    )
}


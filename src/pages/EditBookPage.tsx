import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Select} from "@/components/ui/select"
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card"
import {Book} from '@/dto/book/Book.ts'
import Author from '@/dto/author/Author.ts'
import Genre from '@/dto/genre/Genre.ts'
import {getBookById, getAuthors, getGenres, updateBook} from '@/utils/api'
import GenreItem from "@/dto/genre/GenreItem.ts";

export function EditBookPage() {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [book, setBook] = useState<Book | null>(null)
    const [authors, setAuthors] = useState<Author[]>([])
    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedGenres, setSelectedGenres] = useState<GenreItem[]>([])
    const [genreSearch, setGenreSearch] = useState('')
    const [coverFile, setCoverFile] = useState<File | null>(null)

    useEffect(() => {
        if (id) {
            getBookById(id).then(setBook)
            getAuthors().then(setAuthors)
            getGenres().then(setGenres)
        }
    }, [id])

    useEffect(() => {
        if (book) {
            setSelectedGenres(book.genres.map(g => { g.id, g.name]}))
        }
    }, [book])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (book) {
            const updatedBook = {...book, genre: selectedGenres}
            if (coverFile) {
                updatedBook.image_url = URL.createObjectURL(coverFile)
            }
            await updateBook(updatedBook)
            navigate(`/books/${book.id}`)
        }
    }

    const filteredGenres = genres.filter(genre =>
        genre.name.toLowerCase().includes(genreSearch.toLowerCase())
    )

    if (!book) return <div>Loading...</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Edit Book: {book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={book.title}
                                onChange={(e) => setBook({...book, title: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="author">Author</Label>
                            <Select
                                className="main-content"
                                id="author"
                                value={book.author.first_name}
                                onChange={(e) => setBook(
                                    {...book, author: e.target.value}
                                )}
                                required
                            >
                                {authors.map((author) => (
                                    <option key={author.id} value={author.name}>
                                        {author.name}
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
                                            checked={selectedGenres.includes(genre.name)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedGenres([...selectedGenres, genre.name])
                                                } else {
                                                    setSelectedGenres(selectedGenres.filter(g => g !== genre.name))
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
                        {(book.image_url || coverFile) && (
                            <div>
                                <Label>Current Cover</Label>
                                <img
                                    src={coverFile ? URL.createObjectURL(coverFile) : book.image_url}
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


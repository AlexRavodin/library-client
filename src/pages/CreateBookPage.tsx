import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Select} from "@/components/ui/select";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Textarea from "@/components/ui/textarea.tsx";
import {UseMultipleDataFetch} from "@/hooks/UseMultipleDataFetch.ts";
import Author from "@/dto/author/Author.ts";
import Genre from "@/dto/genre/Genre.ts";
import {Book} from '@/dto/book/Book.ts';
import {loading as Loading} from "@/components/ui/loading.tsx"
import {baseAxios} from "@/utils/constants.ts";
import CustomError from "@/utils/CustomError.ts";

export function CreateBookPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
    const [genreSearch, setGenreSearch] = useState('');
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const {data, loading, error} = UseMultipleDataFetch(["authors", "genres"]);

    const genres = data?.at(1) as Genre[] ?? [];
    const authors = data?.at(0) as Author[] ?? [];

    const filteredGenres = genres.filter(genre =>
        genre.name.toLowerCase().includes(genreSearch.toLowerCase())
    );

    if (loading) {
        return <Loading></Loading>;
    }
    if (error) {
        return <div>Error occurred: {error.errorMessage}.</div>;
    }
    if (!data) {
        return <div>Data is not available.</div>;
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthorId(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(e.target.value, 0));
    };

    const handleGenreSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenreSearch(e.target.value);
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const genreId = parseInt(e.target.value);
        const genre = genres.find(g => g.id === genreId);
        if (e.target.checked) {
            if (genre) {
                setSelectedGenres([...selectedGenres, genre]);
            }
        } else {
            setSelectedGenres(selectedGenres.filter(g => g.id !== genreId));
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCoverFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newBook: Book = {
            id: 0,
            amount: amount,
            title,
            description,
            author: authors.find(a => a.id === parseInt(authorId))!,
            genres: selectedGenres,
            image_url: coverFile ? URL.createObjectURL(coverFile) : null,
        };
        console.log(newBook);

        try {
            const response = await baseAxios.post("books", { book: newBook });

            if (response.status === 200) {
                console.log("Book added successfully.");
                navigate(`/books`);
            } else {
                const error = response.data as CustomError;
                console.error(error);
            }
        } catch (err) {
            const error = { statusCode: 404, errorMessage: "Unknown error: " + err, errors: null };
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Book</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="amount">Title</Label>
                            <Input
                                id="title"
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="author">Author</Label>
                            <Select
                                id="author"
                                value={authorId}
                                onChange={handleAuthorChange}
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
                                onChange={handleGenreSearch}
                                className="mb-2"
                            />
                            <div className="max-h-40 overflow-y-auto border rounded p-2">
                                {filteredGenres.map((genre) => (
                                    <label key={genre.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedGenres.some(g => g.id === genre.id)}
                                            onChange={handleGenreChange}
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
                                onChange={handleCoverChange}
                            />
                        </div>
                        {(coverFile || title) && (
                            <div>
                                <Label>Current Cover</Label>
                                <img
                                    src={coverFile ? URL.createObjectURL(coverFile) : "/placeholder.svg?height=300&width=200"}
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

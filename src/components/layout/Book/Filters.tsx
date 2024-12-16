import React, {useState} from 'react'
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {BookFilters} from '@/dto/book/BookFilters.ts'
import Genre from "@/dto/genre/Genre.ts";
import {UseDataFetch} from "@/hooks/UseDataFetch.ts";
import {loading as Loading} from "@/components/ui/loading.tsx";

interface FiltersProps {
    onFilterChange: (filters: BookFilters) => void;
}

export function Filters({onFilterChange}: FiltersProps) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])

    const {data: genres, loading, error} = UseDataFetch<Genre[]>("/genres");

    if (loading) {
        return <Loading></Loading>;
    }
    if (error) {
        return <div>Error occurred: {error.errorMessage}.</div>;
    }
    if (!genres) {
        return <div>Data is not available.</div>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onFilterChange({title, author, genreIds: selectedGenres.map(genre => genre.id)})
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Book Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter book title"
                />
            </div>
            <div>
                <Label htmlFor="author">Author Name</Label>
                <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                />
            </div>
            <div>
                <Label>Genres</Label>
                <div className="space-y-2">
                    {genres.map((genre) => (
                        <Checkbox
                            key={genre.id}
                            id={`genre-${genre.id}`}
                            label={genre.name}
                            checked={selectedGenres.some(g => g.id === genre.id)}
                            onChange={(e) => {
                                setSelectedGenres(
                                    e.target.checked
                                        ? [...selectedGenres, ...genres.filter(g => g.id === genre.id)]
                                        : selectedGenres.filter(g => g.id !== genre.id)
                                );
                            }}
                        />
                    ))}
                </div>
            </div>
            <Button type="submit">Apply Filters</Button>
        </form>
    )
}


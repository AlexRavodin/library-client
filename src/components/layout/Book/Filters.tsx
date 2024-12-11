import React, {useState, useEffect} from 'react'
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {BookFilters} from '@/dto/Book/BookFilters.ts'
import {getGenres} from '@/utils/api'
import GenreItem from "@/dto/Genre/GenreItem.ts";

interface FiltersProps {
    onFilterChange: (filters: BookFilters) => void;
}

export function Filters({onFilterChange}: FiltersProps) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genres, setGenres] = useState<GenreItem[]>([])
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

    useEffect(() => {
        getGenres().then(setGenres)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onFilterChange({title, author, genres: selectedGenres})
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
                            checked={selectedGenres.includes(genre.id)}
                            onChange={(e) => {
                                setSelectedGenres(
                                    e.target.checked
                                        ? [...selectedGenres, genre.id]
                                        : selectedGenres.filter((id) => id !== genre.id)
                                )
                            }}
                        />
                    ))}
                </div>
            </div>
            <Button type="submit">Apply Filters</Button>
        </form>
    )
}


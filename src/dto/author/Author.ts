export default interface Author {
    id: number;
    first_name: string;
    last_name: string;
    bio: string;
    birth_date: Date | null;
    death_date: Date | null;
    image_url: string;
}
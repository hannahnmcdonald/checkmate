export type Game = {
    id: string;
    name: string;
    yearPublished?: string;
    description?: string;
    image: string;
    thumbnail?: string;
    minPlayers: number;
    maxPlayers: number;
    playingTime?: number;
    categories?: string[];
    mechanics?: string[];
}
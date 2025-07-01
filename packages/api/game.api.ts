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

export async function searchGames(query: string): Promise<Game[]> {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    console.log("Fetched data:", data);
    return data ?? [];
}

export default searchGames;

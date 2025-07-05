import { Game } from '@checkmate/types';

export async function searchGames(query: string): Promise<Game[]> {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    console.log("Fetched data:", data);
    return data ?? [];
}

export async function saveGame(gameId: string, category: string): Promise<void> {
    const res = await fetch("/api/save-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ game_id: gameId, category }),
    });

    if (!res.ok) {
        if (res.status === 409) {
            throw new Error("Game already saved in this category.");
        }
        throw new Error("Failed to save game.");
    }
}

export async function removeGame(gameId: string, category: string): Promise<void> {
    console.log(gameId, category)
    const res = await fetch("/api/remove-game", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ game_id: gameId, category }),
    });

    if (!res.ok) {
        throw new Error("Failed to remove game.");
    }
}

export async function getSavedGames(): Promise<{ game_id: string; category: string }[]> {
    const res = await fetch("/api/saved-games", { credentials: "include" });

    console.log("Response status:", res.status);

    if (!res.ok) {
        const text = await res.text();
        console.error("Error response body:", text);
        throw new Error("Failed to load saved games.");
    }

    const data = await res.json();
    console.log("Fetched saved games data:", data);
    return data.savedGames;
}

export async function getSavedGamesWithDetails(): Promise<{ game: object; category: string }[]> {
    const res = await fetch("/api/saved-games/details", { credentials: "include" });

    console.log("Response status:", res.status);

    if (!res.ok) {
        const text = await res.text();
        console.error("Error response body:", text);
        throw new Error("Failed to load saved games.");
    }

    const data = await res.json();
    console.log("Fetched saved games data:", data);
    return data.savedGames;
}

export async function getGameById(id: string) {
    const res = await fetch(`/api/game/${id}`);

    if (!res.ok) {
        const message = await res.text();
        throw new Error(`Error ${res.status}: ${message}`);
    }

    const json = await res.json();
    return json.game; // Assuming your endpoint wraps the game in `{ game: {...} }`
}

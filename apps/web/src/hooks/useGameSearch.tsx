import React, { useState, useEffect } from 'react';
import { searchGames } from '@checkmate/api';

// TODO: move to the types file?
export type Game = {
    id: string;
    name: string;
    yearPublished?: string;
    description?: string;
    image?: string;
    thumbnail?: string;
    minPlayers?: number;
    maxPlayers?: number;
    playingTime?: number;
    categories?: string[];
    mechanics?: string[];
}
export function useGameSearch(query: string) {
    const [results, setResults] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        searchGames(query)
            .then((data) => setResults(data ?? []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));

    }, [query]);

    return { results, loading, error };
}

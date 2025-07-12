import { useEffect, useState } from 'react';
import { searchGames } from '@checkmate/api';
import { useGameStore } from '@checkmate/store';

export default function useGameSearch(query: string) {
    const results = useGameStore((s) => s.searchResults);
    const setResults = useGameStore((s) => s.setSearchResults);
    const clearResults = useGameStore((s) => s.clearSearchResults);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            clearResults();
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

import { useState, useEffect } from "react";
import { searchFriends } from "@checkmate/api";
import { Friend } from '@checkmate/types';

export function useFriendSearch(query: string) {
    const [results, setResults] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        searchFriends(query)
            .then(setResults)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [query]);

    return { results, loading, error };
}

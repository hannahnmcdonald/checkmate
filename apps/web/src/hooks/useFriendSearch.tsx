import { useState, useEffect } from "react";
import { searchFriends } from "@checkmate/api";
import { Friend } from '@checkmate/types';

export function useFriendSearch(query: string) {
    const [results, setResults] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        console.log('SEARCHING')

        setLoading(true);
        setError(null);

        try {
            const data = await searchFriends(query);
            setResults(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, search };
}

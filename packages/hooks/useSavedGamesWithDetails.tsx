import React, { useState, useEffect } from 'react';
import { useAuth } from '@checkmate/state';
import { Game } from '@checkmate/types';
import { getSavedGamesWithDetails } from '@checkmate/api'

export default function useSavedGamesWithDetails() {
    const { state } = useAuth();
    const [savedGames, setSavedGames] = useState<
        { category: string; game: Game }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!state.user) {
            setSavedGames([]);
            return;
        }

        setLoading(true);
        getSavedGamesWithDetails()
            .then((data) => {
                setSavedGames(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [state.user]);

    return { savedGames, loading, error };
}

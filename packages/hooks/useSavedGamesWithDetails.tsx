import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@checkmate/store/useAuthStore';
import { useUserStore } from '@checkmate/store/useUserStore';
import { getSavedGamesWithDetails } from '@checkmate/api';

export default function useSavedGamesWithDetails() {
    const user = useAuthStore((state) => state.user);
    const savedGames = useUserStore((s) => s.savedGamesWithDetails);
    const setSavedGames = useUserStore((s) => s.setSavedGamesWithDetails);
    const clearSavedGames = useUserStore((s) => s.clearSavedGamesWithDetails);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            clearSavedGames();
            return;
        }

        if (savedGames.length) return;

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
    }, [user]);

    return { savedGames, loading, error };
}

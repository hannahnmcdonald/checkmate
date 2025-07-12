import { useAuthStore, useUserStore } from '@checkmate/store';
import { useEffect, useState } from 'react';
import { getSavedGames } from '@checkmate/api';

export default function useSavedGames() {
    const user = useAuthStore((state) => state.user);
    const savedGames = useUserStore((s) => s.savedGames);
    const setSavedGames = useUserStore((s) => s.setSavedGames);
    const clearSavedGames = useUserStore((s) => s.clearSavedGames);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            clearSavedGames();
            return;
        }

        if (savedGames.length) return; // avoid re-fetch if already loaded

        setLoading(true);
        getSavedGames()
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
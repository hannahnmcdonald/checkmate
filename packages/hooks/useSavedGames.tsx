import { useAuth } from '@checkmate/state';
import { useEffect, useState } from 'react';
import { getSavedGames } from '@checkmate/api';

export default function useSavedGames() {
    const { state } = useAuth();
    const [savedGames, setSavedGames] = useState<{ game_id: string; category: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!state.user) {
            setSavedGames([]);
            return;
        }

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
    }, [state.user]);

    return { savedGames, loading, error };
}

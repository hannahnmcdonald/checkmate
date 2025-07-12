import { useEffect, useState } from 'react';
import { getGameById } from '@checkmate/api';
import { useGameStore } from '@checkmate/store';
import { Game } from '@checkmate/types';

export default function useGame(id: string | undefined) {
    const game = useGameStore((s) => (id ? s.games[id] : undefined));
    const setGame = useGameStore((s) => s.setGame);

    const [loading, setLoading] = useState(!!id && !game);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || game) return;

        setLoading(true);
        getGameById(id)
            .then((data: Game) => {
                setGame(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return { game, loading, error };
}

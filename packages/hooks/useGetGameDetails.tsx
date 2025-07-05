import { useEffect, useState } from 'react';
import { getGameById } from '@checkmate/api';

export type Game = {
    id: string;
    image: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    playingTime: string;
    yearPublished: string;
    categories?: string[];
    mechanics?: string[];
};

export default function useGame(id: string | undefined) {
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setGame(null);
            return;
        }

        setLoading(true);
        setError(null);

        getGameById(id)
            .then((data) => {
                setGame(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return { game, loading, error };
}

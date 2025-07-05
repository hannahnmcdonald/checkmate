import { useEffect, useState } from "react";
import { getGameById } from "@checkmate/api";

export default function useGameDetails(gameId?: string) {
    const [game, setGame] = useState<any>(null);
    const [loading, setLoading] = useState(!!gameId);
    const [error, setError] = useState<string | null>(null);

    const fetchGame = async () => {
        if (!gameId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await getGameById(gameId);
            setGame(res);
        } catch (err) {
            setError("Failed to load game details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGame();
    }, [gameId]);

    return { game, loading, error, refetch: fetchGame };
}

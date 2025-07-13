import { useEffect, useState } from "react";
import { getGameById } from "@checkmate/api";
import { useGameStore } from "@checkmate/store";

export default function useGameDetails(gameId?: string) {
    const game = useGameStore((s) => (gameId ? s.gameDetails[gameId] : null));
    const setGameDetails = useGameStore((s) => s.setGameDetails);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGame = async () => {
        if (!gameId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getGameById(gameId);
            setGameDetails(gameId, data);
        } catch (err) {
            setError("Failed to load game details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!game && gameId) {
            fetchGame();
        }
    }, [gameId, game]);

    return { game, loading: !game && gameId !== undefined, error, refetch: fetchGame };
}

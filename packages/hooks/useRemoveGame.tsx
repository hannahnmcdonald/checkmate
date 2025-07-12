import { useState } from "react";
import { removeGame } from "@checkmate/api";
import { useUserStore } from "@checkmate/store/useUserStore";

export default function useRemoveGame() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const removeSavedGame = useUserStore((s) => s.removeSavedGame);
    const addSavedGame = useUserStore((s) => s.addSavedGame); // for rollback

    const mutate = async (gameId: string, category: string) => {
        setLoading(true);
        setError(null);

        const previous = useUserStore.getState().savedGames.find(g => g.game_id === gameId);
        removeSavedGame(gameId);

        try {
            await removeGame(gameId, category);
        } catch (err) {
            if (previous) addSavedGame(previous);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

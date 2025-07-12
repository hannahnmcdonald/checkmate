import { useState } from "react";
import { saveGame } from "@checkmate/api";
import { useUserStore } from "@checkmate/store/useUserStore";

export default function useSaveGame() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const addSavedGame = useUserStore((s) => s.addSavedGame);
    const removeSavedGame = useUserStore((s) => s.removeSavedGame);

    const mutate = async (gameId: string, category: string) => {
        setLoading(true);
        setError(null);

        const optimisticEntry = { game_id: gameId, category };
        addSavedGame(optimisticEntry);

        try {
            await saveGame(gameId, category);
        } catch (err) {
            removeSavedGame(gameId);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

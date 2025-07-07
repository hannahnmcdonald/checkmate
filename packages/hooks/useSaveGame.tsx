import { useState } from "react";
import { saveGame } from "@checkmate/api";

export default function useSaveGame() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (gameId: string, category: string) => {
        setLoading(true);
        setError(null);
        try {
            await saveGame(gameId, category);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

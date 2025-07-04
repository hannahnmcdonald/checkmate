import { useState } from "react";
import { removeGame } from "@checkmate/api";

export default function useRemoveGame() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (gameId: string, category: string) => {
        setLoading(true);
        setError(null);
        try {
            await removeGame(gameId, category);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

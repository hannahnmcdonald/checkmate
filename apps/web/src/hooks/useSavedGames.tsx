import { useEffect, useState } from "react";
import { getSavedGames } from "@checkmate/api";

export function useSavedGames() {
    const [data, setData] = useState<{ game_id: string; category: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getSavedGames()
            .then(setData)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { savedGames: data, loading, error };
}

import { useState } from "react";
import { finalizeMatch } from "@checkmate/api";

export default function useFinalizeMatch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (matchId: string, results: any[]) => {
        setLoading(true);
        setError(null);
        try {
            await finalizeMatch(matchId, results);
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

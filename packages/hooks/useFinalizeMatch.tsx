import { useState } from "react";
import { finalizeMatch } from "@checkmate/api";
import { useMatchStore } from "@checkmate/store";

export default function useFinalizeMatch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const updateMatchStatus = useMatchStore((s) => s.updateMatchStatus);

    const mutate = async (matchId: string, results: any[]) => {
        setLoading(true);
        setError(null);
        try {
            await finalizeMatch(matchId, results);
            updateMatchStatus(matchId, "completed");
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

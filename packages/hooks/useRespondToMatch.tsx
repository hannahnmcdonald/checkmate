import { useState } from "react";
import { respondToMatch } from "@checkmate/api";
import { useMatchStore } from "@checkmate/store/useMatchStore";

export default function useRespondToMatch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const removePendingMatch = useMatchStore((s) => s.removePendingMatch);

    const mutate = async (matchId: string, accept: boolean) => {
        setLoading(true);
        setError(null);

        removePendingMatch(matchId);

        try {
            await respondToMatch(matchId, accept);
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

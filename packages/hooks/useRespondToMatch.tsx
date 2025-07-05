import { useState } from "react";
import { respondToMatch } from "@checkmate/api";

export default function useRespondToMatch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (matchId: string, accept: boolean) => {
        setLoading(true);
        setError(null);
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

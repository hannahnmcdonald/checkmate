import { useEffect, useState } from "react";
import { getMatchDetails } from "@checkmate/api";
import { useMatchStore } from "@checkmate/store";

export default function useMatchDetails(matchId?: string) {
    const matchData = useMatchStore((s) => (matchId ? s.matches[matchId] : null));
    const setMatchDetails = useMatchStore((s) => s.setMatchDetails);

    const [loading, setLoading] = useState(!matchData && !!matchId);
    const [error, setError] = useState<string | null>(null);

    const fetchMatch = async () => {
        if (!matchId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await getMatchDetails(matchId);
            setMatchDetails(matchId, res);
        } catch (err) {
            setError("Failed to load match details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!matchId || matchData) return;
        fetchMatch();
    }, [matchId]);

    return { data: matchData, loading, error, refetch: fetchMatch };
}

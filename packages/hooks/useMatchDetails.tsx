import { useEffect, useState } from "react";
import { getMatchDetails } from "@checkmate/api";

export default function useMatchDetails(matchId?: string) {
    const [data, setData] = useState<{
        match: any;
        participants: any[];
    } | null>(null);
    const [loading, setLoading] = useState(!!matchId);
    const [error, setError] = useState<string | null>(null);

    const fetchMatch = async () => {
        if (!matchId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await getMatchDetails(matchId);
            setData(res);
        } catch (err) {
            setError("Failed to load match details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatch();
    }, [matchId]);

    return { data, loading, error, refetch: fetchMatch };
}

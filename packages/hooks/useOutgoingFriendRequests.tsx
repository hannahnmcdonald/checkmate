import { useEffect, useState } from "react";
import { getOutgoingFriendRequests } from "@checkmate/api";
import { Friend } from "@checkmate/types";

export default function useOutgoingFriendRequests() {
    const [requests, setRequests] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getOutgoingFriendRequests();
            setRequests(res);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return { requests, loading, error, refetch: fetchRequests };
}


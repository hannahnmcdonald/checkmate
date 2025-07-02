import { useEffect, useState } from "react";
import { getIncomingFriendRequests } from "@checkmate/api";
import { Friend } from "@checkmate/types";

export function useIncomingFriendRequests() {
    const [requests, setRequests] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getIncomingFriendRequests()
            .then(setRequests)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { requests, loading, error };
}

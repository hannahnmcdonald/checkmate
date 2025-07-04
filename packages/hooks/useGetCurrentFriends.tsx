import { useState, useEffect } from "react";
import { getCurrentFriends } from "@checkmate/api";
import { Friend } from "@checkmate/types";

export default function useGetCurrentFriends() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getCurrentFriends()
            .then(setFriends)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { friends, loading, error };
}

import { useEffect, useState } from "react";
import { getCurrentFriends } from "@checkmate/api";
import { Friend } from "@checkmate/types";

export default function useGetCurrentFriends() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFriends = async () => {
        setLoading(true);
        try {
            const res = await getCurrentFriends();
            setFriends(res);
        } catch (err) {
            console.error("Error fetching friends", err);
            setError("Failed to load friends");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return { friends, loading, error };
}

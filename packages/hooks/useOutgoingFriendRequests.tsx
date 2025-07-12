import { useEffect, useState } from "react";
import { getOutgoingFriendRequests } from "@checkmate/api";
import { useFriendsStore } from "@checkmate/store";

export default function useOutgoingFriendRequests() {
    const requests = useFriendsStore((s) => s.outgoingRequests);
    const setRequests = useFriendsStore((s) => s.setOutgoingRequests);
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
        if (!requests.length) {
            fetchRequests();
        }
    }, []);

    return { requests, loading, error, refetch: fetchRequests };
}

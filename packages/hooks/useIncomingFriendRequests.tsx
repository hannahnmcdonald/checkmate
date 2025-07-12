import { useEffect } from "react";
import { getIncomingFriendRequests } from "@checkmate/api";
import { useFriendsStore } from "@checkmate/store";

export default function useIncomingFriendRequests() {
    const requests = useFriendsStore((s) => s.incomingRequests);
    const setRequests = useFriendsStore((s) => s.setIncomingRequests);
    const clearRequests = useFriendsStore((s) => s.clearIncomingRequests);

    const loading = useFriendsStore((s) => s.loadingIncoming);
    const setLoading = useFriendsStore((s) => s.setLoadingIncoming);

    const error = useFriendsStore((s) => s.errorIncoming);
    const setError = useFriendsStore((s) => s.setErrorIncoming);

    const fetchRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getIncomingFriendRequests();
            setRequests(data);
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

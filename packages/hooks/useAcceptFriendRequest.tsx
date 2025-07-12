import { acceptFriendRequest } from "@checkmate/api";
import { useFriendsStore } from "@checkmate/store";

export default function useAcceptFriendRequest() {
    const loading = useFriendsStore((s) => s.acceptLoading);
    const setLoading = useFriendsStore((s) => s.setAcceptLoading);

    const error = useFriendsStore((s) => s.acceptError);
    const setError = useFriendsStore((s) => s.setAcceptError);

    const mutate = async (friendId: string) => {
        setLoading(true);
        setError(null);
        try {
            await acceptFriendRequest(friendId);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Error accepting friend request");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

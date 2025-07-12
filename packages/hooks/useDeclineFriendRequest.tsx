import { useFriendsStore } from "@checkmate/store";
import { declineFriendRequest } from "@checkmate/api";

export default function useDeclineFriendRequest() {
    const loading = useFriendsStore((s) => s.declineLoading);
    const setLoading = useFriendsStore((s) => s.setDeclineLoading);

    const error = useFriendsStore((s) => s.declineError);
    const setError = useFriendsStore((s) => s.setDeclineError);

    const mutate = async (friendId: string) => {
        setLoading(true);
        setError(null);
        try {
            await declineFriendRequest(friendId);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Error declining friend request");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

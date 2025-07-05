import { useState } from "react";
import { declineFriendRequest } from "@checkmate/api";

export default function useDeclineFriendRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (friendId: string) => {
        setLoading(true);
        setError(null);
        try {
            await declineFriendRequest(friendId);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Error declining friend request");
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

// packages/hooks/src/useSendFriendRequest.ts
import { useState } from "react";
import { sendFriendRequest } from "@checkmate/api";

export default function useSendFriendRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function mutate(friendId: string) {
        setLoading(true);
        setError(null);
        try {
            await sendFriendRequest(friendId);
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { mutate, loading, error };
}

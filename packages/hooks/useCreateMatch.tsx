import { useState } from "react";

export function useCreateMatch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createMatch = async (gameId: string, invitedIds: string[]) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/match", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ game_id: gameId, invited_user_ids: invitedIds }),
            });

            if (!res.ok) throw new Error("Failed to create match");

            const data = await res.json();
            return data.session_id;
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createMatch, loading, error };
}

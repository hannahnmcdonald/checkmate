import { useEffect, useState } from 'react';

export function useGameSaveStatus(gameId: string | undefined) {
    const [status, setStatus] = useState<{
        wishlist: boolean;
        collection: boolean;
    }>({ wishlist: false, collection: false });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!gameId) return;

        setLoading(true);
        setError(null);

        fetch(`/api/saved-games/${gameId}`, {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load saved status");
                return res.json();
            })
            .then((data) => {
                setStatus({
                    wishlist: data.wishlist,
                    collection: data.collection,
                });
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [gameId]);

    return { status, loading, error };
}

import { useEffect, useState, useMemo } from "react";
import { getSavedGames } from "@checkmate/api";
import { useGameStore, useAuthStore } from "@checkmate/store";

export default function useGameSaveStatus(gameId?: string) {
    const user = useAuthStore((s) => s.user);

    const defaultStatus = useMemo(() => ({ wishlist: false, collection: false }), []);
    const status = useGameStore((s) =>
        gameId ? s.saveStatus[gameId] || defaultStatus : defaultStatus
    );

    const setSaveStatus = useGameStore.getState().setSaveStatus;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!gameId || !user) return;

        const loadStatus = async () => {
            try {
                setLoading(true);
                const savedGames = await getSavedGames();

                const wishlist = savedGames.some(
                    (g) => g.game_id === gameId && g.category === "wishlist"
                );
                const collection = savedGames.some(
                    (g) => g.game_id === gameId && g.category === "collection"
                );

                // Only update if changed
                const current = useGameStore.getState().saveStatus[gameId];
                if (!current || current.wishlist !== wishlist || current.collection !== collection) {
                    setSaveStatus(gameId, { wishlist, collection });
                }
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        loadStatus();
    }, [gameId, setSaveStatus, user]);


    return { status, loading, error };
}

import { useEffect, useState } from "react";
import { useUserStore } from "@checkmate/store";

export default function useUserProfile(userId: string | undefined) {
    const profile = useUserStore((s) => s.userProfile);
    const setProfile = useUserStore((s) => s.setUserProfile);
    const clearProfile = useUserStore((s) => s.clearUserProfile);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            clearProfile();
            setError("No user ID provided");
            setLoading(false);
            return;
        }

        if (profile?.user.id !== userId) {
            clearProfile();
        }

        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/profile/${userId}`);
                if (!res.ok) {
                    throw new Error(`Failed to load profile: ${res.status}`);
                }
                const profile = await res.json();
                setProfile(profile);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    return { profile, loading, error };
}

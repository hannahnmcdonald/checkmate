import { useEffect, useState } from "react";
import { UserProfile } from "@checkmate/types";

export default function useUserProfile(userId: string | undefined) {
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setError("No user ID provided");
            setLoading(false);
            return;
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
                setData(profile);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    return { data, loading, error };
}

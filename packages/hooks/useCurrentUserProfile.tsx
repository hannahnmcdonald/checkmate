import { useEffect, useState } from 'react';
import { UserProfile } from '@checkmate/types';
import { getCurrentUserProfile } from '@checkmate/api';

export default function useCurrentUserProfile() {
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const profile = await getCurrentUserProfile();
            setData(profile);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getCurrentUserProfile()
            .then((profile) => {
                console.log("[HOOK] Fetched profile:", profile);
                setData(profile);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching profile:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { data, loading, error, refetch: fetchProfile };
}


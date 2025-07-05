import { useEffect, useState } from 'react';
import { UserProfile } from '@checkmate/types';
import { getCurrentUserProfile } from '@checkmate/api';

export default function useCurrentUserProfile() {
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getCurrentUserProfile()
            .then((profile) => {
                setData(profile);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching profile:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}

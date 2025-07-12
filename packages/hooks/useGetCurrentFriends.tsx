
import { getCurrentFriends } from "@checkmate/api";
import { Friend } from "@checkmate/types";
import { useEffect, useState } from 'react';
import { useAuthStore } from '@checkmate/store/useAuthStore';
import { useFriendsStore } from '@checkmate/store';

export default function useFriends() {
    const userId = useAuthStore((s) => s.user?.id);
    const friends = useFriendsStore((s) => s.friends);
    const setFriends = useFriendsStore((s) => s.setFriends);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!userId) return;

        setLoading(true);
        getCurrentFriends(userId)
            .then(setFriends)
            .finally(() => setLoading(false));
    }, [userId]);

    return { friends, loading };
}

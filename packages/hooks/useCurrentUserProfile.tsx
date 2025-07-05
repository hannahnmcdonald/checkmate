import { useEffect, useState } from "react";
import { UserProfile } from "@checkmate/types";
import { getCurrentUserProfile } from "@checkmate/api";
import { useAuth } from "@checkmate/state";

export default function useCurrentUserProfile() {
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();

    useEffect(() => {
        setLoading(true);
        setError(null);

        getCurrentUserProfile()
            .then((profile) => {
                setData(profile);
            })
            .catch(async (err) => {
                console.error("Error fetching profile:", err);
                if (err.message.includes("401")) {
                    // If you want a more robust check, inspect the status code instead
                    await logout();
                }
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [logout]);

    return { data, loading, error };
}

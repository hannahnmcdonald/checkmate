import { UserProfile } from '@checkmate/types';

export async function getCurrentUserProfile(): Promise<UserProfile> {
    const res = await fetch(`/api/me`, {
        credentials: "include",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Cannot retrieve profile: ${text}`);
    }

    const data = await res.json();
    console.log("[API] /api/me response:", data);
    return data;
}

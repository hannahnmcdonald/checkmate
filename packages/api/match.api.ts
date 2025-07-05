/**
 * Create a new match
 */
export async function createMatch(
    gameId: string,
    invitedUserIds: string[]
): Promise<{ session_id: string }> {
    const res = await fetch("/api/match", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game_id: gameId, invited_user_ids: invitedUserIds }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create match: ${text}`);
    }

    return res.json();
}

/**
 * Get match details
 */
export async function getMatchDetails(sessionId: string): Promise<{
    match: any;
    participants: any[];
}> {
    const res = await fetch(`/api/match/${sessionId}`, {
        credentials: "include",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to get match details: ${text}`);
    }

    return res.json();
}

/**
 * Respond to a match invitation
 */
export async function respondToMatch(
    sessionId: string,
    accept: boolean
): Promise<void> {
    const res = await fetch(`/api/match/${sessionId}/respond`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accept }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to respond to match: ${text}`);
    }
}

/**
 * Finalize a match with results
 */
export async function finalizeMatch(
    sessionId: string,
    results: { user_id: string; result: string }[]
): Promise<void> {
    const res = await fetch(`/api/match/${sessionId}/finalize`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to finalize match: ${text}`);
    }
}

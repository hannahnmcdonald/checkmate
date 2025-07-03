import { Friend } from "@checkmate/types";

export async function searchFriends(query: string): Promise<Friend[]> {
    console.log('query', query)
    const res = await fetch(`/api/friends/search?q=${encodeURIComponent(query)}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Search failed");
    return res.json();
}

export async function getCurrentFriends(): Promise<Friend[]> {
    const res = await fetch("/api/friends", {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to get friends");
    return res.json();
}

export async function sendFriendRequest(friendId: string): Promise<void> {
    const res = await fetch("/api/friend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId }),
    });
    if (!res.ok) throw new Error("Failed to send friend request");
}

export async function acceptFriendRequest(friendId: string): Promise<void> {
    const res = await fetch("/api/friend/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId }),
    });
    if (!res.ok) throw new Error("Failed to accept friend request");
}

export async function declineFriendRequest(friendId: string): Promise<void> {
    const res = await fetch("/api/friend/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId }),
    });
    if (!res.ok) throw new Error("Failed to decline friend request");
}

export async function getIncomingFriendRequests(): Promise<Friend[]> {
    const res = await fetch("/api/friends/incoming", {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch incoming requests");
    const data = await res.json();
    return data.requests;
}

export async function getOutgoingFriendRequests(): Promise<Friend[]> {
    const res = await fetch("/api/friends/outgoing", {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch outgoing requests");
    const data = await res.json();
    return data.requests;
}
import { YStack, Text, Button } from "tamagui";
import React, { useState } from "react";
import {
    FriendGrid,
    FriendSearchBar,
} from "./components";
import {
    useFriendSearch,
    useGetCurrentFriends,
    useSendFriendRequest,
    useOutgoingFriendRequests,
} from "@checkmate/hooks";

export default function FindFriendsPage() {
    const [query, setQuery] = useState("");
    const [requestedIds, setRequestedIds] = useState<string[]>([]);

    const { results, loading: searchLoading, search } = useFriendSearch(query);
    const { friends, loading: friendsLoading } = useGetCurrentFriends();
    const { mutate: sendFriendRequest, loading: sending, error } = useSendFriendRequest();
    const {
        requests: outgoingRequests,
        loading: outgoingLoading,
        refetch: refetchOutgoing,
    } = useOutgoingFriendRequests();

    const isFriend = (userId: string) => friends.some((f) => f.id === userId);

    const hasPendingRequest = (userId: string) =>
        outgoingRequests?.some((r) => r.id === userId) ||
        requestedIds.includes(userId);

    const handleSendRequest = async (userId: string) => {
        try {
            await sendFriendRequest(userId);
            setRequestedIds((prev) => [...prev, userId]);
            await refetchOutgoing();
        } catch (err) {
            console.error(err);
        }
    };

    const outgoing = useOutgoingFriendRequests();

    return (
        <YStack gap="$4">
            <FriendSearchBar
                query={query}
                setQuery={setQuery}
                onSubmit={() => search(query)}
            />

            {searchLoading ? (
                <Text>Loading...</Text>
            ) : (
                <FriendGrid
                    // title="Results:"
                    emptyText=""
                    users={results}
                    actionButton={(user) => (
                        <Button
                            onPress={(e) => { e.stopPropagation(); handleSendRequest(user.id); }}
                            disabled={
                                sending || isFriend(user.id) || hasPendingRequest(user.id)
                            }
                            theme={
                                isFriend(user.id)
                                    ? "gray"
                                    : hasPendingRequest(user.id)
                                        ? "gray"
                                        : "active"
                            }
                        >
                            {isFriend(user.id)
                                ? "Already Friends"
                                : hasPendingRequest(user.id)
                                    ? "Request Sent"
                                    : sending
                                        ? "Adding..."
                                        : "Add Friend"}
                        </Button>
                    )}
                />
            )}

            {friendsLoading ? (
                <Text>Loading friends...</Text>
            ) : (
                <FriendGrid
                    title="Current Friends:"
                    users={friends}
                    emptyText="You have no friends yet."
                    actionButton={(user) => (
                        <Button theme="gray">
                            Remove
                        </Button>
                    )}
                />
            )}
        </YStack>
    );
}

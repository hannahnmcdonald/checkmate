import { XStack, YStack, Text, Button } from "tamagui";
import React, { useState, useEffect } from 'react';
import { FriendGrid } from './components/index';
import { useFriendSearch } from "../../hooks/useFriendSearch";
import { useGetCurrentFriends } from "../../hooks/useGetCurrentFriends";
// import { sendFriendRequest } from "@checkmate/api/friend.api";
import { useIncomingFriendRequests } from "../../hooks/useIncomingFriendRequests";
// import { Friend } from "@checkmate/types";
import FriendSearchBar from "./components/FriendSearchBar/FriendSearchBar";

export default function FindFriendsPage() {
    const [query, setQuery] = useState("");

    const { results, loading: searchLoading } = useFriendSearch(query);
    const { friends, loading: friendsLoading } = useGetCurrentFriends();
    const { requests, loading: incomingLoading } = useIncomingFriendRequests();

    return (
        <YStack gap="$4">
            <FriendSearchBar query={query} setQuery={setQuery} />
            {/* {searchLoading ? (
                <Text>Loading...</Text>
            ) : (
                <FriendGrid
                    users={results}
                    actionButton={(user) => (
                        <Button onPress={() => sendFriendRequest(user.id)}>
                            Add Friend
                        </Button>
                    )}
                />
            )} */}
            <FriendGrid
                users={friends}
                emptyText="You have no friends yet."
                actionButton={(user) => (
                    <Button
                        theme="gray"
                    // onPress={() => removeFriend(user.id)}
                    >
                        Remove
                    </Button>
                )}
            />
        </YStack>

    );
}

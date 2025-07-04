import { YStack, Text, Button } from "tamagui";
import React, { useState } from 'react';
import { FriendGrid } from './components/index';
import FriendSearchBar from "./components/FriendSearchBar/FriendSearchBar";
import {
    useFriendSearch,
    useGetCurrentFriends,
    useIncomingFriendRequests
} from "@checkmate/hooks";

const hardcodedFriends = [
    {
        id: '1',
        username: "Sam",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rdanderson.com%2Fstargate%2Flexicon%2Fimages%2Fcartersamantha.jpg&f=1&nofb=1&ipt=ff674c40694ac7849ea2133433106d2d4c49c65b96e8f1cff4971745fece8ac6",
    },
    {
        id: '2',
        username: "Jack",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F0d%2F42%2F5f%2F0d425f81de97010d6d70bb5607b9335f.jpg&f=1&nofb=1&ipt=5f2268355f8c0f5e0048bed2e107855f7173c1043d6c3bb2bdbcdd479909ddda"
    },
    {
        id: '3',
        username: "Daniel",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.ZjstSaELiF-Us_9eGiy_IQHaJ4%3Fr%3D0%26pid%3DApi&f=1&ipt=04b73963fbc998c3a02219d5289c5379ca4e13402fc553ccee814c982e0ee36b&ipo=images"
    },
    {
        id: '4',
        username: "Teal'c",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FOIP.q6yMAhGDVtum8yDpElskRwHaEK%3Fcb%3Dthvnextc1%26pid%3DApi&f=1&ipt=ccdfd4dbd4078f2f3184e5638008dff8fab7ff13a5c1623e7e85a87300373f3c&ipo=images"
    },
]

export default function FindFriendsPage() {
    const [query, setQuery] = useState("");

    const { results, loading: searchLoading, search } = useFriendSearch(query);
    const { friends, loading: friendsLoading } = useGetCurrentFriends();
    const { requests, loading: incomingLoading } = useIncomingFriendRequests();

    return (
        <YStack gap="$4">
            <FriendSearchBar query={query} setQuery={setQuery} onSubmit={() => search(query)} />
            {searchLoading ? (
                <Text>Loading...</Text>
            ) : (
                <FriendGrid
                    title="Results:"
                    emptyText=""
                    users={results}
                    actionButton={(user) => (
                        <Button
                            onPress={() => sendFriendRequest(user.id)}
                        >
                            Add Friend
                        </Button>
                    )}
                />
            )}
            {friendsLoading ?
                (
                    <Text>Loading friends...</Text>
                ) :
                (
                    <FriendGrid
                        title="Current Friends:"
                        users={hardcodedFriends}
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
                )}
        </YStack>

    );
}

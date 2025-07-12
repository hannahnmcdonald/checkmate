import { useParams } from "react-router-dom";
import { YStack, Text } from "tamagui";
import React from 'react';
import { useUserProfile } from "@checkmate/hooks";
import {
    ProfileFriends,
    ProfileGames
} from "./components"
import { useAuthStore } from '@checkmate/store'
import { normalizeArrayField } from "../../utils";

export default function PublicProfilePage() {
    const { user } = useAuthStore();
    const { userId: paramUserId } = useParams();
    const userId = paramUserId === "me" ? state.user?.id : paramUserId;

    if (!userId) {
        return <Text>No user ID found.</Text>;
    }

    const { data, loading, error } = useUserProfile(userId);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    if (!data) {
        return <Text>No profile data found.</Text>;
    }

    const isViewingOwnProfile = user?.id === data.user.id;
    const isFriendsListPublic = data.friends.privacy === "friends";
    const isWishlistPublic = data.games.wishlist.privacy === "friends";
    const isCollectionVisible = data.games.collection.privacy === "friends";
    const friendsList = normalizeArrayField(data.friends);
    const wishlist = normalizeArrayField(data.games.wishlist);
    const collection = normalizeArrayField(data.games.collection)

    console.log(isWishlistPublic)
    return (
        <YStack p="$4">

            <Text fontWeight="700" textAlign="center">{data.user.username}'s Profile</Text>
            <ProfileGames
                wishlist={wishlist}
                collection={collection}
                isWishlistVisible={isWishlistPublic}
                isCollectionVisible={isCollectionVisible}
                isOwner={isViewingOwnProfile}
            />

            {isFriendsListPublic ? (
                <ProfileFriends
                    users={friendsList}
                    title="Friends"
                />
            ) : (
                <Text>`${data.user.username}'s friends list is private`</Text>
            )}
        </YStack>
    );
}

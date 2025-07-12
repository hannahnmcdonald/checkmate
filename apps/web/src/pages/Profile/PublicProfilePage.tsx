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
    const userId = paramUserId === "me" ? user?.id : paramUserId;

    if (!userId) {
        return <Text>No user ID found.</Text>;
    }

    const { profile, loading, error } = useUserProfile(userId);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    if (!profile) {
        return <Text>No profile data found.</Text>;
    }

    const isViewingOwnProfile = user?.id === profile.user.id;
    const isFriendsListPublic = profile.friends.privacy === "friends";
    const isWishlistPublic = profile.games.wishlist.privacy === "friends";
    const isCollectionVisible = profile.games.collection.privacy === "friends";
    const friendsList = normalizeArrayField(profile.friends);
    const wishlist = normalizeArrayField(profile.games.wishlist);
    const collection = normalizeArrayField(profile.games.collection)

    console.log(isWishlistPublic)
    return (
        <YStack p="$4">

            <Text fontWeight="700" textAlign="center">{profile.user.username}'s Profile</Text>
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
                <Text>{`${profile.user.username}'s friends list is private`}</Text>
            )}
        </YStack>
    );
}

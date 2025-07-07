import React from 'react'
import { YStack, Text } from 'tamagui'
import { ProfileHeader, ProfileGames, ProfileFriends } from './components'
import { useGetCurrentFriends, useSavedGames, useCurrentUserProfile } from "@checkmate/hooks";
import { useAuth } from '@checkmate/state';
import { normalizeArrayField } from "../../utils";

export default function ProfilePage() {
    const { state } = useAuth();
    const { friends, loading: friendsLoading } = useGetCurrentFriends();
    const { data, loading, error, refetch } = useCurrentUserProfile();


    if (loading) {
        return (
            <YStack p="$4">
                <Text>Loading profile...</Text>
            </YStack>
        );
    }

    if (error) {
        return (
            <YStack p="$4">
                <Text>Error: {error}</Text>
            </YStack>
        );
    }

    if (!data) {
        return (
            <YStack p="$4">
                <Text>No profile data available.</Text>
            </YStack>
        );
    }

    const isViewingOwnProfile = state.user?.id === data.user.id;
    const friendsList = normalizeArrayField(data.friends);
    const wishlist = normalizeArrayField(data.games.wishlist);
    const collection = normalizeArrayField(data.games.collection)

    return (
        <YStack p="$4">
            <ProfileHeader name={data.user?.first_name} />
            <ProfileGames
                wishlist={wishlist}
                collection={collection}
                isWishlistVisible={isViewingOwnProfile}
                isCollectionVisible={isViewingOwnProfile}
                isOwner={isViewingOwnProfile}
                refetchProfile={refetch}
            />
            <ProfileFriends
                users={friendsList}
                title="Friends"
            />
        </YStack>
    );

}
